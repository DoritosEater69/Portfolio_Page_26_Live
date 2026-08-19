#!/bin/bash
# Laedt Fraunces / JetBrains Mono / Inter / Roboto als lokale Font-Dateien in diesen Ordner.
#
# WARUM: Diese Fonts liefen bisher live ueber fonts.googleapis.com/fonts.gstatic.com - das
# uebertraegt bei jedem Seitenaufruf die IP-Adresse der Besucher:innen an Google, ohne dass
# dafuer eine Einwilligung eingeholt wird (siehe u.a. LG München I, Urteil v. 20.01.2022,
# Az. 3 O 17493/20). portfolio.html referenziert bereits die lokalen Dateinamen unten (siehe
# @font-face-Block) - dieses Skript muss nur EINMAL ausgefuehrt werden, um die Dateien
# tatsaechlich herunterzuladen.
#
# In der Cowork-Sandbox war der direkte Download blockiert (Netzwerk-Allowlist laesst
# fonts.googleapis.com/fonts.gstatic.com nicht zu) - deshalb konnte ich das nicht schon fuer
# dich erledigen. Auf deinem eigenen Rechner mit normalem Internetzugang funktioniert es.
#
# AUSFUEHREN (im Terminal, aus dem Portfolio Page/font/-Ordner):
#   bash download-fonts.sh
#
# Voraussetzung: curl (auf macOS immer vorinstalliert).
#
# WICHTIGER BUGFIX (ggue. einer frueheren Version dieses Skripts): Mit einem modernen
# Chrome-User-Agent im curl-Request liefert Google Fonts pro Schriftschnitt MEHRERE
# @font-face-Bloecke aus, aufgeteilt nach Unicode-Bereich (z.B. cyrillic, greek, vietnamese,
# latin-ext, latin - in dieser Reihenfolge). Die alte Version hier hat per "grep | head -1"
# einfach den ERSTEN Treffer genommen - das war fast nie der eigentliche Latin-Block, sondern
# z.B. der Cyrillic-Subset. Ergebnis: Dateien ohne normale a-z/A-Z-Buchstaben (gepueft mit
# fonttools - "has 'a': False" bei allen 13 Dateien). Fix: bewusst OHNE modernen Browser-UA
# anfragen - Google liefert dann pro Schriftschnitt genau EINE ungeteilte .ttf-Datei mit dem
# kompletten Zeichensatz (kein Unicode-Bereich-Splitting). Etwas groesser als woff2, dafuer
# garantiert vollstaendig - fuer eine einzelne Portfolio-Seite vernachlaessigbar.
#
# Bewusst auch OHNE "declare -A" (assoziative Arrays) gebaut - macOS liefert per Vorgabe noch
# bash 3.2 aus (Apple aktualisiert das aus Lizenzgruenden nicht mehr), und das kann keine
# assoziativen Arrays.

set -e

# Jede Zeile: Dateiname|Google-Fonts-CSS2-Query - ein Family/Weight/Style pro Zeile, absichtlich
# einzeln statt als eine grosse kombinierte Anfrage, damit sich pro Datei zuverlaessig genau EIN
# @font-face mit genau einer Font-URL herausfiltern laesst.
FONTS="
Fraunces-400|family=Fraunces:opsz,wght@9..144,400
Fraunces-600|family=Fraunces:opsz,wght@9..144,600
Fraunces-900|family=Fraunces:opsz,wght@9..144,900
Fraunces-500italic|family=Fraunces:ital,opsz,wght@1,9..144,500
JetBrainsMono-400|family=JetBrains+Mono:wght@400
JetBrainsMono-500|family=JetBrains+Mono:wght@500
JetBrainsMono-700|family=JetBrains+Mono:wght@700
Inter-400|family=Inter:wght@400
Inter-500|family=Inter:wght@500
Inter-600|family=Inter:wght@600
Roboto-300|family=Roboto:wght@300
Roboto-400|family=Roboto:wght@400
Roboto-500|family=Roboto:wght@500
"

echo "$FONTS" | while IFS='|' read -r key query; do
  # leere Zeilen (z.B. ganz oben/unten im Here-String) ueberspringen
  [ -z "$key" ] && continue
  echo "-> $key"
  # WICHTIG: bewusst OHNE "-A <Chrome-UA>" - siehe Bugfix-Kommentar oben. curl's eigener
  # Standard-User-Agent reicht, damit Google die ungeteilte .ttf-Variante mit vollem
  # Zeichensatz ausliefert statt nach Unicode-Bereich aufgesplitteter woff2-Haeppchen.
  css=$(curl -sL "https://fonts.googleapis.com/css2?${query}&display=swap")
  url=$(echo "$css" | grep -oE "https://fonts\.gstatic\.com/[^)]+\.ttf" | head -1)
  if [ -z "$url" ]; then
    echo "   FEHLER: keine Font-URL gefunden fuer $key - Google-Fonts-Antwort hat sich evtl. geaendert."
    continue
  fi
  curl -sL "$url" -o "$key.ttf"
  echo "   gespeichert als $key.ttf"
done

echo ""
echo "Fertig. Bitte kurz pruefen, ob alle 13 .ttf-Dateien im font/-Ordner liegen, dann"
echo "portfolio.html neu laden - die Google-Fonts-Warnung/der Fallback-Font sollte danach weg sein."
