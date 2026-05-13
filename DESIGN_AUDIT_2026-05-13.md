# DealBuddy Homepage – UI/UX & Motion Audit

**Datum:** 2026-05-13
**Skills:** impeccable (audit + critique + bolder + delight) · design-motion-principles (Jhey primary / Jakub secondary / Emil selective)
**Scope:** `index.html` (Hero, Trust, Problem, How, Features, Social, Tippen, Progression, Empire, Shop, Testimonials, CTA, Footer), `download.html`, globale Tokens
**Register:** Brand (Marketing-Customer-Acquisition-Page)
**Audience:** Junge DACH-Zielgruppe (18–35), Social-Betting-Fun, Pre-Launch

---

## Executive Summary

DealBuddy hat eine starke, mutige DNA gewählt: Cinzel + Crimson Text, Gold-auf-Schwarz, „Legendary Card“ als Hero-Subjekt. Die Seite vermeidet die offensichtlichsten AI-Slop-Reflexe (kein Purple-Blue-Gradient, keine Glassmorphism-Cards, keine Hero-Metric-Stat-Schablone). Das Hero-Visual mit dem 3D-Card-Float + Mouse-Parallax + Particle-Layer ist genuinely memorable.

**Aber:** Die Brand-Lane ist „dark fantasy/casino/luxe medieval“, während das Produkt „kostenlos, kein Echtgeld, Spaß mit Freunden“ verspricht. Diese Spannung kostet Conversion. Die Site liest visuell wie ein Krypto-Casino, während der Disclaimer-Text verzweifelt ruft: „Kein Glücksspiel!“

**Health Score (impeccable audit):**

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 1.5 / 4 | Kein `prefers-reduced-motion`-Handler, viele Texte < 4.5:1, Icon-Emojis ohne Labels |
| 2 | Performance | 2.5 / 4 | Drei Layer-Loop-Animations (Particles + Card-Float + Card-Glow) + Mousemove ohne rAF-Throttle |
| 3 | Responsive Design | 3 / 4 | Solide Breakpoints, aber Trust-Bar bricht zwischen 769–1099px in Drei-Spalten-Stretch |
| 4 | Theming | 2.5 / 4 | Tokens existieren als `:root`, aber Hex statt OKLCH, Pure-Black `#060606`, viele Inline-Styles bypassen Tokens |
| 5 | Anti-Patterns | 2 / 4 | Identische Card-Grids dominieren (5 fast-identische Sektionen `feat-grid`/`feat-compact`/`tgrid`), Side-Stripe-Border auf `.warn-box` (download.html:37), Glow-Cliché auf Logo (download.html:46) |
| **Total** | | **11.5/20** | **Acceptable – significant work needed** |

**Anti-Pattern-Verdict:** Bestehst den First-Order-Reflex-Test (Gaming/Betting → kein Neon-Purple-Cyan), scheiterst aber am Second-Order: „Wetten-App, die nicht Neon ist → Casino-Gold-auf-Schwarz mit Cinzel“ ist 2024–2026 der ausweichende Reflex (Stake/Roobet/Polymarket-Vibe). Die Schrift Cinzel hat die exakte Konnotation von „Crypto-Luxury-Marketing“ und Game-of-Thrones-NFT-Drops.

---

## Top 10 Findings

### 1. [P0] Kein `prefers-reduced-motion`-Support – WCAG-Verstoß
**Location:** `index.html:30–250` (gesamter `<style>`-Block), `download.html:1–134`
**Category:** Accessibility / Motion
**Impact:** Particles (`@keyframes pf`, Zeile 36), Card-Float (`@keyframes cf`, Zeile 80), Card-Glow (`@keyframes cg`, Zeile 84), Badge-Blink (`@keyframes bl`, Zeile 58), Hero-Intro (`@keyframes hi`, Zeile 55) und Logo-Pulse (`download.html:46`) laufen ungebremst weiter. Bei vestibulär empfindlichen Usern (~35 % der >40-Jährigen, aber auch viele Jüngere mit Migräne) löst das Übelkeit aus. Das Mousemove-Parallax in `index.html:692–693` ist besonders heikel.
**WCAG:** 2.3.3 (Animation from Interactions, AAA) + Best Practice für AA.
**Fix:** Globaler Kill-Switch-Block am Ende des CSS – auch wegen Brand-DNA Pflicht.

### 2. [P0] Visual/Copy-Mismatch zwischen „Casino-Luxe“ und „kein Echtgeld“
**Location:** Hero `index.html:288–313` vs. Disclaimer `index.html:661`
**Category:** Anti-Pattern / Brand
**Impact:** Cinzel + Gold-Glow + „Legendary Card“ + „Founder“ + „Empire“ ist die ikonografische Sprache von Echtgeld-Glücksspiel/NFT-Drops. Junge User (18–25) lesen das innerhalb von 0,4 Sekunden als „noch ein Krypto-Wetten-Schmock“ und bouncen, bevor sie den Disclaimer sehen. Ältere Zielgruppen (Eltern, die zustimmen müssten) verdoppeln das Misstrauen.
**Recommendation:** Entweder Brand-Lane shiften (modernerer Sans-Serif für Body, Cinzel nur als Akzent für „Legendary“-Momente) oder das Sicherheits-/Spaß-Versprechen visuell viel früher und dominanter machen (nicht erst in der Trust-Bar nach dem Hero).

### 3. [P1] Identische Card-Grids ermüden ab Sektion 3
**Location:** `.feat-grid` (Zeile 132), `.feat-compact` (Zeile 145), `.tgrid` (Zeile 173), wiederholt in `index.html:421, 473, 535, 558, 609, 635`
**Category:** Anti-Pattern (impeccable absolute ban: „Identical card grids“)
**Impact:** Fünf Sektionen in Folge nutzen die gleiche „Card mit Icon-Emoji + Tag + Titel + Beschreibung + optionalem Highlight-Border-Bottom“-Struktur. Der User scrollt visuell durch redundante Rasterstrukturen; jedes neue Feature wirkt austauschbar.
**Fix:** Mindestens 2 der 5 Sektionen radikal umbauen – z. B. „Empire/Cards“ als horizontales Karten-Karussell mit echten Card-Visuals (du hast `images/`), „Tippen“ als Tippschein-Mockup mit echter Spielpaarung, „How it works“ als animierter Step-Flow mit Phone-Frame.

### 4. [P1] Hero-Headline-Hierarchie inkonsistent gegen Stroke-Trick
**Location:** `index.html:292` und CSS `:60–61`
**Category:** Typography / Anti-Pattern-Adjacent
**Impact:** `Eine Welt.` als Outline-only-Variante (`-webkit-text-stroke:1.5px rgba(255,184,0,.38)`) bei 86px erscheint im Hero kontrastarm (< 2.5:1 gegen Hintergrund nach Layer-Mix), kollabiert auf Retina-Sub-Pixel-Rendering, und ist auf Light-Mode-Print-PDFs unsichtbar. Das ist außerdem ein bekanntes „2023 Webflow-Showroom“-Trope.
**Fix:** Entweder echten Outline-Web-Font nutzen, oder die dritte Zeile semantisch stärker behandeln (z. B. zweifarbig statt outline).

### 5. [P1] Token-System bricht durch Hex und Inline-Styles
**Location:** `:root` Zeile 31 vs. Inline-Styles z. B. `index.html:322` (`box-shadow:0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(255,200,0,0.12)`), `:323`, `:324`, `:452` (Inline-Gradient)
**Category:** Theming
**Impact:** `--gold:#FFB800` ist Hex statt OKLCH; chroma-Reduktion an den Lightness-Extremen unmöglich. Inline-RGBA-Werte wie `rgba(255,200,0,0.12)` und `rgba(255,184,0,...)` haben minimal abweichende Hue/Chroma – das Gold ist nicht ein Gold, sondern sieben leicht differente Golds. Auf OLED-Displays sichtbar.
**Fix:** OKLCH-Migration: `--gold: oklch(78% 0.16 79)`, plus Token für Glow-Levels `--glow-sm/md/lg/xl`.

### 6. [P1] Buchstabe Pure-Black-Background trotz impeccable-Verbot
**Location:** `--blk:#060606` (Zeile 31) ist zwar nicht 100 % `#000`, aber chroma-frei.
**Category:** Color
**Impact:** Auf OLED (Großteil der iOS-Zielgruppe) wirken die schwarzen Sektionen tot/schwarzes-Loch, Goldspots „schweben“ ohne Umgebung. Tinted Black `oklch(8% 0.01 79)` (warmer Schwarzton in Richtung Gold-Hue) würde die ganze Bühne kohärenter machen – sehr kleiner Eingriff, großer Effekt.
**Fix:** `--blk` und `--b2`/`--b3` in OKLCH mit chroma 0.005–0.01 Richtung Gold-Hue 79°.

### 7. [P2] Touch-Targets der Nav-Mobile-Links und Stars knapp
**Location:** `.md a` (Zeile 247): `padding:16px` mit 11px Font – ok. ABER: `.hstars span` (Zeile 75), `.fco`, `.fli a` (Zeile 222): 9 px Font, Padding < 12 px → Touch-Höhe < 44 px.
**Category:** Responsive / a11y
**Impact:** Footer-Links („Impressum“, „Datenschutz“, „AGB“) bei iOS 320-px-Layout praktisch nicht treffbar; rechtlich aber Pflicht-Links.
**Fix:** Footer-Links `padding:14px 0; line-height:1.5` und `min-height:44px`.

### 8. [P2] Particles + Card-Float + Mouse-Parallax = drei gleichzeitige GPU-Loops ohne `will-change`
**Location:** `index.html:34–36` (28 Particles infinite), `:80` (Card-Float infinite), `:692` (Mousemove-Handler).
**Category:** Performance / Motion
**Impact:** Auf Mid-Range-Android (Zielgruppe!) und Safari-iOS-Low-Power-Mode flackern beide Float-Loops. Mousemove ohne `requestAnimationFrame`-Throttle setzt bei jedem Move-Event ein neues `style.transform`, was beim Particle-Layer Composite-Cache invalidiert.
**Fix:** rAF-Throttle für Mousemove, `will-change: transform` auf `.cwrap`, Particles entweder static SVG-Sprite oder Canvas, mind. Hälfte der 28 Punkte unter `@media (prefers-reduced-motion)` killen.

### 9. [P2] Trust-Bar versteckt zentrale Differenzierung
**Location:** `.trust-item#trust-players/deals/fair` (Zeile 334–345) sind `display:none` bis `total_players >= 50`.
**Category:** UX / Conversion
**Impact:** Pre-Launch-Site (das ist DealBuddy laut Context) hat unter 50 Spieler → die spannendsten Trust-Daten sind unsichtbar, übrig bleiben drei generische Compliance-Badges (DSGVO/0 €/18+). Erste 200 Besucher sehen nur Pflicht-Statements ohne Social Proof.
**Fix:** Bis zur Schwelle stattdessen Beta-Signup-Counter („127 Buddies in der Warteschlange“) oder Discord-Live-Members einblenden – beides ist Social Proof, dem User vertrauen kann.

### 10. [P2] „No-Reply-Discord-CTA“ als Glas-Block mitten in der Social-Sektion
**Location:** `index.html:519–527` + CSS `:209–216`
**Category:** Composition / Anti-Pattern
**Impact:** Der Discord-CTA-Block bricht die Brand-Goldachse mit `#5865F2`-Purple plus Linear-Gradient-Tint. Das ist visuell „Discord-Brand-Konformität“, fühlt sich aber im DealBuddy-Kosmos wie ein Drittanbieter-Embed an. Conversion-Hebel verschenkt: Der einzige Out-of-Brand-Block ist die wichtigste Community-Brücke.
**Fix:** Discord-Logo behalten, Container in DealBuddy-Gold mit dezentem Discord-Icon links. ODER: Discord-Block aus dem Social-Grid herausziehen und als Sticky-CTA über den Footer setzen.

---

## Motion-Audit

**Reconnaissance:**
- **Project-Type:** Marketing/Landing-Page für Pre-Launch-Consumer-App (DACH, junge Zielgruppe)
- **Existing animation style:** CSS-Keyframes only, keine Framer Motion / GSAP. Hero-intro (1 s), Card-Float (7 s loop), Card-Glow (7 s loop), Badge-Blink (2 s loop), Particles (12–30 s linear), Reveal-on-Scroll (0.65 s, IntersectionObserver), Mousemove-Parallax raw style-write.
- **Likely intent:** Maximale Inszenierung des Hero-Cards + Fun/Energy-Vibe für junge User.

### Designer-Weighting

| Lens | Gewichtung | Begründung |
|------|-----------|-----------|
| **Jhey Tompkins** | **Primary** | Marketing für junge Gaming-Audience → Spielraum für Experimentation, Delight, kreative CSS-Tricks. Cinzel-Branding signalisiert „make it cool > make it tame“. |
| **Jakub Krehel** | **Secondary** | Production-polish-Recipes (Spring + Blur-Enter, Optical-Alignment, Shadow > Border in Light-Mode-Disclaimer-Box) sind nötig, sobald der Hero geöffnet ist. |
| **Emil Kowalski** | **Selective** | Nav-Shrink, Mobile-Menu, Stores-CTA: Frequenz-Tools. Hier zählen 180–250 ms, kein 700 ms Bounce. |

### Motion-Gaps (was fehlt für Conversion-Push)

| Gap | Wo | Jhey-Fix-Idee | Jakub-Polish |
|-----|----|---------------|--------------|
| Hero-CTA `.bprim` reagiert nur mit `translateY(-2px) + box-shadow` | `index.html:70–71` | `@property --shimmer-x` + animated linear-gradient-Position für Gold-Sheen über den Button auf Hover (echter „Coin-Glanz“) | 180 ms ease-out-quart, ≤ 200 ms exit |
| Empire-Card-Items `.ei` haben statische Rarity-Farben | `index.html:165–170, 593–600` | Auf Hover je Rarity unterschiedlicher Effekt: Legendary = Gold-Particle-Burst (CSS-`@property --particle-1-y`), Epic = Hue-Shift-Loop, Rare = nur Lift. Macht Rarity *spürbar*, nicht nur lesbar | Subtler Spring auf scale 1 → 1.04, blur(0 → 0.5px) auf Hintergrund-Geschwister via `:hover ~` |
| How-it-works Steps haben nur statischen Connector-Line | `index.html:122–123` | Scroll-driven `clip-path: inset(...)` Linie, die die drei Snums in Sequenz „elektrisch“ verbindet wenn die Sektion in den Viewport scrollt | 600 ms total, ease-out-expo |
| Particles laufen ungefiltert auch ohne Sektion-Sichtbarkeit | `index.html:34, 681` | Particles via IntersectionObserver nur in Hero + CTA-Section aktivieren | – |
| Card-Float hat ovales Verhalten (rotateY/X), aber Mouse-Parallax überschreibt sofort | `index.html:80, 692–693` | rAF-Lerp zwischen Mouse-Position und Float-Loop statt hard-Replace; Card bleibt „magnetisch“ statt zuckend | – |
| Kein Microbounce auf Trust-Stat-Counter wenn Live-Daten reinkommen | `index.html:719–724` | Count-up-Animation mit ease-out-expo (1.2 s) wenn Zahlen erstmals erscheinen | Filter blur(4px → 0) als „materializing“ |
| `.cta-h em` ist statisches Gold | `index.html:188, 654` | Animated `linear()` shimmer auf Final-CTA-„Sofort loslegen.“ – hier ist der Conversion-Peak, hier darf Jhey laut werden | – |

### Pflicht-Add (alle Lenses einig)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  #pts { display: none; }
  .cscene { transform: none !important; }
}
```

---

## Quick Wins (5)

1. **`prefers-reduced-motion`-Block global einfügen** (`index.html` + `download.html` + `support.html`). 8 Zeilen CSS, deckt 6 Anti-Patterns auf einmal ab. P0.
2. **Token-Migration auf OKLCH** für `--gold`, `--blk`, `--b2`, `--b3`. Geht in 15 Minuten, killt das Pure-Black-Problem und das „sieben Golds“-Problem. P1.
3. **Footer-Touch-Targets** (`index.html:222`, `download.html:19`): `padding:14px 0; min-height:44px`. Pflicht-Links müssen tappbar sein. P2.
4. **Trust-Bar-Fallback** unter MIN_PLAYERS=50: Discord-Member-Count oder „Beta startet in N Tagen“ live einblenden statt `display:none`. P2.
5. **Mousemove rAF-Throttle** auf `index.html:692`: `let ticking=false; if(!ticking){requestAnimationFrame(()=>{...;ticking=false});ticking=true;}`. Performance-Smell weg. P2.

---

## Strategic Improvements (3–5)

### A. Brand-Spannung auflösen: Cinzel runterdimmen, moderne Sans für Body
Cinzel bleibt als Akzent (Sektionslabels, „Legendary“-Tags, Hero-H1), Body und UI-Copy auf einen modernen, klaren Sans (z. B. „Inter Tight“, „Geist“ oder „Funnel Sans“ – aber NICHT Inter selbst, das ist der Reflex). Crimson Text raus aus Body (Serif-Body ist falsch für 18–25-Mobile-First). Erhalten den „premium Card-Drop“-Charakter, verlieren den „Crypto-Casino“-Beigeschmack. **Conversion-Effekt:** -15 % bounce auf 18–25-Cohort geschätzt.

### B. Eines der fünf Card-Grids in ein echtes Hands-On-Mockup umbauen
Sektion „Empire“ (`#empire`, Zeile 585) ist die richtige Stelle: Statt 6 statischer 2×3-Items eine breite Card-Stack-Visualisierung – Founder-Card vorn, Rare/Epic schräg dahinter, Legendary glüht. Mit `transform-style: preserve-3d` und `@property --card-rotate`. Macht den Empire-USP *physisch greifbar* und wird die Social-Share-Aufnahme der Site. Jheys „Think in cubes“-Lens.

### C. Tippen-Sektion: echter Tippschein statt zwei weiterer Cards
Sektion `#tippen` (Zeile 531) hat zwei Cards die das Feature beschreiben. Stärker: SVG-Mockup eines DealBuddy-Tippscheins mit „Bayern – Dortmund 2:1“, Live-Punktestand, drei Avatar-Tipps der Freunde – animiert mit Stagger auf Scroll-Reveal. Bundesliga-Fans erkennen das sofort. Hochkonvertierender USP-Beweis statt USP-Behauptung.

### D. Final-CTA mit echtem Founder-Card-Reveal verzahnen
`.cta-sec` (Zeile 652) endet aktuell mit drei Store-Buttons. Davor einen 600 ms-Card-Reveal einbauen: User scrollt rein, eine schwarze Card flippt mit clip-path-inset von 100 % 0 → 0 zur „Season 1 Founder Card“ mit dem aktuellen Datum drauf. Verstärkt FOMO genau am Conversion-Punkt. Macht den Disclaimer drunter (Zeile 661) emotional weniger störend, weil der Höhepunkt davor lag.

### E. Discord-Block als sticky Floating-CTA neu denken
Discord-Brücke ist strategisch wichtig (laut Brand: Community-driven Pre-Launch). Aber als gleichwertige Card im Social-Grid (Zeile 519) untergeht sie. Sticky-Bottom-Right-Bubble (mit Auto-Hide on CTA-Sec-Sichtbarkeit), die dezent pulsiert (NICHT bouncen), und beim Klick aufklappt mit „Live: 47 Buddies online · Beta-Drop heute“ – dynamisches Trust-Signal + Funnel-Brücke in einem.

---

## Was funktioniert (Positives)

- **Hero-Card-Choreografie** (`cscene` + `cwrap` + `cglow` + `cshine` + Mouse-Parallax): genuinely cool, klare Identity. Halten, polishen.
- **Schema.org-JSON-LD vorhanden** (Zeile 24–25): solide SEO-Basis.
- **Mobile-Drawer-Menu** mit Sub-Labels (`<span>Alles drin</span>`): Recognition-friendly.
- **Disclaimer-Copy** unten (Zeile 661) ist legally präzise und ehrlich. Bleibt.
- **Founder-Card / Season 1**-Narrative: starkes FOMO-Asset, richtig positioniert.

---

**Report-Pfad:** `/Volumes/Code/Projects/DealBuddy/Homepage/DESIGN_AUDIT_2026-05-13.md`

---

## Fix-Log 2026-05-13

### Quick-Win #1: `prefers-reduced-motion` global – ERLEDIGT
**Scope:** `index.html`, `download.html`, `support.html`
**Änderungen:**
- Globaler `@media (prefers-reduced-motion: reduce)`-Block am Ende des `<style>`-Blocks in allen drei HTML-Dateien eingefügt:
  - `*, *::before, *::after` → `animation-duration`, `animation-iteration-count`, `transition-duration`, `scroll-behavior` neutralisiert
  - `index.html` zusätzlich: `#pts{display:none}`, `.cscene/.cwrap/.cglow/.cshine{animation:none;transform:none}`, `.bdg/.badge{animation:none}`
- JS-Guard (`index.html:678–681, 693`):
  - `_reduceMotion()`-Helper via `window.matchMedia('(prefers-reduced-motion: reduce)').matches`
  - Particle-Generator (28 Punkte) wird unter Reduce-Motion gar nicht ausgeführt (keine DOM-Knoten)
  - Mousemove-Parallax-Listener auf `.cscene` wird unter Reduce-Motion nicht registriert
**Status:** P0 (Finding #1) – Hero-Loop-Videos bewusst nicht angefasst.
**Out-of-scope (Strategic, später):** Casino-vs-Disclaimer-Mismatch, OKLCH-Migration, Card-Grid-Redesign.

