---
name: latansa-art-direction
description: Art direction for the LATANSA JOGJAKARTA corporate website ("Modern Precision Corporate"). Use before any visual decision or UI implementation in this repo — layout, composition, typography, color, logo placement, photography, and motion intent — and when reviewing whether a design looks premium, credible and non-generic. Points to the approved (or pending) direction, and enforces mobile-first composition, official-logo rules, contrast and the anti-template list.
---

# LATANSA art direction — Modern Precision Corporate

## Current status (check first)

- The first direction, **"Kop", was rejected** (2026-11-05) as too basic and conservative. Its
  docs (`docs/art-direction.md`, `docs/motion-spec.md`) are marked superseded. **Do not implement
  from them.**
- Concepts A (Presisi) and B (Terang) used illustrated artwork. Neither was approved.
- **Photorealistic imagery is mandatory** (client, 2026-11-05). Isometric, flat SVG or cartoon
  objects never satisfy it.
- The current proposal is **Concept C · Presisi Terang**:
  - Presisi's navy and brass character;
  - Terang's ivory breathing room;
  - licensed professional photography graded as one family;
  - brass annotation markers as the signature.

  Spec: `docs/design/phase-3-photographic-direction.md`. Photo provenance:
  `docs/design/concepts/photos/SOURCES.md`. Image rules: `docs/image-assets.md`.
  Boards: `docs/design/concepts/` (launch config `design-board`, then `/docs/design/concepts/`).

- **No UI implementation until the owner approves one direction** and its binding spec replaces
  `docs/art-direction.md` and `docs/motion-spec.md`. After approval, those two files win over this
  skill.

Use together with the official `frontend-design` skill (method) and `motion` (mechanics).

## Standard

The site must look like a high-budget, art-directed agency project and stay credible for
Indonesian government and institutional procurement. Spend boldness on one signature (the hero
artwork and its motion); keep everything around it disciplined. Use deliberate contrast, scale
and density changes between sections, not just whitespace.

## Non-negotiables (any direction)

- **Mobile first:** compose 390px first, then 360 and 430, then 768 → 1024 → 1440 → 1920. The
  first screen at 390×844 must show the signature artwork, the headline and the primary CTA.
- **Logo:** official full-color artwork only, always on a light surface (ivory header or footer);
  never recolored, cropped, outlined or animated in parts.
- **Imagery:** realistic photography with verified commercial-use rights (currently the Unsplash
  License), graded as one family and cropped only, never composited.
  - No people, logos, readable trademarks, warehouses, classrooms or delivery scenes.
  - Always labelled illustrative; never documentary.
  - Diagrams (flow, locator) are information graphics, not substitutes for photography.
- **No grey placeholders, ever.** If an image is not available, the composition must be complete
  without it.
- **Contrast:** every text pair ≥ 4.5:1 (large display ≥ 3:1), measured. The tables are in the
  concept doc.
- **Motion:**
  - one orchestrated hero entrance;
  - purposeful scroll moments, each defined per direction;
  - responses to user actions (menu, hover, press);
  - animate only `transform`, `opacity` and `clip-path`;
  - no scroll hijacking, heavy 3D or parallax;
  - reduced motion shows final states.

## Rejected on sight (template tells)

- uppercase tracked eyebrow labels;
- 01/02/03 numbering for things that aren't a sequence;
- middle-dot meta strings;
- `→` appended to button text (an external-link icon is fine);
- a single italic or colored word in a headline;
- identical rounded cards with soft shadows;
- gradients as decoration, glassmorphism or blur panels, neon or glow;
- stats or counters, badges and seals (no verified numbers exist);
- logo walls, testimonial carousels, pricing UI;
- looping decorative animation;
- a CTA that says one thing and does another.

## Self-check before handing off

1. Does the 390×844 first screen look composed and premium on its own?
2. Could this page belong to any other company? If yes, push it toward LATANSA's subject: the
   categories it supplies, procurement and precision.
3. Is every color pair in the measured contrast table?
4. Is every fact rendered through the provenance rules (`latansa-public-content`)?
5. Does every motion have a purpose and a reduced-motion state?
