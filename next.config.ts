import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages. The deploy workflow sets PAGES_BASE_PATH to
 * "/<repo-name>" while the site lives at <user>.github.io/<repo-name>; leave it
 * empty once a custom domain points at the site.
 */
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  // Emit /about/index.html (not /about.html) so any static host serves clean URLs.
  trailingSlash: true,
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts" },
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
