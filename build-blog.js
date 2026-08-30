#!/usr/bin/env node
/**
 * build-blog.js — generiert /blog/posts/*.html + /blog/index.html + sitemap.xml
 * aus blog/posts.json (Metadaten) + blog/content/<slug>.html (Artikel-Body-Fragment).
 *
 * Quelle der Wahrheit: blog/posts.json. Body-HTML liegt separat in blog/content/,
 * damit posts.json klein/übersichtlich bleibt und Artikeltext direkt als HTML
 * editierbar ist (keine Escaping-Hölle in JSON).
 *
 * Aufruf: node build-blog.js
 * Idempotent — überschreibt blog/posts/*.html, blog/index.html und die
 * <url>-Einträge in sitemap.xml komplett bei jedem Lauf.
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
  return String(s).replace(/"/g, "&quot;");
}

function renderFaqHtml(faq) {
  if (!faq || !faq.length) return "";
  const items = faq.map(
    (f) => `  <div class="faq-item">\n    <h3>${f.q}</h3>\n    <p>${f.a}</p>\n  </div>`
  ).join("\n");
  return `<div class="faq">\n  <h2>Häufige Fragen</h2>\n${items}\n</div>`;
}

function renderFaqSchema(faq, url) {
  if (!faq || !faq.length) return "";
  const mainEntity = faq.map((f) => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a.replace(/<[^>]+>/g, "") },
  }));
  const json = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": mainEntity };
  return `<script type="application/ld+json">\n${JSON.stringify(json, null, 2)}\n</script>`;
}

function renderArticleSchema(post, url) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.date,
    "dateModified": post.dateModified || post.date,
    "author": { "@type": "Person", "name": "Niclas Koch", "url": SITE + "/" },
    "publisher": { "@type": "Person", "name": "Niclas Koch", "url": SITE + "/" },
    "mainEntityOfPage": { "@type": "WebPage", "@id": url },
    "image": post.image || SITE + "/img/nic.png",
  };
  return `<script type="application/ld+json">\n${JSON.stringify(json, null, 2)}\n</script>`;
}

function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_JSON, "utf-8"));
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const cards = [];
  const sitemapUrls = [];

  posts.forEach((post, i) => {
    const url = `${SITE}/blog/posts/${post.slug}.html`;
    const bodyPath = path.join(CONTENT_DIR, `${post.slug}.html`);
    if (!fs.existsSync(bodyPath)) {
      console.warn(`WARNUNG: Kein Body-Fragment gefunden für "${post.slug}" (erwartet: blog/content/${post.slug}.html) — übersprungen.`);
      return;
    }
    const body = fs.readFileSync(bodyPath, "utf-8");

    const related = posts
      .filter((p) => p.slug !== post.slug)
      .slice(0, 3)
      .map((p) => `<a class="post-card" href="/blog/posts/${p.slug}.html"><div class="post-meta">${humanDate(p.date)}</div><h2>${p.title}</h2></a>`)
      .join("\n    ");

    const tagsInline = (post.tags || []).join(" · ");

    const html = fillTemplate(ARTICLE_TEMPLATE, {
      TITLE: post.metaTitle || post.title,
      TITLE_SHORT: post.title,
      H1: post.title,
      META_DESCRIPTION: post.description,
      META_KEYWORDS: (post.tags || []).join(", "),
      CANONICAL_URL: url,
      OG_IMAGE: post.image || SITE + "/img/nic.png",
      PUBLISH_DATE: post.date,
      PUBLISH_DATE_HUMAN: humanDate(post.date),
      READ_TIME: post.readTime || "5 Min",
      TAGS_INLINE: tagsInline,
      ARTICLE_BODY: body,
      FAQ_HTML: renderFaqHtml(post.faq),
      ARTICLE_SCHEMA_JSON: renderArticleSchema(post, url),
      FAQ_SCHEMA_JSON: renderFaqSchema(post.faq, url),
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

  const indexHtml = fillTemplate(INDEX_TEMPLATE, { POST_CARDS: cards.join("\n\n") });
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
