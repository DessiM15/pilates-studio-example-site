import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/data/services";
import { instructors } from "@/lib/data/instructors";
import { posts } from "@/lib/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const statics: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/classes", priority: 0.9, changeFrequency: "monthly" },
    { path: "/schedule", priority: 0.9, changeFrequency: "daily" },
    { path: "/instructors", priority: 0.8, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
    { path: "/intro-offer", priority: 0.9, changeFrequency: "monthly" },
    { path: "/new-to-pilates", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
    { path: "/journal", priority: 0.7, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
    { path: "/accessibility", priority: 0.3, changeFrequency: "yearly" },
  ];
  return [
    ...statics.map((s) => ({ url: `${site.url}${s.path}`, lastModified: now, priority: s.priority, changeFrequency: s.changeFrequency })),
    ...services.map((s) => ({ url: `${site.url}/classes/${s.slug}`, lastModified: now, priority: 0.9, changeFrequency: "monthly" as const })),
    ...instructors.map((i) => ({ url: `${site.url}/instructors/${i.slug}`, lastModified: now, priority: 0.6, changeFrequency: "monthly" as const })),
    ...posts.map((p) => ({ url: `${site.url}/journal/${p.slug}`, lastModified: new Date(p.date), priority: 0.6, changeFrequency: "yearly" as const })),
  ];
}
