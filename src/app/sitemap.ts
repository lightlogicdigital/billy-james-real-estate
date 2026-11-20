import type { MetadataRoute } from "next";

// Static export: generate this file once at build time.
export const dynamic = "force-static";
import { listings } from "@/content/listings";
import { neighborhoods } from "@/content/neighborhoods";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/neighborhoods", "/listings", "/home-value", "/contact", "/privacy-policy"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
  return [
    ...pages,
    ...neighborhoods.map((n) => ({ url: `${site.url}/neighborhoods/${n.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...listings.map((l) => ({ url: `${site.url}/listings/${l.slug}`, changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
