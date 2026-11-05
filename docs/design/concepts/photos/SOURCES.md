# Photo sources and licenses (Phase 3 review mock)

All eight photographs are licensed under the **Unsplash License**. Each photo page showed "Free to
use under the Unsplash License" on 2026-11-05; none is an Unsplash+ (paid) image. The official
license page, unsplash.com/license, was reviewed the same day.

**Re-verified before launch (Phase 6, 2026-11-06):** each of the seven photo pages the site uses
(listed in `src/content/images.ts`) is live, titled "Free Photo on Unsplash" and licensed under
the Unsplash License. None has become Unsplash+.

**The license allows:**

- free download and use for commercial and non-commercial purposes;
- use without asking permission;
- attribution, which is appreciated but not required.

**It does not allow:**

- selling the images without significant modification;
- compiling Unsplash images to replicate a similar or competing service.

| File                  | Use                               | Photo page                                                                           | Photographer      |
| --------------------- | --------------------------------- | ------------------------------------------------------------------------------------ | ----------------- |
| `hero-desk-crop.webp` | Hero                              | https://unsplash.com/photos/laptop-mug-and-notebooks-on-a-dark-workspace-uxxGF7g754U | Dhony Koswara     |
| `it-laptop.webp`      | Spare (Komputer & TI alternate)   | https://unsplash.com/photos/macbook-air-on-white-table-fpTVkXjxL_Y                   | Markus Spiske     |
| `it-keyboard.webp`    | Komputer & TI                     | https://unsplash.com/photos/apple-magic-keyboard-FNhyekndnSM                         | Wesley Tingey     |
| `office-ruler.webp`   | Alat tulis & perlengkapan kantor  | https://unsplash.com/photos/notebook-ruler-and-keyboard-on-white-surface-OXQVfxXORJ0 | Jess Bailey       |
| `elec-board.webp`     | Elektronik & perlengkapan teknis  | https://unsplash.com/photos/macro-photography-of-black-circuit-board-FO7JIlwjOtU     | Alexandre Debiève |
| `inst-chairs.webp`    | Peralatan umum kelembagaan        | https://unsplash.com/photos/office-chairs-at-conference-table-RNsKphkdBTk            | Michael Fousert   |
| `goods-boxes.webp`    | Barang & jasa pendukung           | https://unsplash.com/photos/brown-cardboard-box-on-white-table-jpQs15STZZ4           | Mediamodifier     |
| `arch-atrium.webp`    | Profile (architectural editorial) | https://unsplash.com/photos/clear-glass-building-interior-during-daytime-aKij95Mmus8 | LYCS Architecture |

**Unsplash image IDs.** These identify the originals on the Unsplash CDN, for re-downloading
masters in Phase 4:

| File                  | Image ID                           | Original used for review |
| --------------------- | ---------------------------------- | ------------------------ |
| `hero-desk-crop.webp` | `photo-1752225494606-ae09aca08bea` | 2600 × 1465              |
| `it-laptop.webp`      | `photo-1620365602462-40d8f2cdd84c` | 2600 × 1733              |
| `it-keyboard.webp`    | `photo-1572916118970-fb5c8a1cb3d1` | 2600 × 1733              |
| `office-ruler.webp`   | `photo-1765917393220-78ed33e7e07b` | 2600 × 1734              |
| `elec-board.webp`     | `photo-1518770660439-4636190af475` | 2600 × 1733              |
| `inst-chairs.webp`    | `photo-1628062699790-7c45262b82b4` | 2600 × 1463              |
| `goods-boxes.webp`    | `photo-1631010231931-d2c396b444ec` | 2600 × 1733              |
| `arch-atrium.webp`    | `photo-1531972111231-7482a960e109` | 2600 × 1733              |

## Processing

The exact per-image grade is in [docs/image-assets.md](../../../image-assets.md#family-grade-exact-values-used-for-the-approved-board).

Every image was downloaded from the Unsplash CDN at 2600px, then processed with sharp:

- resized to 2000px wide (the hero crop keeps 1508px of the full-resolution frame);
- graded as one family: reduced saturation, a slight contrast lift, a soft cool shadow tone and
  a warm neutral highlight tone;
- exported as WebP.

The hero is cropped (x 42–100%, y 0–80%) to remove a distracting prop. No objects were added or
removed by retouching.

## Selection rules applied

- No identifiable people.
- No visible brand logos or readable trademarks. Several candidates were rejected for this,
  including a multimeter showing its brand and model, and printers with visible logos.
- Generic keyboards and laptops are acceptable. The laptop and keyboard are Apple products with
  no logo visible. The site must never claim a brand partnership or authorized-reseller status.
- Warehouses and classrooms were excluded. They could imply LATANSA's own premises, inventory or
  completed deliveries.

## Rules for the live site

- These photos are illustrative. By the owner's decision (2026-11-05) the site shows no visible
  disclaimer; this file and `src/content/images.ts` keep the provenance, and no copy may present a
  photo as the company's own premises, staff, stock, deliveries or clients.
- Optional credit line, appreciated by Unsplash: "Foto: [photographer] / Unsplash".
- Re-verify each photo page before launch. Licenses can change, so record the check date in this
  file.
