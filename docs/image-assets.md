# Image assets: sourcing, grade and pipeline (binding)

> **Approved with Concept C on 2026-11-05.** The site uses **photorealistic imagery** that looks
> like professional commercial photography. Illustrated, isometric or flat SVG objects do not
> satisfy this requirement.
>
> - Slots, crops, focal points, `sizes` and alt text: [art-direction.md §7](art-direction.md#7-imagery).
> - Annotation anchors: [art-direction.md §8](art-direction.md#8-annotation-system).
> - Sourcing tests and the asset rationale: [design/phase-3-photographic-direction.md](design/phase-3-photographic-direction.md).

## Requirements

- **Quality:**
  - realistic materials, textures, reflections and shadows;
  - believable light and professional composition;
  - natural depth of field and high-resolution sources.
- **Defects to avoid:** AI artefacts, fake or real brand logos, unreadable labels, distorted
  equipment and impossible geometry.
- **Cost and rights:** zero additional cost, with commercial-use rights verified per image. No
  paid APIs or subscriptions without the owner's approval.
- **Honesty:** always **illustrative**. Never presented as documentary photographs of LATANSA's
  premises, employees, inventory or completed projects.

## Sourcing decision (tested 2026-11-05)

| Source                           | Status                                                                                                                                                                  |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Image tools in Claude Code       | None available (verified by tool search)                                                                                                                                |
| Pollinations.ai, free            | Tested. It generated a file, but at low resolution (686×858), with a forced watermark and an unverified output license. Rejected                                        |
| Paid generators and plugins      | Not activated                                                                                                                                                           |
| Adobe Firefly free plan          | Free-plan commercial terms unverified; usable only after the owner verifies them                                                                                        |
| Local SDXL / FLUX                | Needs approval for a heavy install on marginal hardware; not installed                                                                                                  |
| **Unsplash License photography** | **Selected and approved.** The license page and every photo page were verified; provenance is in [design/concepts/photos/SOURCES.md](design/concepts/photos/SOURCES.md) |
| Commissioned photography         | Optional future upgrade, at a cost. It would have to show genuine LATANSA subjects if presented as such                                                                 |

## Selection rules

- **Subjects:** objects and spaces only. No identifiable people, and no hands where avoidable.
- **Brands:** no visible brand logos or readable trademarks. Generic products are acceptable, but
  the site never implies a brand partnership or authorized-reseller status.
- **Implication risk:** no warehouses, classrooms, delivery vehicles or "handover" scenes. They
  could imply LATANSA's own premises, stock or completed projects.
- **License checks:** avoid Unsplash+ (paid) images. Re-verify every photo page before launch and
  record the date in `SOURCES.md`.

## Masters

The pipeline is `npm run images:build` (`scripts/build-images.mjs`). It runs these steps and
writes the derivatives plus `src/config/image-assets.json`; commit its output.

1. **Originals:** the licensed originals are kept, ungraded, in `assets/images/originals/`
   (2600px wide, from the Unsplash CDN; IDs in `SOURCES.md`). They are not served.
2. **Crop only:** no object removal, retouching or compositing.
   - The hero is cropped to x 42–100% and y 0–80% of the frame. At 2600 × 1465 that is 1508 × 1172
     from (1092, 0).
   - All other images are uncropped; their crops come from `object-position` per slot.
3. **Grade:** apply the family grade below with sharp, in this order:
   1. `modulate({ saturation, brightness })`;
   2. `linear(a, b)`;
   3. a soft-light layer of `#12243A` at the cool opacity;
   4. a soft-light layer of `#F6E8D2` at the warm opacity.
4. **Master:** the graded result stays lossless in memory; every derivative is encoded from it.

### Family grade (exact values, used by the board and the build)

| Image             | Saturation | Brightness | Linear (a, b) | Cool layer | Warm layer |
| ----------------- | ---------- | ---------- | ------------- | ---------- | ---------- |
| hero-desk         | 0.72       | 1.00       | 1.06, −5      | 16%        | —          |
| it-keyboard       | 1.00       | 0.98       | 1.05, −4      | 10%        | —          |
| office-ruler      | 0.42       | 1.00       | 1.03, −3      | —          | 12%        |
| elec-board        | 0.62       | 1.00       | 1.06, −6      | 18%        | —          |
| inst-chairs       | 0.70       | 1.00       | 1.04, −4      | 6%         | 6%         |
| goods-boxes       | 0.74       | 1.00       | 1.03, −3      | —          | 8%         |
| arch-atrium       | 0.60       | 0.99       | 1.04, −4      | 4%         | 8%         |
| it-laptop (spare) | 0.70       | 1.00       | 1.03, −2      | —          | 10%        |

The review copies were graded after resizing to 2000px. For production, grade at master size;
the values hold. `it-keyboard` keeps full saturation because it is already near-monochrome.

## Derivatives (implemented in Phase 4)

- **Formats:** AVIF (quality 60, 4:4:4) first, then WebP (quality 82), through `<picture>`, with
  `sizes` from [art-direction.md §7](art-direction.md#7-imagery). Output: `public/images/`.
- **Widths:** 640, 960, 1280, 1600 and 2048, each capped at the master's width (never upscaled).
  The hero master is 1508 wide, so its ladder is 640, 960, 1280 and 1508.
- **Byte budgets:**
  - hero ≤ 90 KB at 960w and ≤ 160 KB at its largest width;
  - other images ≤ 110 KB at 960w;
  - explicit `width` and `height` on every image.
  - Measured at 960w (AVIF): hero 49 KB, profile 46 KB, cards 13–51 KB. All within budget.
- **Export check:** `npm run verify:export` fails if any derivative listed in the manifest is
  missing from `out/`.
- **Priority:** only the hero is preloaded with `fetchpriority="high"`; the rest are lazy.

## On-page rules

- **Alt text** is in Indonesian, starts with "Foto ilustrasi:" and describes what is visible (texts
  in [art-direction.md §7](art-direction.md#7-imagery)).
- **Chip:** the hero photograph carries a "Foto ilustrasi" chip.
- **Footer note:** "Foto pada situs ini bersifat ilustratif (Unsplash License) dan bukan
  dokumentasi kegiatan perusahaan."
- **Credit:** an optional photographer credit is appreciated by Unsplash, but not required. It can
  live in a credits note in the footer.
- **Annotations** appear only on the hero and must sit on a matching object
  ([art-direction.md §8](art-direction.md#8-annotation-system)).
