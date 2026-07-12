# helenazhang.com — Behavior Bible

## Interaction Model: Static content, CSS-driven interactions

### Scroll behaviors
- No scroll-driven animations
- No sticky elements
- No IntersectionObserver
- No smooth scroll library (vanilla browser scrolling)

### Hover behaviors
- **Article images**: `filter: grayscale(100%)` by default → `grayscale(0%)` on article hover
  - Transition: `filter 0.33s ease`
  - Selector: `.grayscale-hover img` / `.grayscale-hover:hover img`
- **Highlight links**: Sliding yellow (#FFEF8D) background on hover
  - CSS: `background: linear-gradient(to right, #FFEF8D 50%, transparent 50%)`
  - `background-size: 205% 100%`, `background-position: right bottom` → `left bottom`
  - Transition: `background 0.25s ease`

### JS behaviors
- **quote.js**: Cycles through random status messages on page load (🎵 Listening: X, 🎮 Playing: X, 📺 Watching: X, 📚 Reading: X)
- **date.js**: Updates the copyright year dynamically
- **static.js**: Animates TV noise on the `#static` canvas at the page bottom
- **lazy.js**: Lazy-loads images using IntersectionObserver (data-src → src)

### Responsive breakpoint: 848px
- Below 848px: columns stack vertically, borders removed, some elements rearrange
- `reverse-mobile` class flips column order on mobile (Phosphor Icons section)

### Text selection
- Custom selection: white text on black background (`::selection`)
