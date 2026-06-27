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
        accentBorderHex: string;
        accentBgHex: string;
        accentHoverTextHex: string;
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
            video: "",
            maskImage: "/logos/TonkoriLogo1.png",
            WebkitMaskImage: "/logos/TonkoriLogo2.png",
        },
        gallery: [

        ],
        theme: {
            fontTitle: "Skranji",
            fontBody: "IM Fell English",
            fontTitleColor: "text-[#DCDBD2]",
            fontBodyColor: "text-[#DCDBD2]",
            bgColor: "bg-black",
            accentBorder: "border-[#BF6079]",
            accentText: "text-[#BF6079]",
            accentBg: "bg-[#BF6079]",
            accentHoverText: "text-[#55131A]",
            panelBorderOpacity: "border-[#774343]/50",
            panelBorderHover: "hover:border-[#BF6079]/60",
            panelDividerBg: "bg-[#774343]/50",
            cardBorderOpacity: "border-[#774343]/35",
            cardCornerHoverBorder: "group-hover:border-[#BF6079]/60",
            textMuted: "text-[#DCDBD2]/70",
            textSubtle: "text-[#DCDBD2]/85",
            progressFrom: "from-[#B86060]",
            progressTo: "to-[#BF6079]",
            progressTrackBg: "bg-[#774343]/20",
            colorCompleted: "text-emerald-400",
            colorInProgress: "text-amber-400",
            colorToDecide: "text-rose-400",
            heroOverlay: "from-black/40 via-transparent to-black",
            heroFilter: "sepia(20%) brightness(0.45) saturate(1.1)",
            investmentHighlightBorder: "border-[#BF6079]",
            investmentHighlightBg: "bg-[#BF6079]/5",
            accentBorderHex: "#BF6079",
            accentBgHex: "#BF6079",
            accentHoverTextHex: "#55131A"
        }
    },
    {
        id: "afterlight",
        title: "Afterlight",
        font: "Cinzel Decorative",
        logo: "/logos/logo-light.png",
        developmentProgress: 20,
        thumbnail: "https://images.unsplash.com/photo-1752335824586-420c728c21bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYXBvY2FseXB0aWMlMjBzdXJ2aXZhbCUyMGF0bW9zcGhlcmV8ZW58MXx8fHwxNzcxOTQxNjMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
        heroImage: "https://images.unsplash.com/photo-1752335824586-420c728c21bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYXBvY2FseXB0aWMlMjBzdXJ2aXZhbCUyMGF0bW9zcGhlcmV8ZW58MXx8fHwxNzcxOTQxNjMwfDA&ixlib=rb-4.1.0&q=80&w=1080",

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
            fontTitleColor: "text-[#F3E9D2]",
            fontBodyColor: "text-[#EDE3CB]",
            bgColor: "bg-[#0A0C12]",
            accentBorder: "border-[#E3B873]",
            accentText: "text-[#E3B873]",
            accentBg: "bg-[#E3B873]",
            accentHoverText: "text-[#0A0C12]",
            panelBorderOpacity: "border-[#E3B873]/20",
            panelBorderHover: "hover:border-[#E3B873]/40",
            panelDividerBg: "bg-[#E3B873]/20",
            cardBorderOpacity: "border-[#E3B873]/15",
            cardCornerHoverBorder: "group-hover:border-[#E3B873]/40",
            textMuted: "text-[#EDE3CB]/70",
            textSubtle: "text-[#EDE3CB]/85",
            progressFrom: "from-[#4A5A8A]",
            progressTo: "to-[#E3B873]",
            progressTrackBg: "bg-[#E3B873]/10",
            colorCompleted: "text-emerald-400",
            colorInProgress: "text-amber-400",
            colorToDecide: "text-rose-400",
            heroOverlay: "from-[#0A0C12]/40 via-transparent to-[#0A0C12]",
            heroFilter: "grayscale(15%) brightness(0.5) saturate(0.9)",
            investmentHighlightBorder: "border-[#E3B873]",
            investmentHighlightBg: "bg-[#E3B873]/5",
            accentBorderHex: "#E3B873",
            accentBgHex: "#E3B873",
            accentHoverTextHex: "#0A0C12",
        },
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
            fontTitleColor: "text-[#b8d4c8]",
            fontBodyColor: "text-[#c9d8d2]",
            bgColor: "bg-[#0a0f12]",
            accentBorder: "border-teal-800",
            accentText: "text-teal-300",
            accentBg: "bg-teal-900/40",
            accentHoverText: "hover:text-teal-200",
            panelBorderOpacity: "border-teal-900/50",
            panelBorderHover: "hover:border-teal-700",
            panelDividerBg: "bg-teal-900/30",
            cardBorderOpacity: "border-slate-700/40",
            cardCornerHoverBorder: "hover:border-teal-700/60",
            textMuted: "text-slate-400",
            textSubtle: "text-slate-500",
            progressFrom: "#1a4a42",
            progressTo: "#2d7a68",
            progressTrackBg: "#0d1f1c",
            colorCompleted: "#4ade80",
            colorInProgress: "#60a5fa",
            colorToDecide: "#94a3b8",
            heroOverlay: "linear-gradient(to bottom, rgba(10,15,18,0.3) 0%, rgba(10,15,18,0.85) 70%, rgba(10,15,18,1) 100%)",
            heroFilter: "brightness(0.65) saturate(0.7)",
            investmentHighlightBorder: "#1e4a42",
            investmentHighlightBg: "rgba(20,50,44,0.4)",
            accentBorderHex: "#134e4a",
            accentBgHex: "#134e4a66",
            accentHoverTextHex: "#99f6e4"
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
            fontTitleColor: "text-[#fefae0]",
            fontBodyColor: "text-[#e9edc9]",
            bgColor: "bg-[#111011]",
            accentBorder: "border-[#d4a373]/60",
            accentText: "text-[#d4a373]",
            accentBg: "bg-[#d4a373]/10",
            accentHoverText: "hover:text-[#faedcd]",
            panelBorderOpacity: "border-[#d4a373]/20",
            panelBorderHover: "hover:border-[#d4a373]/50",
            panelDividerBg: "bg-[#d4a373]/10",
            cardBorderOpacity: "border-[#ccd5ae]/20",
            cardCornerHoverBorder: "hover:border-[#ccd5ae]/40",
            textMuted: "text-[#ccd5ae]",
            textSubtle: "text-[#ccd5ae]/60",
            progressFrom: "#d4a373",
            progressTo: "#ccd5ae",
            progressTrackBg: "#2a2621",
            colorCompleted: "#ccd5ae",
            colorInProgress: "#d4a373",
            colorToDecide: "#8f8b82",
            heroOverlay: "linear-gradient(to bottom, rgba(17,16,17,.15) 0%, rgba(17,16,17,.72) 70%, rgba(17,16,17,1) 100%)",
            heroFilter: "brightness(.82) saturate(.9)",
            investmentHighlightBorder: "#d4a373",
            investmentHighlightBg: "rgba(212,163,115,.10)",
            accentBorderHex: "#d4a373",
            accentBgHex: "#d4a3731a",
            accentHoverTextHex: "#faedcd"
        }
    }
];

export function getGameById(id: string): GameData | undefined {
    return gamesData.find(game => game.id === id);
}
