export type GameId = "tonkori" | "afterlight" | "theobserver" | "tinycare";
export interface GameData {
    id: GameId;
    title: string;
    font: string;
    logo?: string;
    developmentProgress: number;

    heroImage: string;
    thumbnail: string;

    media: {
        screenshots: string[];
        video?: string;
        maskImage?: string;
        WebkitMaskImage?: string;
    };
    gallery? : Array<{
        url: string;
        title: string;
        category: "screenshot" | "concept-art" | "gameplay" | "characters" | "environment";
        type?: "image" | "video";
        poster?: string;
    }>;
    links: {
        steam?: string;
        demo?: string;
        github?: string;
        pressKit?: string;
    };

    theme: {
        fontTitle: string;
        fontBody: string;
        fontTitleColor: string;
        fontBodyColor: string;
        bgColor: string;
        accentBorder: string;
        accentText: string;
        accentBg: string;
        accentHoverText: string;
        panelBorderOpacity: string;
        panelBorderHover: string;
        panelDividerBg: string;
        cardBorderOpacity: string;
        cardCornerHoverBorder: string;
        textMuted: string;
        textSubtle: string;
        progressFrom: string;
        progressTo: string;
        progressTrackBg: string;
        colorCompleted: string;
        colorInProgress: string;
        colorToDecide: string;
        heroOverlay: string;
        heroFilter: string;
        investmentHighlightBorder: string;
        investmentHighlightBg: string;
    }
}

export const gamesData: GameData[] = [
    {
        id: "tonkori",
        title: "Tonkori",
        font: "Skranji",
        logo: "/logos/TonkoriLogo1.png",
        thumbnail: "https://images.unsplash.com/photo-1763198216883-7473e2c7eabb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlcGljJTIwZmFudGFzeSUyMGFkdmVudHVyZSUyMG15c3RlcmlvdXN8ZW58MXx8fHwxNzcxOTQxNjI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
        heroImage: "https://images.unsplash.com/photo-1763198216883-7473e2c7eabb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlcGljJTIwZmFudGFzeSUyMGFkdmVudHVyZSUyMG15c3RlcmlvdXN8ZW58MXx8fHwxNzcxOTQxNjI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
        developmentProgress: 8,

        links: {
            steam: "",
            demo: "",
            github: "",
            pressKit: "#"
        },

        media: {
            screenshots: [

            ],
            video: "/tonkori/House Video.mp4",
            maskImage: "/logos/TonkoriLogo1.png",
            WebkitMaskImage: "/logos/TonkoriLogo2.png",
        },
        gallery : [
            {
                url: "/tonkori/Tonkori_Dagger3DModdel.png",
                title: "Weapon | Dagger",
                category: "screenshot",
                type: "image",
            },
            {
                url: "/tonkori/Tonkori_HouseGif.gif",
                title: "House",
                category: "environment",
            },
            {
                url: "/tonkori/Tonkori_Sword3DModdel.png",
                title: "Weapon | Sword",
                category: "screenshot",
                type: "image",
            },
            {
                url: "/tonkori/Tonkori_Stone.png",
                title:"Kalivek Stone",
                category: "screenshot",
                type: "image",
            }
        ],
        theme: {
            fontTitle: "Skranji",
            fontBody: "IM Fell English",
            fontTitleColor: "#DCDBD2",
            fontBodyColor: "#DCDBD2",
            bgColor: "#000000",
            accentBorder: "#BF6079",
            accentText: "#BF6079",
            accentBg: "#BF6079",
            accentHoverText: "#55131A",
            panelBorderOpacity: "#77434380",
            panelBorderHover: "#BF607999",
            panelDividerBg: "#77434380",
            cardBorderOpacity: "#7743434D",
            cardCornerHoverBorder: "#BF607999",
            textMuted: "#DCDBD2B3",
            textSubtle: "#DCDBD2CC",
            progressFrom: "#B86060",
            progressTo: "#BF6079",
            progressTrackBg: "#77434333",
            colorCompleted: "#34D399",
            colorInProgress: "#FBBF24",
            colorToDecide: "#FB7185",
            heroOverlay: "from-black/40 via-transparent to-black",
            heroFilter: "sepia(20%) brightness(0.45) saturate(1.1)",
            investmentHighlightBorder: "#BF6079",
            investmentHighlightBg: "#BF60791A",
        }
    },
    {
        id: "afterlight",
        title: "Afterlight",
        font: "Cinzel Decorative",
        logo: "/logos/logo-light.png",
        developmentProgress: 20,
        thumbnail: "/afterlight/Header.png",
        heroImage: "/afterlight/HeaderEmpty.png",
        links: {
            steam: "",
            demo: "",
            pressKit: ""
        },
        media: {
            screenshots: [
                "",
                "",
                "",
                ""
            ],
            maskImage: "/logos/logo-dark.png",
            WebkitMaskImage: "/logos/logo-light.png",
        },
        theme: {
            fontTitle: "Cinzel Decorative",
            fontBody: "EB Garamond",
            fontTitleColor: "#F3E9D2",
            fontBodyColor: "#EDE3CB",
            bgColor: "#0A0C12",
            accentBorder: "#E3B873",
            accentText: "#E3B873",
            accentBg: "#E3B873",
            accentHoverText: "#0A0C12",
            panelBorderOpacity: "#E3B87333",
            panelBorderHover: "#E3B87366",
            panelDividerBg: "#E3B87333",
            cardBorderOpacity: "#E3B8731A",
            cardCornerHoverBorder: "#E3B87366",
            textMuted: "#EDE3CBB3",
            textSubtle: "#EDE3CBCC",
            progressFrom: "#4A5A8A",
            progressTo: "#E3B873",
            progressTrackBg: "#E3B8731A",
            colorCompleted: "#34D399",
            colorInProgress: "#FBBF24",
            colorToDecide: "#FB7185",
            heroOverlay: "from-[#0A0C1266] via-transparent to-[#0A0C12]",
            heroFilter: "grayscale(15%) brightness(0.5) saturate(0.9)",
            investmentHighlightBorder: "#E3B873",
            investmentHighlightBg: "#E3B8731A",
        }
    },
    {
        id: "theobserver",
        title: "The Observer",
        font: "Amarante",
        developmentProgress: 5,
        heroImage: "",
        thumbnail: "",
        media: {
            screenshots: [],
            video: undefined,
            maskImage: undefined,
            WebkitMaskImage: undefined
        },
        links: {
            steam: undefined,
            demo: undefined,
            github: undefined,
            pressKit: undefined
        },
        theme: {
            fontTitle: "'Amarante', serif",
            fontBody: "'Inter', sans-serif",
            fontTitleColor: "#b8d4c8",
            fontBodyColor: "#c9d8d2",
            bgColor: "#0a0f12",
            accentBorder: "#134e4a",
            accentText: "#2dd4bf",
            accentBg: "#134e4a66",
            accentHoverText: "#99f6e4",
            panelBorderOpacity: "#134e4a80",
            panelBorderHover: "#0f766e",
            panelDividerBg: "#134e4a4d",
            cardBorderOpacity: "#33415566",
            cardCornerHoverBorder: "#0f766e99",
            textMuted: "#94a3b8",
            textSubtle: "#64748b",
            progressFrom: "#1a4a42",
            progressTo: "#2d7a68",
            progressTrackBg: "#0d1f1c",
            colorCompleted: "#4ade80",
            colorInProgress: "#60a5fa",
            colorToDecide: "#94a3b8",
            heroOverlay: "linear-gradient(to bottom, rgba(10,15,18,0.3) 0%, rgba(10,15,18,0.85) 70%, rgba(10,15,18,1) 100%)",
            heroFilter: "brightness(0.65) saturate(0.7)",
            investmentHighlightBorder: "#1e4a42",
            investmentHighlightBg: "#14322c66",
        }
    },
    {
        id: "tinycare",
        title: "Tiny Care",
        font: "Jua",
        developmentProgress: 10,
        heroImage: "",
        thumbnail: "",
        media: {
            screenshots: [],
            video: undefined,
            maskImage: undefined,
            WebkitMaskImage: undefined
        },
        links: {
            steam: undefined,
            demo: undefined,
            github: undefined,
            pressKit: undefined
        },
        theme: {
            fontTitle: "'Jua', sans-serif",
            fontBody: "'Nunito', sans-serif",
            fontTitleColor: "#fefae0",
            fontBodyColor: "#e9edc9",
            bgColor: "#111011",
            accentBorder: "#d4a37399",
            accentText: "#d4a373",
            accentBg: "#d4a3731A",
            accentHoverText: "#faedcd",
            panelBorderOpacity: "#d4a37333",
            panelBorderHover: "#d4a37380",
            panelDividerBg: "#d4a3731A",
            cardBorderOpacity: "#ccd5ae33",
            cardCornerHoverBorder: "#ccd5ae66",
            textMuted: "#ccd5ae",
            textSubtle: "#ccd5ae99",
            progressFrom: "#d4a373",
            progressTo: "#ccd5ae",
            progressTrackBg: "#2a2621",
            colorCompleted: "#ccd5ae",
            colorInProgress: "#d4a373",
            colorToDecide: "#8f8b82",
            heroOverlay: "from-[rgba(17,16,17,.15)] via-[rgba(17,16,17,.72)] to-[rgba(17,16,17,1)]",
            heroFilter: "brightness(.82) saturate(.9)",
            investmentHighlightBorder: "#d4a373",
            investmentHighlightBg: "#d4a3731A",
        }
    }
];

export function getGameById(id: string): GameData | undefined {
    return gamesData.find(game => game.id === id);
}