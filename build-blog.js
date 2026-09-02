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
    "inLanguage": "de-DE",
    "isAccessibleForFree": true,
    "author": { "@type": "Person", "@id": SITE + "/#person", "name": "Niclas Koch", "url": SITE + "/" },
    "publisher": { "@type": "Person", "@id": SITE + "/#person", "name": "Niclas Koch", "url": SITE + "/" },
    "isPartOf": { "@type": "Blog", "@id": SITE + "/blog/#blog", "name": "Niclas Koch — Webdesign Blog", "url": SITE + "/blog/" },
    "mainEntityOfPage": { "@type": "WebPage", "@id": url },
    "image": post.image || SITE + "/img/nic.png",
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
  const json = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": SITE + "/blog/#blog",
    "name": "Niclas Koch — Webdesign Blog",
    "url": SITE + "/blog/",
    "description":
      "Praxisnahe Tipps zu günstigem Webdesign, Website-Kosten und Online-Präsenz für kleine Unternehmen, Tattoo-Studios, Cannabis Social Clubs und Künstler.",
    "inLanguage": "de-DE",
    "author": { "@type": "Person", "@id": SITE + "/#person", "name": "Niclas Koch", "url": SITE + "/" },
    "publisher": { "@type": "Person", "@id": SITE + "/#person", "name": "Niclas Koch", "url": SITE + "/" },
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
      BREADCRUMB_SCHEMA_JSON: renderBreadcrumbSchema(post, url),
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

  updateSitemap(sitemapUrls, posts);
  updateHomeTeaser(posts);

  console.log(`OK — ${posts.length} Artikel gebaut, blog/index.html + sitemap.xml + Startseiten-Teaser aktualisiert.`);
}

// Baut die "Aus dem Blog"-Karten auf der Startseite (index.html) zwischen den Markern
// BLOG-TEASER-CARDS-START / BLOG-TEASER-CARDS-END neu. Nimmt die 3 neuesten Beitraege.
function updateHomeTeaser(posts) {
  const indexPath = path.join(ROOT, "index.html");
  if (!fs.existsSync(indexPath)) {
    console.warn("WARNUNG: index.html nicht gefunden — Startseiten-Teaser übersprungen.");
    return;
  }
  let html = fs.readFileSync(indexPath, "utf-8");
  const startMarker = "<!-- BLOG-TEASER-CARDS-START";
  const endMarker = "<!-- BLOG-TEASER-CARDS-END -->";
  if (!html.includes(startMarker) || !html.includes(endMarker)) {
    console.warn("WARNUNG: BLOG-TEASER-Marker in index.html fehlen — Teaser übersprungen.");
    return;
  }

  const cards = posts
    .slice(0, 3)
    .map((p) => {
      const meta = `${humanDate(p.date)} · ${p.readTime || "5 Min"}`;
      return (
        `      <a href="/blog/posts/${p.slug}.html" style="display:block;padding:22px;border:1px solid var(--border);border-radius:14px;background:var(--glass);text-decoration:none;color:inherit;">\n` +
        `        <div style="font-family:'JetBrains Mono',monospace;font-size:12px;opacity:.6;">${meta}</div>\n` +
        `        <h3 style="margin:10px 0 8px;font-size:18px;line-height:1.3;">${p.title}</h3>\n` +
        `        <p style="margin:0;font-size:14px;opacity:.75;line-height:1.5;">${p.description}</p>\n` +
        `      </a>`
      );
    })
    .join("\n");

  const block =
    `<!-- BLOG-TEASER-CARDS-START (auto-generiert von build-blog.js aus blog/posts.json, nicht von Hand editieren) -->\n` +
    `${cards}\n` +
    `    ${endMarker}`;

  html = html.replace(
    /<!-- BLOG-TEASER-CARDS-START[\s\S]*?BLOG-TEASER-CARDS-END -->/,
    block
  );
  fs.writeFileSync(indexPath, html, "utf-8");
}

function updateSitemap(blogUrls, posts) {
  const sitemapPath = path.join(ROOT, "sitemap.xml");
  let xml = fs.readFileSync(sitemapPath, "utf-8");

  // Startseite: <lastmod> mitziehen — der "Aus dem Blog"-Teaser auf index.html
  // aendert sich mit jedem neuen Beitrag, also entspricht das Datum dem neuesten Post.
  if (posts && posts.length) {
    xml = xml.replace(
      /(<loc>https:\/\/nicworks\.de\/<\/loc>\s*<lastmod>)[^<]*(<\/lastmod>)/,
      `$1${posts[0].date}$2`
    );
  }

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
