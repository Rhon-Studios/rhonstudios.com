export interface Project {
    id: string;
    slug: string;
    accentColor: string;
    secondaryColor: string;
    order: number;
}

export interface Opportunity {
    id: string;
    projectId: string;
    area: "art" | "programming" | "audio" | "narrative" | "design" | "marketing" | "other";
    status: "open" | "filled";
    createdAt: string;
    featured: boolean;
}
export const projectsData: Project[] = [
    {
        id: "tonkori",
        slug: "tonkori",
        accentColor: "#55131A",
        secondaryColor: "#BF6079",
        order: 1,
    },
    {
        id: "afterlight",
        slug: "afterlight",
        accentColor: "#0A0C12",
        secondaryColor: "#E3B873",
        order: 2,
    },
    {
        id: "studio",
        slug: "studio",
        accentColor: "black",
        secondaryColor: "white",
        order: 3,
    },
    {
        id: "other",
        slug: "otros",
        accentColor: "#02150C",
        secondaryColor: "#34D399",
        order: 4,
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
    {
        id: "afterlight-artist",
        projectId: "afterlight",
        area: "art",
        status: "open",
        createdAt: "2026-06-24",
        featured: true,
    },
    {
        id: "afterlight-leveldesigner",
        projectId: "afterlight",
        area: "design",
        status: "open",
        createdAt: "2026-06-24",
        featured: true,
    },
    {
        id: "afterlight-programmer",
        projectId: "afterlight",
        area: "programming",
        status: "open",
        createdAt: "2026-06-24",
        featured: false,
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
    }
];
