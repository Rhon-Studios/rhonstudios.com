import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "@/libs/i18n/routing";
import { GameSchema, BreadcrumbSchema } from "@/libs/seo/GameShema";
import { GamePageClient } from "@/components/games/GamePageClient";

const VALID_IDS = ["afterlight", "tinycare", "theobserver", "tonkori"] as const;
type GameId = (typeof VALID_IDS)[number];

const GAME_SEO: Record<
  GameId,
  Record<"es" | "en", { title: string; description: string; keywords: string[] }>
> = {
  afterlight: {
    es: {
      title: "Afterlight | Metroidvania de Luz y Sombra",
      description:
        "Afterlight es el metroidvania atmosférico de Rhon Studios donde la coexistencia de luz y sombra define quién eres. Sin palabras, solo diseño y emoción.",
      keywords: ["afterlight metroidvania", "metroidvania indie español", "luz sombra videojuego"],
    },
    en: {
      title: "Afterlight | A Metroidvania of Light and Shadow",
      description:
        "Afterlight is Rhon Studios' atmospheric metroidvania where the coexistence of light and shadow defines who you are. No words, just design and emotion.",
      keywords: ["afterlight metroidvania", "indie metroidvania", "light shadow game"],
    },
  },
  tinycare: {
    es: {
      title: "Tiny Care | Tu Mascota Virtual con Consecuencias Reales",
      description:
        "Tiny Care es el juego de mascotas virtuales de Rhon Studios para móvil donde las consecuencias son reales. Cuida a tu compañero antes de que sea tarde.",
      keywords: ["tiny care mascotas virtuales", "cozy mobile game", "juego mascotas android ios"],
    },
    en: {
      title: "Tiny Care | Your Virtual Pet With Real Consequences",
      description:
        "Tiny Care is Rhon Studios' mobile virtual pet game where consequences are real. Care for your companion before it's too late.",
      keywords: ["tiny care virtual pet", "cozy mobile game", "pet sim android ios"],
    },
  },
  theobserver: {
    es: {
      title: "The Observer | Novela Visual Otome de Misterio",
      description:
        "The Observer es la novela visual otome de Rhon Studios donde el amor y la sospecha conviven. Descubre quién miente antes de que sea tarde.",
      keywords: ["the observer visual novel", "novela visual otome misterio", "otome game español"],
    },
    en: {
      title: "The Observer | Mystery Otome Visual Novel",
      description:
        "The Observer is Rhon Studios' otome mystery visual novel where love and suspicion coexist. Discover who's lying before it's too late.",
      keywords: ["the observer visual novel", "otome mystery visual novel", "otome game"],
    },
  },
  tonkori: {
    es: {
      title: "Tonkori | RPG donde no Existen Respuestas Correctas",
      description:
        "Tonkori es el RPG de dilemas morales de Rhon Studios donde cada decisión redefine el mundo. No hay bien ni mal: solo consecuencias.",
      keywords: ["tonkori rpg", "rpg decisiones morales indie"],
    },
    en: {
      title: "Tonkori | An RPG Without Right Answers",
      description:
        "Tonkori is Rhon Studios' moral-dilemma RPG where every decision reshapes the world. No right or wrong — only consequences.",
      keywords: ["tonkori rpg", "moral choice indie rpg"],
    },
  },
};

const BREADCRUMB_TEXT = {
  es: { home: "Rhon Studios", games: "Juegos" },
  en: { home: "Rhon Studios", games: "Games" },
} as const;

export function generateStaticParams() {
  return VALID_IDS.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale: rawLocale } = await params;
  const locale = (hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale) as
    "es" | "en";

  if (!VALID_IDS.includes(id as GameId)) return {};

  const gameId = id as GameId;
  const seo = GAME_SEO[gameId][locale];
  const keywordsPrefix =
    locale === "en"
      ? ["Rhon Studios", "spanish indie studio", "narrative games"]
      : ["Rhon Studios", "estudio indie español", "videojuegos narrativos"];

  return {
    title: seo.title,
    description: seo.description,
    keywords: [...keywordsPrefix, ...seo.keywords],
    alternates: {
      canonical: `https://rhonstudios.com/${locale}/games/${gameId}`,
      languages: {
        es: `https://rhonstudios.com/es/games/${gameId}`,
        en: `https://rhonstudios.com/en/games/${gameId}`,
      },
    },
    openGraph: {
      type: "website",
      url: `https://rhonstudios.com/${locale}/games/${gameId}`,
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
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale: rawLocale } = await params;
  const locale = (hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale) as
    "es" | "en";

  if (!VALID_IDS.includes(id as GameId)) {
    notFound();
  }

  const gameId = id as GameId;
  const seo = GAME_SEO[gameId][locale];
  const gameShortName = seo.title.split(" | ")[0];
  const breadcrumb = BREADCRUMB_TEXT[locale];

  return (
    <>
      <GameSchema gameId={gameId} />

      <BreadcrumbSchema
        items={[
          { name: breadcrumb.home, url: `https://rhonstudios.com/${locale}` },
          { name: breadcrumb.games, url: `https://rhonstudios.com/${locale}#games` },
          { name: gameShortName, url: `https://rhonstudios.com/${locale}/games/${gameId}` },
        ]}
      />
      <GamePageClient id={id} />
    </>
  );
}
