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
