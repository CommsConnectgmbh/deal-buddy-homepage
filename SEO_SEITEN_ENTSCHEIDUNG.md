# SEO-Seiten: Entscheidungsvorlage

Stand 12.09.2026, Nachtschicht. Entscheidung trifft der Auftraggeber. Bis dahin liegen alle Seiten unverändert im Ordner und sind live erreichbar; nur die Sitemap führt sie nicht mehr (siehe unten).

## Ausgangslage

Vier Seiten verkaufen ein Fußball-Tippspiel und nennen Kicktipp als Maßstab:

| Datei | Titel | Wörter | Kicktipp | Echtgeld | Kanonische URL |
|---|---|---|---|---|---|
| `tippspiel-app.html` | Tippspiel App kostenlos, Fußball tippen | 1.307 | 6× | 10× | `/tippspiel-app` |
| `tippspiel-mit-freunden.html` | Tippspiel mit Freunden, Tippgruppe erstellen | 1.190 | 3× | 5× | `/tippspiel-mit-freunden` |
| `fussball-tippspiel-kostenlos.html` | Fußball-Tippspiel kostenlos, ohne Echtgeld | 1.151 | 2× | 20× | `/fussball-tippspiel-kostenlos` |
| `bundesliga-tippspiel.html` | Bundesliga-Tippspiel kostenlos, Spieltag tippen | 1.154 | 5× | 12× | `/bundesliga-tippspiel` |

Alle vier haben eine eigene `SoftwareApplication`- und `FAQPage`-Auszeichnung mit "Punkte im Kicktipp-Standard", ein eigenes Design (Gold, Cinzel, Versalien) und verlinken auf `download.html`.

Warum das ein Problem ist, in drei Punkten:

1. **Kategorie.** Wer "Tippspiel" sucht, will Kicktipp. Kicktipp hat die Marke, die Jahre und die Backlinks. Auf diesen Suchbegriffen belegen wir Platz 40 und schulen nebenbei die Suchmaschine darauf, dass DealBuddy ein Tippspiel ist. Das neue Produkt ist keins: "Wetten mit Freunden. Der Verlierer liefert. Alle sehen zu." Die Startseite sagt jetzt A, die vier Unterseiten sagen B.
2. **Sperrliste.** Die Seiten schreiben 47× "Echtgeld", dazu "Buchmacher", "Glücksspiel", "Tipp/tippen auf Ergebnisse". Alles Wörter, die laut `nachtschicht/copy/STIMME.md` nie im Produkt auftauchen sollen, auch nicht als Verneinung. Wer "ohne Echtgeld" rankt, holt Besucher, die Echtgeld suchen.
3. **Produktstand.** Der Umbauplan (Phase 4) sagt: "SEO-Seiten auf Tippspiel abschalten oder umlenken." Ob das Tippen als Funktion im neuen Produkt überhaupt bleibt, ist offen (Umbauplan, Punkt 11). Solange das offen ist, verspricht jede dieser Seiten etwas, das es nach dem Umbau vielleicht nicht mehr gibt.

Gegenargument, fair benannt: Die Seiten sind seit 02.07.2026 indexiert und die einzigen Seiten mit organischem Suchbegriff-Bezug. Ob sie Besucher bringen, weiß nur die Search Console. **Vor der Entscheidung dort nachsehen** (Leistung, letzte 3 Monate, Filter Seite = die vier URLs). Bei null bis wenigen Klicks pro Woche ist der Verlust durch eine Weiterleitung null.

## Vorschlag pro Seite

### `tippspiel-app.html`: auf die Startseite weiterleiten (301)

Generischster Begriff, härtester Wettbewerb (Kicktipp, kicktipp-Klone, Sportschau, Kicker). Die Seite beschreibt Funktionen ("Tippgruppe erstellen", "Live-Ranking", "Kicktipp-Standard"), die im neuen Produkt so nicht vorkommen. Kein Umschreiben möglich, weil der Suchbegriff selbst die falsche Kategorie ist. Weiterleiten, Ranking-Signal geht auf die Startseite über.

### `tippspiel-mit-freunden.html`: umschreiben zu "Challenge mit Freunden", URL wechseln (301)

Der einzige der vier Begriffe, in dem das neue Produkt schon steckt: "mit Freunden" ist unser Kern, "Tippspiel" ist der Fehler. Vorschlag: neue Seite `/challenge-mit-freunden` (Zielbegriffe: "Challenge mit Freunden", "Wette mit Freunden Ideen", "Verlierer muss", "Freundschaftswette Ideen"), aufgebaut aus der Ideenliste in `nachtschicht/copy/texte_de.json` (`challenge.idee_1` bis `_8`) plus den Regeln aus STIMME.md. Alte URL per 301 auf die neue. Das ist die einzige Seite, bei der sich eine Umschreibung lohnt, weil die Suchabsicht ("was kann ich mit Freunden ausmachen") zum Produkt passt.

Wenn keine Zeit für eine neue Seite ist: auf die Startseite weiterleiten, nicht liegen lassen.

### `fussball-tippspiel-kostenlos.html`: auf die Startseite weiterleiten (301)

20× "Echtgeld" auf einer Seite. Die Seite lebt davon, "ohne Echtgeld" zu betonen, und zieht damit genau die Leser an, die nach dem Gegenteil suchen. Kein Satz davon ist nach STIMME.md haltbar. Weiterleiten.

### `bundesliga-tippspiel.html`: auf die Startseite weiterleiten (301)

Saisonal, funktional an "34 Spieltage tippen" gebunden, mit Kicktipp-Standard als Kern der Seite. Falls das Tippen als Funktion bleibt (Umbauplan 11), kann man die Seite später neu bauen; die alte Fassung ist dann trotzdem nicht die Grundlage. Weiterleiten.

### Empfehlung in einem Satz

Drei Seiten auf die Startseite weiterleiten, eine (`tippspiel-mit-freunden`) zu einer Challenge-Ideen-Seite umbauen und ebenfalls umleiten. Keine der vier Seiten in der heutigen Form behalten.

## Was heute schon geändert ist

- `sitemap.xml` führt die vier Seiten nicht mehr. Solange keine Weiterleitung existiert, sind sie weiter erreichbar und indexiert; Suchmaschinen sehen sie nur nicht mehr als empfohlen. Bei "behalten" wieder eintragen.
- `robots.txt` sperrt `/admin/`, `/creator/`, `/card` und die Sicherung `index.alt-2026-09-12` für Crawler. Die vier SEO-Seiten sind nicht gesperrt (bewusst: eine Sperre ohne Weiterleitung verliert das Ranking, ohne es zu übertragen).
- Die neue Startseite verlinkt keine der vier Seiten. Die Rechtsseiten (`impressum`, `datenschutz`, `agb`, `support`) verlinken sie auch nicht, nur `download.html`.

## Weiterleitungsregeln für `vercel.json`

Vercel-Redirects werden VOR `cleanUrls` ausgewertet; die `.html`-Varianten müssen deshalb ausdrücklich mit aufgeführt werden, sonst bleibt `/tippspiel-app.html` erreichbar. `permanent: true` ergibt 308 (Vercel-Standard für dauerhaft; Suchmaschinen behandeln 308 wie 301).

Variante A, alles auf die Startseite (der Vorschlag oben, wenn keine neue Seite gebaut wird):

```json
"redirects": [
  { "source": "/tippspiel-app",                    "destination": "/", "permanent": true },
  { "source": "/tippspiel-app.html",               "destination": "/", "permanent": true },
  { "source": "/tippspiel-mit-freunden",           "destination": "/", "permanent": true },
  { "source": "/tippspiel-mit-freunden.html",      "destination": "/", "permanent": true },
  { "source": "/fussball-tippspiel-kostenlos",     "destination": "/", "permanent": true },
  { "source": "/fussball-tippspiel-kostenlos.html","destination": "/", "permanent": true },
  { "source": "/bundesliga-tippspiel",             "destination": "/", "permanent": true },
  { "source": "/bundesliga-tippspiel.html",        "destination": "/", "permanent": true }
]
```

Variante B, mit neuer Challenge-Seite (Vorschlag oben, wenn `challenge-mit-freunden.html` gebaut wird): die beiden `tippspiel-mit-freunden`-Zeilen bekommen `"destination": "/challenge-mit-freunden"`, der Rest wie in A.

Der Block gehört als Schlüssel `redirects` auf oberster Ebene in `vercel.json`, neben `cleanUrls`, `trailingSlash` und `headers`. Nach dem Deploy die vier Dateien aus dem Ordner löschen (Vercel liefert die Weiterleitung auch ohne Datei) und in der Search Console die alten URLs per "Entfernen" beschleunigen, dann dauert der Übergang Tage statt Wochen.

## Weitere Fundstellen, die dazugehören

### `gewinnspiel.html`: abgelaufen, steht aber live

Hartkodiertes Ende **19.07.2026** ("Spielzeitraum: 11.06. bis 19.07.2026", Teilnahmeschluss "19. Juli 2026", dazu eine `Event`-Auszeichnung mit demselben Datum). Heute ist der 12.09.2026, die Seite ist seit acht Wochen abgelaufen und bewirbt weiter "iPhone 17 Pro Max gewinnen" und "Drei Preise im Gesamtwert von 2.547 €". Das ist zweifach heikel: ein Gewinnspiel mit verstrichenem Teilnahmeschluss ohne Hinweis verstößt gegen die eigenen Teilnahmebedingungen (Irreführung, UWG), und die Seite ist mit Tippspiel-Wortschatz und Euro-Betrag genau das, was STIMME.md ausschließt. Die Seite steht nicht in der Sitemap und wird von der neuen Startseite nicht verlinkt.

Vorschlag: Weiterleitung auf die Startseite (`/gewinnspiel`, `/gewinnspiel.html`), Datei danach löschen. Wenn das Gewinnspiel noch abgewickelt wird (Gewinner benachrichtigen), vorher in der Datei den Hinweis "Das Gewinnspiel ist beendet, die Gewinner sind benachrichtigt" einbauen und erst danach umleiten. Die Datei ist heute unverändert.

### `download.html`: Android-Versprechen ohne Link

Die Seite zeigt "Android · Google Play · Bald verfügbar" ohne Ziel. Es gibt im gesamten Ordner keinen Play-Store-Link; die neue Startseite lässt Android deshalb weg statt es auszugrauen. Wenn `download.html` bleibt, den Android-Eintrag entfernen; sonst ebenfalls auf die Startseite weiterleiten, weil die Startseite jetzt beide Wege (App Store, Browser) direkt zeigt. Die Rechtsseiten verlinken `download.html` in ihrem Menü; bei einer Weiterleitung landen diese Links auf der Startseite, das ist in Ordnung.

### `card.html`, `/creator/`, `/admin/`

Werkzeugseiten ("Card Creator", Creator-Review), nicht für Besucher gedacht, in altem Design. Seit heute per `robots.txt` gesperrt. Ob sie auf der Marken-Domain bleiben sollen, ist eine eigene Entscheidung (Umbauplan hat kein Sicherheitsloch gefunden, nur den Auftritt). Hier nicht weiter behandelt.
