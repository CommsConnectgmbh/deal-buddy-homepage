# SEO-Seiten: Entscheidung getroffen

Entschieden und umgesetzt am 14.09.2026. Die Entscheidungsvorlage vom 12.09.2026
ist damit erledigt; ihr Inhalt steht in der Git-Historie.

## Entscheidung: Variante A für alle vier Tippspiel-Seiten

Alle vier Seiten leiten dauerhaft (308) auf die Startseite. Keine wird
umgeschrieben, `/challenge-mit-freunden` wird nicht gebaut.

**Datengrundlage.** Die Vorlage verlangte vor der Entscheidung einen Blick in die
Search Console. Abfrage am 14.09.2026 über das seo-bot-Servicekonto, Zeitraum
90 Tage, Dimension Seite: `deal-buddy.app` hat in diesem Zeitraum **vier** Seiten
mit Impressionen — Startseite (6 Klicks / 123 Impressionen), `app.deal-buddy.app`
(0/12), `/datenschutz` (0/5), `/download` (0/11).

Die vier Tippspiel-Seiten kommen darin **nicht vor**: null Impressionen in
90 Tagen. Das in der Vorlage fair benannte Gegenargument ("die einzigen Seiten
mit organischem Suchbegriff-Bezug") trägt damit nicht — sie ranken auf nichts.
Der Verlust durch die Weiterleitung ist nachweislich null, eine Umschreibung
hätte kein Ranking-Signal zu erhalten.

## Ebenfalls umgesetzt

- **`gewinnspiel.html` abgeschaltet** (308 auf die Startseite, Datei gelöscht).
  Teilnahmeschluss war der 19.07.2026, die Seite bewarb am 14.09.2026 weiter
  "iPhone 17 Pro Max gewinnen". Ein Gewinnspiel mit verstrichenem Schluss ohne
  Hinweis ist irreführend (UWG); das war der dringlichste Punkt der Vorlage.
- **Sitemap auf die kanonischen Adressen umgestellt.** Sie führte
  `support.html`, `impressum.html`, `datenschutz.html` und `agb.html` — alle vier
  antworten wegen `cleanUrls: true` mit 308. Google bekam für vier von fünf
  Sitemap-Einträgen eine Weiterleitung statt einer Seite geliefert; die Domain
  stand deshalb bei 1 von 5 indexierten URLs.
- **Interne Verlinkung kanonisiert.** 200 `href="…\.html"`-Links in 12 Dateien
  zeigten auf Weiterleitungen statt auf Zielseiten.
- **Android auf `/download` bleibt "Bald verfügbar".** Gegenprobe am 14.09.2026:
  Play Store antwortet mit 404, die Angabe ist also zutreffend.

## Offen (eigene Entscheidung, nicht SEO)

`card.html`, `/creator/` und `/admin/` sind Werkzeugseiten in altem Design, per
robots.txt gesperrt. Ob sie auf der Marken-Domain bleiben, ist unverändert offen.
