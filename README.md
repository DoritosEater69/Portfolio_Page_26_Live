# Portfolio-Seite — Niclas Koch (live/)

## Status: EINGEFROREN seit 2026-08-19

Dieser Ordner enthält die öffentliche, SEO-indexierte Variante der Portfolio-Seite von
Niclas Koch. Er wird — wie `../bewerbung/` — seit dem 2026-08-19 **nicht mehr von Hand
bearbeitet**. Aktive Weiterentwicklung findet ausschließlich im Geschwister-Ordner
`../creative/` statt (eigenes Git-Repo `Portfolio_Page_26_Creative`, Details siehe dortiges
README).

## Was dieser Ordner ist

`live/` wurde historisch komplett automatisch aus `../bewerbung/` erzeugt, per
`node build-live.js` — dieses Build-Script liegt in `bewerbung/`, nicht hier. Der Ordner
selbst wurde nie manuell editiert, sondern bei jedem Lauf des Scripts vollständig neu
überschrieben.

**Unterschiede zur `bewerbung/`-Version, aus der er generiert wurde:**
- Kein Webprojekte-Slider und kein Fellbox-Grafikprojekt (ausgeblendet).
- `index, follow` statt `noindex, nofollow` (öffentlich indexierbar).
- Alle Domain-Referenzen auf `nicworks.de` statt `bewerbung.nicworks.de`.
- Kein Passwortschutz (im Gegensatz zu `bewerbung/`, das per `.htaccess` Basic Auth
  geschützt ist).

Vorgesehen für das Root-Verzeichnis von `nicworks.de`.

## Tech-Stack

Gleicher Ansatz wie `bewerbung/`: reines HTML, CSS und JavaScript in einer einzigen Datei,
kein Framework, kein Bundler. Innerhalb dieses Ordners selbst gibt es keinen eigenen
Build-Step — `live/` *ist* bereits das Build-Ergebnis von `build-live.js`.

## Git

Eigenes Repo, Origin `https://github.com/DoritosEater69/Portfolio_Page_26_Live.git`,
Branch `main`. Stand: bisher nur der initiale Commit.

## Weiterentwicklung

Seit dem 2026-08-19 nicht mehr aktiv. Alle neuen Änderungen an der Seite (Design, Inhalte,
Struktur) landen ab jetzt in `../creative/` — siehe `../creative/README.md` für den
aktuellen Stand, den vollständigen Hotfix-Verlauf und die offene Checkliste.

## Hotfix — 2026-08-26

Auf ausdrücklichen Wunsch als Ausnahme vom Freeze direkt in `live/` (nicht `creative/`)
umgesetzt, da es sich um einen live-relevanten rechtlichen/inhaltlichen Fix handelt:

- Datenschutzerklärung (`datenschutz.html`) ergänzt: **WhatsApp Business Chat**
  (wa.me-Link) und **hCaptcha** (Kontaktformular-Spamschutz) als eigene Abschnitte
  aufgenommen (neu: Abschnitt 5 & 6), nachfolgende Abschnitte auf 7–14 umnummeriert,
  Übersichtsliste in Abschnitt 2 entsprechend erweitert. Grund: Beide Dienste wurden von
  einem externen Scan auf nicworks.de als nicht in der Datenschutzerklärung aufgeführt
  gemeldet.
- Kontaktformular-Hinweistext in `index.html` geändert: weg von „...oder lass gern eine
  Bewertung meiner Seite da." hin zu „...erzähl mir kurz von deinem Projekt, oder frag
  einfach unverbindlich an." — Fokus weg von Feedback/Bewertung, hin zu Projektanfragen.

## Offene Punkte / To-Do

- [x] Favicon setzen
- [ ] SEO nochmal checken
- [ ] In Google Search Console eintragen
- [x] Analytics einrichten
- [ ] Textlich mehr Möglichkeiten schaffen, Projekte anzufragen
- [ ] Kontaktformular: Projektart abfragen (z. B. Radiobuttons), ggf. weitere Felder
      ergänzen
- [ ] GitHub-Secrets fuer Auto-Deploy in `Portfolio_Page_26_Live` anlegen: `STRATO_FTP_SERVER`,
      `STRATO_FTP_USERNAME`, `STRATO_FTP_PASSWORD` (optional `STRATO_FTP_SERVER_DIR`) - siehe
      `.github/workflows/deploy.yml` und Hotfix-Eintrag vom 2026-08-30
- [ ] Fine-grained GitHub PAT (nur Contents R/W auf dieses eine Repo) fuer den woechentlichen
      Blogpost-Trigger bereitstellen, damit der automatische Commit+Push tatsaechlich live geht
- [ ] Nach dem ersten Auto-Deploy pruefen: laden `/blog/` und `/blog/posts/*.html` korrekt auf
      nicworks.de (Fonts, CSS, Bilder, keine 404s)
## Hotfix — 2026-08-26 (2)

- WhatsApp-Kontaktlink (`wa.me/...`) komplett aus `index.html` entfernt (Social-Zeile
  jetzt nur noch LinkedIn). Passend dazu den zuvor ergänzten Datenschutz-Abschnitt
  "WhatsApp Business Chat" wieder aus `datenschutz.html` entfernt, Abschnitte 7–14
  zurück auf 6–13 nummeriert, WhatsApp-Bullet aus der Übersichtsliste (Abschnitt 2)
  entfernt.
- Kontaktformular-Hinweistext (`.hint`) geändert zu „Frag gern dein Projekt bei mir an
  und ich schreibe dir schnell ein Angebot! Falls du noch weitere Arbeitsproben
  brauchst - frag sie gerne an!" und zentriert (CSS: `text-align:center` auf `.hint`).
- Formular-Fußtext ergänzt um „keine Werbung" sowie um eine zweite Zeile mit
  DSGVO-Hinweis inkl. Link zur Datenschutzerklärung: „Mit dem Absenden stimmst du der
  Verarbeitung deiner Daten gemäß der Datenschutzerklärung zu."
## Hotfix — 2026-08-26 (3)

- Kontaktformular: 20px Abstand unter dem "Nachricht senden"-Button ergänzt
  (`margin-bottom:20px` auf `.contact-form button`), damit der Bereich zu den
  form-note-Zeilen darunter (Spam-Versprechen + DSGVO-Hinweis) mehr Luft hat.
## Hotfix — 2026-08-26 (4)

- Kontaktformular: neues Pflichtfeld "Art des Projekts" (Dropdown/`<select>`) direkt
  unter dem E-Mail-Feld ergänzt, Formspree-Feldname `project_type`. Optionen: Simple
  Seite (Onepager), Website mit Unterseiten, Shop, Printprodukte (Flyer, Poster..),
  Reparaturen an aktueller Seite, Auffrischen meiner Seite, Mailings / Mailing Systeme,
  Kleine Aufgaben (KI Lösungen, Grafiken...). CSS-Regeln für Input/Textarea (Basis-,
  Fokus- und Light-Theme-Styling) auf `select` erweitert, damit es optisch zu den
  anderen Feldern passt.
## Hotfix — 2026-08-26 (5)

- Kontaktformular-Hint: Zeilenumbruch (`<br>`) zwischen den beiden Sätzen ergänzt,
  damit "Falls du noch weitere Arbeitsproben brauchst..." in einer eigenen Zeile steht.
## Hotfix — 2026-08-26 (6)

- Kontaktformular: Abstand Button → Hinweistexte korrigiert. Vorheriges
  `margin-bottom:20px` am Button gestrichen (das stapelte sich mit dem
  `.contact-form`-Flex-`gap:12px` auf 32px). Stattdessen `margin-top:8px` auf die
  erste `.form-note`-Zeile gesetzt, sodass der Abstand jetzt exakt 20px beträgt
  (12px Gap + 8px Margin).
## Hotfix — 2026-08-26 (7)

- Favicon gesetzt: aus dem von Nic geschickten "N"-Logo (Amber auf Schwarz) `favicon.ico`
  (16/32/48px) sowie PNGs in 16, 32, 192, 512px und ein `apple-touch-icon.png` (180px)
  generiert. `favicon.ico` liegt im Root von `live/`, die PNGs in `img/`. Im `<head>` von
  `index.html` entsprechende `<link rel="icon">`-/`apple-touch-icon`-Tags direkt nach dem
  `theme-color`-Meta-Tag ergänzt (vorher gab es gar keine Favicon-Einbindung).
## Hotfix — 2026-08-26 (8)

- Google Analytics 4 (Property `G-VHTRVMJB0K`) eingebunden — deklarativ per Cookiebot
  (`type="text/plain" data-cookieconsent="statistics"`), lädt also erst nach Einwilligung
  in die Kategorie "Statistics", direkt nach dem Cookiebot-Script-Tag im `<head>`.
- CSP (`script-src`, `connect-src`, `img-src`) um `googletagmanager.com` /
  `google-analytics.com` erweitert, sonst hätte die CSP den Request geblockt.
- `datenschutz.html`: neuer Abschnitt 6 "Google Analytics (GA4)" (Anbieter, verarbeitete
  Daten, Rechtsgrundlage Art. 6 Abs. 1 lit. a DSGVO + § 25 Abs. 1 TDDSG, USA-Transfer via
  EU-U.S. Data Privacy Framework, Widerrufs-/Opt-out-Hinweis), Folgeabschnitte 7-13 auf
  7-14 verschoben, Übersichtsliste in Abschnitt 2 ergänzt.
- **Wichtig, bitte prüfen:** In der Cookiebot-Dashboard-Konfiguration (cbid
  `391e6db6-aa4c-4df2-bfc9-8490c4f85d94`) sicherstellen, dass die Kategorie "Statistics"
  im Banner sichtbar/aktiv ist und die GA4-Cookies (`_ga`, `_ga_*`) im Cookie-Declaration-Scan
  auftauchen — Cookiebot erkennt das i. d. R. automatisch beim nächsten Scan, eine manuelle
  Kontrolle schadet aber nicht. Außerdem in der GA4-Property selbst die
  Datenaufbewahrungsdauer (2 oder 14 Monate) setzen, falls noch nicht geschehen.
## Hotfix — 2026-08-26 (9)

- Google Consent Mode v2 eingebunden: neues, immer laufendes Script
  (`data-cookieconsent="ignore"`, also von Cookiebot nie geblockt) direkt nach dem
  Cookiebot-Tag, das VOR jeder Einwilligung alle Speicherkategorien auf "denied" setzt
  (ausser `security_storage`). Erst nach echter Zustimmung sendet ein neues
  `updateGaConsent()` (gehaengt an dieselben `CookiebotOnConsentReady`/`OnAccept`/
  `OnDecline`-Events, die auch hCaptcha/Adobe-XD triggern) ein
  `gtag("consent","update",{analytics_storage:...})` basierend auf
  `Cookiebot.consent.statistics`.
- Ohne das waere Google Analytics zwar weiterhin erst nach Einwilligung geladen worden
  (das war schon vorher korrekt so), aber ohne Consent-Mode-Standardwerte haette Google
  ab 2024 in der EWR ggf. weniger/keine (modellierten) Signale verarbeitet bzw. es waere
  nicht Googles empfohlener Standard fuer Consent-Mode-konforme Tag-Einbindung gewesen.

## Hotfix — 2026-08-26 (10)

- Bug gefunden und behoben: Das Consent-Mode-Default-Script aus Hotfix (9) stand im
  Quelltext NACH dem Cookiebot-Tag (`<script id="Cookiebot" src="...uc.js">`) statt davor.
  Google/Cookiebot verlangt ausdruecklich die umgekehrte Reihenfolge: das
  Default-Script MUSS vor dem CMP-Tag geladen werden, sonst kann Cookiebot (bei
  Wiederkehrenden Besuchern mit bereits gespeicherter Einwilligung) seine eigene
  Consent-Mode-Reaktion ausloesen, bevor unser `gtag("consent","default",...)` ueberhaupt
  gelaufen ist — das `dataLayer` bekommt dann zuerst ein `update` (alles "granted") und
  erst danach das `default` (alles "denied"), was die Spezifikation verletzt und exakt
  erklaert, warum externe Tools/Google das Consent-Mode-Setup nicht korrekt erkannt haben.
- Live via Chrome-Inspektion auf nicworks.de bestaetigt: in diesem Test-Browser lag noch
  ein alter `CookieConsent`-Cookie aus einer frueheren Sitzung, `window.dataLayer` zeigte
  das `update`-Event vor dem `default`-Event.
- Fix: Reihenfolge im `<head>` getauscht — Default-Script steht jetzt als erstes Script
  direkt nach `<meta charset="UTF-8">`, der Cookiebot-Tag folgt danach.
- WICHTIG: Diese Datei muss erneut per SFTP hochgeladen werden, der vorherige Upload
  (Hotfix 9) hatte noch die falsche Reihenfolge.

## Hotfix — 2026-08-26 (11)

- Leere H3 gefunden und behoben: `<h3 id="project-modal-title"></h3>` im Projekt-Modal
  war im HTML-Quelltext leer und wurde erst per JS (`projectModalTitle.textContent = t.title`)
  beim Oeffnen eines Projekts befuellt. Fuer SEO-/Accessibility-Crawler, die das Modal nie
  oeffnen, ist das eine leere Ueberschrift im DOM.
- Fix: sinnvoller statischer Default-Text "Projektdetails" eingesetzt. Rein optisch aendert
  sich nichts (Modal bleibt bis zum Oeffnen unsichtbar, JS ueberschreibt den Text beim
  Oeffnen exakt wie vorher mit dem jeweiligen Projekttitel).

## Hotfix — 2026-08-26 (12)

- Seobility-Check gemeldet: "www." und nicht-"www." werden nicht einheitlich
  weitergeleitet (Duplicate-Content-Risiko). www.nicworks.de lieferte die Seite bisher
  direkt aus, statt auf die kanonische Domain (https://nicworks.de/ - siehe
  canonical-Tag, og:url, sitemap.xml) umzuleiten.
- Fix in `.htaccess`: neue RewriteCond/RewriteRule leitet `www.nicworks.de` (egal ob
  http oder https) in einem einzigen 301-Redirect direkt auf `https://nicworks.de/`
  weiter - kein doppelter Redirect-Hop. Die bestehende http->https-Regel bleibt
  danach als zweite Stufe fuer den Fall ohne "www." erhalten.
- WICHTIG: `.htaccess` muss zusaetzlich zu `index.html` per SFTP neu hochgeladen werden
  (im Root-Verzeichnis, versteckte Datei - im FTP-Client ggf. "versteckte Dateien
  anzeigen" aktivieren).

## Hotfix — 2026-08-26 (13)

- Sicherheits-Review auf Wunsch durchgefuehrt (moegliche Angriffsflaechen geprueft):
  eval/document.write, innerHTML-Quellen, reflektierte URL-Parameter, postMessage,
  offene Redirects im Kontaktformular, fehlendes rel="noopener", Live-Check der
  Security-Header (CSP/X-Frame-Options/HSTS/etc. - alle korrekt gesetzt und aktiv),
  Zugriffsschutz auf .env/.git/.htaccess/README.md/*.zip (alle korrekt mit 403
  gesperrt).
- Fund: `.DS_Store` war unter https://nicworks.de/.DS_Store oeffentlich abrufbar
  (200 statt gesperrt) - macOS-Metadatendatei, kann Datei-/Ordnernamen preisgeben.
- Fix: generelle `<FilesMatch "^\.">`-Regel in `.htaccess` ergaenzt, die ALLE
  Dotfiles sperrt (deckt .DS_Store und kuenftige aehnliche Faelle ab, nicht nur
  Einzelfaelle).
- Kein Fund (bereits sauber): keine harten Sicherheitsluecken in Formular/JS/CSP
  gefunden. Kleinere, nicht kritische Beobachtungen siehe Chat: Server-Header
  verraet Server-Version (meist nur ueber Hosting-Panel aenderbar, nicht per
  .htaccess), Adobe-XD-iframe ohne sandbox-Attribut (bewusst offen gelassen, da
  Aenderung das interaktive Prototyp-Embed brechen koennte - CSP frame-src ist
  bereits auf xd.adobe.com beschraenkt).

## Hotfix — 2026-08-26 (14)

- Vita-Zeitleiste aktualisiert: Hylax-Zeitraum von "seit 10.2021" auf "10.2021 - 04.2023"
  praezisiert, Fellbox-Eintrag von "seit 10.2021" (Tippfehler/Dublette) auf
  "04.2023 - 04.2024" korrigiert und Titel zu "Wechsel zu Fellbox - Web- und
  Grafikdesign" erweitert. Neuer Eintrag ergaenzt: "seit 08.2024 - Web- und
  Grafikdesigner bei formwandler interactive".

## Hotfix — 2026-08-26 (15)

- Illustration "inline-027.webp" (Rauch-/Wolken-Tattoo-Motiv) komplett aus dem
  Illustrations-Slider (GALLERY_IMAGES) entfernt, wie von Nic per Screenshot gezeigt.
  Bilddatei selbst bleibt im img/inline/ Ordner liegen, nur aus dem Array entfernt.
- Beide Galerie-Slider (GALLERY_IMAGES = Illustrationen, GALLERY_IMAGES_PHOTOS = Fotos)
  waren bisher stur numerisch sortiert (002, 003, 004...) - jetzt gemischt, damit die
  Reihenfolge beim Scrollen abwechslungsreicher wirkt.


## Hotfix — 2026-08-30

Groesseres Feature-Update auf Nics ausdruecklichen Wunsch direkt in `live/` umgesetzt
(Ausnahme vom creative/live-Freeze, wie schon am 2026-08-26 - SEO-/Content-Aenderung an der
tatsaechlich oeffentlichen Seite, kein Routine-Redesign):

- **Keyword-/Positionierungs-Umbau:** Title, Meta-Description, Meta-Keywords, OG/Twitter-Tags
  und JSON-LD (`description`, `knowsAbout`) von "Webdesigner Duesseldorf" auf "Guenstiges
  Webdesign" umgestellt, mit Fokus auf kleine/mittlere Unternehmen UND explizit die Nischen
  Tattoo-Studios, Cannabis Social Clubs und Kuenstler (Nics Wunsch, weniger Konkurrenz als
  breite KMU-Keywords). Preis-Anker "ab 490€" in Meta-Description, OG/Twitter-Description,
  Hero-Text (`hero-light-text`), Psst-Headline (`-Digital Designer-` -> `-guenstiges
  Webdesign-`) und im Kontaktformular-Hint ergaenzt.
- **Neues Blog-System unter `/blog/`:** komplett eigenstaendig vom riesigen Inline-`<style>`
  der Startseite (`blog/style.css`, referenziert dieselben Farb-/Font-Tokens: `--bg`,
  `--amber`, `--paper`, Assignate/Inter/JetBrains Mono). Architektur bewusst
  daten-/template-getrieben (analog zum bestehenden `build-live.js`-Muster), damit
  woechentliche neue Artikel *token-guenstig* generierbar sind, ohne jedes Mal
  Boilerplate-HTML neu zu schreiben:
  - `blog/posts.json` — Metadaten aller Artikel (Titel, Beschreibung, Datum, Tags, FAQ)
  - `blog/content/<slug>.html` — reines Artikel-Body-HTML pro Artikel
  - `blog/_template.html` / `blog/_index_template.html` — Platzhalter-Templates
  - `build-blog.js` — liest `posts.json` + `content/`, generiert `blog/posts/<slug>.html`
    (inkl. Article- + FAQPage-JSON-LD-Schema fuer AI-Overviews/Google), `blog/index.html`
    und den `<!-- BLOG-START -->...<!-- BLOG-END -->`-Block in `sitemap.xml` — komplett
    ueberschreibend, idempotent. Aufruf: `node build-blog.js` (Node 22 lokal getestet).
  - 3 Seed-Artikel veroeffentlicht (rueckdatiert 08/16, 08/23, 08/30 fuer eine plausible
    Cadence): "Guenstiges Webdesign fuer kleine Unternehmen: Worauf es 2026 wirklich
    ankommt", "Website fuer dein Tattoo-Studio: Was sie kosten sollte", "Website fuer
    Cannabis Social Clubs in Deutschland: Was 2026 wichtig ist" (mit Rechtsberatungs-Disclaimer,
    keine eigene Rechtsauskunft).
  - "Blog"-Link in Side-Nav + Mobile-Nav ergaenzt (`/blog/`).
  - `.htaccess`: `build-blog.js` zur gesperrten Dateiliste hinzugefuegt, neue Regel sperrt
    `posts.json`/`_template.html`/`_index_template.html` vor direktem oeffentlichen Zugriff
    (nur die generierten Seiten unter `/blog/` und `/blog/posts/` sind fuer Crawler gedacht).
- **Auto-Deploy vorbereitet:** `.github/workflows/deploy.yml` deployed bei jedem Push auf
  `main` automatisch per FTPS (SamKirkland/FTP-Deploy-Action) auf den Strato-Webspace.
  Braucht noch 3 GitHub-Secrets (Strato-FTP-Zugangsdaten), die Nic selbst in den
  Repo-Settings anlegt — Claude sieht diese Zugangsdaten nie. Siehe "Offene Punkte" oben.
- **Woechentlicher Blogpost-Trigger:** noch NICHT eingerichtet — braucht einen von Nic
  bereitgestellten, fein-scoped GitHub PAT (nur `Portfolio_Page_26_Live`, Contents R/W),
  damit die automatische Session wirklich pushen kann (der lokale device_bash-Sandbox hat
  laut [[feedback_portfolio_autocommit]] keine Git-Credentials). Sobald der PAT vorliegt,
  wird der Trigger als eigener Schritt nachgezogen.

---

## Hotfix — 2026-09-02

SEO-Ausbau + Blog-Template + Bugfix, direkt in `live/` auf Nics Wunsch (Branch
`seo/strukturierte-daten-und-verlinkung`, von Nic manuell gepusht). Ab jetzt: jede
Aenderung in `live/` wird sofort committet (beschreibende Message) und hier als Hotfix
protokolliert.

- **Strukturierte Daten (Startseite):** JSON-LD auf `@graph` umgestellt — `Person` (mit
  fester `@id` `#person`) + `WebSite` + `ProfessionalService` (`priceRange` "ab 490 €",
  `Offer`, `areaServed`, `serviceType`). `og:image`/`twitter:image` auf absolute URLs,
  `og:site_name` + `og:image:alt` ergaenzt. sr-only-H1 auf Kernthema statt "All-Rounder".
  `robots` um `max-image-preview:large`/`max-snippet:-1` erweitert. Ungenutztes
  `<meta name="keywords">` entfernt (auch Blog-Index).
- **Blog-Schema:** `Article` -> `BlogPosting` mit `@id`, `wordCount`, `timeRequired`,
  `articleSection`, `keywords`, `publisher.logo`, `inLanguage`, `isPartOf`, `isAccessibleForFree`;
  `author`/`publisher` referenzieren `#person`. Neu: `BreadcrumbList`-JSON-LD pro Beitrag,
  generiertes `Blog`-Index-Schema mit `blogPost`-Liste.
- **Beitrags-Template komplett ausgebaut** (`blog/_template.html`, jeder Beitrag 1:1 gleich):
  Breadcrumb + Kicker + H1 + Standfirst + Meta-Zeile (Byline, Datum, opt. "Aktualisiert",
  Lesezeit), "Das Wichtigste in Kuerze"-Box (`keyTakeaways`), automatisches
  Inhaltsverzeichnis aus `<h2>` (ab 3 Ueberschriften, `build-blog.js` injiziert id-Slugs),
  FAQ, CTA "Lass uns zusammen etwas gestalten" -> Kontaktformular, Autoren-Box (E-E-A-T),
  "Weiterlesen". `posts.json` um `standfirst` + `keyTakeaways` pro Beitrag erweitert;
  `build-blog.js` um `processHeadings`/`renderTldr`/`renderToc`/`validatePost` +
  erweiterte Schema-Renderer ergaenzt.
- **Neuer Beitrag:** "Tattoo-Studio: Reicht Instagram — oder braucht ihr eine Website?"
  (Roadmap-Thema Nr. 2; Nr. 1 "Kosten/ab 490€" ist bereits durch
  `website-fuer-tattoo-studio-kosten` abgedeckt, daher Nr. 2 gegen Kannibalisierung).
- **Startseite <-> Blog:** neuer Abschnitt `#blog-teaser` mit 3 neuesten Beitraegen als
  Cards, generiert von `build-blog.js` (`updateHomeTeaser`, Marker-Block). Card-Style im
  Inline-`<style>` aus den Seiten-Tokens abgeleitet (`--glass`/`--border`, Assignate-Titel,
  JetBrains-Mono-Meta, Amber-Hover), Grid `auto-fit minmax(260px,1fr)` -> 3-spaltig
  Desktop. Darunter Textlinks "Alle Beitraege" + "Zusammen gestalten" (Kontaktformular).
- **404-Seite** (`404.html`, `noindex`, gebrandet) + `ErrorDocument 404` in `.htaccess`.
- **Bugfix "man kann nicht mehr scrollen":** `sideNavLinks.map(e => document.querySelector(
  e.getAttribute("href")))` warf `SyntaxError: '/blog/' is not a valid selector`, seit die
  Side-Nav den `/blog/`-Link hat (Hotfix 2026-08-30). Der Fehler brach das komplette
  Inline-Script ab -> `requestAnimationFrame(raf)` lief nie -> Custom-Scroll (Mausrad/
  Trackpad) tot. Fix: nur noch `#`-Hrefs werden aufgeloest, sonst `null`. Ausserdem
  Psst-Headline `-guenstiges Webdesign-` -> `guenstiges Webdesign` (Bindestriche raus).

### Hotfix — 2026-09-02 (2): OG-Image war ein toter Link

- `og:image` / `twitter:image` / JSON-LD-`image` zeigten ueberall auf
  `https://nicworks.de/img/nic.png` — **diese Datei existiert nicht** (im Repo liegt nur
  `img/nic.webp` 862x1186 + responsive Varianten). Bestand seit dem ersten OG-Setup, d.h.
  Social-Previews (Facebook/LinkedIn/Slack/WhatsApp) hatten nie ein Bild.
- Fix: alle Referenzen auf `img/nic.webp` umgestellt (Startseite, Blog-Index, Beitrags-
  Template, `build-blog.js`-Default + Article-Schema). WebP wird von allen relevanten
  Plattformen als OG-Bild gerendert.
- Ergaenzt: `og:image:type` (`image/webp`), `og:image:width` (862), `og:image:height`
  (1186), `og:image:alt` — auf Startseite, Blog-Index und pro Beitrag (Beitrags-Template
  ueber neue Platzhalter, `build-blog.js` leitet Typ aus der Endung ab; `post.image` /
  `post.imageWidth` / `post.imageHeight` uebersteuern pro Beitrag).
- `sitemap.xml`: `<lastmod>` der Startseite auf 2026-09-02 (heutiges Update).

## Hotfix — 2026-09-03: Blog-Design komplett aus nicworks.de abgeleitet + Beitragsbilder

- **`blog/style.css` neu**, 1:1 aus dem Design der Startseite abgeleitet: volle Token-Palette
  (`--bg`/`--amber`/`--glass`/`--border`/`--glow` …), `--fs-scale` fuer Skalierung, echte
  `@font-face` (Assignate / Fraunces / Roboto / JetBrains Mono / Inter), Body mit demselben
  Radial-Gradient-Hintergrund, `h1,h2,h3` in Assignate/Fraunces, `.eyebrow`/Kicker in
  JetBrains-Mono-Amber, Glass-Cards mit `backdrop-filter:blur(20px) saturate(150%)` +
  `box-shadow ... calc(.35*var(--shadow-a))` (wie `.glass`/`.pain-tile`), `.reveal`-Motion
  mit identischer Kurve, weichgezeichnete `.bg-orb`-Farbkugeln (wie `.bg-dot`).
- **Light/Dark:** volles Token-Set fuer Light-Mode, greift automatisch per
  `prefers-color-scheme` **und** ueber einen Theme-Toggle im Blog-Header (persistiert in
  `localStorage['nk-theme']`, No-Flash-Script im `<head>`). `.reveal` hat `<noscript>`-
  Fallback + 2,5-s-Timeout, damit Inhalt auch ohne/vor JS sichtbar ist.
- **Beitragsbild (Hero) pro Artikel:** `<figure>` mit `width`/`height`, `fetchpriority="high"`,
  eigener Alt-Text; speist zugleich `og:image` + Twitter + `Article`-Schema (`ImageObject`
  mit Dimensionen). `build-blog.js` erzeugt automatisch einen gebrandeten **SVG-Platzhalter**
  `blog/img/<slug>-hero.svg` (1200x630), bis Nic echte Fotos liefert. Echtes Bild: Datei
  nach `blog/img/` legen + `image` (+ optional `imageWidth`/`imageHeight`/`imageAlt`/
  `imageCaption`) in `posts.json` setzen — **JPG/WebP, nicht SVG** (Social-Scraper mögen
  kein SVG-`og:image`).
- **Bild-Sitemap:** `xmlns:image` am `<urlset>`, `<image:image>` pro Blog-URL mit
  `image:loc` + `image:title` (`build-blog.js`).
- Index- und "Weiterlesen"-Cards zeigen jetzt Thumbnails; Card-Style als Glass-Card
  (`.post-thumb`, `aspect-ratio 16/9`).
- Reihenfolge fix in `heroFor()`: `<img src>` root-relativ (`/blog/img/...`), OG/Schema/
  Sitemap absolut (`https://nicworks.de/...`).

### Hotfix — 2026-09-03 (2): Beiträge ausgearbeitet + Topic-Cluster-Verlinkung

- Alle 4 Beiträge von ~400 auf 510–770 Wörter reinen Body erweitert: klare H2/H3-
  Struktur, Vergleichstabellen (Kosten, Umfang), je 1–2 In-Content-`<figure>`.
- **Interne Verlinkung (Topic-Cluster):** `guenstiges-webdesign-kleine-unternehmen-2026`
  ist der Hub und verlinkt per `.cluster-nav`-Box alle 3 Nischen-Beiträge; jeder
  Nischen-Beitrag verlinkt kontextuell zurück auf den Hub und auf den passenden
  Schwester-Beitrag (Tattoo-Kosten ↔ Tattoo-Instagram). Plus die automatische
  „Weiterlesen"-Sektion — macht 3 verlinkte Beiträge pro Seite.
- In-Content-Bilder: `build-blog.js` `ensureBodyPlaceholders()` scannt den Body nach
  `<img src="/blog/img/*.svg">` und erzeugt für jede fehlende Datei einen beschrifteten
  Platzhalter (Label = alt-Text). Nic ersetzt die `.svg` durch echte Fotos (JPG/WebP).
- `posts.json`: `readTime` an die Länge angepasst (7–8 Min), `dateModified` = 2026-09-03
  → erscheint als „Aktualisiert am …" + im `Article`-Schema.
- CSS: SVG-Platzhalter bekommen `border-style:dashed` (klar als Bild-Slot erkennbar).

## Hotfix — 2026-09-10 (2): Galerie-Reihen mit Maus greifbar (Illustration + Fotos)

- Die zwei Galerie-Reihen unter „Design, Fotografie & Illustration" (`#gallery-row-1`
  Illustrationen, `#gallery-row-2` Fotos) waren auf `≤900px` ein reiner
  `overflow-x:auto`-Scroller: **per Touch** wischbar, **mit der Maus** aber gar nicht (nur
  über die dünne Scrollbar). Der bestehende `makeGalleryRowDrag` (Klick-Ziehen) hängt sich
  nur bei `innerWidth>900` ein und zieht dort das Marquee-`transform`.
- Neu: `makeGalleryRowScroll(el)` — spiegelt das Event-Modell von `makeGalleryRowDrag`
  (nur `pointerType==="mouse"`, Schwelle 6px, `pointermove`/`up` am `window`, `dragstart`
  unterdrückt), manipuliert aber `el.scrollLeft` statt eines Transforms. `cursor` inline
  `grab`/`grabbing`. Setzt `galleryDragged` wie gehabt, damit ein Drag nicht als
  Item-Klick die Lightbox öffnet. Wird bei `innerWidth<=900` an beide Reihen gehängt
  (Touch bleibt unberührt, da der `pointerdown`-Filter Nicht-Maus-Pointer ignoriert).
- Smoke-Test im Browser: synthetischer Maus-Drag über einer Reihe schiebt `scrollLeft`
  0 → 200, Cursor fällt nach `pointerup` auf `grab` zurück. `node --check` sauber.

## Hotfix — 2026-09-10: Mission-&-Zielgruppe zweispaltig + Vita auf Tablet wie Mobile

- **Mission & Zielgruppe** (`#proteinup-info` → `.pu-mission-rows`): die zwei Kacheln stehen
  auf Desktop/Tablet jetzt **nebeneinander, 50 %/50 %** (`.pu-mission-rows` von
  `flex-direction:column` auf `display:grid; grid-template-columns:1fr 1fr; gap:24px`
  umgestellt). Beide Kacheln sind **linksbündig** — die „Zielgruppe"-Kachel hatte
  `.pu-mission-row.reverse{flex-direction:row-reverse; text-align:right}` (Icon rechts, Text
  rechtsbündig); das ist auf `flex-direction:row; text-align:left` neutralisiert, sodass
  beide Kacheln identisch aufgebaut sind (Icon links, Text linksbündig). `align-items` der
  Kachel von `center` auf `flex-start`, Icon-Gap 28→22px.
- **Mobile (`≤760px`):** `.pu-mission-rows{grid-template-columns:1fr}` → beide Kacheln wieder
  **untereinander, 100 %** (in den bestehenden `@media (max-width:760px)`-Block gehängt, wo
  auch `.pp-row` einspaltig wird). Die `≤560px`-Feinheiten (Icon oben, zentriert) bleiben
  unverändert.
- **Vita-Zeitleiste auf Tablet:** der Bereich lief zwischen 701–900 px kaputt (Linie im
  Zickzack mit Ankern bei 30 %/70 %, Inhalt aber schon volle Breite linksbündig, Dots bei
  30 %/70 %). Der „Mobile"-Modus der Zeitleiste galt bisher nur bis `≤700px`, die
  Ignite-/Scroll-Progress-Logik dagegen schon ab `≤900px` — genau dieser Mismatch war der
  Bug. Jetzt überall `≤900px`:
  - CSS-Block `@media (max-width:700px)` mit den `.zz-*`-Regeln (Ignite-Hint aus, Inhalt
    `width:calc(100% - 46px)` linksbündig, Dots `left:14px`) → `@media (max-width:900px)`.
  - `buildZigzagPath()`: `const t = window.innerWidth <= 700` → `<= 900` (setzt alle
    Pfad-/Dot-X-Anker auf 14 px = gerade Linie links statt Zickzack).
  - Scroll-Reveal der Einträge: `d = window.innerWidth <= 700 || "zz-left" === o ? 1 : -1`
    → `<= 900` (alle Einträge sliden von links ein statt gespiegelt).
  - `rebuildZigzagPath()` nutzte `≤900` bereits — jetzt sind alle vier Stellen konsistent.
- Verifiziert: Desktop (1920 px) misst `.pu-mission-rows` als Grid 2×463 px, beide Kacheln
  linksbündig (Icon links, `h5` `text-align:left`), gleiche Höhe. `node --check` auf dem
  Inline-Script sauber.

---

## Hotfix — 2026-09-12: Blog-Überschriften ohne Sonderschrift + Nav 1:1 von der Startseite

- **Überschriften (`blog/style.css`):** die globale Basisregel `h1,h2,h3,h4{font-family:
  Assignate,Fraunces,serif}` lief auf Artikel-H1, In-Body-H2/H3, CTA-`h3`, „Häufige Fragen"-
  `h2` sowie die Post-Card-`h2`/`h3` (Blog-Index + „Weiterlesen") — überall dieselbe
  Editorial-Serife. Feedback Nic: „nicht die special Schrift, nimm die aus den Eyebrows."
  Umgestellt auf `'JetBrains Mono',monospace` (identisch zu `.eyebrow`/`.article-kicker`).
  Bewusst unangetastet, weil keine `<h1>`–`<h4>`: `.article-standfirst` (Lead-Absatz),
  `.article-body blockquote` (Zitat) — beide bleiben Fraunces, das sind keine Überschriften.
- **Nav (`.blog-nav`):** 1:1 die Typografie/Farb-/Hover-/Active-Zustände von `.side-nav-item`
  der Startseite übernommen (JetBrains Mono, `font-weight:300`, 10.5px, `letter-spacing:.09em`,
  `text-dim` → bei Hover `padding-left:8px` + hellere Farbe, aktive Seite amber mit
  `text-shadow:0 0 10px var(--glow)`) — Menüpunkte (Start/Blog/Kontakt) unverändert. Bewusst
  **nicht** übernommen: die `position:fixed; bottom:20px`-Pille der Startseite — die passt zur
  langen Single-Scroll-Seite dort, nicht zur klassischen Sticky-Top-Header-Struktur der
  Blog-Seiten (kurze Einzelartikel). Blog behält seinen Sticky-Top-Header, nur die
  Item-Optik ist jetzt identisch.
- Verifiziert im Browser (lokaler Server): Artikel-H1 + In-Body-H2 + Blog-Index-Cards jetzt
  JetBrains Mono, Nav sieht identisch zur Startseite aus. Kein Rebuild nötig (`style.css` wird
  direkt ausgeliefert, `build-blog.js` fasst es nicht an).

## Hotfix — 2026-09-11: SEO-Keyword-Erweiterung + 17 neue Blogartikel (20-Themen-Plan umgesetzt)

Auf Wunsch Nic: Sichtbarkeit für ein konkretes Keyword-Cluster aufbauen (Remote Webdesigner,
Webdesigner Düsseldorf, Düsseldorf Grafikdesign, günstiges Webdesign, günstige Shopify-Shops,
plus die Nischen Cannabis Social Clubs, Friseure, Tattoo-Studios/Tätowierer, Künstler,
Kunststudenten, Dönerbuden/Pizzerien) — Fokus laut Nic: „schnelle Arbeit, komplett online ohne
Büro/Agentur", zusätzliches Einkommen über Design-Nebenprojekte.

**Startseite (`index.html`) — Kopf-Keywords:**
- `<title>`: „Günstiges Webdesign für kleine Unternehmen — ab 490€ | Niclas Koch, Düsseldorf"
  → „Webdesigner Düsseldorf & Remote — Günstiges Webdesign ab 490€ | Niclas Koch" (Remote +
  Webdesigner Düsseldorf jetzt explizit vorne, „ab 490€" bleibt als Preis-Anker).
- Meta-Description, OG-Title/-Description, Twitter-Title/-Description entsprechend neu
  formuliert (Webdesigner & Grafikdesigner Düsseldorf, remote deutschlandweit, Shopify-Shops
  ergänzt).
- Wiederkehrende Nischen-Aufzählung im Fließtext („Tattoo-Studios, Cannabis Social Clubs und
  Künstler", 6 Vorkommen: Hero, Meta, Schema) um **Friseure** ergänzt.
- JSON-LD (`Person` + `ProfessionalService`, `@graph`): `knowsAbout` erweitert um „Webdesigner
  Düsseldorf", „Remote Webdesigner", „Webdesign für Tätowierer", „Webdesign für Friseure",
  „Webdesign für Kunststudenten", „Grafikdesign Düsseldorf", „Shopify Shop erstellen lassen";
  `serviceType` um „Shopify Shop Erstellung" ergänzt. Alle JSON-LD-Blöcke nach dem Edit erneut
  mit `json.loads()` validiert.

**Blog: 17 neue Artikel, bestehende 4 unverändert (jetzt 21 Beiträge gesamt):**
- Themen-Cluster neu zugeschnitten auf die tatsächlich gewünschten Branchen (ersetzt die alte
  „Weitere Nischen"-Liste aus der ursprünglichen Planung unten — Bäckerei/Fitness-Coach/
  Handwerker/Sprachkurs/Dropshipping waren nie geschrieben und passten nicht zu Nics
  aktuellem Fokus):
  - **Tattoo-Studios (6, davon 4 neu):** Online-Terminvergabe, 5 häufige Website-Fehler,
    Tätowierer-Portfolio (Freelancer/Gastspieler), lokale Google-Sichtbarkeit.
  - **Cannabis Social Clubs (4, davon 3 neu):** mehr Sichtbarkeit/Mitglieder, Mitgliederbereich,
    Events & Workshops.
  - **Künstler & Creator (4, alle neu):** Portfolio-Verkauf, Musik-Producer/Beats, Illustrator-
    Commissions, Creator-Newsletter + Webshop.
  - **Weitere Nischen (6, alle neu):** Friseure (Online-Buchung), Dönerbude/Imbiss, Pizzeria,
    Kunststudenten-Portfolio, günstiger Shopify-Shop, Remote-Webdesigner Düsseldorf.
- Jeder neue Artikel: `posts.json`-Metadaten vollständig (title/metaTitle/description/
  standfirst/tags/readTime/keyTakeaways/faq mit 3 Q&A), Body-HTML in `blog/content/<slug>.html`
  mit 4–5 `<h2>` (→ Inhaltsverzeichnis, `renderToc()` braucht ≥3), Preis-Anker „ab 490 €" bzw.
  „ab 590 €" bei aufwendigeren Themen (Cannabis, Shopify), interne Verlinkung zu 2 verwandten
  Beiträgen im selben Cluster (`.cluster-nav`).
- **FAQ bewusst nur in `posts.json`**, nicht zusätzlich im Body — `_template.html`/
  `build-blog.js` rendern die FAQ-Sektion (`{{FAQ_HTML}}`) sowie das `FAQPage`-JSON-LD-Schema
  automatisch aus dem `faq`-Array; FAQ-Markup im Body hätte den Abschnitt dupliziert.
- `node build-blog.js` durchgelaufen: 21 Artikel gebaut, `blog/index.html`, `sitemap.xml`
  (23 `<loc>`-Einträge) und die 3 Blog-Teaser-Cards auf der Startseite automatisch aktualisiert.
  17 gebrandete SVG-Platzhalterbilder erzeugt (Nic ersetzt sie durch echte Fotos — Bildauswahl
  macht Nic selbst).
- Verifiziert: `posts.json` per `json.loads()` validiert (21 Posts, keine doppelten Slugs,
  alle Pflichtfelder da), alle 21 generierten Artikel-Seiten enthalten gültiges JSON-LD
  (Article/BlogPosting + BreadcrumbList + FAQPage) und keine unausgefüllten `{{...}}`-Platz-
  halter, `sitemap.xml` mit `xmllint` validiert. Stichprobe im Browser (ein Artikel): lädt
  fehlerfrei, Konsole leer, Inhaltsverzeichnis/FAQ/Meta-Zeile korrekt gerendert.
- **Deliverable:** `nicworks-seo-blogplan.docx` — Word-Datei mit SEO-Keywords, Title, Meta-
  Description, Inhaltsverzeichnis, FAQ und Schema-Hinweis für alle 21 Beiträge plus die
  Startseiten-Keyword-Strategie, an Nic geschickt.
- **Nicht angefasst:** `datenschutz.html`/`impressum.html`, ProteinUp/Portfolio-Bereich,
  alles außerhalb `live/`.

## Geplante Blog-Artikel — Status 2026-09-11: umgesetzt (siehe Hotfix oben)

Der ursprüngliche 20-Themen-Plan unten (Tattoo/Cannabis/Künstler/„Weitere Nischen") war die
erste Grobplanung vom 2026-08-19-Einfrieren. Er ist durch den Hotfix oben ersetzt: alle 20
Themenplätze sind jetzt tatsächlich geschriebene, live gebaute Artikel in `blog/posts.json` +
`blog/content/*.html` (nicht mehr nur Stichpunkte mit `[ ] Artikel generieren`). Die konkrete,
aktuelle Themenliste inkl. URLs, Keywords und FAQ steht in `nicworks-seo-blogplan.docx` sowie
direkt in `blog/posts.json`. Dieser Abschnitt bleibt nur noch als Archiv der ursprünglichen
Stichpunkt-Ideen stehen, falls einzelne Nischen-Angles (Monetarisierungs-Framing wie „5x mehr
verdienen") für spätere Artikel nochmal als Inspiration gebraucht werden.

<details>
<summary>Ursprüngliche Stichpunkt-Planung vom 2026-08-19 (archiviert, nicht mehr aktuell)</summary>

## Geplante Blog-Artikel (20 Themen) — Fokus: Schnelles Geldverdienen, Nischen, AI-lösbar

### TO DO: 20 Blog-Artikel generieren (Seed-Content für wöchentliche Auto-Publication)

Strategischer Fokus: **Tattoo-Studios, Cannabis Clubs, Künstler + weitere Nischen** mit schnellem Monetarisierungspotenzial. Jedes Thema ist AI-lösbar (keine Originalrecherche nötig, Standard-Patterns existieren) und trägt den Preis-Anker "ab 490€" / "ab 590€" sowie Keywords für "günstiges Webdesign".

**Wichtig für alle Artikel:**
- [ ] Jeder Artikel mit **Article + FAQPage JSON-LD-Schema** generieren (für Google AI Overviews Ranking)
- [ ] FAQ-Section mit mind. 3-5 Q&A pro Artikel (aus posts.json `faq`-Array in _template.html einfügen)
- [ ] Meta Description mit Kosten-Anker ("ab 490€") + Nischen-Keyword
- [ ] Interne Links zu anderen Nischen-Artikeln (Related Posts)

---

### Tattoo-Studios (6 Themen)

1. **Tattoo-Studio-Website ab 490€ — Das Komplettpaket für 2026**
   - Angle: Kosten-fokussiert, "Was Tattoo-Studios wirklich brauchen"
   - Copy-Pattern: Problem (teure Agentur) → Lösung (Komponenten-Baukasten 490€) → Gewinn (mehr Anfragen = schnelle ROI)
   - SEO: "Tattoo Studio Website Kosten", "günstige Website Tattoo-Studio"
   - [ ] Artikel generieren (AI-Prompt vorbereitet)
   - [ ] FAQ + Schema

2. **Warum Instagram allein für Tattoo-Studios nicht reicht (und wie eine Website die Umsätze verdoppelt)**
   - Angle: Instagram-abhängig → Website ändert das
   - Monetisierungslink: "Leads über Google → höhere Auslastung"
   - SEO: "Tattoo Studio Online Marketing", "Website statt Instagram Tattoo"
   - [ ] Artikel generieren
   - [ ] FAQ + Schema

3. **Bildergalerien für Tattoo-Studios: Portfolio-Website mit WebP/AVIF für schnellere Ladezeiten**
   - Angle: Sichtbarkeit in Google Images, Mobile-First (wichtig für Tattoo-Recherche)
   - Technical-lite: "Die richtige Bildoptimierung spart Serverkosten + steigert Rankings"
   - SEO: "Tattoo Portfolio Website", "schnelle Website Tattoo-Galerie"
   - [ ] Artikel generieren
   - [ ] FAQ + Schema

4. **Tattoo-Termin-Buchung online: Automations-Funktion für sofortiges Geldverdienen**
   - Angle: Zeitersparnis = direkt mehr zahlende Kunden
   - Monetize: "Weniger Telefonanrufe = weniger Admin, mehr Tätowier-Zeit = höhere Tagessätze"
   - SEO: "Online Terminvergabe Tattoo", "Tattoo Website mit Buchungssystem"
   - [ ] Artikel generieren
   - [ ] FAQ + Schema

5. **Die 5 häufigsten Website-Fehler bei Tattoo-Studios (und wie man sie in 1 Tag behebt)**
   - Angle: Quick-fix Format (Listicle, "Fehler #3 kostet Sie 50€/Woche")
   - AI-lösbar: Generische Fehler + Tattoo-Kontext
   - SEO: "Tattoo Website Fehler", "bessere Website Tattoo-Studio"
   - [ ] Artikel generieren
   - [ ] FAQ + Schema

6. **Künstler-Sektion: Tattoo-Artist-Portfolio vs. Studio-Site — Warum beide nötig sind**
   - Angle: Aufteilung Personal Brand vs. Studio (verdoppelt Leads)
   - Monetize: "Artist-Page = höhere Stundensätze, Studio-Page = volle Auslastung"
   - SEO: "Tattoo Artist Website", "Künstler-Portfolio Tattoo"
   - [ ] Artikel generieren
   - [ ] FAQ + Schema

---

### Cannabis Social Clubs (4 Themen)

7. **Cannabis-Website für Deutschland 2026: CanG-konform + Rankings — ab 590€**
   - Angle: Compliance + SEO (unique selling point)
   - Monetize: "CanG ist neu, konkurrenzblog-leer, First-Mover-Vorteil für CSC"
   - SEO: "Cannabis Website Deutschland", "CSC Website CanG"
   - [ ] Artikel generieren
   - [ ] FAQ + Schema

8. **Besucherzahlen steigern: Wie CSCs mit gezieltem Webdesign die Tür-Quote erhöhen**
   - Angle: Local SEO + "Google My Business" für Cannabis Clubs
   - Monetize: "Mehr Besucher pro Woche = höhere Shop-Umsätze"
   - SEO: "Cannabis Club Website Besucher", "CSC Online Sichtbarkeit"
   - [ ] Artikel generieren
   - [ ] FAQ + Schema

9. **Mitgliedschaftssystem auf der Website: Automatisiertes Einnahmemodell für CSCs**
   - Angle: Passive revenue stream (Newsletter, Memberships, Events)
   - AI-lösbar: Generisches Membership-Framework + Cannabis-Kontext
   - SEO: "Mitgliedersystem Cannabis", "CSC Website Membership"
   - [ ] Artikel generieren
   - [ ] FAQ + Schema

10. **CSC-Events & Workshops online bewerben: Website-To-Umsatz in unter 2 Wochen**
    - Angle: Event-Promotion über Website sendet direkt Traffic zu lokalen Gigs
    - Monetize: "Mehr Besucher pro Event = höhere Eintrittsgelder"
    - SEO: "Cannabis Events Website", "CSC Workshops Online Marketing"
    - [ ] Artikel generieren
    - [ ] FAQ + Schema

---

### Künstler & Creator (4 Themen)

11. **Künstler-Portfolio-Website ab 490€: Wie Sie Ihre Werke zu Geld machen**
    - Angle: Direct sales (Shop-Modul) vs. Print-on-Demand vs. Commissions
    - Monetize: "Website = 24/7 Verkäufer, der Ihnen schläft"
    - SEO: "Künstler Website Portfolio", "Online Kunstverkauf"
    - [ ] Artikel generieren
    - [ ] FAQ + Schema

12. **Musik-Producer & Sounddesigner: Website mit SoundCloud/Spotify-Integration für Lizenz-Verkäufe**
    - Angle: Beats/Musik direkter monetarisieren (nicht nur Streams)
    - AI-lösbar: Musikindustrie-Standard-Patterns
    - SEO: "Music Producer Website", "Beats verkaufen Online"
    - [ ] Artikel generieren
    - [ ] FAQ + Schema

13. **Commissioning-Plattform auf der Website: Wie Illustratoren & Designer 5x mehr verdienen**
    - Angle: Pre-sells & Client-Requests = höhere Marge als Galerien
    - Monetize: "50% Deposit-System = Cashflow vorher, nicht nachher"
    - SEO: "Illustration Commissions Website", "Freelance Designer Kundengewinnung"
    - [ ] Artikel generieren
    - [ ] FAQ + Schema

14. **Creator-Newsletter + Webshop kombiniert: Von Follower zu zahlenden Fans**
    - Angle: Email-Listen außerhalb von Social-Media-Algorithmen
    - Monetize: "Newsletter-Subscriber = verlässliche wiederkehrende Käufer"
    - SEO: "Creator Website Newsletter", "Künstler Online Shop"
    - [ ] Artikel generieren
    - [ ] FAQ + Schema

---

### Weitere Nischen (6 Themen)

15. **Friseur-Salon: Online-Buchungssystem für Doppelte Auslastung (ab 490€)**
    - Angle: Smartphone-Kundschaft = sofort buchbar
    - Monetize: "Weniger freie Slots pro Woche = höhere Tageseinnahmen"
    - SEO: "Friseur Website Termin", "Salon Buchungssystem günstig"
    - [ ] Artikel generieren
    - [ ] FAQ + Schema

16. **Kleinbäckerei: Online-Bestell-System & Lieferrouten-Optimierung durch Website**
    - Angle: Großbäckereien haben keine Zeit für Einzelkunden — Sie schon
    - Monetize: "Vorbestellungen = garantierte Umsätze, no-waste Production"
    - SEO: "Bäckerei Website Online Bestellen", "Handwerk Webshop"
    - [ ] Artikel generieren
    - [ ] FAQ + Schema

17. **Fitness-Coach & Personal Trainer: Website mit Online-Kurse = Skalierbarer Umsatz**
    - Angle: 1-zu-1 → 1-zu-viele (höhere Marge)
    - Monetize: "Video-Kurse = nachts verdienen, was tagsüber trainiert wurde"
    - SEO: "Personal Trainer Website", "Online Fitness Kurse verkaufen"
    - [ ] Artikel generieren
    - [ ] FAQ + Schema

18. **Freelance-Handwerker (Klempner, Elektriker, Maurer): Buchung + Bewertungen = Preiserhöhung**
    - Angle: Handwerk wird durch gute Website zur "Brand"
    - Monetize: "Kann 10€/Stunde mehr nehmen, wenn Kunden online vorab sehen: Professionalität"
    - SEO: "Handwerker Website", "Klempner Online Auftrag"
    - [ ] Artikel generieren
    - [ ] FAQ + Schema

19. **Online-Sprachkurs-Anbieter: Website + Zoom-Integration = Passive Income Stream**
    - Angle: Selbstverschleißendes Produkt (Zeit) → Kursmaterial (skalierbar)
    - Monetize: "Ein 30€-Kurs kann 100x verkauft werden"
    - SEO: "Sprachkurs Online Plattform", "Nachhilfe Website erstellen"
    - [ ] Artikel generieren
    - [ ] FAQ + Schema

20. **Dropshipping & Store-Besitzer: SEO-optimierte Website statt nur Amazon FBA**
    - Angle: Eigene Website = Google-Traffic statt Amazon-abhängig
    - Monetize: "Eigene Brand = 100% Marge, nicht 15% nach Gebühren"
    - SEO: "Ecommerce Website günstig", "Online Shop Webdesign ab 490€"
    - [ ] Artikel generieren
    - [ ] FAQ + Schema

</details>

### Nächste Schritte

1. ~~Artikel für alle 20 Themen generieren~~ ✅ erledigt 2026-09-11 — 21 Artikel live (20 Nischen-Themen + 1 Cornerstone), siehe Hotfix oben.
2. ~~FAQ-Section pro Artikel~~ ✅ erledigt — FAQPage-JSON-LD automatisch generiert von `build-blog.js` aus `posts.json`.
3. ~~Sitemap.xml aktualisieren~~ ✅ erledigt automatisch von `build-blog.js` (23 `<loc>`-Einträge, inkl. Image-Sitemap pro Artikel).
4. **GitHub Secrets bereitstellen** (Nic muss das machen)
   - `STRATO_FTP_SERVER`, `STRATO_FTP_USERNAME`, `STRATO_FTP_PASSWORD`
   - Danach: Auto-Deploy per `git push` aktiv

5. **GitHub PAT für wöchentliche Trigger** (Nic bereitstellen)
   - Fine-grained PAT (nur Portfolio_Page_26_Live, Contents R/W)
   - Dann: wöchentlicher Trigger einrichten für automatische Artikel-Generierung

6. **Deploy & Verifikation**
   - Nach erstem Auto-Deploy prüfen: `/blog/`, `/blog/posts/*.html`, Fonts, CSS laden korrekt
   - Google Search Console: Blog-URLs crawl-ready machen, neue Sitemap einreichen
   - Echte Fotos für die 17 neuen Artikel liefern (ersetzen die SVG-Platzhalter in `blog/img/`,
     Bildauswahl macht Nic) — Dateiname nach `blog/img/` legen + `image` in `posts.json` setzen
