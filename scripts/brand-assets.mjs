#!/usr/bin/env node
/**
 * brand:assets — derives web-ready logo files from the official originals.
 *
 * Sources (authoritative, never modified):
 *   assets/brand/latansa-logo-vertical-original.png    (4500×4500, RGBA)
 *   assets/brand/latansa-logo-horizontal-original.png  (4500×4500, RGBA)
 *
 * Allowed operations: trim transparent padding, proportional resize, format
 * conversion, cropping the symbol out of the lock-up, and padding onto a
 * square canvas. NOT allowed: recoloring, redrawing, distorting, re-spacing.
 *
 * Outputs:
 *   public/brand/latansa-logo-{horizontal,vertical}-{w}.{png,webp}
 *   public/brand/latansa-symbol-{w}.{png,webp}
 *   src/app/icon.png, src/app/apple-icon.png, src/app/favicon.ico
 *   src/config/brand-assets.json (intrinsic sizes for <Image>)
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("..", import.meta.url));
const src = (name) => `${root}assets/brand/latansa-logo-${name}-original.png`;
const pub = `${root}public/brand/`;
const app = `${root}src/app/`;
mkdirSync(pub, { recursive: true });

// The site canvas is white (owner amendment, Phase 4).
const WHITE = { r: 0xff, g: 0xff, b: 0xff, alpha: 1 };
const manifest = {};

async function trimmed(file) {
  const { data, info } = await sharp(file)
    .trim({ threshold: 1 })
    .png()
    .toBuffer({ resolveWithObject: true });
  return { buf: data, width: info.width, height: info.height };
}

async function writeSizes(name, buf, widths) {
  manifest[name] = {};
  for (const w of widths) {
    const resized = sharp(buf).resize({ width: w, withoutEnlargement: true });
    const png = await resized
      .clone()
      .png({ compressionLevel: 9, palette: false })
      .toBuffer({
        resolveWithObject: true,
      });
    writeFileSync(`${pub}${name}-${w}.png`, png.data);
    await resized
      .clone()
      .webp({ quality: 92, alphaQuality: 100, effort: 6 })
      .toFile(`${pub}${name}-${w}.webp`);
    manifest[name][w] = {
      png: `/brand/${name}-${w}.png`,
      webp: `/brand/${name}-${w}.webp`,
      width: png.info.width,
      height: png.info.height,
    };
  }
}

/** Find the first opaque column band (the symbol) in a horizontal lock-up. */
async function symbolFromHorizontal(buf) {
  const { data, info } = await sharp(buf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  let end = -1;
  let seen = false;
  for (let x = 0; x < W; x++) {
    let opaque = false;
    for (let y = 0; y < H && !opaque; y++) opaque = data[(y * W + x) * 4 + 3] > 8;
    if (opaque) seen = true;
    else if (seen) {
      end = x;
      break;
    }
  }
  if (end < 0) throw new Error("Could not isolate the symbol from the horizontal logo.");
  const cropped = await sharp(buf)
    .extract({ left: 0, top: 0, width: end, height: H })
    .png()
    .toBuffer();
  return sharp(cropped)
    .trim({ threshold: 1 })
    .png()
    .toBuffer({ resolveWithObject: true });
}

/** Center an image on a transparent (or solid) square canvas with margin. */
async function square(
  buf,
  size,
  { marginRatio = 0.1, background = { r: 0, g: 0, b: 0, alpha: 0 } } = {},
) {
  const inner = Math.round(size * (1 - marginRatio * 2));
  const fitted = await sharp(buf)
    .resize({
      width: inner,
      height: inner,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: fitted, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/** Minimal ICO writer embedding PNG images (supported by all modern browsers). */
function ico(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const entries = [];
  let offset = 6 + 16 * pngs.length;
  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

const horizontal = await trimmed(src("horizontal"));
const vertical = await trimmed(src("vertical"));
await writeSizes("latansa-logo-horizontal", horizontal.buf, [480, 960, 1440]);
await writeSizes("latansa-logo-vertical", vertical.buf, [480, 960]);

const symbol = await symbolFromHorizontal(horizontal.buf);
await writeSizes("latansa-symbol", symbol.data, [256, 512]);

writeFileSync(`${app}icon.png`, await square(symbol.data, 512, { marginRatio: 0.06 }));
writeFileSync(
  `${app}apple-icon.png`,
  await square(symbol.data, 180, { marginRatio: 0.16, background: WHITE }),
);
const icoSizes = [16, 32, 48];
writeFileSync(
  `${app}favicon.ico`,
  ico(
    await Promise.all(
      icoSizes.map(async (size) => ({
        size,
        data: await square(symbol.data, size, { marginRatio: 0.04 }),
      })),
    ),
  ),
);

writeFileSync(
  `${root}src/config/brand-assets.json`,
  `${JSON.stringify(manifest, null, 2)}\n`,
);
console.log(
  "Brand assets written:",
  Object.keys(manifest).join(", "),
  "+ icon.png, apple-icon.png, favicon.ico",
);
