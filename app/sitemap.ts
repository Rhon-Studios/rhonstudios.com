import type { MetadataRoute } from "next";

const SITE_URL = "https://rhonstudios.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    return [
        {
            url: `${SITE_URL}/`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${SITE_URL}/join`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/devblogs`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.8,
        },
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
}