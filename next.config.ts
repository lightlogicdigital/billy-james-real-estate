import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // The old Framer site misspelled the street ("Megette"). Keep that URL working.
  async redirects() {
    return [
      { source: "/listings/1308-megette-dr", destination: "/listings/1308-meggett-dr-chesapeake-va", permanent: true },
    ];
  },
  partialPrefetching: true,
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
