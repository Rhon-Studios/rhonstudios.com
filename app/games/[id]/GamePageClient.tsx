"use client";

import { useRouter } from "next/navigation";
import { getGameById } from "@/app/DataBases/gamesData";
import {
    ArrowLeft, CheckCircle2, Circle, CircleQuestionMark,
    Clock, ExternalLink, FileText, Github, Play, TrendingUp,
} from "lucide-react";
import { useLanguage } from "@/app/language/LanguageProvider";
import { GameGallery } from "./GameGallery";
import { motion } from "framer-motion";
import { useState } from "react";

export interface GameTheme {
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

const defaultTheme: GameTheme = {
    fontTitle: "Rye",
    fontBody: "Cinzel",
    fontTitleColor: "text-white",
    fontBodyColor: "text-white",
    bgColor: "bg-black",
    accentBorder: "border-white",
    accentText: "text-white",
    accentBg: "bg-white",
    accentHoverText: "text-black",
    panelBorderOpacity: "border-white/30",
    panelBorderHover: "hover:border-white/40",
    panelDividerBg: "bg-white/30",
    cardBorderOpacity: "border-white/20",
    cardCornerHoverBorder: "group-hover:border-white/40",
    textMuted: "text-white/70",
    textSubtle: "text-white/80",
    progressFrom: "from-white/70",
    progressTo: "to-white",
    progressTrackBg: "bg-white/10",
    colorCompleted: "text-green-400",
    colorInProgress: "text-yellow-400",
    colorToDecide: "text-red-400",
    heroOverlay: "from-black/50 via-transparent to-black",
    heroFilter: "grayscale(100%) brightness(0.3)",
    investmentHighlightBorder: "border-white",
    investmentHighlightBg: "bg-white/5",
    accentBorderHex: "#ffffff",
    accentBgHex: "#ffffff",
    accentHoverTextHex: "#000000",
};

function ThemedLink({ href, children, theme }: {
    href: string;
    children: React.ReactNode;
    theme: GameTheme;
}) {
    const [hovered, setHovered] = useState(false);
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="border-2 px-5 sm:px-8 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3 transition-all duration-300"
            style={{
                borderColor: theme.accentBorderHex,
                backgroundColor: hovered ? theme.accentBgHex : "transparent",
                color: hovered ? theme.accentHoverTextHex : undefined,
            }}
        >
            {children}
        </a>
    );
}

function ThemedButton({ onClick, children, theme, className, style }: {
    onClick: () => void;
    children: React.ReactNode;
    theme: GameTheme;
    className?: string;
    style?: React.CSSProperties;
}) {
    const [hovered, setHovered] = useState(false);
    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`border-2 transition-all duration-300 ${className ?? ""}`}
            style={{
                borderColor: theme.accentBorderHex,
                backgroundColor: hovered ? theme.accentBgHex : "transparent",
                color: hovered ? theme.accentHoverTextHex : undefined,
                ...style,
            }}
        >
            {children}
        </button>
    );
}

function ThemedOutlineLink({ href, children, theme, className, style }: {
    href: string;
    children: React.ReactNode;
    theme: GameTheme;
    className?: string;
    style?: React.CSSProperties;
}) {
    const [hovered, setHovered] = useState(false);
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`border-2 transition-all duration-300 ${className ?? ""}`}
            style={{
                borderColor: hovered ? theme.accentBorderHex : undefined,
                ...style,
            }}
        >
            {children}
        </a>
    );
}

function SectionHeading({ title, subtitle, fontTitle, fontBody, accentBg, fontTitleColor, fontBodyColor }: {
    title: string; subtitle: string; fontTitle: string; fontBody: string;
    accentBg: string; fontTitleColor: string; fontBodyColor: string;
}) {
    return (
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 sm:mb-20">
                <h2 className={`text-3xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6 tracking-wider ${fontTitleColor}`} style={{ fontFamily: fontTitle }}>
                    {title}
                </h2>
                <div className="flex items-center justify-center gap-3 sm:gap-4">
                    <div className={`w-12 sm:w-20 h-[2px] ${accentBg}`} />
                    <p className={`text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] uppercase ${fontBodyColor}`} style={{ fontFamily: fontBody }}>
                        {subtitle}
                    </p>
                    <div className={`w-12 sm:w-20 h-[2px] ${accentBg}`} />
                </div>
            </div>
        </div>
    );
}

function PanelBlock({ heading, align, fontBody, accentBg, fontBodyColor, children }: {
    heading: string; align: "left" | "right" | "center";
    fontBody: string; accentBg: string; fontBodyColor: string; children: React.ReactNode;
}) {
    const alignClass = align === "right" ? "justify-end" : align === "center" ? "justify-center" : "";
    return (
        <div className="p-6 sm:p-12 lg:p-16">
            <div className={`flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12 ${alignClass}`}>
                {align !== "right" && <div className={`w-8 sm:w-12 h-[2px] ${accentBg}`} />}
                <h3 className={`text-lg sm:text-3xl lg:text-4xl tracking-wider ${fontBodyColor}`} style={{ fontFamily: fontBody }}>
                    {heading}
                </h3>
                {align !== "left" && <div className={`w-8 sm:w-12 h-[2px] ${accentBg}`} />}
            </div>
            {children}
        </div>
    );
}

function CardGrid({ items, cornerClass, borderClass, textSubtle, textMuted, fontBody }: {
    items: { title: string; description: string }[];
    cornerClass: string; borderClass: string;
    textSubtle: string; textMuted: string; fontBody: string;
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {items.map((item, i) => (
                <div key={i} className={`${borderClass} p-5 sm:p-8 transition-all duration-300 relative group`}>
                    <div className={`${cornerClass} transition-all duration-300`} />
                    <h4 className={`text-sm sm:text-lg mb-2 tracking-wide ${textSubtle}`} style={{ fontFamily: fontBody, fontWeight: "bold" }}>
                        {item.title}
                    </h4>
                    <p className={`text-xs sm:text-base ${textMuted} leading-relaxed`} style={{ fontFamily: fontBody }}>
                        {item.description}
                    </p>
                </div>
            ))}
        </div>
    );
}

export function GamePageClient({ id }: { id: string }) {
    const router  = useRouter();
    const game    = getGameById(id);
    const { t }   = useLanguage();
    const theme: GameTheme = { ...defaultTheme, ...(game?.theme ?? {}) };

    const renderStatusIcon = (status: string) => {
        switch (status) {
            case "completed":   return <CheckCircle2      className={`w-4 h-4 sm:w-5 sm:h-5 ${theme.colorCompleted}`} />;
            case "in-progress": return <Clock             className={`w-4 h-4 sm:w-5 sm:h-5 ${theme.colorInProgress}`} />;
            case "planned":     return <Circle            className={`w-4 h-4 sm:w-5 sm:h-5 ${theme.textMuted}`} />;
            case "to-decide":   return <CircleQuestionMark className={`w-4 h-4 sm:w-5 sm:h-5 ${theme.colorToDecide}`} />;
            default:            return <Circle            className={`w-4 h-4 sm:w-5 sm:h-5 ${theme.accentText}`} />;
        }
    };

    if (!game) {
        return (
            <section
                id="gameError"
                className="scroll-mt-[160px] relative h-screen bg-black text-white overflow-hidden flex items-center justify-center"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />
                <div className="relative z-10 text-center">
                    <h1 className={`text-3xl sm:text-4xl mb-8 ${defaultTheme.fontTitleColor}`} style={{ fontFamily: defaultTheme.fontTitle }}>
                        {t.gamePage.notfound.game}
                    </h1>
                    <ThemedButton
                        onClick={() => router.push("/#games")}
                        theme={defaultTheme}
                        className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3 ${defaultTheme.fontBodyColor}`}
                        style={{ fontFamily: defaultTheme.fontBody }}
                    >
                        <ArrowLeft size={18} />
                        {t.gamePage.notfound.button}
                    </ThemedButton>
                </div>
            </section>
        );
    }

    const gameT = t.game_list[game.id];

    return (
        <div className={`${theme.bgColor} min-h-screen`}>
            <section
                id="home_game"
                className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center pt-12 sm:pt-12 pb-12"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${game.heroImage})`, filter: theme.heroFilter }}
                />
                <div className={`absolute inset-0 bg-gradient-to-b ${theme.heroOverlay}`} />
                <div className="relative z-10 w-full mx-auto px-6 sm:px-8 lg:px-16 text-center">
                    <div className="mb-6 sm:mb-10">
                        <div className={`inline-block border ${theme.accentBorder} px-6 sm:px-8 py-2 sm:py-3 mt-[80px] sm:mt-[250px]`}>
                            <p className={`text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase ${theme.fontBodyColor}`} style={{ fontFamily: theme.fontBody }}>
                                {gameT.genre}
                            </p>
                        </div>
                    </div>
                    <h1
                        className={`text-5xl sm:text-7xl lg:text-9xl mb-4 sm:mb-6 tracking-wider ${theme.fontTitleColor}`}
                        style={{ fontFamily: game.font ?? theme.fontTitle }}
                    >
                        {game.title}
                    </h1>
                    <p className={`text-lg sm:text-2xl lg:text-3xl ${theme.textMuted} mb-6 sm:mb-8 tracking-wide`} style={{ fontFamily: theme.fontBody, fontWeight: 200 }}>
                        {gameT.subtitle}
                    </p>
                    <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12">
                        <div className={`w-12 sm:w-24 h-[2px] ${theme.accentBg}`} />
                        <div className={`text-sm sm:text-xl tracking-[0.2em] uppercase ${theme.fontBodyColor}`} style={{ fontFamily: theme.fontBody, fontWeight: 200 }}>
                            {gameT.status} • {gameT.year}
                        </div>
                        <div className={`w-12 sm:w-24 h-[2px] ${theme.accentBg}`} />
                    </div>
                    <p
                        className={`text-sm sm:text-base lg:text-xl leading-relaxed max-w-xs sm:max-w-xl lg:max-w-3xl mx-auto mb-8 sm:mb-12 ${theme.fontBodyColor}`}
                        style={{ fontFamily: theme.fontBody }}
                    >
                        {gameT.pitch}
                    </p>
                    <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
                        {game.links.steam    && <ThemedLink href={game.links.steam}    theme={theme}><ExternalLink className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${theme.accentText}`} /><span className={`tracking-wider text-xs sm:text-sm ${theme.fontBodyColor}`} style={{ fontFamily: theme.fontBody }}>Steam</span></ThemedLink>}
                        {game.links.demo     && <ThemedLink href={game.links.demo}     theme={theme}><Play         className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${theme.accentText}`} /><span className={`tracking-wider text-xs sm:text-sm ${theme.fontBodyColor}`} style={{ fontFamily: theme.fontBody }}>Demo</span></ThemedLink>}
                        {game.links.github   && <ThemedLink href={game.links.github}   theme={theme}><Github       className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${theme.accentText}`} /><span className={`tracking-wider text-xs sm:text-sm ${theme.fontBodyColor}`} style={{ fontFamily: theme.fontBody }}>Github</span></ThemedLink>}
                        {game.links.pressKit && <ThemedLink href={game.links.pressKit} theme={theme}><FileText     className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${theme.accentText}`} /><span className={`tracking-wider text-xs sm:text-sm ${theme.fontBodyColor}`} style={{ fontFamily: theme.fontBody }}>Press Kit</span></ThemedLink>}
                    </div>
                </div>
                {["top-4 sm:top-8 left-4 sm:left-8 border-t-2 border-l-2",
                  "top-4 sm:top-8 right-4 sm:right-8 border-t-2 border-r-2",
                  "bottom-4 sm:bottom-8 left-4 sm:left-8 border-b-2 border-l-2",
                  "bottom-4 sm:bottom-8 right-4 sm:right-8 border-b-2 border-r-2",
                ].map((cls, i) => (
                    <div key={i} className={`absolute ${cls} ${theme.accentBorder} w-10 sm:w-16 h-10 sm:h-16`} />
                ))}
            </section>
            <section
                id="vision"
                className={`scroll-mt-[100px] relative ${theme.bgColor} ${theme.fontBodyColor} pt-16 sm:pt-32 overflow-hidden py-12 sm:py-16 border-y-2 ${theme.panelBorderOpacity}`}
            >
                <div className="container mx-auto px-4 sm:px-8 lg:px-16">
                    <SectionHeading title={t.gamePage.mechanics.title} subtitle={t.gamePage.mechanics.subtitle} fontTitle={theme.fontTitle} fontBody={theme.fontBody} accentBg={theme.accentBg} fontTitleColor={theme.fontTitleColor} fontBodyColor={theme.fontBodyColor} />
                    <div className={`border-2 ${theme.panelBorderOpacity}`}>
                        <PanelBlock heading={t.gamePage.mechanics.mechanics.title} align="left" fontBody={theme.fontBody} accentBg={theme.accentBg} fontBodyColor={theme.fontBodyColor}>
                            <CardGrid items={gameT.mechanics} cornerClass={`border-t-2 border-r-2 ${theme.cardBorderOpacity} ${theme.panelBorderHover} absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12`} borderClass={`border-2 ${theme.cardBorderOpacity} ${theme.panelBorderHover}`} textSubtle={theme.textSubtle} textMuted={theme.textMuted} fontBody={theme.fontBody} />
                        </PanelBlock>
                        <div className={`h-[2px] ${theme.panelDividerBg}`} />
                        <PanelBlock heading={t.gamePage.mechanics.market.title} align="right" fontBody={theme.fontBody} accentBg={theme.accentBg} fontBodyColor={theme.fontBodyColor}>
                            <CardGrid items={gameT.market} cornerClass={`border-b-2 border-l-2 ${theme.cardBorderOpacity} ${theme.panelBorderHover} absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-8 h-8 sm:w-12 sm:h-12`} borderClass={`border-2 ${theme.cardBorderOpacity} ${theme.panelBorderHover}`} textSubtle={theme.textSubtle} textMuted={theme.textMuted} fontBody={theme.fontBody} />
                        </PanelBlock>
                        <div className={`h-[2px] ${theme.panelDividerBg}`} />
                        <PanelBlock heading={t.gamePage.mechanics.technics.title} align="left" fontBody={theme.fontBody} accentBg={theme.accentBg} fontBodyColor={theme.fontBodyColor}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
                                {gameT.technic.map((technic: { title: string; description: string }, i: number) => (
                                    <div key={i} className={`border-2 ${theme.cardBorderOpacity} p-4 sm:p-6 ${theme.panelBorderHover} transition-all duration-300 relative group`}>
                                        <div className="flex items-start gap-3 sm:gap-4">
                                            <div className={`w-1.5 h-1.5 ${theme.accentBg} mt-2 flex-shrink-0`} />
                                            <div>
                                                <h4 className={`text-sm sm:text-lg mb-1 sm:mb-2 tracking-wide ${theme.textSubtle}`} style={{ fontFamily: theme.fontBody, fontWeight: "bold" }}>{technic.title}</h4>
                                                <p  className={`text-xs sm:text-base ${theme.textMuted}`} style={{ fontFamily: theme.fontBody }}>{technic.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </PanelBlock>
                    </div>
                </div>
            </section>
            <section
                id="roadmap"
                className={`scroll-mt-[100px] relative ${theme.bgColor} ${theme.fontBodyColor} pt-16 sm:pt-32 overflow-hidden py-12 sm:py-16 border-y-2 ${theme.panelBorderOpacity}`}
            >
                <div className="container mx-auto px-4 sm:px-8 lg:px-16">
                    <SectionHeading title={t.gamePage.roadmap.title} subtitle={t.gamePage.roadmap.subtitle} fontTitle={theme.fontTitle} fontBody={theme.fontBody} accentBg={theme.accentBg} fontTitleColor={theme.fontTitleColor} fontBodyColor={theme.fontBodyColor} />
                    <div className={`border-2 ${theme.panelBorderOpacity}`}>
                        <PanelBlock heading={t.gamePage.roadmap.vision.title} align="left" fontBody={theme.fontBody} accentBg={theme.accentBg} fontBodyColor={theme.fontBodyColor}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                                <div className={`border-2 ${theme.cardBorderOpacity} p-5 sm:p-8 ${theme.panelBorderHover} transition-all duration-300 relative group`}>
                                    <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2 ${theme.cardBorderOpacity} ${theme.cardCornerHoverBorder} transition-all duration-300`} />
                                    <h4 className={`text-lg sm:text-2xl mb-2 tracking-wide ${theme.textSubtle}`} style={{ fontFamily: theme.fontBody, fontWeight: "bold" }}>{t.gamePage.roadmap.vision.title}</h4>
                                    <p  className={`text-xs sm:text-base ${theme.textMuted} leading-relaxed`} style={{ fontFamily: theme.fontBody }}>{gameT.vision}</p>
                                </div>
                                <div className={`border-2 ${theme.cardBorderOpacity} p-5 sm:p-8 ${theme.panelBorderHover} transition-all duration-300 relative group`}>
                                    <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2 ${theme.cardBorderOpacity} ${theme.cardCornerHoverBorder} transition-all duration-300`} />
                                    <div className="flex items-center gap-3 mb-4">
                                        <TrendingUp className={`w-5 h-5 sm:w-6 sm:h-6 ${theme.accentText}`} />
                                        <h4 className={`text-lg sm:text-2xl tracking-wide ${theme.textSubtle}`} style={{ fontFamily: theme.fontBody, fontWeight: "bold" }}>{t.gamePage.roadmap.vision.progress}</h4>
                                    </div>
                                    <div className="space-y-4 sm:space-y-7">
                                        <div className={`w-full ${theme.progressTrackBg} h-2 rounded-full overflow-hidden`}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${game.developmentProgress}%` }}
                                                transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
                                                viewport={{ once: true }}
                                                className={`h-full bg-gradient-to-r ${theme.progressFrom} ${theme.progressTo} rounded-full`}
                                            />
                                        </div>
                                        <p className={`text-xs sm:text-base ${theme.textMuted} tracking-wide`} style={{ fontFamily: theme.fontBody, fontWeight: "bold" }}>
                                            {game.developmentProgress}% {t.gamePage.roadmap.vision.completed}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </PanelBlock>
                        <div className={`h-[2px] ${theme.panelDividerBg}`} />
                        <PanelBlock heading={t.gamePage.roadmap.roadmap.title} align="center" fontBody={theme.fontBody} accentBg={theme.accentBg} fontBodyColor={theme.fontBodyColor}>
                            <div className="space-y-4 sm:space-y-8">
                                {gameT.roadmap.map((phase: { phase: string; status: string; items: string[] }, i: number) => (
                                    <div key={i} className={`border-2 ${theme.panelBorderOpacity} p-5 sm:p-8`}>
                                        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 flex-wrap">
                                            {renderStatusIcon(phase.status)}
                                            <h3 className={`text-base sm:text-2xl tracking-wider flex-1 ${theme.fontBodyColor}`} style={{ fontFamily: theme.fontBody }}>{phase.phase}</h3>
                                            <span className={`text-[10px] sm:text-sm tracking-wider uppercase px-3 sm:px-4 py-1 border ${theme.panelBorderOpacity} ${theme.textMuted} flex-shrink-0`} style={{ fontFamily: theme.fontBody }}>
                                                {phase.status === "completed"   && t.gamePage.roadmap.roadmap.completed}
                                                {phase.status === "in-progress" && t.gamePage.roadmap.roadmap.inProgress}
                                                {phase.status === "planned"     && t.gamePage.roadmap.roadmap.planned}
                                                {phase.status === "to-decide"   && t.gamePage.roadmap.roadmap.toDecide}
                                            </span>
                                        </div>
                                        <ul className="space-y-2">
                                            {phase.items.map((item: string, j: number) => (
                                                <li key={j} className={`flex items-start gap-2 sm:gap-3 ${theme.textMuted}`}>
                                                    <div className={`w-1.5 h-1.5 ${theme.accentBg} mt-2 flex-shrink-0`} />
                                                    <span className="text-xs sm:text-base tracking-wide" style={{ fontFamily: theme.fontBody }}>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </PanelBlock>
                    </div>
                </div>
            </section>
            <section
                id="investment"
                className={`scroll-mt-[100px] relative ${theme.bgColor} ${theme.fontBodyColor} pt-16 sm:pt-32 overflow-hidden py-12 sm:py-16 border-y-2 ${theme.panelBorderOpacity}`}
            >
                <div className="container mx-auto px-4 sm:px-8 lg:px-16">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-6 sm:mb-7">
                            <h2 className={`text-3xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6 tracking-wider ${theme.fontTitleColor}`} style={{ fontFamily: theme.fontTitle }}>{t.gamePage.investment.title}</h2>
                            <div className="flex items-center justify-center gap-3 sm:gap-4">
                                <div className={`w-12 sm:w-20 h-[2px] ${theme.accentBg}`} />
                                <p className={`text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] uppercase ${theme.fontBodyColor}`} style={{ fontFamily: theme.fontBody }}>{t.gamePage.investment.subtitle}</p>
                                <div className={`w-12 sm:w-20 h-[2px] ${theme.accentBg}`} />
                            </div>
                            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-2">
                                <div className={`w-16 sm:w-24 h-[2px] ${theme.accentBg}`} />
                                <TrendingUp className={`w-5 h-5 sm:w-6 sm:h-6 ${theme.accentText}`} />
                                <div className={`w-16 sm:w-24 h-[2px] ${theme.accentBg}`} />
                            </div>
                        </div>
                        <div className="space-y-4 sm:space-y-8 mb-8 sm:mb-12">
                            {[
                                { label: t.gamePage.investment.monetization, content: gameT.investment.monetization },
                                { label: t.gamePage.investment.roi,          content: gameT.investment.roi },
                            ].map(({ label, content }, i) => (
                                <div key={i} className={`border-2 ${theme.panelBorderOpacity} p-5 sm:p-8`}>
                                    <h3 className={`text-lg sm:text-2xl mb-3 sm:mb-4 tracking-wider ${theme.textSubtle}`} style={{ fontFamily: theme.fontBody }}>{label}</h3>
                                    <p  className={`text-xs sm:text-base ${theme.textMuted} tracking-wide leading-relaxed`} style={{ fontFamily: theme.fontBody }}>{content}</p>
                                </div>
                            ))}
                        </div>
                        <div className={`border-2 ${theme.investmentHighlightBorder} p-5 sm:p-8 ${theme.investmentHighlightBg}`}>
                            <h3 className={`text-lg sm:text-2xl mb-4 sm:mb-6 tracking-wider ${theme.textSubtle}`} style={{ fontFamily: theme.fontBody }}>{t.gamePage.investment.keys}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {gameT.investment.keys.map((key: string, i: number) => (
                                    <div key={i} className="flex items-start gap-2 sm:gap-3">
                                        <CheckCircle2 className={`w-4 h-4 sm:w-5 sm:h-5 ${theme.colorCompleted} flex-shrink-0 mt-0.5`} />
                                        <span className={`text-xs sm:text-base ${theme.textSubtle} tracking-wide`} style={{ fontFamily: theme.fontBody }}>{key}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {game.gallery && game.gallery.length > 0 && (
                <GameGallery images={game.gallery} gameTitle={game.title} theme={theme} />
            )}

            <section id="contact" className={`${theme.bgColor} py-16 sm:py-24 border-t-2 ${theme.panelBorderOpacity}`}>
                <div className="container mx-auto px-4 sm:px-8 lg:px-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className={`text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 tracking-wider ${theme.fontTitleColor}`} style={{ fontFamily: theme.fontTitle }}>{t.gamePage.contact.title}</h2>
                        <p  className={`text-sm sm:text-xl ${theme.textMuted} mb-8 sm:mb-12 tracking-wide`} style={{ fontFamily: theme.fontBody }}>{t.gamePage.contact.description}</p>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
                            <ThemedButton
                                onClick={() => router.push("/#contact")}
                                theme={theme}
                                className={`w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 text-xs sm:text-sm tracking-[0.2em] uppercase ${theme.fontBodyColor}`}
                                style={{ fontFamily: theme.fontBody }}
                            >
                                {t.gamePage.contact.button}
                            </ThemedButton>
                            {game.links.pressKit && (
                                <ThemedOutlineLink
                                    href={game.links.pressKit}
                                    theme={theme}
                                    className={`w-full sm:w-auto ${theme.panelBorderOpacity} px-8 sm:px-12 py-3 sm:py-4 text-xs sm:text-sm tracking-[0.2em] uppercase text-center ${theme.textMuted}`}
                                    style={{ fontFamily: theme.fontBody }}
                                >
                                    {t.gamePage.contact.pressKit}
                                </ThemedOutlineLink>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
