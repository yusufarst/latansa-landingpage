import type { NextConfig } from "next";

/**
 * Static export only. `next build` writes a fully static site to `out/`,
 * which is deployed as-is to Cloudflare Pages (Free).
 *
 * With `output: "export"` the build fails on anything that needs a server
 * (SSR per request, Server Actions, Route Handlers that read the request,
 * rewrites/redirects/headers in this file, middleware/proxy, ISR). Keep it
 * that way — see CLAUDE.md "Static-only rules".
 */
const nextConfig: NextConfig = {
  output: "export",
  // No paid or server-side image optimization. Images are pre-optimized
  // at build time by `npm run brand:assets` (sharp) or before commit.
  images: {
    unoptimized: true,
  },
  // `/` -> `out/index.html`, `404` -> `out/404.html`. Cloudflare Pages
  // serves both without extra configuration.
  trailingSlash: false,
  poweredByHeader: false,
  // Development only: lets a phone on the same local network load `next dev`
  // (e.g. http://192.168.1.20:3000). Without it, Next.js blocks the dev CSS
  // and JavaScript for that origin, and the page renders unstyled and zoomed
  // out. The static export is unaffected. For sign-off on a phone, use the
  // exported build: `npm run build && npm run preview`, then the Network URL.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*", "*.local"],
  reactStrictMode: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
