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

---

### Nächste Schritte (Sequential)

1. **Artikel für alle 20 Themen generieren** (jeweils ~400-600 Wörter reines Body-HTML)
   - Inputs: posts.json (Metadaten), blog/content/*.html (Artikel-Bodies)
   - Generierung: `build-blog.js` (liest JSON + Bodies, schreibt HTML + Schemas)
   
2. **FAQ-Section pro Artikel** (mind. 3-5 Q&A aus posts.json `faq`-Array)
   - FAQPage JSON-LD-Schema automatisch generiert von build-blog.js
   - Sichtbar in `blog/_template.html` unter `{{FAQ_HTML}}` Platzhalter
   
3. **Sitemap.xml aktualisieren** (build-blog.js macht das automatisch)
   - Alle 20 `/blog/posts/<slug>.html` URLs hinzufügen
   - Priority 0.7, changefreq yearly für Artikel
   - `/blog/` selbst: priority 1.0, changefreq weekly

4. **GitHub Secrets bereitstellen** (Nic muss das machen)
   - `STRATO_FTP_SERVER`, `STRATO_FTP_USERNAME`, `STRATO_FTP_PASSWORD`
   - Danach: Auto-Deploy per `git push` aktiv
   
5. **GitHub PAT für wöchentliche Trigger** (Nic bereitstellen)
   - Fine-grained PAT (nur Portfolio_Page_26_Live, Contents R/W)
   - Dann: wöchentlicher Trigger einrichten für automatische Artikel-Generierung
   
6. **Deploy & Verifikation**
   - Nach erstem Auto-Deploy prüfen: `/blog/`, `/blog/posts/*.html`, Fonts, CSS laden korrekt
   - Google Search Console: Blog-URLs crawl-ready machen

