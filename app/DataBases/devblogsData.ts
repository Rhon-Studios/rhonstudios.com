export interface DevBlogPost {
    id: 
        "db-001"
        | "db-002"
    ;
    slug: string;
    project: 
        "Tonkori" 
        | "Afterlight" 
        | "Rhon Studios" 
        | "The Observer" 
        | "Tiny Care";
    publishedAt: string;
    readingTime: number;
    featured: boolean;
    coverImage?: string;
    authorType: "team" | "collaborator";
    authorId: string;
}

export const devBlogPosts: DevBlogPost[] = [
    {
        id: "db-001",
        project: "Rhon Studios",
        publishedAt: "01/07/2026",
        readingTime: 4,
        featured: true,
        slug: "why-rhon-studios",
        coverImage: "/logos/RhonStudios_Banner.png",
        authorType: "team",
        authorId: "rashri"
    },
    {
        id: "db-002",
        slug: "rhon-studios-revshare",
        project: "Rhon Studios",
        publishedAt: "04/07/2026",
        readingTime: 5,
        featured: true,
        authorType: "team",
        authorId: "rashri"
    }
];

export function getDevBlogBySlug(slug: string) {
    return devBlogPosts.find(post => post.slug === slug);
}
