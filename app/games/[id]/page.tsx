// app/games/[id]/page.tsx
// SERVIDOR PURO — sin "use client"
// Solo contiene: generateMetadata, generateStaticParams, GameSchema, BreadcrumbSchema
// El contenido visual va en GamePageClient.tsx (componente cliente separado)

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GameSchema, BreadcrumbSchema } from "@/app/seo/GameShema";
import { GamePageClient } from "./GamePageClient";

const VALID_IDS = ["afterlight", "tinycare", "theobserver", "tonkori"] as const;
type GameId = (typeof VALID_IDS)[number];

const GAME_SEO: Record<GameId, {
    title: string;
    description: string;
    keywords: string[];
}> = {
    afterlight: {
        title: "Afterlight | Metroidvania de Luz y Sombra",
        description: "Afterlight es el metroidvania atmosférico de Rhon Studios donde la coexistencia de luz y sombra define quién eres. Sin palabras, solo diseño y emoción.",
        keywords: ["afterlight metroidvania", "metroidvania indie español", "luz sombra videojuego"],
    },
    tinycare: {
        title: "Tiny Care | Tu Mascota Virtual con Consecuencias Reales",
        description: "Tiny Care es el juego de mascotas virtuales de Rhon Studios para móvil donde las consecuencias son reales. Cuida a tu compañero antes de que sea tarde.",
        keywords: ["tiny care mascotas virtuales", "cozy mobile game", "juego mascotas android ios"],
    },
    theobserver: {
        title: "The Observer | Novela Visual Otome de Misterio",
        description: "The Observer es la novela visual otome de Rhon Studios donde el amor y la sospecha conviven. Descubre quién miente antes de que sea tarde.",
        keywords: ["the observer visual novel", "novela visual otome misterio", "otome game español"],
    },
    tonkori: {
        title: "Tonkori | RPG donde no Existen Respuestas Correctas",
        description: "Tonkori es el RPG de dilemas morales de Rhon Studios donde cada decisión redefine el mundo. No hay bien ni mal: solo consecuencias.",
        keywords: ["tonkori rpg", "rpg decisiones morales indie"],
    },
};

export function generateStaticParams() {
    return VALID_IDS.map((id) => ({ id }));
}
export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;

    if (!VALID_IDS.includes(id as GameId)) return {};

    const gameId = id as GameId;
    const seo = GAME_SEO[gameId];

    return {
        title: seo.title,
        description: seo.description,
        keywords: [
            "Rhon Studios",
            "estudio indie español",
            "videojuegos narrativos",
            ...seo.keywords,
        ],
        alternates: {
            canonical: `https://rhonstudios.com/games/${gameId}`,
            languages: {
                es: `https://rhonstudios.com/games/${gameId}`,
                en: `https://rhonstudios.com/en/games/${gameId}`,
                "x-default": `https://rhonstudios.com/games/${gameId}`,
            },
        },
        openGraph: {
            type: "website",
            url: `https://rhonstudios.com/games/${gameId}`,
            siteName: "Rhon Studios",
            title: `${seo.title} | Rhon Studios`,
            description: seo.description,
            images: [
                {
                    url: `https://rhonstudios.com/og/og-${gameId}.png`,
                    width: 1200,
                    height: 630,
                    alt: seo.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            site: "@rhonstudios",
            title: `${seo.title} | Rhon Studios`,
            description: seo.description,
            images: [`https://rhonstudios.com/og/og-${gameId}.png`],
        },
    };
}
export default async function GamePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    if (!VALID_IDS.includes(id as GameId)) {
        notFound();
    }

    const gameId = id as GameId;
    const seo    = GAME_SEO[gameId];
    const gameShortName = seo.title.split(" — ")[0];

    return (
        <>
            <GameSchema gameId={gameId} />

            <BreadcrumbSchema
                items={[
                    { name: "Rhon Studios", url: "https://rhonstudios.com/" },
                    { name: "Juegos", url: "https://rhonstudios.com/#games" },
                    { name: gameShortName,  url: `https://rhonstudios.com/games/${gameId}` },
                ]}
            />
            <GamePageClient id={id} />
        </>
    );
}
