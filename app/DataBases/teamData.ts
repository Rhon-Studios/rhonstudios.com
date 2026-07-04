export type TeamMemberId = 
    "rashri" 
    | "camilo"
    ;

export type CollaboratorId =
    ""
    ;

export interface Person {
    name: string;
    img?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
    email?: string;
}

export interface TeamMember extends Person {
    id: TeamMemberId;
    role: string;
}

export interface Collaborator extends Person {
    id: CollaboratorId;
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

];