# Phase 3, round 3: photographic direction "Presisi Terang" (Concept C)

Status: **for review. No concept is approved.** This round answers the client's mandatory
requirement for photorealistic imagery. It supersedes the illustrated hero artwork of Concepts A
and B (kept for reference in [phase-3-concepts.md](phase-3-concepts.md)).

|                     |                                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Board               | [concepts/c-presisi-terang.html](concepts/c-presisi-terang.html)                                                   |
| Mobile 390          | [first screen](concepts/screens/C-mobile-390-hero.webp) · [full page](concepts/screens/C-mobile-390-full.webp)     |
| Mobile 360          | [first screen](concepts/screens/C-mobile-360-hero.webp)                                                            |
| Desktop 1440        | [first screen](concepts/screens/C-desktop-1440-hero.webp) · [full page](concepts/screens/C-desktop-1440-full.webp) |
| Photos and licenses | [concepts/photos/SOURCES.md](concepts/photos/SOURCES.md)                                                           |

**View live:** start the `design-board` launch config, then open
`/docs/design/concepts/c-presisi-terang`. Use `?still` for final states and `?menu` to open the
mobile menu.

## 1. Direction

**Presisi Terang** combines Presisi's character with Terang's breathing room.

From **Presisi**:

- navy and brass;
- Archivo Expanded headlines;
- precision details: brass annotation markers on photographs, a measuring-ruler transition,
  crop-mark corners on the company data sheet, the SIPLah flow diagram.

From **Terang**:

- a warm ivory canvas;
- generous, purposeful negative space;
- a Newsreader editorial statement;
- an airy, calm rhythm.

**Photography carries the richness.** Real, professional photographs of IT equipment, office
supplies, electronics, institutional furniture and supporting goods, graded as one family:

- slightly desaturated;
- deep cool shadows;
- warm neutral highlights.

**The signature device is annotated photography.** Thin brass markers and labels point to the
real objects in the hero photograph ("Komputer & TI", "Alat tulis & kantor"). It links the image
to what LATANSA supplies, adds the precision voice, and is honest: the photo is labelled
"Foto ilustrasi".

### Use of negative space

- **Hero:**
  - mobile: the headline and company line sit on ivory; the photograph gets full width.
  - desktop: the copy column (6 of 12) keeps generous air, and the photograph bleeds off the
    right edge.
- **Profile:** a single serif statement with one architectural photograph. The facts are
  compressed into one ruled row so the spread breathes.
- **Categories:**
  - desktop: a magazine-style mosaic with deliberately different image sizes and vertical
    offsets. It is not a card grid; there are no boxes, shadows or borders.
  - mobile: a swipeable catalogue of tall photo cards.
- **Contrast in rhythm:** a light hero and profile, then the dark navy procurement band, the
  light data sheet, and the midnight contact section.
- **Never empty:** every section has one clear focal element. No ornamental blank blocks, no grey
  placeholders.

## 2. Mobile-first composition (390px, designed first)

| Element        | Specification                                                                                                                                               |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Header         | 64px ivory; logo 136px; "Menu" with a 44px navy round button                                                                                                |
| Headline       | Archivo Expanded 600, `clamp(2rem, 1.3rem + 2.9vw, 3.4rem)`, 4 lines at 390                                                                                 |
| Company line   | 16px slate, 3 lines; names the categories                                                                                                                   |
| Hero photo     | Full bleed, 4:5 (390×488); one brass annotation; "Foto ilustrasi" chip on a dark plate                                                                      |
| Actions        | Laid over the photo's lower third on a navy scrim: brass "Hubungi via WhatsApp", ghost "Buka toko SIPLah" (opens the store)                                 |
| First screen   | Headline, company line, photo, annotation and both actions are all visible at 390×844. At 360×780, the headline, line, photo and primary action are visible |
| Below the hero | Location and SIPLah meta row, then the ruler transition                                                                                                     |
| Categories     | Swipeable cards at 80% width, 4:5 photos, title and summary, progress meter                                                                                 |
| Touch          | Every action ≥ 48px tall; cards snap; no hover-only content                                                                                                 |

Desktop (1440) expands this composition:

- **Hero:** the copy takes 6 of 12 columns and the CTAs move into it. The photo takes 6 columns
  plus the right bleed, at a 6:5.4 ratio, with two annotations.
- **Profile:** the statement and facts sit on the left; the photo is on the right, offset
  downward.
- **Catalogue:** a mosaic (Komputer 7 columns at 3:2; Kantor 5 columns at 1:1; then Elektronik
  4:5, Kelembagaan 4:3 and Barang 3:4), with staggered offsets.

Checked: no horizontal overflow at 360, 390, 430, 768, 1024, 1440 or 1920px.

## 3. Motion

Built with CSS plus one IntersectionObserver. Motion for React is reserved for the mobile menu.

- **Hero:**
  - the photograph reveals upward with `clip-path` (1.25s) while settling from a 1.08 scale (2.2s);
  - headline words rise from masks (35ms stagger);
  - the company line and actions fade up;
  - the annotations then appear one by one (140ms apart), drawing attention to the categories.
- **Photographs on scroll:** each image reveals from an inset `clip-path`, scaling from 1.1 to 1
  (1.2–1.6s). This is the page's quiet scroll choreography.
- **Procurement:** the dashed flow line draws. **Contact:** the contour rings draw.
- **Navigation:**
  - the header gains a hairline on scroll;
  - the mobile menu is a navy `clip-path` wipe with links rising in a stagger;
  - the menu icon morphs into a cross.
- **Buttons and links:** a brass or navy fill sweeps across (450ms); links retract and extend
  their underline; press moves 1px.
- **Reduced motion:** everything renders in its final state.

## 4. Image generation and sourcing (tested, not assumed)

| Option                                                             | Test result                                                                                                                                                                                                                                                                                      | Verdict                                                                      |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| Image tools in this Claude Code session                            | Tool search finds no image-generation tool                                                                                                                                                                                                                                                       | Not available                                                                |
| **Pollinations.ai** (free, no account)                             | **Generated and saved a file.** It was 686×858 instead of the requested 1024×1280, carried a forced Pollinations watermark despite `nologo=true`, used a SANA model on the anonymous tier (per EXIF), showed soft AI artefacts on the laptop, and has no documented commercial terms for outputs | **Rejected**: low resolution, watermark, unverified license                  |
| Paid image plugins and APIs (Abracadabrax, CellCog, Hyper, others) | Not activated, as instructed                                                                                                                                                                                                                                                                     | Out of scope (cost)                                                          |
| Adobe Firefly free plan                                            | Commercial-use terms for free-plan output could not be verified (round 2)                                                                                                                                                                                                                        | Only if the owner verifies Adobe's current terms; generation would be manual |
| Local SDXL / FLUX                                                  | Needs Python, ComfyUI and ~7 GB of weights. The hardware (4 GB VRAM, ~7 GB RAM) is marginal                                                                                                                                                                                                      | Not installed; needs owner approval                                          |
| **Licensed photography: Unsplash License**                         | License page verified; each photo page verified as "Free to use under the Unsplash License", not Unsplash+                                                                                                                                                                                       | **Used for the review mock**, with provenance recorded                       |
| Commissioned photography of real stock                             | Most authentic and documentary, but costs money                                                                                                                                                                                                                                                  | Optional future upgrade; would need to be genuinely LATANSA's                |

**Recommendation.** Use the licensed Unsplash photographs for the design review, and potentially
at launch, since the license allows commercial use without attribution. Replace any of them later
with generated images only if a tool with verified commercial rights becomes available, or with
commissioned photography. All imagery stays labelled as illustrative.

## 5. Visual asset specifications

**Global grade:**

- saturation 0.42–0.74 depending on the image;
- contrast lift (linear 1.03–1.06);
- a cool shadow tone (soft-light `#12243A`, 4–18%);
- a warm highlight tone (soft-light `#F6E8D2`, 6–12%).

No objects are added or removed by retouching. Crops only.

**Production derivatives (Phase 4):**

- AVIF and WebP at 640, 960, 1440 and 2048 wide, with art-directed crops per breakpoint
  through `<picture>`;
- the hero is ≤ 160 KB at 1440 and ≤ 90 KB at 960 (mobile);
- other images are ≤ 110 KB;
- explicit width and height on every image;
- only the hero is `fetchpriority="high"`; the rest are lazy.

| Slot                         | Current source (Unsplash License)                                                            | Subject and composition                                                                                     | Lighting and mood                                 | Aspect: mobile / desktop                   | Priority |
| ---------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ------------------------------------------ | -------- |
| H · Hero                     | Dhony Koswara, _Laptop, mug, and notebooks on a dark workspace_ (cropped x 42–100%, y 0–80%) | Top-down workspace: laptop keyboard in the right two-thirds, mug at left, notebook and pencil at the bottom | Soft overhead, dark leather; calm, exact, premium | 4:5 at object-position 55% / 6:5.4 at 100% | P1       |
| C1 · Komputer & TI           | Wesley Tingey, _Apple Magic Keyboard_ (no logo visible)                                      | Centered keyboard on black, graphic                                                                         | Even, high contrast; precise                      | 4:5 / 3:2                                  | P1       |
| C2 · Alat tulis & kantor     | Jess Bailey, _Notebook, ruler, and keyboard on white surface_                                | Diagonal flat lay: ruler, pen, notebook                                                                     | Soft daylight; clean, orderly                     | 4:5 / 1:1                                  | P1       |
| C3 · Elektronik & teknis     | Alexandre Debiève, _Macro photography of black circuit board_                                | Macro of the board, shallow depth of field                                                                  | Low-key, cinematic                                | 4:5 / 4:5                                  | P1       |
| C4 · Kelembagaan             | Michael Fousert, _Office chairs at conference table_                                         | A row of chairs in shallow focus                                                                            | Neutral daylight; institutional                   | 4:5 at 38% / 4:3                           | P1       |
| C5 · Barang & jasa pendukung | Mediamodifier, _Brown cardboard box on white table_                                          | Two plain kraft boxes with blank labels                                                                     | Studio white; tidy                                | 4:5 / 3:4                                  | P1       |
| E1 · Editorial architecture  | LYCS Architecture, _Clear glass building interior_                                           | Atrium with a triangular glass roof (it echoes the logo's triangle)                                         | Bright, airy; institutional modernity             | 3:2 / 4:5                                  | P2       |
| Alt · Komputer               | Markus Spiske, _MacBook Air on white table_ (no logo visible)                                | Laptop from behind on a reflective white surface                                                            | High-key studio                                   | 4:5 / 3:2                                  | Spare    |

**Generation prompts for future replacement** (only if a verified free, commercial-use tool is
approved).

Shared rules for every prompt:

- negative prompt: no people, hands, text, logos, brand names, watermarks, price tags, warehouse
  or storefront, vehicles, government emblems, distorted keyboards, extra keys, melted geometry;
- photorealistic, 50–85mm lens, natural depth of field, 4K.

| Slot | Prompt                                                                                                                                                                                                                                                                                                         |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| H    | Top-down editorial photograph of a dark leather desk: a silver laptop keyboard in the right two-thirds, a matte black mug at left, a dark spiral notebook with a pencil at the bottom. Soft overhead light, deep blue-grey shadows, calm premium corporate mood, generous dark negative space at the top left. |
| C1   | Studio product photograph of a slim white aluminium keyboard centered on matte black paper, straight overhead, crisp even light, high contrast, minimal.                                                                                                                                                       |
| C2   | Overhead flat lay on white paper: a brushed steel ruler on a diagonal, a pale grey pen, a cream notebook corner. Soft daylight, precise composition, minimal.                                                                                                                                                  |
| C3   | Macro photograph of a dark green-black circuit board with chips and capacitors, very shallow depth of field, cool cinematic low-key light, no readable markings.                                                                                                                                               |
| C4   | Close-up of a row of black mesh conference chairs along a pale table, very shallow depth of field, soft daylight, calm institutional interior, no people.                                                                                                                                                      |
| C5   | Studio photograph of two plain kraft cardboard boxes with blank white labels, stacked on white, soft shadow, clean commercial look.                                                                                                                                                                            |
| E1   | Architectural photograph of a bright modern atrium with a triangular glass roof lattice and white galleries, soft daylight, no people.                                                                                                                                                                         |

## 6. Content and honesty

- **Every image is captioned or labelled as illustrative.** The footer reads: "Foto pada situs ini
  bersifat ilustratif (Unsplash License) dan bukan dokumentasi kegiatan perusahaan."
- **Excluded imagery:** no warehouses, classrooms or delivery scenes, which could imply LATANSA's
  own premises, inventory or completed projects. No people, no visible brand logos.
- **Facts** come from `src/content/company.ts`, with the PKP wording exact and no NPWP. The hero
  "Buka toko SIPLah" opens the client-provided store URL.
- **Stand-ins in the mock:** WhatsApp and email are still missing, so the mock's WhatsApp and
  email buttons only jump to the contact section or do nothing.
  - On the live site each button links straight to `https://wa.me/…` or `mailto:`.
  - Each is omitted while its fact is missing; launch needs at least one.
  - "Buka di Google Maps" needs its own optional fact (the listing URL) before it can appear.
- **Needs client approval:**
  - the headline copy "Perangkat dan perlengkapan kerja untuk instansi dan lembaga.";
  - the office coordinates in the contact diagram (from the public Google Maps listing).

## 7. Self-critique

**Fixed this round:**

- the "Foto ilustrasi" tag was invisible on the bright laptop lid; it is now a dark chip at top
  left;
- the laptop-lid photo read as a grey slab at 4:5; the IT card now uses the keyboard;
- a third hero annotation labelled the mug, which is not a category; it was removed;
- the hero "Buka toko SIPLah" scrolled the page; it now opens the store;
- the headline set in 5 lines on desktop; it is now 4;
- the desktop profile had a dead gap between the statement and the facts; it is gone.

**Remaining risks:**

- Stock photography is used by other sites too. Distinctiveness comes from the grade, the crops,
  the annotation layer and the layout. Commissioned photography would be the eventual upgrade.
- At 360px the headline sets in 5 lines. That is accepted: the primary action stays in the first
  screen.
- The contact section uses a labelled location diagram. It is an information graphic, not a
  stand-in for photography.
