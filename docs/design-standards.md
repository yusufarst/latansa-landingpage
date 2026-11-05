# Design standards — Modern Institutional Elegance

These are the fixed standards. The full Phase 3 art direction (concept "Kop", final type scale,
grid, section wireframes, critique log) is in [art-direction.md](art-direction.md), and the motion
catalog in [motion-spec.md](motion-spec.md). Those documents are binding.

## Palette

| Token       | Hex       | Role                                                         |
| ----------- | --------- | ------------------------------------------------------------ |
| `ink`       | `#172B36` | Primary text, dark surfaces, primary actions                 |
| `porcelain` | `#F7F6F2` | Page background, text on dark                                |
| `slate`     | `#526B78` | Secondary text, metadata                                     |
| `champagne` | `#B69A75` | Accent on Ink only: link underline, focus ring, band divider |
| `stone`     | `#D9DFDE` | Company-data band, dividers, secondary text on Ink           |

Phase 3 adds two functional shades: `ink-soft` `#24404E` (hover on Ink buttons, porcelain text
10.1:1) and `slate-deep` `#46606C` (secondary text on Stone, 4.9:1; plain slate fails there at
4.2:1). Full token and contrast tables: [art-direction.md §4](art-direction.md#4-final-color-tokens).

Tokens are defined in [`src/app/globals.css`](../src/app/globals.css) with semantic aliases
(`surface`, `text`, `text-muted`, `accent`, `line`, …). Prefer semantic aliases in components.

### Contrast (WCAG 2.x)

| Pair                   | Ratio      | Allowed use                                     |
| ---------------------- | ---------- | ----------------------------------------------- |
| ink on porcelain       | ≈ 13.5 : 1 | Any text                                        |
| slate on porcelain     | ≈ 5.2 : 1  | Body and secondary text                         |
| champagne on ink       | ≈ 5.5 : 1  | Text on dark surfaces                           |
| champagne on porcelain | ≈ 2.5 : 1  | **Not for text.** Decorative lines/details only |

The logo's original red, blue and gray are **not** part of the UI palette. They appear only in
the logo artwork itself.

## Typography

Display, headings and lead: **Newsreader** (OFL, optical sizes). Text, UI and data: **Plus Jakarta
Sans** (OFL, Tokotype, Indonesia). Both self-hosted via `next/font`. Geist (provisional in
Phase 1) is replaced in Phase 4. Scale: [art-direction.md §3](art-direction.md#3-typography).

## Mobile-first — mandatory

Design, code and review order:

1. **360px and 390px** — primary smartphone experience
2. **430px** — larger smartphone (`xs:`)
3. **768px** — tablet (`md:`)
4. **1024px** — laptop (`lg:`)
5. **1440px** — desktop (`2xl:`)
6. **1920px** — large desktop (`3xl:`)

Requirements:

- Unprefixed Tailwind classes are the 360px design; breakpoints only add upward.
- Each breakpoint is an intentional composition, not a stretched mobile layout.
- Review real mobile screenshots before any desktop refinement.
- Touch targets ≥ 44×44px; mobile body text ≥ 16px; comfortable line length.
- No horizontal overflow at any width; no cumulative layout shift.
- Mobile motion is lighter (shorter distances, fewer staggered elements).
- `prefers-reduced-motion: reduce` removes non-essential motion entirely.
- Final verification on the exported static build (`out/`).

## Avoid

Generic SaaS templates, hero-with-three-feature-cards patterns, repetitive card grids, heavy
gradients, glassmorphism, neon glows, stock "handshake" clichés, decorative or looping motion
without purpose, scroll-jacking. No Lenis unless technically justified in the motion spec.

## Logo

See [brand-assets.md](brand-assets.md). Never recolor, filter, distort or redraw the logo.
