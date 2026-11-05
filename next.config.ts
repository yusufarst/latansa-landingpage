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
