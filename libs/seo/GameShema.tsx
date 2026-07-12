type GameId = "afterlight" | "tinycare" | "theobserver" | "tonkori";

const PUBLISHER = {
    "@type": "Organization",
    "@id": "https://rhonstudios.com/#organization",
    name: "Rhon Studios",
    url: "https://rhonstudios.com",
};

const GAMES: Record<GameId, object> = {
    afterlight: {
        "@context": "https://schema.org",
        "@type": "VideoGame",
        name: "Afterlight",
        description: "Afterlight es un metroidvania atmosférico donde la coexistencia de la luz y la sombra define quién eres. Una historia sin palabras, contada a través del diseño y la atmósfera.",
        url: "https://rhonstudios.com/games/afterlight",
        image: "https://rhonstudios.com/og/og-afterlight.png",
        genre: ["Metroidvania", "Action-Adventure", "Indie"],
        gamePlatform: ["PC", "Steam"],
        applicationCategory: "Game",
        operatingSystem: ["Windows", "macOS", "Linux"],
        gameStatus: "https://schema.org/Announced",
        publisher: PUBLISHER,
        developer: PUBLISHER,
        inLanguage: ["es", "en"],
    },
    tinycare: {
        "@context": "https://schema.org",
        "@type": "VideoGame",
        name: "Tiny Care",
        description: "Tiny Care es un juego de mascotas virtuales para móvil donde las consecuencias son reales. Si no cuidas a tu compañero, algo cambiará para siempre.",
        url: "https://rhonstudios.com/games/tinycare",
        image: "https://rhonstudios.com/og/og-tinycare.png",
        genre: ["Simulation", "Casual", "Cozy", "Indie"],
        gamePlatform: ["iOS", "Android"],
        applicationCategory: "Game",
        operatingSystem: ["iOS", "Android"],
        gameStatus: "https://schema.org/Announced",
        publisher: PUBLISHER,
        developer: PUBLISHER,
        inLanguage: ["es", "en"],
    },
    theobserver: {
        "@context": "https://schema.org",
        "@type": "VideoGame",
        name: "The Observer",
        description: "The Observer es una novela visual otome de misterio donde el amor y la desconfianza coexisten. Descubre la verdad detrás de cada personaje.",
        url: "https://rhonstudios.com/games/theobserver",
        image: "https://rhonstudios.com/og/og-theobserver.png",
        genre: ["Visual Novel", "Otome", "Mystery", "Indie"],
        gamePlatform: ["PC", "Steam"],
        applicationCategory: "Game",
        operatingSystem: ["Windows", "macOS"],
        gameStatus: "https://schema.org/Announced",
        publisher: PUBLISHER,
        developer: PUBLISHER,
        inLanguage: ["es", "en"],
    },
    tonkori: {
        "@context": "https://schema.org",
        "@type": "VideoGame",
        name: "Tonkori",
        description: "Tonkori es un RPG donde las decisiones morales no tienen respuesta correcta. Cada elección redefine el mundo que te rodea.",
        url: "https://rhonstudios.com/games/tonkori",
        image: "https://rhonstudios.com/og/og-tonkori.png",
        genre: ["RPG", "Narrative", "Indie"],
        gamePlatform: ["PC", "Steam"],
        applicationCategory: "Game",
        operatingSystem: ["Windows", "macOS"],
        gameStatus: "https://schema.org/Announced",
        publisher: PUBLISHER,
        developer: PUBLISHER,
        inLanguage: ["es", "en"],
    },
};

export function GameSchema({ gameId }: { gameId: GameId }) {
    const schema = GAMES[gameId];
    if (!schema) return null;

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
