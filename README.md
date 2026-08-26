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
- [ ] Analytics einrichten
- [ ] Textlich mehr Möglichkeiten schaffen, Projekte anzufragen
- [ ] Kontaktformular: Projektart abfragen (z. B. Radiobuttons), ggf. weitere Felder
      ergänzen
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

