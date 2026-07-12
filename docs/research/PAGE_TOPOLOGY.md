# helenazhang.com — Page Topology

## Overall structure
- Static HTML site using Bulma CSS + custom overrides
- `max-width: 1320px` centered page container (`.page.is-mono`)
- All sections padded `0 16px`

## Sections (top to bottom)

### 1. Header (`section#header`)
**Interaction: static**
- 3-column flex row: [status/quote] [———] [Helena Zhang] [———] [nav links]
- Thick HR (2px) with `@minoraxis` handle (`.handle`) positioned 11px up via `relative; bottom: 11px`
- Thin HR separator
- `article#profile`: 25% avatar column + 75% bio column (CooperBTLight 32px)

### 2. Articles (`section#articles`)
**Interaction: hover (grayscale → color)**
- `hr.double` separator
- Section heading: Medium icon + "Articles" h2
- 4-column grid of article cards
- Each card: image → title (CooperBT 24px) → description → external link

### 3. Design (`section#design`)
**Interaction: hover (grayscale → color)**
- `hr.double` separator
- Section heading: pen-nib icon + "Design" h2
- `article#phosphor.columns.reverse-mobile`: text (is-4, 33%) | image (67%)
- Row 2 `.columns`: TRI (is-half, 50%) | hr.is-mobile | Waze | hr.is-mobile | PayPal
- Row 3 `.columns`: SoulCycle | hr.is-mobile | Phosphor Android (is-half, 50%) | hr.is-mobile | Prolific
- `figure.image.is-fullwidth`: large Phosphor for Android banner (6:1 aspect, links to Play Store)

### 4. Dribbble (`section#dribbble`)
**Interaction: hover (grayscale → color)**
- `hr.double` separator
- Section heading: dribbble-logo icon + "Snapshots from Dribbble" h2
- 3-column grid

### 5. Footer (`section#footer`)
**Interaction: static**
- Thin HR
- 2-column footer: "Copyright © YEAR Helena Zhang" | "Built by Toby Fried"
- Year updated by date.js

### 6. Static noise bar (`#static`)
- `height: 56px; background: black`
- static.js draws animated noise via canvas requestAnimationFrame
