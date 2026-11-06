#!/usr/bin/env node
/**
 * images:build — turns the licensed originals in assets/images/originals into
 * the graded, responsive AVIF + WebP derivatives in public/images, and writes
 * src/config/image-assets.json (intrinsic size and available widths per photo).
 *
 * - Crop only: no retouching, compositing or object removal.
 * - The family grade is the one approved with Concept C (docs/image-assets.md):
 *   modulate → linear → soft-light cool layer → soft-light warm layer.
 * - Derivatives never upscale. Provenance: docs/design/concepts/photos/SOURCES.md.
 *
 * Run after changing an original or the grade, then commit the output.
 */
import { mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(root, "assets", "images", "originals");
const OUT = join(root, "public", "images");
const MANIFEST = join(root, "src", "config", "image-assets.json");

const COOL = { r: 0x12, g: 0x24, b: 0x3a }; // #12243A
const WARM = { r: 0xf6, g: 0xe8, b: 0xd2 }; // #F6E8D2
const LADDER = [640, 960, 1280, 1600, 2048];

/** Slot name → original, optional crop and the exact approved grade. */
const PHOTOS = {
  // Phones and small tablets: x 42–100% at full height, so the tall hero has
  // the most vertical resolution. The decorative house model (bottom left of
  // the frame) stays outside the visible window.
  hero: {
    file: "hero-desk.jpg",
    crop: { left: 1092, top: 0, width: 1508, height: 1465 },
    grade: { saturation: 0.72, brightness: 1.0, linear: [1.06, -5], cool: 0.16, warm: 0 },
    // The phones' LCP image (Phase 6 budget). The graded photo is nearly
    // monochrome and mostly under the navy grade: at q50 4:2:0 a 1:1
    // comparison shows no visible difference, and the 1280 file drops from
    // 96 to 61 KB.
    avif: { quality: 50, chromaSubsampling: "4:2:0" },
  },
  // Tablets and desktop: the full width, y 0–82% (drops the house model). The
  // empty leather at the upper left carries the headline.
  "hero-wide": {
    file: "hero-desk.jpg",
    crop: { left: 0, top: 0, width: 2600, height: 1201 },
    grade: { saturation: 0.72, brightness: 1.0, linear: [1.06, -5], cool: 0.16, warm: 0 },
    ladder: [960, 1280, 1600, 2048, 2600],
  },
  profile: {
    file: "arch-atrium.jpg",
    grade: {
      saturation: 0.6,
      brightness: 0.99,
      linear: [1.04, -4],
      cool: 0.04,
      warm: 0.08,
    },
  },
  computers: {
    file: "it-keyboard.jpg",
    grade: { saturation: 1.0, brightness: 0.98, linear: [1.05, -4], cool: 0.1, warm: 0 },
  },
  office: {
    file: "office-ruler.jpg",
    grade: { saturation: 0.42, brightness: 1.0, linear: [1.03, -3], cool: 0, warm: 0.12 },
  },
  electronics: {
    file: "elec-board.jpg",
    grade: { saturation: 0.62, brightness: 1.0, linear: [1.06, -6], cool: 0.18, warm: 0 },
  },
  institutional: {
    file: "inst-chairs.jpg",
    grade: {
      saturation: 0.7,
      brightness: 1.0,
      linear: [1.04, -4],
      cool: 0.06,
      warm: 0.06,
    },
  },
  supporting: {
    file: "goods-boxes.jpg",
    grade: { saturation: 0.74, brightness: 1.0, linear: [1.03, -3], cool: 0, warm: 0.08 },
  },
};

async function gradedMaster({ file, crop, grade }) {
  let img = sharp(join(SRC, file)).rotate();
  if (crop) img = img.extract(crop);
  const base = await img
    .modulate({ saturation: grade.saturation, brightness: grade.brightness })
    .linear(grade.linear[0], grade.linear[1])
    .png()
    .toBuffer();
  const { width, height } = await sharp(base).metadata();
  const layer = (color, alpha) => ({
    input: { create: { width, height, channels: 4, background: { ...color, alpha } } },
    blend: "soft-light",
  });
  const layers = [];
  if (grade.cool) layers.push(layer(COOL, grade.cool));
  if (grade.warm) layers.push(layer(WARM, grade.warm));
  const master = await sharp(base).composite(layers).png().toBuffer();
  return { master, width, height };
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const manifest = {};
for (const [name, spec] of Object.entries(PHOTOS)) {
  const { master, width, height } = await gradedMaster(spec);
  const ladder = spec.ladder ?? LADDER;
  const cap = Math.min(width, ladder.at(-1));
  const widths = ladder.filter((w) => w < cap);
  widths.push(cap);
  for (const w of widths) {
    const resized = sharp(master).resize({ width: w, withoutEnlargement: true });
    await resized
      .clone()
      .avif({ quality: 60, effort: 6, chromaSubsampling: "4:4:4", ...spec.avif })
      .toFile(join(OUT, `${name}-${w}.avif`));
    await resized
      .clone()
      .webp({ quality: 82, effort: 6 })
      .toFile(join(OUT, `${name}-${w}.webp`));
  }
  const h = (w) => Math.round((height * w) / width);
  const largest = widths.at(-1);
  manifest[name] = { width: largest, height: h(largest), widths };
  const kb = (f) => Math.round(statSync(join(OUT, f)).size / 1024);
  console.log(
    `${name.padEnd(13)} ${width}×${height} → ${widths.join(", ")}  ` +
      `960w: avif ${kb(`${name}-960.avif`)} KB, webp ${kb(`${name}-960.webp`)} KB`,
  );
}

// Prettier-compatible JSON: number arrays on one line.
const json = JSON.stringify(manifest, null, 2).replace(
  /\[\s+([\d,\s]+?)\s+\]/g,
  (_, inner) => `[${inner.split(/,\s*/).join(", ")}]`,
);
writeFileSync(MANIFEST, `${json}\n`);
const files = readdirSync(OUT);
const total = files.reduce((sum, f) => sum + statSync(join(OUT, f)).size, 0);
console.log(
  `\n${files.length} files, ${(total / 1024 / 1024).toFixed(2)} MB → public/images`,
);
console.log(`Manifest → ${MANIFEST}`);
