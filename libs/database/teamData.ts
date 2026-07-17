export type TeamMemberId = "rashri" | "camilo";

export type CollaboratorId = "test" | "angelramirez" | "sage" | "marielodiard";

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
    email: "rashriamoros@gmail.com",
  },
  {
    id: "camilo",
    name: "Camilo Jumelle",
    img: "",
    role: "CEO",
    linkedin: "https://www.linkedin.com/in/jumelle-camilo/",
    github: "https://github.com/jumelleCL",
    twitter: "https://x.com/Kaios_LK",
    email: "jumellecamilo@gmail.com",
  },
];

export const collaborators: Collaborator[] = [
  {
    id: "test",
    name: "Juan Lopez",
    area: "Tiny Care",
    role: "Arte",
    status: "active",
    visible: false,
    photo:
      "https://cdna.artstation.com/p/assets/images/images/035/732/490/large/derrick-zha-woqi.jpg?1615755484",
    coverImage:
      "https://cdnb.artstation.com/p/assets/images/images/100/708/569/large/thomas-chamberlain-keen-beast-within.jpg?1783794181",
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
  },
  {
    id: "angelramirez",
    visible: true,
    role: "Dev",
    area: "Afterlight",
    coverImage: "",
    media: [
      {
        type: "image",
        url: "/afterlight/collaborators/angel_estados.png",
      },
    ],
    links: {
      web: "https://edoce.us/",
      github: "https://github.com/Eledoce",
      linkedin: "https://www.linkedin.com/in/miguel-ángel-barrientos-ramírez-775bb8248/",
      instagram: "https://www.instagram.com/edoce.css/",
    },
    status: "active",
    name: "Ángel Ramírez",
  },
  {
    id: "sage",
    visible: true,
    role: "CHRO",
    area: "Rhon Studios",
    coverImage: "",
    media: [],
    links: {
      portfolio: undefined,
      web: undefined,
      github: undefined,
      linkedin: undefined,
      twitter: undefined,
      instagram: undefined,
      youtube: undefined,
      buymeacoffee: undefined,
      email: undefined,
    },
    status: "active",
    name: "Sage",
  },
  {
    id: "marielodiard",
    visible: false,
    role: "Arte",
    area: "Afterlight",
    photo:
      "https://static.wixstatic.com/media/96388c_d57842d0d55a4daeb75d3bc53e8bbee9~mv2.png/v1/fill/w_176,h_176,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/LogoNEgroTrans.png",
    coverImage:
      "https://static.wixstatic.com/media/96388c_5b67aad5c57c43d4b5c50a1763999bee~mv2.jpg/v1/fill/w_2160,h_1001,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/96388c_5b67aad5c57c43d4b5c50a1763999bee~mv2.jpg",
    media: [],
    links: {
      portfolio: "https://linktr.ee/mariel.odiard",
      web: "https://marielodiard.wixsite.com/mariel-odiard",
      github: undefined,
      linkedin: undefined,
      twitter: undefined,
      instagram: "https://www.instagram.com/marielodiard/",
      youtube: "https://www.youtube.com/@NeoNeko-m%C3%BAsica",
      buymeacoffee: "https://cafecito.app/marielodiard413",
      email: undefined,
    },
    status: "active",
    name: "Mariel Odiard",
  },
];
