import type { MetadataRoute } from "next";
import { ROUTES, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path === "/" ? "" : r.path}`,
    lastModified: now,
    changeFrequency: r.path === "/journal" ? "weekly" : "monthly",
    priority: r.path === "/" ? 1 : r.path === "/contact" || r.path === "/work" ? 0.9 : 0.7,
  }));
}
