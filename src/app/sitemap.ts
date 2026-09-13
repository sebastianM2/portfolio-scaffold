import type { MetadataRoute } from "next";
import { siteMeta, caseStudies } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteMeta.url,
      lastModified: new Date(),
      priority: 1,
    },
    ...caseStudies.map((cs) => ({
      url: `${siteMeta.url}/case-studies/${cs.slug}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
  ];
}
