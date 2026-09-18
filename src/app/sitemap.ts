import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";
import { absolute, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    // Project modals are URL-driven (?project=slug), so each one is a real,
    // shareable, crawlable address worth listing.
    ...projects.map((p) => ({
      url: absolute(`/?project=${p.slug}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: p.featured ? 0.8 : 0.6,
    })),
  ];
}
