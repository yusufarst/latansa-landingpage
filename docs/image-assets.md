# Image assets — AI pipeline and specification

> **Update (2026-11-05, Phase 3 round 2).** Both new directions in
> [design/phase-3-concepts.md](design/phase-3-concepts.md) use **original SVG artwork drawn in code**
> (an exploded axonometric in Concept A, a lit still life in Concept B) instead of photography. AI
> image generation is therefore no longer on the critical path. The specification below applies only
> if photography is added later.

The client authorizes AI-generated **supporting imagery**. Requirements: zero additional cost,
commercial-use rights, no paid APIs or subscriptions, and never presented as documentary
evidence of real LATANSA operations.

Phase 3 status: **planned, not generated.** Images are generated in Phase 4 only if a suitable
tool is available and approved. The design in [art-direction.md](art-direction.md) is complete
without any of them.

## Tool inventory (re-checked 2026-11-05, Phase 3)

| Option                                                                      | Cost           | Commercial use                                                                                                                                                           | Status                                                                                                                                                                                     |
| --------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Image tools in this Claude Code session                                     | —              | —                                                                                                                                                                        | **None.** No connected tool or MCP server generates images                                                                                                                                 |
| Directory plugins (Abracadabrax, CellCog, Hyper, Blueprint Asset Generator) | Credits / paid | Varies                                                                                                                                                                   | **Rejected:** not zero-cost                                                                                                                                                                |
| Adobe Firefly free plan                                                     | Free allowance | Adobe states Firefly outputs are commercially safe, but published sources disagree on whether the **free** allowance carries the same terms, on watermarks and on quotas | **Unconfirmed.** Usable only if the owner verifies the current Adobe terms for free-plan output                                                                                            |
| Local SDXL 1.0 (CreativeML Open RAIL++-M) via ComfyUI/Fooocus               | Free           | Allowed within the license's use restrictions                                                                                                                            | **Possible but constrained**: RTX 3050 Laptop (4 GB VRAM), ~7 GB RAM, Python not installed. Low-VRAM mode, slow, may run out of memory. Needs owner approval to install (~7 GB of weights) |
| Local FLUX.1 [schnell] (Apache-2.0)                                         | Free           | Allowed                                                                                                                                                                  | Not practical on this hardware                                                                                                                                                             |
| Free stock (Unsplash / Pexels license)                                      | Free           | Allowed                                                                                                                                                                  | Not AI. Fallback for neutral object/material photos, chosen to match the prompts below                                                                                                     |

**Recommendation:** proceed with the typographic design (no images) as the baseline. Before Phase 4,
the owner chooses one of:

- (a) verify Adobe's free-plan terms and generate manually;
- (b) approve installing local SDXL and accept slower, possibly lower-fidelity results;
- (c) license-free stock photos matched to these specs;
- (d) no imagery at launch.

## Usage rules

- Illustrative only: objects, materials, abstract details and light.
- **Never** depict or imply:
  - people, staff, uniforms or hands handing over goods;
  - LATANSA premises, warehouses, vehicles, deliveries or events;
  - government buildings, emblems or officials;
  - documents, certificates, stamps or seals;
  - readable text, real brand logos or watermarks.
- No captions that state or suggest documentation of real activity. If AI or stock imagery is
  used, the footer carries: "Ilustrasi pada situs ini bersifat ilustratif dan bukan dokumentasi
  kegiatan perusahaan."
- Record the source, prompt, model or license and the date of every file in
  `assets/images/README.md`.

## Technical specification

| Property           | Requirement                                                                                                                                                                                                                 |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Masters            | `assets/images/<id>-master.png`, lossless, ≥ 2560px on the long edge; never served                                                                                                                                          |
| Web derivatives    | `public/images/<id>-{640,960,1440,2048}.{avif,webp}` generated by a sharp script (like `brand:assets`)                                                                                                                      |
| Art-directed crops | Separate mobile and desktop crops where the specs below differ, via `<picture>` media queries, not just scaling                                                                                                             |
| Weight budget      | H1 ≤ 160 KB (WebP, 1440w) and ≤ 90 KB (mobile 960w); others ≤ 110 KB                                                                                                                                                        |
| Markup             | Explicit `width`/`height`, `sizes`, `decoding="async"`; `loading="lazy"` except H1 on ≥ 1024px                                                                                                                              |
| Grade              | Shadows toward Deep Ink (#172B36), highlights toward Porcelain (#F7F6F2), mid-tones Stone/Slate. Low saturation; at most a whisper of Champagne warmth. **No saturated red or blue** (keeps the logo the only strong color) |
| Look               | Photorealistic still life, natural window light, matte surfaces, shallow-to-medium depth of field, generous negative space, no lens flare, no HDR                                                                           |

### Shared negative prompt

```
people, person, hands, face, text, letters, numbers, logo, brand name, watermark, signature,
government emblem, flag, stamp, seal, certificate, document with writing, price tag, shopping
cart, currency, money, vehicle, truck, warehouse, building exterior, neon, glow, lens flare,
bokeh balls, HDR, oversaturated, red, bright blue, plastic look, cluttered, low quality,
distorted, cgi, 3d render
```

## Asset list

Priorities:

- **P1:** improves the launch noticeably.
- **P2:** desktop enhancement.
- **P3:** optional.

### H1 — Hero still life (P1)

| Field       | Spec                                                                                                                                                                              |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Subject     | An ordered arrangement of institutional work materials: a closed slim laptop (no logo), a stack of uncoated paper, a metal ruler and a dark fountain pen, on a pale stone surface |
| Composition | Top-down at 15° from vertical; objects aligned to an implied grid along the left third; the right two-thirds calm surface. Strong horizontals echo the kop rule                   |
| Lighting    | Soft north-window daylight from the upper left; long, soft shadows; no specular hotspots                                                                                          |
| Mood        | Orderly, quiet, exact. "Ready for work", not "lifestyle"                                                                                                                          |
| Aspect      | Master 4:5 portrait (desktop columns 9–12); mobile crop 4:5 centered on the objects                                                                                               |
| Crops       | Desktop 4:5 at 1440w; mobile 4:5 at 960w, tighter on the laptop and paper                                                                                                         |
| Alt text    | "Ilustrasi: perlengkapan kerja kantor tertata di atas meja batu."                                                                                                                 |

Prompt:

```
Editorial still life photograph, top-down at a slight angle, a closed slim matte laptop without
logo, a neat stack of uncoated white paper, a brushed steel ruler and a dark fountain pen arranged
precisely along the left third of a pale grey-green stone desk surface, large calm empty surface
on the right, soft north window daylight from upper left, long soft shadows, muted desaturated
palette of deep blue-grey ink shadows and warm off-white highlights, medium depth of field,
minimalist, institutional, high-end corporate magazine photography, 4:5
```

### C1 — Komputer & Teknologi Informasi (P2, desktop sticky panel)

| Field           | Spec                                                                                                     |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| Subject         | Detail of computer hardware: the edge of a monitor stand, a keyboard corner and neatly coiled grey cable |
| Composition     | Close-up, diagonal leading line from lower left; 60% negative space                                      |
| Lighting / mood | Cool daylight, precise, technical                                                                        |
| Aspect / crops  | 4:5 (desktop panel only)                                                                                 |

Prompt:

```
Close-up editorial photograph of computer hardware details, corner of a minimal keyboard, edge of
an aluminium monitor stand and a neatly coiled matte grey cable on a pale stone desk, diagonal
composition with large negative space, cool soft daylight, desaturated blue-grey palette, no logos,
no text, precise and calm, high-end corporate photography, 4:5
```

### C2 — Alat Tulis & Perlengkapan Kantor (P2)

Subject: rhythmic top-down rows of plain stationery (pencils, binder clips, notebooks without
covers printed). Light: even overcast daylight. Aspect: 4:5.

```
Top-down editorial photograph of plain office stationery arranged in precise parallel rows,
unbranded graphite pencils, steel binder clips, plain notebooks with blank grey covers, on an
off-white paper surface, even soft daylight, subtle shadows, muted palette of slate grey, deep ink
blue and warm white, orderly and minimal, no text, no logos, 4:5
```

### C3 — Elektronik & Perlengkapan Teknis (P2)

Subject: technical components and a measuring instrument (multimeter without readable display,
cable connectors, small tools) laid out like an instrument tray. Aspect: 4:5.

```
Editorial still life of technical equipment laid out like an instrument tray, a matte multimeter
with blank display, assorted cable connectors, a small precision screwdriver set, on a dark
blue-grey felt surface, soft directional light from the left, muted desaturated palette,
engineering precision, no text, no brand names, high-end catalogue photography, 4:5
```

### C4 — Peralatan Umum Kelembagaan (P2)

Subject: abstracted institutional interior detail: the edge of a plain wooden table, a row of
chair backs and light falling across a pale wall. No identifiable building. No people. Aspect: 4:5.

```
Architectural interior detail photograph, edge of a plain light oak meeting table and a row of
simple upholstered chair backs in muted grey-green, soft daylight falling across a pale plaster
wall, empty room, no people, calm institutional atmosphere, desaturated palette with deep blue-grey
shadows, minimal composition with negative space, no signage, no text, 4:5
```

### C5 — Barang & Jasa Pendukung Terpilih (P2)

Subject: neutral packaging materials (plain cardboard boxes, kraft paper, twine), stacked with
care. No labels, no vehicles. Aspect: 4:5.

```
Editorial still life of plain unbranded cardboard boxes and folded kraft paper neatly stacked,
natural twine, on a pale stone floor, soft side daylight, gentle shadows, muted warm-neutral and
grey palette, orderly, minimal, no labels, no text, no logos, no vehicles, 4:5
```

### E1 — Editorial detail for mobile sectors (P1 if images are used at all)

Subject: abstract corporate detail: the corner of a paper stack under raking light, showing fiber
texture. A single image after the sector list on mobile (3:2). On desktop it is not used if C1–C5
exist.

```
Macro editorial photograph of the corner of a stack of fine uncoated paper under raking side light,
visible fibre texture, deep blue-grey shadow falling across the sheets, extremely minimal, calm,
desaturated palette of off-white and ink blue, no text, 3:2
```

### OG — Social share image (P1, no AI)

1200×630, generated from code (no AI): the horizontal logo on Porcelain, the kop rule and the h1
headline set in Newsreader. It is built in Phase 6 together with SEO metadata.

## Priority summary

| ID    | Priority | Needed for                          | Without it                              |
| ----- | -------- | ----------------------------------- | --------------------------------------- |
| OG    | P1       | Link previews                       | Built from code, always available       |
| H1    | P1       | Hero richness on desktop and mobile | Typographic hero (complete)             |
| E1    | P1*      | Mobile sector section               | Typographic list (complete)             |
| C1–C5 | P2       | Desktop sticky sector panel         | Two-column typographic table (complete) |

\*Only if any imagery is approved.
