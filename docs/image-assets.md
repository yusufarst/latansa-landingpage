# Image assets — sourcing strategy and rules

> **Mandatory since Phase 3 round 3 (2026-11-05):** the site uses **photorealistic imagery** that
> looks like professional commercial photography. Illustrated, isometric or flat SVG objects do
> not satisfy this requirement. The full asset specification (per-slot subject, composition,
> lighting, crops, priority and future generation prompts) is in
> [design/phase-3-photographic-direction.md §5](design/phase-3-photographic-direction.md#5-visual-asset-specifications).

## Requirements

- Realistic materials, textures, reflections and shadows; believable light; professional
  composition; natural depth of field; high-resolution sources.
- No AI artefacts, fake or real brand logos, unreadable labels, distorted equipment or
  impossible geometry.
- Zero additional cost. Commercial-use rights verified per image. No paid APIs or subscriptions
  without the owner's approval.
- Always **illustrative**. Never presented as documentary photographs of LATANSA's premises,
  employees, inventory or completed projects.

## Sourcing decision (tested 2026-11-05)

| Source                           | Status                                                                                                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Image tools in Claude Code       | None available (verified by tool search)                                                                                                                |
| Pollinations.ai, free            | Tested; generated a file, but it was low resolution (686×858), carried a forced watermark and had unverified output license. Rejected                   |
| Paid generators and plugins      | Not activated                                                                                                                                           |
| Adobe Firefly free plan          | Free-plan commercial terms unverified; possible only after the owner verifies them                                                                      |
| Local SDXL / FLUX                | Needs approval for a heavy install on marginal hardware; not installed                                                                                  |
| **Unsplash License photography** | **Selected.** License page and every photo page verified; provenance recorded in [design/concepts/photos/SOURCES.md](design/concepts/photos/SOURCES.md) |
| Commissioned photography         | Optional future upgrade; costs money. It would have to show genuine LATANSA subjects if presented as such                                               |

## Selection rules

- Objects and spaces only. No identifiable people, and no hands where avoidable.
- No visible brand logos or readable trademarks. Generic products are acceptable, but never imply
  brand partnership or authorized-reseller status.
- No warehouses, classrooms, delivery vehicles or "handover" scenes. They could imply LATANSA's own
  premises, stock or completed projects.
- Avoid Unsplash+ (paid) images. Re-verify every photo page before launch and record the date in
  `SOURCES.md`.

## Processing pipeline

1. Download the full-resolution original (≥ 2600px) from the photo's own page or CDN.
2. Crop only; no object removal or compositing.
3. Apply the family grade with sharp: reduced saturation, a slight contrast lift, a cool shadow
   tone and a warm highlight tone. Values are in the art direction doc.
4. Export masters to `assets/images/` (lossless or high quality, not served).
5. Phase 4 build step: AVIF and WebP at 640, 960, 1440 and 2048 wide, with art-directed crops per
   breakpoint (`<picture>`).
6. Budgets:
   - hero ≤ 160 KB at 1440w and ≤ 90 KB at 960w;
   - others ≤ 110 KB;
   - explicit width and height on every image;
   - only the hero is high priority; the rest are lazy.

## On-page rules

- Alt text is in Indonesian and starts with "Foto ilustrasi:", describing what is visible.
- The hero photograph carries a "Foto ilustrasi" chip.
- The footer reads: "Foto pada situs ini bersifat ilustratif (Unsplash License) dan bukan
  dokumentasi kegiatan perusahaan."
- The optional photographer credit is appreciated by Unsplash, not required. It can live in a
  credits note in the footer.
