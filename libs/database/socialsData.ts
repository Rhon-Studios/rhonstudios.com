import {
    BookOpen,
    Coffee,
    ExternalLink,
    Gamepad2,
    Github,
    Instagram,
    Linkedin,
    Mail,
    MessageSquare,
    Music2,
    Twitter,
    Users,
    Youtube,
    type LucideIcon,
} from "lucide-react";

export type SocialId =
    | "discord"
    | "twitter"
    | "instagram"
    | "youtube"
    | "tiktok"
    | "github"
    | "linkedin"
    | "mail"
    | "coffee"
    | "web"
    | "devblog"
    | "games"
    | "join";

export type SocialVariant = "primary" | "coffee" | "default";

export interface SocialLink {
    id: SocialId;
    icon: LucideIcon;
    name: string;
    handle?: string;
    url: string;
    variant: SocialVariant;
}

export const SOCIALS: Record<SocialId, SocialLink> = {
    discord: {
        id: "discord",
        icon: MessageSquare,
        name: "Discord",
        handle: "Rhon Studios",
        url: "https://discord.gg/7T8n8VYRkw",
        variant: "primary",
    },
    twitter: {
        id: "twitter",
        icon: Twitter,
        name: "Twitter / X",
        handle: "@RhonStudios",
        url: "https://x.com/RhonStudios",
        variant: "default",
    },
    instagram: {
        id: "instagram",
        icon: Instagram,
        name: "Instagram",
        handle: "@rhonstudios",
        url: "https://www.instagram.com/rhonstudios/",
        variant: "default",
    },
    youtube: {
        id: "youtube",
        icon: Youtube,
        name: "YouTube",
        handle: "Rhon Studios",
        url: "https://www.youtube.com/@RhonStudios",
        variant: "default",
    },
    tiktok: {
        id: "tiktok",
        icon: Music2,
        name: "Tik Tok",
        handle: "rhonstudios",
        url: "https://www.tiktok.com/rhon.studios",
        variant: "default",
    },
    github: {
        id: "github",
        icon: Github,
        name: "GitHub",
        handle: "Rhon-Studios",
        url: "https://github.com/Rhon-Studios",
        variant: "default",
    },
    linkedin: {
        id: "linkedin",
        icon: Linkedin,
        name: "LinkedIn",
        handle: "Rhon Studios",
        url: "https://www.linkedin.com/company/rhon-studios",
        variant: "default",
    },
    mail: {
        id: "mail",
        icon: Mail,
        name: "Email",
        handle: "rhonstudios@gmail.com",
        url: "mailto:rhonstudios@gmail.com",
        variant: "default",
    },
    coffee: {
        id: "coffee",
        icon: Coffee,
        name: "Buy Me a Coffee",
        url: "https://buymeacoffee.com/rhonstudios",
        variant: "coffee",
    },
    web: {
        id: "web",
        icon: ExternalLink,
        name: "Web",
        url: "https://rhonstudios.com",
        variant: "default",
    },
    devblog: {
        id: "devblog",
        icon: BookOpen,
        name: "DevBlog",
        url: "https://rhonstudios.com/devblogs",
        variant: "default",
    },
    games: {
        id: "games",
        icon: Gamepad2,
        name: "Juegos",
        url: "https://rhonstudios.com/#games",
        variant: "default",
    },
    join: {
        id: "join",
        icon: Users,
        name: "Únete",
        url: "https://rhonstudios.com/join",
        variant: "default",
    },
};

export function getSocials(ids: SocialId[]): SocialLink[] {
    return ids.map((id) => SOCIALS[id]);
}

export const SOCIAL_VARIANT_STYLES: Record<SocialVariant, { container: string; icon: string }> = {
    primary: {
        container: "border-amber-400/50 bg-amber-400/[0.06] hover:border-amber-400 hover:bg-amber-400/10",
        icon: "text-amber-300/80 group-hover:text-amber-300",
    },
    coffee: {
        container: "border-white/50 bg-white/[0.03] hover:bg-white/10 hover:border-white",
        icon: "text-white/60 group-hover:text-white",
    },
    default: {
        container: "border-white/20 hover:border-white/55 hover:bg-white/[0.03]",
        icon: "text-white/50 group-hover:text-white",
    },
};