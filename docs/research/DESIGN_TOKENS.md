# helenazhang.com — Design Tokens

## Colors
- Background: `white`
- Text: `black` (`rgb(0,0,0)`)
- Selection: `white` on `black`
- HR/borders: `black`
- Highlight accent: `#FFEF8D` (yellow)

## Typography
- **Body/mono font**: `MaisonNeue`, `Courier`, monospace
  - Base: `13px`, `18px` line-height, `-0.2px` letter-spacing
- **Display/heading font**: `CooperBTLight`, `Cambria`, serif
  - Profile bio: `32px / 40px`
  - Article titles (h2/h3): `24px / 32px`
  - Site title (h1): `24px / 32px`
- **Footer**: `11px`

## Spacing
- Page max-width: `1320px`
- Page padding-top: `32px`
- Section horizontal padding: `16px` each side
- Column gap: `12px` each side (24px total between columns)
- HR margin: `16px 0`
- Section heading margin-bottom: `16px`
- Columns margin-bottom: `24px`

## Layout
- Mobile breakpoint: `848px`
- Column structure: Bulma-style flexbox

## Borders
- `hr`: `1px solid black`
- `hr.thick`: `2px solid black`
- `hr.double`: `border-top: 2px, border-bottom: 1px`, `height: 9px`
- Column dividers (desktop): `border-right: 1px solid black` on non-last columns

## Transitions
- Image grayscale: `filter 0.33s ease`
- Highlight link: `background 0.25s ease`

## Assets
- Fonts: self-hosted woff2/woff in `/fonts/`
- Icons: custom SVGs in `/icons/`
- Images: `@2x` PNG/WebP in `/images/`
