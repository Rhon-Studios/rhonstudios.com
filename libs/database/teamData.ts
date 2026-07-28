export type TeamMemberId = "rashri" | "camilo";

export type CollaboratorId =
  | "test"
  | "angelramirez"
  | "marielodiard"
  | "sayyidali"
  | "tinomhedziso"
  | "javigarni"
  | "sage"
  | "gabi";

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

export interface Collaborator extends Person {
  id: CollaboratorId;
  visible: boolean;
  role: string;
  area: string;
  coverImage: string;
  photo?: string;
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
    photo: "/collaborators/juan/photo.jpg",
    coverImage: "/collaborators/juan/coverImage.jpg",
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
  },
  {
    id: "angelramirez",
    visible: true,
    role: "Dev",
    area: "Afterlight",
    coverImage: "",
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
    id: "marielodiard",
    visible: true,
    role: "Arte",
    area: "Afterlight",
    photo: "/collaborators/mariel/photo.jpg",
    coverImage: "/collaborators/mariel/coverImage.jpg",
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
  {
    id: "sayyidali",
    visible: true,
    role: "Arte",
    area: "Tonkori",
    coverImage: "",
    links: {
      portfolio: "https://sayyid-ali-game-developer.pages.dev/",
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
    name: "Sayyid Ali",
  },
  {
    id: "tinomhedziso",
    visible: true,
    role: "Dev",
    area: "Rhon Studios",
    photo: "/collaborators/tino/photo.jpg",
    coverImage: "/collaborators/tino/coverImage.jpg",
    links: {
      portfolio: "https://digital-atlas1.vercel.app/",
      web: undefined,
      github: "https://github.com/Passion-Over-Pain",
      linkedin: "https://linkedin.com/in/tinotenda-mhedziso",
      twitter: undefined,
      instagram: undefined,
      youtube: undefined,
      buymeacoffee: undefined,
      email: undefined,
    },
    status: "active",
    name: "Tino Mhedziso",
  },
  {
    id: "javigarni",
    visible: false,
    role: "",
    area: "",
    photo: "/collaborators/sage/photo.jpeg",
    coverImage: "",
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
    name: "",
  },
  {
    id: "sage",
    visible: true,
    role: "Artist",
    area: "Tiny Care",
    photo: "/collaborators/sage/photo.jpeg",
    coverImage: "",
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
    id: "gabi",
    visible: false,
    role: "",
    area: "",
    coverImage: "",
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
    name: "",
  },
];
