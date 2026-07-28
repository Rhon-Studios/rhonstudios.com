import type { MetadataRoute } from "next";
import { collaborators } from "@/libs/database/teamData";
import { devBlogPosts } from "@/libs/database/devblogsData";
import { routing } from "@/libs/i18n/routing";

const SITE_URL = "https://rhonstudios.com";
const LOCALES = routing.locales;

type RouteDef = {
  path: string;
  lastModified: Date;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

function buildAlternates(path: string) {
  return Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`]));
}

function toSitemapEntries(route: RouteDef): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}${route.path}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: { languages: buildAlternates(route.path) },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: RouteDef[] = [
    { path: "", lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { path: "/join", lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { path: "/devblogs", lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { path: "/links", lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { path: "/games/afterlight", lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { path: "/games/tinycare", lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { path: "/games/theobserver", lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { path: "/games/tonkori", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const collabRoutes: RouteDef[] = collaborators
    .filter((c) => c.visible)
    .map((c) => ({
      path: `/collaborators/${c.id}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  const devblogRoutes: RouteDef[] = devBlogPosts.map((p) => ({
    path: `/devblogs/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const allRoutes = [...staticRoutes, ...collabRoutes, ...devblogRoutes];

  return allRoutes.flatMap(toSitemapEntries);
}
