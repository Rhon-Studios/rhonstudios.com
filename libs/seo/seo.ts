import type { Metadata } from "next";

const SITE_URL = "https://rhonstudios.com";
const SITE_NAME = "Rhon Studios";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og/og-default.png`;
const TWITTER_HANDLE = "@rhonstudios";

interface PageSEOProps {
    title: string;
    description: string;
    path: string;
    ogImage?: string;
    ogImageAlt?: string;
    keywords?: string[];
    noIndex?: boolean;
}

const BASE_KEYWORDS = [
    "Rhon Studios",
    "estudio indie español",
    "videojuegos narrativos",
    "indie game studio Spain",
]

export function generatePageMetadata({ title, description, path, ogImage = DEFAULT_OG_IMAGE, ogImageAlt = `${title} | "Rhon Studios`, keywords = [], noIndex = false 
}: PageSEOProps): Metadata {
    const canonical = `${SITE_URL}${path}`;
    const canonicalEN = `${SITE_URL}/en${path}`;
    
    return {
        title,
        description,
        keywords: [...BASE_KEYWORDS, ...keywords],
        
        robots: noIndex
            ? { index: false, follow: false}
            : {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    "max-image-preview": "large",
                    "max-snippet": -1,
                },
            },
        
        alternates: {
            canonical,
            languages: {
                es: canonical,
                en: canonicalEN,
                "x-default": canonical,
            },
        },

        openGraph: {
            type: "website",
            url: canonical,
            siteName: SITE_NAME,
            title: `${title} | ${SITE_NAME}`,
            description,
            locale: "es_ES",
            alternateLocale: ["en_US"],
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: ogImageAlt,
                    type: "image/png",
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            site: TWITTER_HANDLE,
            creator: TWITTER_HANDLE,
            title: `${title} | ${SITE_NAME}`,
            description,
            images: { url: ogImage, alt: ogImageAlt },
        },
    }
}

export const homeMetadata = generatePageMetadata({
    title: "Estudio de Videojuegos Indie",
    description: "Rhon Studios es un estudio indie creador de Afterlight, Tiny Care, The Observer y Tonkori. Desarrollamos mundos narrativos originales que se quedan contigo.",
    path: "/",
    ogImage: `${SITE_URL}/og/og-home.png`,
    keywords: ["Afterlight", "Tiny Care", "The Observer", "Tonkori", "metroidvania indie"],
});

export const joinMetadata = generatePageMetadata({
    title: "Únete al Equipo | Colabora con Rhon Studios",
    description: "Buscamos artistas, programadores, narrativistas y diseñadores de audio para colaborar en nuestros proyectos bajo un modelo de Revenue Share transparente.",
    path: "/join",
    ogImage: `${SITE_URL}/og/og-join.png`,
    ogImageAlt: "Únete a Rhon Studios | Colabora en Revenue Share",
    keywords: [
        "colaborar estudio indie",
        "revenue share videojuegos españa",
        "trabajar videojuegos sin experiencia",
        "artista pixel art proyecto indie",
        "programador Unity Godot indie",
    ],
});

export const devblogsMetadata = generatePageMetadata({
    title: "Devlogs | El Diario del Estudio",
    description: "Seguimiento en tiempo real del desarrollo de los proyectos de Rhon Studios: Afterlight, Tiny Care, The Observer y Tonkori. Proceso, decisiones y aprendizajes.",
    path: "/devblogs",
    ogImage: `${SITE_URL}/og/og-devblogs.png`,
    keywords: ["devlog estudio indie", "diario desarrollo videojuego", "devblog indie español"],
});

export const afterlightMetadata = generatePageMetadata({
    title: "Afterlight | Metroidvania de Luz y Sombra",
    description: "Afterlight es un metroidvania indie de Rhon Studios donde la luz y la sombra definen quién eres. Una historia sin palabras, contada a través del diseño y la atmósfera.",
    path: "/games/afterlight",
    ogImage: `${SITE_URL}/og/og-afterlight.png`,
    ogImageAlt: "Afterlight | Metroidvania Indie de Rhon Studios",
    keywords: [
        "afterlight videojuego",
        "afterlight metroidvania",
        "metroidvania indie español",
        "metroidvania luz sombra",
        "afterlight indie game",
    ],
});

export const tinyCareMetadata = generatePageMetadata({
    title: "Tiny Care | Tu Mascota Virtual con Consecuencias Reales",
    description: "Tiny Care es un juego de mascotas virtuales para móvil de Rhon Studios donde las consecuencias son reales. Cuida a tu compañero o algo cambiará para siempre.",
    path: "/games/tinycare",
    ogImage: `${SITE_URL}/og/og-tinycare.png`,
    ogImageAlt: "Tiny Care | Juego de mascotas móvil de Rhon Studios",
    keywords: [
        "tiny care juego mascotas",
        "juego mascotas virtuales móvil",
        "cozy mobile game",
        "virtual pet game",
        "tiny care indie",
    ],
});

export const theObserverMetadata = generatePageMetadata({
    title: "The Observer | Novela Visual Otome de Misterio",
    description: "The Observer es una novela visual otome de Rhon Studios donde el amor y el misterio coexisten. ¿Puedes confiar en alguien cuando todos guardan secretos?",
    path: "/games/theobserver",
    ogImage: `${SITE_URL}/og/og-theobserver.png`,
    ogImageAlt: "The Observer | Novela Visual Otome de Rhon Studios",
    keywords: [
        "the observer novela visual",
        "novela visual otome español",
        "visual novel mystery",
        "otome game español",
        "the observer indie",
    ],
});

export const tonkoriMetadata = generatePageMetadata({
    title: "Tonkori | RPG de Dilemas Morales",
    description: "Tonkori es un RPG de Rhon Studios donde no hay respuestas correctas. Tus decisiones morales definen el mundo y a los personajes que te rodean.",
    path: "/games/tonkori",
    ogImage: `${SITE_URL}/og/og-tonkori.png`,
    ogImageAlt: "Tonkori | RPG Indie de Rhon Studios",
    keywords: [
        "tonkori videojuego",
        "rpg decisiones morales",
        "rpg indie español",
        "tonkori indie game",
    ],
});