export type TeamMemberId = 
    "rashri" 
    | "camilo"
    ;

export type CollaboratorId =
    "test"
    ;

export interface Person {
    name: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
    email?: string;
}

export interface TeamMember extends Person {
    id: TeamMemberId;
    role: string;
    img: string;
}

export interface WorkItem {
    type: "image" | "video" | "link";
    url: string;
    caption?: string;
}

export interface Collaborator extends Person {
    id: CollaboratorId;
    visible: boolean;
    role: string;
    area: string;
    coverImage: string;
    photo?: string;
    media: WorkItem[];
    links: {
        portfolio?: string;
        web?: string;
        github?: string;
        linkedin?: string;
        twitter?: string;
        instagram?: string;
        youtube?: string;
        buymeacoffee?: string;
        email?: string;
    };
    status: "active" | "alumni";
}

export const team: TeamMember[] = [
    {
        id: "rashri",
        name: "Rashri Amorós",
        img: "",
        role: "CEO",
        linkedin: "https://www.linkedin.com/in/rashriamoros/",
        github: "https://github.com/rashxx-exe",
        twitter: "https://x.com/arcisax",
        email: "rashriamoros@gmail.com"
    },
    {
        id: "camilo",
        name: "Camilo Jumelle",
        img: "",
        role: "CEO",
        linkedin: "https://www.linkedin.com/in/jumelle-camilo/",
        github: "https://github.com/jumelleCL",
        twitter: "https://x.com/Kaios_LK",
        email: "jumellecamilo@gmail.com"
    }
];

export const collaborators: Collaborator[] = [
    {
        id: "test",
        name: "Juan Lopez",
        area: "Tiny Care",
        role: "Arte",
        status: "active",
        visible: false,
        photo: "https://cdna.artstation.com/p/assets/images/images/035/732/490/large/derrick-zha-woqi.jpg?1615755484",
        coverImage: "https://cdnb.artstation.com/p/assets/images/images/100/708/569/large/thomas-chamberlain-keen-beast-within.jpg?1783794181",
        links: {
            twitter: "https://github.com",
            youtube: "https://github.com",
            buymeacoffee: "https://github.com",
            email: "https://github.com",
            github: "https://github.com",
            linkedin: "https://linkedin.com",
            web: "https://laurasanchez.music",
            portfolio: "https://artstation.com",
            instagram: "https://instagram.com",
        },
        media: [
            {
                type: "image",
                url: "https://cdnb.artstation.com/p/assets/images/images/100/599/205/large/james-naughton-main-render-2-1-1.jpg?1783437570",
                caption: "Biome | El Bosque de Cristal",
            },
            {
                type: "image",
                url: "https://cdnb.artstation.com/p/assets/images/images/100/676/001/large/quentin-mabille-dome-city-topdownview.jpg?1783675054",
                caption: "Concept Art | Torre de Memorias",
            },
            {
                type: "video",
                url: "https://youtu.be/dQw4w9WgXcQ?si=mQu4YLwvNPBzoQoI",
                caption: "Demo | v0.3",
            },
            {
                type: "link",
                url: "https://soundcloud.com",
                caption: "Tonkori | SoundCloud",
            },
        ],
    }
];