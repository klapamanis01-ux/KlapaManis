import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.klapamanis.com";
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/home`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/home/gallery`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/home/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}
