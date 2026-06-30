export interface Project {
    id: string;
    slug: string;
    accentColor: string;
    secondaryColor: string;
    order: number;
    importance: "high" | "medium" | "low";
}

export interface Opportunity {
    id: string;
    projectId: string;
    area: "art" | "programming" | "audio" | "narrative" | "design" | "marketing" | "other";
    status: "open" | "filled";
    createdAt: string;
    featured: boolean;
}

const IMPORTANCE_RANK: Record<Project["importance"], number> = {
    high: 3,
    medium: 2,
    low: 1,
};


export const projectsData: Project[] = [
    {
        id: "tonkori",
        slug: "tonkori",
        accentColor: "#55131A",
        secondaryColor: "#BF6079",
        order: 1,
        importance: "low"
    },
    {
        id: "afterlight",
        slug: "afterlight",
        accentColor: "#0A0C12",
        secondaryColor: "#E3B873",
        order: 2,
        importance: "high"
    },
    {
        id: "tinycare",
        slug: "tinycare",
        accentColor: "#111011",
        secondaryColor: "#e9edc9",
        order: 3,
        importance: "high"
    },
    {
        id: "theobserver",
        slug: "theobserver",
        accentColor: "#0a0f12",
        secondaryColor: "#93C5FD",
        order: 4,
        importance: "high"
    },
    {
        id: "studio",
        slug: "studio",
        accentColor: "black",
        secondaryColor: "white",
        order: 5,
        importance: "high"
    },
    {
        id: "other",
        slug: "otros",
        accentColor: "#02150C",
        secondaryColor: "#34D399",
        order: 6,
        importance: "medium"
    },
];

export const opportunitiesData: Opportunity[] = [

    // --- ESTUDIO (general) ---
    {
        id: "studio-concept-artist",
        projectId: "studio",
        area: "art",
        status: "open",
        createdAt: "2026-06-24",
        featured: true,
    },
    {
        id: "studio-community-manager",
        projectId: "studio",
        area: "marketing",
        status: "open",
        createdAt: "2026-06-26",
        featured: false,
    },

    // --- AFTERLIGHT ---

    // --- TINY CARE ---
    {
        id: "tiny-programmer",
        projectId: "tinycare",
        area: "programming",
        status: "open",
        createdAt: "2026-06-27",
        featured: false,
    },
    {
        id: "tiny-artist",
        projectId: "tinycare",
        area: "art",
        status: "open",
        createdAt: "2026-06-27",
        featured: true,
    },

    // --- THE OBSERVER ---
    {
        id: "observer-programmer",
        projectId: "theobserver",
        area: "programming",
        status: "open",
        createdAt: "2026-06-27",
        featured: false,
    },
    {
        id: "observer-narrator",
        projectId: "theobserver",
        area: "narrative",
        status: "open",
        createdAt: "2026-06-27",
        featured: true,
    },
    {
        id: "observer-female-voice-actor",
        projectId: "theobserver",
        area: "audio",
        status: "open",
        createdAt: "2026-06-30",
        featured: true,
    },

    // --- OTROS (proyectos pequeños) ---
    {
        id: "other-artist",
        projectId: "other",
        area: "art",
        status: "open",
        createdAt: "2026-06-24",
        featured: false,
    },
    {
        id: "other-designer",
        projectId: "other",
        area: "design",
        status: "open",
        createdAt: "2026-06-24",
        featured: false,
    },
    {
        id: "other-narrator",
        projectId: "other",
        area: "narrative",
        status: "open",
        createdAt: "2026-06-24",
        featured: false,
    },
];

export function getTopProjects(limit = 4): Project[] {
    return [...projectsData]
        .sort((a, b) => IMPORTANCE_RANK[b.importance] - IMPORTANCE_RANK[a.importance])
        .slice(0, limit);
}
