---
name: latansa-art-direction
description: Art direction for the LATANSA JOGJAKARTA corporate website ("Modern Institutional Elegance", concept "Kop"). Use before any visual decision or UI implementation in this repo — layout, composition, typography, color, logo placement, imagery, and motion intent — and when reviewing whether a design looks premium, credible and non-generic. Enforces the letterhead concept, the Deep Ink / Porcelain palette, mobile-first composition, official-logo rules and the anti-template list.
---

# LATANSA art direction — "Kop"

**Binding spec:** `docs/art-direction.md`, `docs/motion-spec.md` and `docs/image-assets.md`.
Read them before any UI work. This skill is the short version; if anything here differs, the
docs win. Visual reference: `docs/design/phase-3-board.html` (the `design-board` launch config,
then `/docs/design/phase-3-board.html`).

Use together with the official `frontend-design` skill (method) and `motion` (mechanics).

## Concept in one line

The company introduces itself the way Indonesian institutions do: on letterhead. The hero is a
_kop surat_ (logo, address, thick-over-thin rule) above a large editorial serif headline; the same
rule closes the page in the footer. Everything between is quiet and typographic.

## Non-negotiables

- **Kop rule** (3px ink, 3px gap, 1px ink) appears only under the hero letterhead and at the top
  of the footer.
- **Fonts**: Newsreader (display/headings/lead, optical sizes) and Plus Jakarta Sans
  (text/UI/data). Self-hosted via `next/font`. Type scale in art-direction §3.
- **Color mass**: Porcelain ground, exactly one full-bleed Ink band (procurement), exactly one
  full-bleed Stone band (company data). Champagne only on Ink. Use the semantic tokens and the
  contrast table in art-direction §4. Slate on Stone fails: use `slate-deep`.
- **Logo**: official full-color artwork on Porcelain only. Horizontal in kop and compact header,
  vertical once as the contact sign-off, symbol for icons. Never on Ink or Stone, never recolored,
  cropped, outlined or animated in parts. No monochrome derivative.
- **Layout**: left-aligned; 4/8/12-column grid; desktop headings in columns 1–5 with content in
  6/7–12. Compose 360px first, then 390 → 430 → 768 → 1024 → 1440 → 1920.
- **Motion**: one orchestrated hero load (rule draw and headline mask) plus the compact header.
  Everything else answers the user (menu, hover, press). No section fade-ups. Full catalog in
  `docs/motion-spec.md`.
- **Imagery**: optional and additive. Never an empty placeholder frame. Never documentary-looking.

## Rejected on sight (template tells)

- uppercase tracked eyebrow labels;
- 01/02/03 numbering for things that aren't a sequence (the sectors aren't one);
- middle-dot meta strings (`A · B · C`);
- `→` appended to link or button text;
- a single italic or colored word inside a headline;
- cards or identical boxes;
- gradients, glassmorphism or blur, shadows, neon or glow;
- textures and patterns, including guilloche (tried and rejected);
- counters, stats, badges and seals (no verified numbers exist);
- logo walls and testimonial carousels;
- pricing UI;
- looping or decorative animation, parallax, scroll-jacking;
- a CTA that says one thing and does another.

## Self-check before handing off

1. Does the 360×780 first screen look composed and premium on its own?
2. Is the kop recognizable, with logo, address, rule and headline on one left edge?
3. Could this layout belong to any other company? If yes, remove the generic part.
4. Is every color pairing in the art-direction §4 contrast table?
5. Is every fact rendered through the provenance rules (`latansa-public-content`)?
6. Does every motion appear in `docs/motion-spec.md`, with a reduced-motion state?
7. Do the acceptance criteria in art-direction §12 pass?
