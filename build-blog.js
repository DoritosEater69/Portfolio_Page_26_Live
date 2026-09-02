#!/usr/bin/env node
/**
 * build-blog.js — generiert /blog/posts/*.html + /blog/index.html + sitemap.xml
 * aus blog/posts.json (Metadaten) + blog/content/<slug>.html (Artikel-Body-Fragment).
 *
 * Quelle der Wahrheit: blog/posts.json. Body-HTML liegt separat in blog/content/,
 * damit posts.json klein/übersichtlich bleibt und Artikeltext direkt als HTML
 * editierbar ist (keine Escaping-Hölle in JSON).
 *
 * Jeder Beitrag wird 1:1 gleich aufgebaut (blog/_template.html): Breadcrumb, Kicker,
 * H1, Standfirst, Meta-Zeile, "Das Wichtigste in Kürze"-Box, Inhaltsverzeichnis,
 * Body, FAQ, CTA (Kontaktformular), Autoren-Box, verwandte Beiträge. Strukturierte
 * Daten pro Beitrag: BlogPosting + BreadcrumbList + FAQPage.
 *
 * Pflichtfelder pro Post in posts.json:
 *   slug, title, description, date, tags[], readTime, standfirst, keyTakeaways[], faq[]
 * Optional: metaTitle, dateModified, image
 *
 * Aufruf: node build-blog.js  — idempotent, überschreibt Ausgabedateien komplett.
 */

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const BLOG_DIR = path.join(ROOT, "blog");
const POSTS_JSON = path.join(BLOG_DIR, "posts.json");
const CONTENT_DIR = path.join(BLOG_DIR, "content");
const OUT_DIR = path.join(BLOG_DIR, "posts");
const ARTICLE_TEMPLATE = fs.readFileSync(path.join(BLOG_DIR, "_template.html"), "utf-8");
const INDEX_TEMPLATE = fs.readFileSync(path.join(BLOG_DIR, "_index_template.html"), "utf-8");
const SITE = "https://nicworks.de";
const DEFAULT_OG_IMAGE = SITE + "/img/nic.png";
const DEFAULT_OG_IMAGE_ALT = "Niclas Koch, Web- und Grafikdesigner aus Düsseldorf";

const MONTHS = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];

function humanDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d}. ${MONTHS[m - 1]} ${y}`;
}

function fillTemplate(tpl, map) {
  let out = tpl;
  for (const [key, val] of Object.entries(map)) {
    out = out.split(`{{${key}}}`).join(val ?? "");
  }
  return out;
}

function escAttr(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function stripTags(s) {
  return String(s).replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}

function slugify(s) {
  return stripTags(s)
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

// "6 Min" / "6 Min." / "6" -> "PT6M"
function isoDuration(readTime) {
  const m = String(readTime || "").match(/(\d+)/);
  return `PT${m ? m[1] : "5"}M`;
}

function wordCount(bodyHtml) {
  const text = bodyHtml.replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length;
}

/**
 * Injiziert id-Attribute in alle <h2> des Body-Fragments (für Ankerlinks) und
 * liefert die Überschriftenliste für das Inhaltsverzeichnis zurück.
 */
function processHeadings(bodyHtml) {
  const headings = [];
  const used = new Set();
  const out = bodyHtml.replace(/<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/gi, (full, attrs = "", inner) => {
    const existing = attrs && attrs.match(/\bid="([^"]+)"/i);
    let id = existing ? existing[1] : slugify(inner) || "abschnitt";
    let base = id, n = 2;
    while (used.has(id)) id = `${base}-${n++}`;
    used.add(id);
    headings.push({ id, text: stripTags(inner) });
    const cleanAttrs = (attrs || "").replace(/\s*\bid="[^"]*"/i, "");
    return `<h2 id="${id}"${cleanAttrs}>${inner}</h2>`;
  });
  return { html: out, headings };
}

function renderTldr(keyTakeaways) {
  if (!keyTakeaways || !keyTakeaways.length) return "";
  const items = keyTakeaways.map((t) => `      <li>${t}</li>`).join("\n");
  return (
    `<div class="tldr">\n` +
    `  <div class="tldr-inner">\n` +
    `    <p class="tldr-title">Das Wichtigste in Kürze</p>\n` +
    `    <ul>\n${items}\n    </ul>\n` +
    `  </div>\n` +
    `</div>`
  );
}

function renderToc(headings) {
  if (headings.length < 3) return "";
  const items = headings
    .map((h) => `      <li><a href="#${h.id}">${h.text}</a></li>`)
    .join("\n");
  return (
    `<nav class="toc" aria-label="Inhalt">\n` +
    `  <div class="toc-inner">\n` +
    `    <p class="toc-title">Inhalt</p>\n` +
    `    <ol>\n${items}\n    </ol>\n` +
    `  </div>\n` +
    `</nav>`
  );
}

function renderUpdatedLine(post) {
  if (!post.dateModified || post.dateModified === post.date) return "";
  return `<span>Aktualisiert am ${humanDate(post.dateModified)}</span>`;
}

function renderOgArticleTags(tags) {
  return (tags || [])
    .map((t) => `<meta property="article:tag" content="${escAttr(t)}">`)
    .join("\n");
}

function renderFaqHtml(faq) {
  if (!faq || !faq.length) return "";
  const items = faq.map(
    (f) => `  <div class="faq-item">\n    <h3>${f.q}</h3>\n    <p>${f.a}</p>\n  </div>`
  ).join("\n");
  return `<div class="faq">\n  <h2>Häufige Fragen</h2>\n${items}\n</div>`;
}

function renderFaqSchema(faq) {
  if (!faq || !faq.length) return "";
  const mainEntity = faq.map((f) => ({
    "@type": "Question",
    "name": stripTags(f.q),
    "acceptedAnswer": { "@type": "Answer", "text": stripTags(f.a) },
  }));
  const json = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": mainEntity };
  return `<script type="application/ld+json">\n${JSON.stringify(json, null, 2)}\n</script>`;
}

function renderArticleSchema(post, url, bodyHtml) {
  const person = { "@type": "Person", "@id": SITE + "/#person", "name": "Niclas Koch", "url": SITE + "/" };
  const json = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url + "#article",
    "headline": post.title,
    "description": post.description,
    "url": url,
    "datePublished": post.date,
    "dateModified": post.dateModified || post.date,
    "inLanguage": "de-DE",
    "isAccessibleForFree": true,
    "articleSection": (post.tags && post.tags[0]) || "Webdesign",
    "keywords": (post.tags || []).join(", "),
    "wordCount": wordCount(bodyHtml),
    "timeRequired": isoDuration(post.readTime),
    "author": person,
    "publisher": {
      ...person,
      "logo": { "@type": "ImageObject", "url": SITE + "/img/favicon/favicon-512x512.png", "width": 512, "height": 512 },
    },
    "isPartOf": { "@type": "Blog", "@id": SITE + "/blog/#blog", "name": "Niclas Koch — Webdesign Blog", "url": SITE + "/blog/" },
    "mainEntityOfPage": { "@type": "WebPage", "@id": url },
    "image": post.image || DEFAULT_OG_IMAGE,
  };
  return `<script type="application/ld+json">\n${JSON.stringify(json, null, 2)}\n</script>`;
}

function renderBreadcrumbSchema(post, url) {
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Start", "item": SITE + "/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": SITE + "/blog/" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": url },
    ],
  };
  return `<script type="application/ld+json">\n${JSON.stringify(json, null, 2)}\n</script>`;
}

function renderBlogIndexSchema(posts) {
  const person = { "@type": "Person", "@id": SITE + "/#person", "name": "Niclas Koch", "url": SITE + "/" };
  const json = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": SITE + "/blog/#blog",
    "name": "Niclas Koch — Webdesign Blog",
    "url": SITE + "/blog/",
    "description":
      "Praxisnahe Tipps zu günstigem Webdesign, Website-Kosten und Online-Präsenz für kleine Unternehmen, Tattoo-Studios, Cannabis Social Clubs und Künstler.",
    "inLanguage": "de-DE",
    "author": person,
    "publisher": person,
    "blogPost": posts.map((p) => ({
      "@type": "BlogPosting",
      "headline": p.title,
      "url": `${SITE}/blog/posts/${p.slug}.html`,
      "datePublished": p.date,
      "dateModified": p.dateModified || p.date,
    })),
  };
  return `<script type="application/ld+json">\n${JSON.stringify(json, null, 2)}\n</script>`;
}

function validatePost(post) {
  const missing = [];
  for (const f of ["slug", "title", "description", "date", "readTime", "standfirst"]) {
    if (!post[f]) missing.push(f);
  }
  if (!post.tags || !post.tags.length) missing.push("tags");
  if (!post.keyTakeaways || !post.keyTakeaways.length) missing.push("keyTakeaways");
  if (!post.faq || post.faq.length < 3) missing.push("faq (mind. 3)");
  if (missing.length) {
    console.warn(`WARNUNG [${post.slug || "?"}]: fehlende/zu dünne Felder — ${missing.join(", ")}`);
  }
}

function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_JSON, "utf-8"));
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const cards = [];
  const sitemapUrls = [];

  posts.forEach((post) => {
    validatePost(post);
    const url = `${SITE}/blog/posts/${post.slug}.html`;
    const bodyPath = path.join(CONTENT_DIR, `${post.slug}.html`);
    if (!fs.existsSync(bodyPath)) {
      console.warn(`WARNUNG: Kein Body-Fragment für "${post.slug}" (erwartet: blog/content/${post.slug}.html) — übersprungen.`);
      return;
    }
    const rawBody = fs.readFileSync(bodyPath, "utf-8");
    const { html: body, headings } = processHeadings(rawBody);

    const related = posts
      .filter((p) => p.slug !== post.slug)
      .slice(0, 3)
      .map(
        (p) =>
          `<a class="post-card" href="/blog/posts/${p.slug}.html">\n` +
          `        <div class="post-meta"><span>${humanDate(p.date)}</span></div>\n` +
          `        <h3>${p.title}</h3>\n` +
          `        <p>${p.description}</p>\n` +
          `      </a>`
      )
      .join("\n      ");

    const html = fillTemplate(ARTICLE_TEMPLATE, {
      TITLE: post.metaTitle || post.title,
      TITLE_SHORT: post.title,
      H1: post.title,
      KICKER: (post.tags && post.tags[0]) || "Webdesign",
      STANDFIRST: post.standfirst || post.description,
      META_DESCRIPTION: post.description,
      CANONICAL_URL: url,
      OG_IMAGE: post.image || DEFAULT_OG_IMAGE,
      OG_IMAGE_ALT: post.imageAlt || DEFAULT_OG_IMAGE_ALT,
      OG_ARTICLE_TAGS: renderOgArticleTags(post.tags),
      PUBLISH_DATE: post.date,
      MODIFIED_DATE: post.dateModified || post.date,
      PUBLISH_DATE_HUMAN: humanDate(post.date),
      UPDATED_LINE: renderUpdatedLine(post),
      ARTICLE_SECTION: (post.tags && post.tags[0]) || "Webdesign",
      READ_TIME: post.readTime || "5 Min",
      TLDR_HTML: renderTldr(post.keyTakeaways),
      TOC_HTML: renderToc(headings),
      ARTICLE_BODY: body,
      FAQ_HTML: renderFaqHtml(post.faq),
      ARTICLE_SCHEMA_JSON: renderArticleSchema(post, url, body),
      BREADCRUMB_SCHEMA_JSON: renderBreadcrumbSchema(post, url),
      FAQ_SCHEMA_JSON: renderFaqSchema(post.faq),
      RELATED_POSTS_HTML: related,
    });

    fs.writeFileSync(path.join(OUT_DIR, `${post.slug}.html`), html, "utf-8");

    cards.push(
      `  <a class="post-card" href="/blog/posts/${post.slug}.html">\n` +
      `    <div class="post-meta"><span>${humanDate(post.date)}</span><span>${post.readTime || "5 Min"} Lesezeit</span></div>\n` +
      `    <h2>${post.title}</h2>\n` +
      `    <p>${post.description}</p>\n` +
      `    <div style="margin-top:12px;">${(post.tags || []).map((t) => `<span class="tag-pill">${t}</span>`).join(" ")}</div>\n` +
      `  </a>`
    );

    sitemapUrls.push({ loc: url, lastmod: post.dateModified || post.date, changefreq: "yearly", priority: "0.7" });
  });

  const indexHtml = fillTemplate(INDEX_TEMPLATE, {
    POST_CARDS: cards.join("\n\n"),
    BLOG_SCHEMA_JSON: renderBlogIndexSchema(posts),
  });
  fs.writeFileSync(path.join(BLOG_DIR, "index.html"), indexHtml, "utf-8");
  sitemapUrls.unshift({ loc: `${SITE}/blog/`, lastmod: posts[0] ? posts[0].date : "2026-08-30", changefreq: "weekly", priority: "0.9" });

  updateSitemap(sitemapUrls);

  console.log(`OK — ${posts.length} Artikel gebaut, blog/index.html + sitemap.xml aktualisiert.`);
}

function updateSitemap(blogUrls) {
  const sitemapPath = path.join(ROOT, "sitemap.xml");
  let xml = fs.readFileSync(sitemapPath, "utf-8");

  // Alles zwischen BLOG-START/BLOG-END Markern ersetzen (falls noch nicht vorhanden, Marker + Block vor </urlset> einfügen)
  const blockLines = blogUrls
    .map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`)
    .join("\n");
  const block = `<!-- BLOG-START (auto-generiert von build-blog.js, nicht von Hand editieren) -->\n${blockLines}\n<!-- BLOG-END -->`;

  if (xml.includes("<!-- BLOG-START")) {
    xml = xml.replace(/<!-- BLOG-START[\s\S]*?BLOG-END -->/, block);
  } else {
    xml = xml.replace("</urlset>", `${block}\n</urlset>`);
  }

  fs.writeFileSync(sitemapPath, xml, "utf-8");
}

main();
