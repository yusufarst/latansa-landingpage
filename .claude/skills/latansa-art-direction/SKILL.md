---
name: latansa-art-direction
description: Art direction for the LATANSA JOGJAKARTA corporate website ("Modern Institutional Elegance"). Use before any visual decision or UI implementation in this repo — layout, composition, typography, color, logo placement, imagery, and motion intent — and when reviewing whether a design looks premium, credible and non-generic. Enforces the Deep Ink / Porcelain palette, mobile-first composition, official-logo rules and the anti-template list.
---

# LATANSA art direction — Modern Institutional Elegance

The site must read like a high-end studio project for an institution, not a template. The
audience is government and institutional procurement officers: they reward clarity, order,
restraint and evidence of seriousness. Distinctive, but never flashy.

Use together with the official `frontend-design` skill (aesthetic method) and `motion` skill
(animation mechanics). This skill decides **what fits LATANSA**; those decide how.

Read first: `docs/design-standards.md`. If `docs/art-direction.md` and `docs/motion-spec.md`
exist (Phase 3 output), they are the binding spec — follow them over anything generic here.

## Identity in one line

Editorial calm with institutional precision: deep ink, warm porcelain paper, champagne hairlines,
confident serif display type, and generous, deliberate whitespace.

## Palette (tokens in `src/app/globals.css`)

| Token       | Hex     | Use                                                             |
| ----------- | ------- | --------------------------------------------------------------- |
| `ink`       | #172B36 | Text, dark sections, primary actions                            |
| `porcelain` | #F7F6F2 | Page ground, text on ink                                        |
| `slate`     | #526B78 | Secondary text, metadata                                        |
| `champagne` | #B69A75 | Hairlines, rules, numerals, small accents; text **only on ink** |
| `stone`     | #D9DFDE | Dividers, quiet surfaces                                        |

- Champagne on porcelain is ≈ 2.5:1 — never for text or meaningful icons.
- Use semantic aliases (`text`, `text-muted`, `surface`, `surface-inverse`, `accent`, `line`).
- Mostly porcelain with one or two decisive ink sections. Champagne is a seasoning (< 5% of
  any viewport).
- The logo's red/blue/gray are not UI colors. Do not build accents from them.

## Typography

- Provisional pair: **Newsreader** (display, serif) + **Geist** (text, sans), self-hosted via
  `next/font`. Phase 3 may replace them with other free/OFL faces.
- Hierarchy through scale, weight and space — not color or boxes.
- Display sizes fluid with `clamp()`; mobile h1 ≈ 2.25–2.75rem, desktop up to ~5rem.
- Body ≥ 16px on mobile, line length 60–75 characters, generous leading (1.5–1.65).
- Small caps / letter-spaced labels (`tracking-[0.2em] uppercase text-sm`) for section
  eyebrows and metadata — sparingly.
- Indonesian copy: `text-balance` for headings, `text-pretty` for paragraphs; watch long
  compounds like "Kelembagaan" at 360px.

## Composition

- Mobile-first: compose for **360px first**, then 390 → 430 → 768 → 1024 → 1440 → 1920. Each
  step is an intentional recomposition (asymmetry, column shifts, offsets), not a stretched
  mobile stack.
- Editorial grid: 4 columns mobile, 8 tablet, 12 desktop; let headings break the grid
  deliberately; use hairline rules (`border-line` / champagne) to structure.
- Vary section rhythm: full-bleed ink band, asymmetric split, indexed list, quiet statement.
  Never three identical cards in a row as the main pattern.
- Generous vertical spacing (mobile 64–96px between sections, desktop 128–192px).
- Present categories as an indexed editorial list (01–05) or a typographic table — not a
  product grid, never with prices.
- Legal identity (incl. "Status Perpajakan: Pengusaha Kena Pajak (PKP)") is set like a
  colophon/definition list: restrained, precise, no badges or seals.

## Logo

- Use `<BrandLogo>` (`src/components/brand/brand-logo.tsx`): horizontal in the navbar
  (≥ 140px wide at 360px), vertical only for identity moments (e.g. closing section), symbol
  for icons.
- Full-color logo on porcelain/white only. Never recolor, filter, outline, distort, rotate,
  animate its parts, or place it on busy imagery.
- A monochrome/reversed derivative for ink surfaces may be proposed in Phase 3; it must keep
  exact geometry and needs explicit user approval before use.

## Imagery

- Supporting, illustrative imagery only; see `docs/image-assets.md`.
- Design must be complete without photos. Image slots are framed deliberately (crop, ratio,
  grading to palette), never decorative filler.
- Never imply documentary evidence (staff, office, deliveries, handovers, clients).

## Motion intent

- Purpose first: reveal hierarchy, confirm interaction, guide reading order. No decoration.
- Typical vocabulary: short opacity + 8–16px translate reveals; hairline draw-ins; subtle
  hover underline/arrow shifts; one considered hero entrance. Easing `--ease-institutional`,
  durations 180–640ms.
- Mobile: fewer animated elements, shorter distances, no parallax, no scroll-jacking.
- `prefers-reduced-motion: reduce` → no transforms; content visible immediately.
- No Lenis or smooth-scroll libraries unless `docs/motion-spec.md` justifies it technically.
- Animate only `transform`/`opacity`; never cause layout shift.

## Anti-patterns (reject on sight)

Generic SaaS hero + 3 feature cards; repetitive card grids; gradients as decoration;
glassmorphism/blur panels; neon or glow; drop-shadow stacks; emoji/icon-sticker clutter;
stock "handshake" or "business team" imagery; marquee logo walls (no client logos exist);
counters/stats (no verified numbers exist); testimonial carousels; badge-style "certified"
seals; pricing tables; looping background animation.

## Self-check before handing off a design

1. Does 360px look intentional and premium on its own?
2. Could this layout belong to any other company? If yes, push it further toward LATANSA's
   institutional, editorial identity.
3. Is every color pairing within the contrast table?
4. Is every claim on screen backed by a publishable fact in `src/content/`?
5. Does every animation have a stated purpose and a reduced-motion fallback?
