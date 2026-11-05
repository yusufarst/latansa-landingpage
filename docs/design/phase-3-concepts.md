# Phase 3: two creative directions (review)

> **Decided (2026-11-05).** The client made **photorealistic imagery mandatory**, and neither A nor B
> was approved. The owner approved the photographic direction **Concept C · Presisi Terang**. Its
> rationale is in [phase-3-photographic-direction.md](phase-3-photographic-direction.md), and the
> binding spec is [art-direction.md](../art-direction.md). A and B remain here for reference only;
> their illustrated hero artwork does not satisfy the brief.

Status: **awaiting the owner's choice.** The first direction, "Kop", was reviewed on 2026-11-05 and
rejected as too basic and conservative. It is archived at
[archive/kop-board-rejected.html](archive/kop-board-rejected.html). This round replaces it with
two genuinely different high-fidelity directions under the new standard, **Modern Precision
Corporate**.

|              | Concept A · **Presisi**                                                                                    | Concept B · **Terang**                                                                                     |
| ------------ | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Board        | [concepts/a-presisi.html](concepts/a-presisi.html)                                                         | [concepts/b-terang.html](concepts/b-terang.html)                                                           |
| Mobile 390   | [hero](concepts/screens/A-mobile-390-hero.webp) · [full page](concepts/screens/A-mobile-390-full.webp)     | [hero](concepts/screens/B-mobile-390-hero.webp) · [full page](concepts/screens/B-mobile-390-full.webp)     |
| Desktop 1440 | [hero](concepts/screens/A-desktop-1440-hero.webp) · [full page](concepts/screens/A-desktop-1440-full.webp) | [hero](concepts/screens/B-desktop-1440-hero.webp) · [full page](concepts/screens/B-desktop-1440-full.webp) |

**How to view live:** start the `design-board` config in `.claude/launch.json`, then open
`http://localhost:4174/docs/design/concepts/`. Query options:

- `?still` shows final states without animation (used for the screenshots).
- `?menu` opens the mobile menu.

Screenshots were rendered with Chromium at exactly 390px (2×) and 1440px (1×).

Both boards are review mocks, not production code. They load fonts from the Google Fonts CDN;
Phase 4 self-hosts them. All artwork is original SVG drawn in code. There are **no photographs,
no AI images and no grey placeholders**. Every company fact comes from `src/content/` (see
"Content" below).

---

## Concept A · Presisi (midnight precision)

**Idea.** The company's five categories drawn as an _exploded axonometric_: a precision technical
drawing in which each object floats above its footprint on a calibrated platform, with projection
lines, dimension lines and labelled callouts. It says "we supply equipment, and we are exact
about it" without a single claim. The same drawing returns in the sector section as a line-art
blueprint that isolates each category as you read.

**Palette** (all text pairs ≥ 4.5:1):

| Token       | Hex       | Use                                                             |
| ----------- | --------- | --------------------------------------------------------------- |
| Midnight    | `#08131F` | Contact section                                                 |
| Navy        | `#0D1C2C` | Hero, procurement band, primary text on light (14.6:1 on ivory) |
| Raised navy | `#13283D` | Panels on dark                                                  |
| Ivory       | `#F1ECE2` | Page ground, header, footer                                     |
| Paper       | `#F8F5EF` | Sector section, data sheet                                      |
| Mist        | `#A7B4C2` | Secondary text on navy (8.2:1)                                  |
| Slate       | `#4E6175` | Secondary text on ivory (5.4:1)                                 |
| Brass       | `#CFA35E` | Primary CTA (navy text 7.4:1), drawing accents, focus ring      |
| Brass deep  | `#7A5A28` | Small labels on ivory (5.4:1)                                   |

**Type.** **Archivo** in two widths:

- **Expanded (125%):** headlines, an engineered, automotive-precise display face.
- **Normal width:** body and UI.
- **Light 300:** the editorial profile statement.

One variable family, self-hostable.

**Hero.** Navy panel under an ivory header (the logo always sits on ivory). The exploded drawing
leads on mobile, bleeding off both edges. Then come the expanded headline, a factual subline,
the brass "Hubungi via WhatsApp" button, a ghost "Buka toko SIPLah" button and the location line.
On desktop the drawing carries leader-line callouts for each category. A brass measuring ruler
closes the hero, and a five-category rail links to the sector section.

**Sections.**

- **Profile:** light editorial statement plus a fact row.
- **Sectors:**
  - mobile: a swipeable row of blueprint plates with a progress meter;
  - desktop: a sticky blueprint that highlights the category being read.
- **Procurement band:** a dashed flow diagram, CV. Latansa Jogjakarta → SIPLah Toko Ladang → Satuan
  pendidikan.
- **Company data:** a "spec sheet" with crop-mark corners. The Kop double rule survives here as
  its header.
- **Contact:** an abstract contour locator with the office coordinates.
- **Footer:** ivory, opened by the Kop double rule.
- **Detail:** registration marks sit at section corners as a quiet precision detail.

**Motion language: "Kalibrasi" (calibration).**

- **Hero:**
  - the dot grid fades in;
  - the platform edge draws itself;
  - objects drop into their exploded positions (70ms stagger);
  - headline words rise from masks (35ms stagger);
  - the actions, then the callouts, fade up.
- **Navigation:** the header gains a hairline on scroll. The mobile menu is a navy sheet wiped
  down with `clip-path` (550ms). Links rise in a 50ms stagger, and the icon morphs into a cross.
- **Scroll:**
  - sections reveal once (fade plus 18px);
  - each blueprint plate assembles as it enters;
  - the sticky blueprint isolates the active category (others drop to 18% opacity);
  - the procurement flow line draws;
  - the contour rings draw.
- **Buttons and links:** a brass fill sweeps left to right (450ms); the ghost button fills with
  ivory; press moves 1px. Link underlines retract and extend.
- **Section transitions:** the ruler strip, the registration marks, and a deliberate dark/light
  alternation.
- **Reduced motion:** every animation is off and final states render immediately.

## Concept B · Terang (architectural daylight)

**Idea.** A calm architectural still life: office objects from the five categories (binders, a
pencil cup, a monitor, a paper stack with a closed laptop, a router, a cabinet and one ultramarine
cube) standing on a table in window light, with long soft shadows. The categories become a
continuous **shelving unit** of five vitrines. Procurement is a single bold **ultramarine field**,
and the company data sits on an engraved-style **plaque**.

**Palette:**

| Token         | Hex                   | Use                                                                 |
| ------------- | --------------------- | ------------------------------------------------------------------- |
| Wall          | `#EAE3D7`             | Hero wall (window light falls on it)                                |
| Table         | `#E2DBCD`             | Hero table and actions area on mobile                               |
| Ivory / Paper | `#F5F1E9` / `#FAF8F3` | Page grounds                                                        |
| Shelf         | `#E9E4DA`             | Sector section                                                      |
| Bone          | `#E7E1D5`             | Plaque                                                              |
| Navy          | `#12253B`             | Text (12–13.5:1), contact section                                   |
| Ink 2         | `#4C545E`             | Secondary text on wall and table (5.6–6.0:1)                        |
| Muted         | `#5B636D`             | Secondary text on ivory and shelf (≥ 4.8:1)                         |
| Ultramarine   | `#2B3FD1`             | Accent: primary CTA, procurement field, the cube (6.8:1 with ivory) |

**Type.**

- **Plus Jakarta Sans Light (300)**, very large and tight (−0.045em), for display. It was
  designed in Indonesia, so it carries a local and civic note.
- **Newsreader** for editorial statements and the plaque values.
- **Plus Jakarta Sans 400–600** for UI.

**Hero.** The headline sits on the lit wall. On mobile the still life stands below it, and the
table surface continues into the subline and actions, so the CTA literally sits on the table.
On desktop the still life spans the full width beneath a 96px headline, with the subline and
actions in the right column. A window light with mullion shadows falls across the wall.

**Sections.**

- **Profile:** a serif statement plus three light-weight "pillars".
- **Sectors:** one shelving unit, five bays (stacked vertically on mobile, a single row on desktop),
  each with its vignette and a museum-style label.
- **Procurement:** an ultramarine field with an architectural doorway and light beam.
- **Company data:** a plaque with a double inset frame. The Kop double rule survives as its
  ornament.
- **Contact:** navy, with a dusk window.
- **Footer:** ivory with the Kop rule.

**Motion language: "Cahaya" (light).**

- **Hero:**
  - window light slides onto the wall (2.2s);
  - headline words fade up (45ms stagger);
  - objects rise onto the table (90ms stagger);
  - shadows then _cast_ outward, as if the sun moved.
- **Navigation:** the header turns solid on scroll. The mobile menu is an ivory sheet with large
  light-weight links rising (60ms stagger).
- **Scroll:**
  - shelf bays fill as they enter (objects rise, then shadows extend);
  - the ultramarine field expands from a rounded inset panel to full bleed, the signature scroll
    moment;
  - the plaque rule draws.
- **Buttons and links:** pill fills rise from below (550ms); links retract their underline and
  nudge the arrow.
- **Reduced motion:** every animation is off and final states render immediately.

---

## Critical comparison

| Criterion                     | A · Presisi                                                                                                                                                        | B · Terang                                                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| Distinctiveness               | **High.** An exploded axonometric of the actual categories is unusual for an Indonesian supplier site                                                              | High. The still life and the shelf are unusual; the light-sans-plus-serif mix is closer to current luxury trends              |
| Procurement credibility       | **Strongest.** Precise, technical, ordered; the spec sheet and flow diagram feel administrative in the right way                                                   | Good. Calm and refined, but softer and more lifestyle than institutional                                                      |
| Mobile first screen (390×844) | **Drawing, headline, subline and primary CTA all above the fold**, with a strong silhouette                                                                        | Headline, still life, subline and CTA; elegant but quieter                                                                    |
| Visual contrast and rhythm    | Strong dark/light alternation, brass accents, dense-to-airy changes                                                                                                | Light throughout with one bold ultramarine field and one navy block                                                           |
| Typography                    | Expanded Archivo is confident and engineered; must stay limited to headings                                                                                        | Light 300 display is elegant, but less authoritative at mid sizes                                                             |
| Logo fit                      | Logo always on the ivory header and footer; red and blue sit well against brass and navy                                                                           | The ultramarine CTA sits near the logo's cerulean in the header; a slight hue tension                                         |
| Motion                        | Purposeful and system-like (assembly, calibration, isolation)                                                                                                      | Atmospheric (light, shadow, field expansion)                                                                                  |
| Build cost                    | Medium. The SVG is generated at build time with zero client JS; a sticky story plus small observers                                                                | Medium. The SVG is generated at build time with zero client JS; the field expansion uses CSS `clip-path`                      |
| Risk of looking generic       | Isometric illustration can drift toward "SaaS clip-art". Mitigated by the exploded technical drawing, dimension lines, a porcelain/brass palette and no characters | Flat still-life objects can look illustrative. Mitigated by light and shadow; detail would still need extra polish in Phase 4 |

**Weak points found and fixed during this round:**

- **A:**
  - The first hero was a cluttered "desk scene". It was rebuilt as an exploded axonometric with
    footprints and projection lines.
  - The callouts were clipped on desktop; they were moved inside the drawing.
  - The hero headline was too big for its column.
  - The sector story left a large blank area; the list was compacted to match the drawing.
  - The plates were double-indented on mobile.
  - The procurement CTA preceded its flow diagram.
- **B:**
  - The first still life had invisible shadows and read as clip-art. Window panes with mullions
    were added on a deeper wall, and the shadows made longer, darker and soft.
  - Shadow geometry was widening the frame. Compositions are now framed on the objects.
  - Gradient IDs were shared between drawings, which mis-rendered the shelf shadows.
  - Secondary text failed contrast on the table tone. It now uses Ink 2.

## Recommendation: **Concept A · Presisi**

A is the stronger answer to "Modern Precision Corporate" for this audience:

1. **It shows the business without claiming anything.** The drawing _is_ the five categories,
   labelled. A procurement officer understands what LATANSA supplies in one glance.
2. **It has the most compelling mobile first screen.** Drawing, headline and primary action all
   fit within 390×844, with a silhouette people will remember.
3. **It is precise in the details:** callouts, dimension lines, the ruler, registration marks,
   the spec sheet and the flow diagram. That gives an institutional audience order and evidence.
   Concept B is beautiful but softer.
4. **It is the stronger system.** One drawing model powers the hero, the blueprint plates and the
   sticky sector story, so Phase 4 builds one SVG generator, rendered at build time with no
   runtime cost.

If B appeals more emotionally, it is fully viable. Its procurement field and plaque could also be
adapted into A. Choosing a direction is the owner's decision.

## Content used (no invented claims)

- Facts come from `src/content/company.ts`: name, legal form, PKP wording, address, the SIPLah
  store and the five categories.
- **New headline copy (needs client approval):**
  - A: "Perangkat dan perlengkapan kerja untuk instansi dan lembaga."
  - B: "Pemasok perlengkapan kerja untuk instansi dan lembaga." and "Lima kategori, satu pemasok."
- **Coordinates in A's locator** (7°57′41″ LS, 110°20′58″ BT) come from the public Google Maps
  listing that matches the address. They would become an optional fact that needs client
  confirmation.
- Contact buttons are shown as layout. On the real site they render only once WhatsApp or email
  is provided.
- Both footers state: "Ilustrasi pada situs ini adalah karya grafis, bukan dokumentasi kegiatan
  perusahaan."
- No prices, stock, cart or checkout anywhere.

## Technical feasibility (both)

- **Static export:** the artwork is deterministic SVG from small generator functions, so Phase 4
  renders it at build time in server components. It ships as static HTML with no client
  JavaScript for the art.
- **Motion:** CSS keyframes and transitions, plus one shared `IntersectionObserver`. Motion for
  React is used only where an exit animation needs it (the mobile menu).
- **Free to run:** no paid services. Fonts are OFL (Archivo, or Plus Jakarta Sans and Newsreader),
  self-hosted via `next/font`.
- **Budgets:** the hero SVG is a few hundred elements. The LCP element is the headline text,
  painted before the art animates.

## After the choice

The chosen direction gets its own binding `docs/art-direction.md` and `docs/motion-spec.md`,
rewritten from this document and the board. `docs/image-assets.md` is updated too: original
illustration replaces photography, so AI image generation is no longer on the critical path.
Phase 4 starts only after the owner explicitly approves.
