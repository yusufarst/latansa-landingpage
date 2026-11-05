# Design standards: Modern Precision Corporate

The approved direction is **Concept C · Presisi Terang** (owner approval, 2026-11-05). Its binding
spec is [art-direction.md](art-direction.md), [motion-spec.md](motion-spec.md) and
[image-assets.md](image-assets.md); they win over this summary. The mobile-first, contrast, logo
and content rules below apply to all work.

## Palette

| Token        | Hex       | Role                                                        |
| ------------ | --------- | ----------------------------------------------------------- |
| `ivory`      | `#F2EEE6` | Page ground: header, hero, profile, data section, footer    |
| `paper`      | `#FAF8F4` | Catalogue band; data sheet                                  |
| `navy`       | `#0E1D2D` | Text; procurement band; primary buttons on light            |
| `midnight`   | `#08131F` | Contact band; photo plates and scrim                        |
| `brass`      | `#C9A060` | Brass buttons, markers, flow line; labels and focus on dark |
| `brass-deep` | `#7A5A28` | Section labels, icons and focus ring on light               |
| `slate`      | `#4E6175` | Secondary text on light                                     |
| `mist`       | `#A9B6C4` | Secondary text on dark                                      |

Supporting shades are `raised` `#142A3F`, `brass-hi` `#DDB979` and `stone` `#DED8CC`. The full
token, alias and contrast tables are in
[art-direction.md §4](art-direction.md#4-color). Phase 4 replaces the provisional Phase 1 tokens in
[`src/app/globals.css`](../src/app/globals.css). Components use the semantic aliases (`surface`,
`text`, `text-muted`, `accent`, `line`, and so on).

### Contrast (WCAG 2.x, measured)

| Pair                | Ratio  | Allowed use                                |
| ------------------- | ------ | ------------------------------------------ |
| navy on ivory       | 14.7:1 | Any text                                   |
| slate on ivory      | 5.5:1  | Secondary text, labels                     |
| brass-deep on ivory | 5.5:1  | Section labels, focus ring                 |
| mist on navy        | 8.3:1  | Secondary text on dark                     |
| brass on navy       | 7.0:1  | Labels, focus ring and accents on dark     |
| brass on ivory      | 2.1:1  | **Never** for text, focus or meaningful UI |

The logo's original red, blue and gray are **not** part of the UI palette. They appear only in the
logo artwork itself.

## Typography

- **Archivo** (OFL), variable width and weight, carries display, headings, text, UI and data.
  Width is part of the voice: 125% for display, 118% for titles, 112% for labels and UI, 100% for
  running text.
- **Newsreader** (OFL) is used for the profile statement only.
- Both are self-hosted via `next/font`. Geist (provisional in Phase 1) is removed in Phase 4.
- Scale and rules: [art-direction.md §3](art-direction.md#3-typography).

## Imagery

Photorealistic imagery is mandatory: licensed professional photography, graded as one family,
crop-only, and always labelled illustrative. Illustrated, isometric or flat SVG artwork never
substitutes for it. See [image-assets.md](image-assets.md).

## Mobile-first: mandatory

Design, code and review in this order:

1. **360px and 390px**: the primary smartphone experience.
2. **430px**: larger smartphone (`xs:`).
3. **768px**: tablet (`md:`).
4. **1024px**: laptop (`lg:`).
5. **1440px**: desktop (`2xl:`).
6. **1920px**: large desktop (`3xl:`).

**Requirements:**

- **Building up:** unprefixed Tailwind classes are the 360px design; breakpoints only add upward.
- **Intent:** each breakpoint is an intentional composition, not a stretched mobile layout.
- **Review order:** review real mobile screenshots before any desktop refinement.
- **Ergonomics:** touch targets ≥ 44×44px; mobile body text ≥ 16px; comfortable line length.
- **Stability:** no horizontal overflow at any width; no cumulative layout shift.
- **Motion:** mobile motion is lighter (shorter distances, smaller scale).
  `prefers-reduced-motion: reduce` shows final states.
- **Sign-off:** final verification runs on the exported static build (`out/`).

## Avoid

- generic SaaS templates and hero-with-three-feature-cards patterns;
- repetitive card grids with soft shadows;
- gradients as decoration, glassmorphism, neon glows;
- stock "handshake" or team clichés;
- decorative or looping motion without purpose, and scroll-jacking.

No Lenis: the motion spec does not justify it.

## Logo

See [brand-assets.md](brand-assets.md). Never recolor, filter, distort or redraw the logo. It sits
only on ivory (header and footer).
