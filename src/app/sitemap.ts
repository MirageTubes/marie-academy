import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { stories } from "@/content/news";
import { programs } from "@/content/programs";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/programs", "/admissions", "/camp", "/events", "/news", "/give", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, priority: p === "" ? 1 : 0.8 })),
    ...programs.map((p) => ({ url: `${site.url}/programs/${p.slug}`, priority: 0.7 })),
    ...stories.map((s) => ({ url: `${site.url}/news/${s.slug}`, lastModified: s.date, priority: 0.5 })),
  ];
}
