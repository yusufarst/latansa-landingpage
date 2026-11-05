# Image assets — AI pipeline and specification

The client authorizes AI-generated **supporting imagery**. Requirements: zero additional cost,
commercial-use rights, no paid APIs or subscriptions, and never presented as documentary
evidence of real LATANSA operations.

## Tool inventory (checked 2026-11-05, Phase 2)

| Option                                                                                | Cost                    | Commercial use                               | Status here                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------- | ----------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Image-generation tools in this Claude Code session                                    | —                       | —                                            | **None available.** No connected tool or MCP server generates images.                                                                                                                           |
| Anthropic directory plugins (Abracadabrax, CellCog, Hyper, Blueprint Asset Generator) | Credits / paid accounts | Varies                                       | **Rejected** — not zero-cost.                                                                                                                                                                   |
| "image-generation" directory plugin                                                   | Free                    | n/a                                          | Prompting guide only; does not generate images.                                                                                                                                                 |
| Local **SDXL 1.0** (CreativeML Open RAIL++-M) via ComfyUI or Fooocus                  | Free                    | Allowed under the license's use restrictions | **Possible but constrained**: this machine has an RTX 3050 Laptop GPU (4 GB VRAM) and ~7 GB RAM. SDXL needs low-VRAM mode, is slow, and may run out of system RAM. Python is not installed yet. |
| Local FLUX.1 [schnell] (Apache-2.0)                                                   | Free                    | Allowed                                      | **Not practical** on 4 GB VRAM / 7 GB RAM.                                                                                                                                                      |
| Free-tier web generators                                                              | Free tier               | Terms vary by service and change often       | Only after reading the current terms; generated manually by the owner.                                                                                                                          |
| Free stock photography (Unsplash / Pexels licenses)                                   | Free                    | Allowed (no attribution required)            | Not AI; a fallback for neutral textures/objects.                                                                                                                                                |

**Conclusion:** there is no ready, zero-cost, commercially licensed generator in this
environment today. Phase 3 art direction must therefore produce a design that is complete and
premium **without** photography (typography-, composition- and color-led), with clearly defined
image slots that can be filled later. In Phase 4, images are generated only if a suitable tool
is set up and approved (most likely local SDXL); otherwise slots stay as designed graphic
compositions (CSS/SVG), never as fake photos.

Installing local generation tooling (Python, ComfyUI/Fooocus, model weights ~7 GB) is a
separate decision for the owner — not done in Phase 2.

## Usage rules

- Illustrative only: abstract, conceptual, object and material studies.
- **Never** depict or imply: LATANSA staff, office, warehouse, vehicles, deliveries, handovers
  to government officials, events, clients, uniforms with logos, documents or certificates.
- No real brand logos, government emblems, school/agency names, readable text or watermarks
  in generated images.
- No captions that state or suggest the image documents a real activity.
- Keep the source prompt, model, license and generation date for every file in
  `assets/images/README.md` (created when the first image is added).

## Technical specification

| Property        | Requirement                                                                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Masters         | `assets/images/<slug>-master.png` (lossless, ≥ 2560 px long edge), never served                                                                     |
| Web derivatives | `public/images/<slug>-{640,1080,1600,2400}.webp` (+ `.avif` optional) via a sharp script, like `brand:assets`                                       |
| Mobile crops    | Separate 4:5 or 3:4 crop for ≤ 430 px when the composition needs it — art-directed, not just scaled                                                 |
| Weight budget   | Hero ≤ 180 KB at 1080 px wide (WebP); others ≤ 120 KB                                                                                               |
| Markup          | `<picture>` / `next/image` (unoptimized) with explicit `width`/`height` and `sizes`; only the hero is `priority`                                    |
| Color           | Graded toward the palette: Deep Ink shadows, Porcelain highlights, muted Slate/Stone mid-tones, restrained Champagne warmth. No saturated red/blue. |
| Style           | Photorealistic, calm, editorial; natural light; shallow depth of field; generous negative space for typography                                      |
| Alt text        | Indonesian, descriptive of what is shown, never claims it is LATANSA's own premises/work                                                            |

## Candidate image list (to be finalized in Phase 3)

| Slot                    | Concept                                                                                                                                 | Notes                                             |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Hero                    | Ordered, architectural still life of institutional work materials (paper stock, a closed laptop, precise desk objects) in soft daylight | Must leave quiet space for the headline at 360 px |
| Komputer & TI           | Detail of computer hardware / cabling in a clean, abstract composition                                                                  | No brand marks                                    |
| Perlengkapan kantor     | Arranged stationery and office materials, top-down, rhythmic                                                                            |                                                   |
| Elektronik & teknis     | Close-up of technical components, tools or measurement instruments                                                                      |                                                   |
| Peralatan kelembagaan   | Abstracted institutional interior: furniture edges, light on surfaces, no people                                                        | No identifiable building                          |
| Barang & jasa pendukung | Packaging / logistics materials as a neutral still life                                                                                 | No vehicles, no logos                             |

Prompts, negative prompts and exact crops are written in Phase 3 together with the art direction.
