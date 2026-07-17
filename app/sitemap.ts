import type { MetadataRoute } from "next";
import { collaborators } from "@/libs/database/teamData";
import { devBlogPosts } from "@/libs/database/devblogsData";

const SITE_URL = "https://rhonstudios.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/join`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/devblogs`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    {
      url: `${SITE_URL}/games/afterlight`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/games/tinycare`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/games/theobserver`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/games/tonkori`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const collabRoutes: MetadataRoute.Sitemap = collaborators
    .filter((c) => c.visible)
    .map((c) => ({
      url: `${SITE_URL}/collaborators/${c.id}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  const devblogRoutes: MetadataRoute.Sitemap = devBlogPosts.map((p) => ({
    url: `${SITE_URL}/devblogs/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...collabRoutes, ...devblogRoutes];
}
