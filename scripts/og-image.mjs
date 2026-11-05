#!/usr/bin/env node
/**
 * og:image — builds public/og/latansa-og.jpg (1200 × 630), the image shown
 * when the site is shared (Open Graph, X/Twitter, WhatsApp, LinkedIn).
 *
 * The approved hero photograph (already graded by `npm run images:build`)
 * fills the frame. The official horizontal logo sits unchanged on a flat white
 * plate in the center, so apps that crop previews to a square keep it whole.
 * The logo is only scaled, never recolored, redrawn or re-composed
 * (docs/brand-assets.md). Run after `npm run images:build`.
 */
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = (p) => fileURLToPath(new URL(`../${p}`, import.meta.url));
const W = 1200;
const H = 630;
const PLATE = { width: 560, height: 220 };
const LOGO_WIDTH = 440;

const photo = await sharp(root("public/images/hero-wide-2600.webp"))
  .resize(W, H, { fit: "cover", position: "right" })
  .toBuffer();

const logo = await sharp(root("public/brand/latansa-logo-horizontal-1440.png"))
  .resize({ width: LOGO_WIDTH })
  .toBuffer();
const { height: logoHeight } = await sharp(logo).metadata();

const plate = await sharp({
  create: { ...PLATE, channels: 3, background: "#ffffff" },
})
  .composite([
    {
      input: logo,
      left: Math.round((PLATE.width - LOGO_WIDTH) / 2),
      top: Math.round((PLATE.height - logoHeight) / 2),
    },
  ])
  .png()
  .toBuffer();

mkdirSync(root("public/og"), { recursive: true });
const out = root("public/og/latansa-og.jpg");
const info = await sharp(photo)
  .composite([
    {
      input: plate,
      left: Math.round((W - PLATE.width) / 2),
      top: Math.round((H - PLATE.height) / 2),
    },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(out);
console.log(
  `public/og/latansa-og.jpg: ${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB`,
);
