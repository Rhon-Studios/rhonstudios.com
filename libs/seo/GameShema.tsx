type GameId = "afterlight" | "tinycare" | "theobserver" | "tonkori";
type Locale = "es" | "en";

const PUBLISHER = {
  "@type": "Organization",
  "@id": "https://rhonstudios.com/#organization",
  name: "Rhon Studios",
  url: "https://rhonstudios.com",
};

const GAMES: Record<GameId, { descriptions: Record<Locale, string>; data: object }> = {
  afterlight: {
    descriptions: {
      es: "Afterlight es un metroidvania atmosférico donde la coexistencia de la luz y la sombra define quién eres. Una historia sin palabras, contada a través del diseño y la atmósfera.",
      en: "Afterlight is an atmospheric metroidvania where the coexistence of light and shadow defines who you are. A wordless story told through design and atmosphere.",
    },
    data: {
      "@context": "https://schema.org",
      "@type": "VideoGame",
      name: "Afterlight",
      genre: ["Metroidvania", "Action-Adventure", "Indie"],
      gamePlatform: ["PC", "Steam"],
      applicationCategory: "Game",
      operatingSystem: ["Windows", "macOS", "Linux"],
      gameStatus: "https://schema.org/Announced",
      publisher: PUBLISHER,
      developer: PUBLISHER,
      inLanguage: ["es", "en"],
    },
  },
  tinycare: {
    descriptions: {
      es: "Tiny Care es un juego de mascotas virtuales para móvil donde las consecuencias son reales. Si no cuidas a tu compañero, algo cambiará para siempre.",
      en: "Tiny Care is a mobile virtual pet game where consequences are real. If you don't care for your companion, something will change forever.",
    },
    data: {
      "@context": "https://schema.org",
      "@type": "VideoGame",
      name: "Tiny Care",
      genre: ["Simulation", "Casual", "Cozy", "Indie"],
      gamePlatform: ["iOS", "Android"],
      applicationCategory: "Game",
      operatingSystem: ["iOS", "Android"],
      gameStatus: "https://schema.org/Announced",
      publisher: PUBLISHER,
      developer: PUBLISHER,
      inLanguage: ["es", "en"],
    },
  },
  theobserver: {
    descriptions: {
      es: "The Observer es una novela visual otome de misterio donde el amor y la desconfianza coexisten. Descubre la verdad detrás de cada personaje.",
      en: "The Observer is an otome mystery visual novel where love and suspicion coexist. Uncover the truth behind every character.",
    },
    data: {
      "@context": "https://schema.org",
      "@type": "VideoGame",
      name: "The Observer",
      genre: ["Visual Novel", "Otome", "Mystery", "Indie"],
      gamePlatform: ["PC", "Steam"],
      applicationCategory: "Game",
      operatingSystem: ["Windows", "macOS"],
      gameStatus: "https://schema.org/Announced",
      publisher: PUBLISHER,
      developer: PUBLISHER,
      inLanguage: ["es", "en"],
    },
  },
  tonkori: {
    descriptions: {
      es: "Tonkori es un RPG donde las decisiones morales no tienen respuesta correcta. Cada elección redefine el mundo que te rodea.",
      en: "Tonkori is an RPG where moral choices have no right answer. Every decision reshapes the world around you.",
    },
    data: {
      "@context": "https://schema.org",
      "@type": "VideoGame",
      name: "Tonkori",
      genre: ["RPG", "Narrative", "Indie"],
      gamePlatform: ["PC", "Steam"],
      applicationCategory: "Game",
      operatingSystem: ["Windows", "macOS"],
      gameStatus: "https://schema.org/Announced",
      publisher: PUBLISHER,
      developer: PUBLISHER,
      inLanguage: ["es", "en"],
    },
  },
};

export function GameSchema({ gameId, locale }: { gameId: GameId; locale: Locale }) {
  const entry = GAMES[gameId];
  if (!entry) return null;

  const schema = {
    ...entry.data,
    description: entry.descriptions[locale],
    url: `https://rhonstudios.com/${locale}/games/${gameId}`,
    image: `https://rhonstudios.com/og/og-${gameId}-${locale}.png`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
