"use client";

import { useRouter } from "next/navigation";
import { getGameById } from "@/libs/database/gamesData";
import {
    ArrowLeft, CheckCircle2, Circle, CircleQuestionMark,
    Clock, ExternalLink, FileText, Github, Play, TrendingUp,
} from "lucide-react";
import { useLanguage } from "@/libs/utils/LanguageProvider";
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
}

const defaultTheme: GameTheme = {
    fontTitle: "Rye",
    fontBody: "Cinzel",
    fontTitleColor: "#ffffff",
    fontBodyColor: "#ffffff",
    bgColor: "#000000",
    accentBorder: "#ffffff",
    accentText: "#ffffff",
    accentBg: "#ffffff",
    accentHoverText: "#000000",
    panelBorderOpacity: "rgba(255,255,255,0.3)",
    panelBorderHover: "rgba(255,255,255,0.4)",
    panelDividerBg: "rgba(255,255,255,0.3)",
    cardBorderOpacity: "rgba(255,255,255,0.2)",
    cardCornerHoverBorder: "rgba(255,255,255,0.4)",
    textMuted: "rgba(255,255,255,0.7)",
    textSubtle: "rgba(255,255,255,0.8)",
    progressFrom: "rgba(255,255,255,0.7)",
    progressTo: "#ffffff",
    progressTrackBg: "rgba(255,255,255,0.1)",
    colorCompleted: "#4ade80",
    colorInProgress: "#facc15",
    colorToDecide: "#f87171",
    heroOverlay: "from-black/50 via-transparent to-black",
    heroFilter: "grayscale(100%) brightness(0.3)",
    investmentHighlightBorder: "#ffffff",
    investmentHighlightBg: "rgba(255,255,255,0.05)",
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
                borderColor: theme.accentBorder,
                    backgroundColor: hovered ? theme.accentBg : "transparent",
                    color: hovered ? theme.accentHoverText : undefined,
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
                ...style,
                borderColor: theme.accentBorder,
                backgroundColor: hovered ? theme.accentBg : "transparent",
                color: hovered ? theme.accentHoverText : style?.color,
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
            ...style,
                    borderColor: hovered ? theme.accentBorder : style?.borderColor,
            }}
        >
            {children}
        </a>
    );
}
function HoverBorderPanel({ cornerClass, borderColor, hoverBorderColor, className, style, children }: {
    cornerClass?: string;
    borderColor: string;
    hoverBorderColor: string;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
}) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            className={`border-2 p-5 sm:p-8 transition-all duration-300 relative ${className ?? ""}`}
            style={{ ...style, borderColor: hovered ? hoverBorderColor : borderColor }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {cornerClass && (
                <div
                    className={cornerClass}
                    style={{ borderColor: hovered ? hoverBorderColor : borderColor, transition: "border-color 300ms" }}
                />
            )}
            {children}
        </div>
    );
}

function SectionHeading({ title, subtitle, fontTitle, fontBody, accentBg, fontTitleColor, fontBodyColor }: {
    title: string; subtitle: string; fontTitle: string; fontBody: string;
    accentBg: string; fontTitleColor: string; fontBodyColor: string;
}) {
    return (
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 sm:mb-20">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6 tracking-wider" style={{ fontFamily: fontTitle, color: fontTitleColor }}>
                    {title}
                </h2>
                <div className="flex items-center justify-center gap-3 sm:gap-4">
                    <div className="w-12 sm:w-20 h-[2px]" style={{ backgroundColor: accentBg }} />
                    <p className="text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] uppercase" style={{ fontFamily: fontBody, color: fontBodyColor }}>
                        {subtitle}
                    </p>
                    <div className="w-12 sm:w-20 h-[2px]" style={{ backgroundColor: accentBg }} />
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
                {align !== "right" && <div className="w-8 sm:w-12 h-[2px]" style={{ backgroundColor: accentBg }} />}
                <h3 className="text-lg sm:text-3xl lg:text-4xl tracking-wider" style={{ fontFamily: fontBody, color: fontBodyColor }}>
                    {heading}
                </h3>
                {align !== "left" && <div className="w-8 sm:w-12 h-[2px]" style={{ backgroundColor: accentBg }} />}
            </div>
            {children}
        </div>
    );
}

function CardGrid({ items, cornerClass, borderColor, textSubtleColor, textMutedColor, fontBody }: {
    items: { title: string; description: string }[];
    cornerClass: string;
    borderColor: string;
    textSubtleColor: string;
    textMutedColor: string;
    fontBody: string;
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {items.map((item, i) => (
                <div key={i} className="border-2 p-5 sm:p-8 transition-all duration-300 relative group" style={{ borderColor }}>
                    <div className={cornerClass} style={{ borderColor }} />
                    <h4 className="text-sm sm:text-lg mb-2 tracking-wide" style={{ fontFamily: fontBody, fontWeight: "bold", color: textSubtleColor }}>
                        {item.title}
                    </h4>
                    <p className="text-xs sm:text-base leading-relaxed" style={{ fontFamily: fontBody, color: textMutedColor }}>
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
            case "completed": return <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: theme.colorCompleted }} />;
            case "in-progress": return <Clock className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: theme.colorInProgress }} />;
            case "planned": return <Circle className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: theme.textMuted }} />;
            case "to-decide": return <CircleQuestionMark className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: theme.colorToDecide }} />;
            default: return <Circle className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: theme.accentText }} />;
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
                    <h1 className="text-3xl sm:text-4xl mb-8" style={{ fontFamily: defaultTheme.fontTitle, color: defaultTheme.fontTitleColor }}>
                        {t.gamePage.notfound.game}
                    </h1>
                    <ThemedButton
                        onClick={() => router.push("/#games")}
                        theme={defaultTheme}
                        className="inline-flex items-center gap-2 px-6 sm:px-8 py-3"
                        style={{ fontFamily: defaultTheme.fontBody, color: defaultTheme.fontBodyColor }}
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
        <div
            className="min-h-screen"
            style={{ backgroundColor: theme.bgColor }}
        >
            <section
                id="home_game"
                className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center pt-12 sm:pt-12 pb-12"
                style={{ backgroundColor: theme.bgColor }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${game.heroImage})`, filter: theme.heroFilter }}
                />
                <div className={`absolute inset-0 bg-gradient-to-b ${theme.heroOverlay}`} />
                <div className="relative z-10 w-full mx-auto px-6 sm:px-8 lg:px-16 text-center">
                    <div className="mb-6 sm:mb-10">
                        <div className="inline-block border px-6 sm:px-8 py-2 sm:py-3 mt-[80px] sm:mt-[250px]" style={{ borderColor: theme.accentBorder }}>
                            <p className="text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase" style={{ color: theme.fontBodyColor, fontFamily: theme.fontBody }}>
                                {gameT.genre}
                            </p>
                        </div>
                    </div>
                    <h1
                        className="text-5xl sm:text-7xl lg:text-9xl mb-4 sm:mb-6 tracking-wider"
                        style={{ fontFamily: game.font ?? theme.fontTitle, color: theme.fontTitleColor }}
                    >
                        {game.title}
                    </h1>
                    <p className="text-lg sm:text-2xl lg:text-3xl mb-6 sm:mb-8 tracking-wide" style={{ color: theme.textMuted, fontFamily: theme.fontBody, fontWeight: 200 }}>
                        {gameT.subtitle}
                    </p>
                    <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12">
                        <div className="w-12 sm:w-24 h-[2px]" style={{ backgroundColor: theme.accentBg }} />
                        <div className="text-sm sm:text-xl tracking-[0.2em] uppercase" style={{ color: theme.fontBodyColor, fontFamily: theme.fontBody, fontWeight: 200 }}>
                            {gameT.status} • {gameT.year}
                        </div>
                        <div className="w-12 sm:w-24 h-[2px]" style={{ backgroundColor: theme.accentBg }} />
                    </div>
                    <p
                        className="text-sm sm:text-base lg:text-xl leading-relaxed max-w-xs sm:max-w-xl lg:max-w-3xl mx-auto mb-8 sm:mb-12"
                        style={{ color: theme.fontBodyColor, fontFamily: theme.fontBody }}
                    >
                        {gameT.pitch}
                    </p>
                    <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
                        {game.links.steam && <ThemedLink href={game.links.steam} theme={theme}><ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: theme.accentText }} /><span className="tracking-wider text-xs sm:text-sm" style={{ color: theme.fontBodyColor, fontFamily: theme.fontBody }}>Steam</span></ThemedLink>}
                        {game.links.demo && <ThemedLink href={game.links.demo} theme={theme}><Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: theme.accentText }} /><span className="tracking-wider text-xs sm:text-sm" style={{ color: theme.fontBodyColor, fontFamily: theme.fontBody }}>Demo</span></ThemedLink>}
                        {game.links.github && <ThemedLink href={game.links.github} theme={theme}><Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: theme.accentText }} /><span className="tracking-wider text-xs sm:text-sm" style={{ color: theme.fontBodyColor, fontFamily: theme.fontBody }}>Github</span></ThemedLink>}
                        {game.links.pressKit && <ThemedLink href={game.links.pressKit} theme={theme}><FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: theme.accentText }} /><span className="tracking-wider text-xs sm:text-sm" style={{ color: theme.fontBodyColor, fontFamily: theme.fontBody }}>Press Kit</span></ThemedLink>}
                    </div>
                </div>
                {["top-4 sm:top-8 left-4 sm:left-8 border-t-2 border-l-2",
                    "top-4 sm:top-8 right-4 sm:right-8 border-t-2 border-r-2",
                    "bottom-4 sm:bottom-8 left-4 sm:left-8 border-b-2 border-l-2",
                    "bottom-4 sm:bottom-8 right-4 sm:right-8 border-b-2 border-r-2",
                ].map((cls, i) => (
                    <div key={i} className={`absolute ${cls} w-10 sm:w-16 h-10 sm:h-16`} style={{ borderColor: theme.accentBorder }} />
                ))}
            </section>
            <section
                id="vision"
                className="scroll-mt-[100px] relative pt-16 sm:pt-32 overflow-hidden py-12 sm:py-16 border-y-2"
                style={{
                    backgroundColor: theme.bgColor,
                    color: theme.fontBodyColor,
                    borderColor: theme.panelBorderOpacity,
                }}
            >
                <div className="container mx-auto px-4 sm:px-8 lg:px-16">

                    <SectionHeading
                        title={t.gamePage.mechanics.title}
                        subtitle={t.gamePage.mechanics.subtitle}
                        fontTitle={theme.fontTitle}
                        fontBody={theme.fontBody}
                        accentBg={theme.accentBg}
                        fontTitleColor={theme.fontTitleColor}
                        fontBodyColor={theme.fontBodyColor}
                    />

                    <div
                        className="border-2"
                        style={{ borderColor: theme.panelBorderOpacity }}
                    />

                    <PanelBlock
                        heading={t.gamePage.mechanics.mechanics.title}
                        align="left"
                        fontBody={theme.fontBody}
                        accentBg={theme.accentBg}
                        fontBodyColor={theme.fontBodyColor}
                    >
                        <CardGrid
                            items={gameT.mechanics}
                            cornerClass="border-t-2 border-r-2 absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12"
                            borderColor={theme.cardBorderOpacity}
                            textSubtleColor={theme.textSubtle}
                            textMutedColor={theme.textMuted}
                            fontBody={theme.fontBody}
                        />
                    </PanelBlock>

                    <div
                        className="h-[2px]"
                        style={{ backgroundColor: theme.panelDividerBg }}
                    />

                    <PanelBlock
                        heading={t.gamePage.mechanics.market.title}
                        align="right"
                        fontBody={theme.fontBody}
                        accentBg={theme.accentBg}
                        fontBodyColor={theme.fontBodyColor}
                    >
                        <CardGrid
                            items={gameT.market}
                            cornerClass="border-b-2 border-l-2 absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-8 h-8 sm:w-12 sm:h-16"
                            borderColor={theme.cardBorderOpacity}
                            textSubtleColor={theme.textSubtle}
                            textMutedColor={theme.textMuted}
                            fontBody={theme.fontBody}
                        />
                    </PanelBlock>

                    <div
                        className="h-[2px]"
                        style={{ backgroundColor: theme.panelDividerBg }}
                    />

                    <PanelBlock
                        heading={t.gamePage.mechanics.technics.title}
                        align="left"
                        fontBody={theme.fontBody}
                        accentBg={theme.accentBg}
                        fontBodyColor={theme.fontBodyColor}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">

                            {gameT.technic.map(
                                (technic: { title: string; description: string }, i: number) => (
                                    <div
                                        key={i}
                                        className="border-2 p-4 sm:p-6 transition-all duration-300 relative group"
                                        style={{
                                            borderColor: theme.cardBorderOpacity,
                                        }}
                                    >
                                        <div className="flex items-start gap-3 sm:gap-4">

                                            <div
                                                className="w-1.5 h-1.5 mt-2 flex-shrink-0"
                                                style={{
                                                    backgroundColor: theme.accentBg,
                                                }}
                                            />
                                            <div>
                                                <h4
                                                    className="text-sm sm:text-lg mb-1 sm:mb-2 tracking-wide"
                                                    style={{
                                                        fontFamily: theme.fontBody,
                                                        fontWeight: "bold",
                                                        color: theme.textSubtle,
                                                    }}
                                                >
                                                    {technic.title}
                                                </h4>
                                                <p
                                                    className="text-xs sm:text-base"
                                                    style={{
                                                        fontFamily: theme.fontBody,
                                                        color: theme.textMuted,
                                                    }}
                                                >
                                                    {technic.description}
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </PanelBlock>
                </div>
            </section>
            <section
                id="roadmap"
                className="scroll-mt-[100px] relative pt-16 sm:pt-32 overflow-hidden py-12 sm:py-16 border-y-2"
                style={{ backgroundColor: theme.bgColor, color: theme.fontBodyColor, borderColor: theme.panelBorderOpacity }}
            >
                <div className="container mx-auto px-4 sm:px-8 lg:px-16">
                    <SectionHeading title={t.gamePage.roadmap.title} subtitle={t.gamePage.roadmap.subtitle} fontTitle={theme.fontTitle} fontBody={theme.fontBody} accentBg={theme.accentBg} fontTitleColor={theme.fontTitleColor} fontBodyColor={theme.fontBodyColor} />
                    <div className="border-2" style={{ borderColor: theme.panelBorderOpacity }}>
                        <PanelBlock heading={t.gamePage.roadmap.vision.title} align="left" fontBody={theme.fontBody} accentBg={theme.accentBg} fontBodyColor={theme.fontBodyColor}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                                <HoverBorderPanel
                                    borderColor={theme.cardBorderOpacity}
                                    hoverBorderColor={theme.panelBorderHover}
                                    cornerClass="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2"
                                    className="group"
                                >
                                    <h4 className="text-lg sm:text-2xl mb-2 tracking-wide" style={{ fontFamily: theme.fontBody, fontWeight: "bold", color: theme.textSubtle }}>{t.gamePage.roadmap.vision.title}</h4>
                                    <p className="text-xs sm:text-base leading-relaxed" style={{ fontFamily: theme.fontBody, color: theme.textMuted }}>{gameT.vision}</p>
                                </HoverBorderPanel>
                                <HoverBorderPanel
                                    borderColor={theme.cardBorderOpacity}
                                    hoverBorderColor={theme.panelBorderHover}
                                    cornerClass="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2"
                                    className="group"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: theme.accentText }} />
                                        <h4 className="text-lg sm:text-2xl tracking-wide" style={{ fontFamily: theme.fontBody, fontWeight: "bold", color: theme.textSubtle }}>{t.gamePage.roadmap.vision.progress}</h4>
                                    </div>
                                    <div className="space-y-4 sm:space-y-7">
                                        <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: theme.progressTrackBg }}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${game.developmentProgress}%` }}
                                                transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
                                                viewport={{ once: true }}
                                                className="h-full rounded-full"
                                                style={{ backgroundImage: `linear-gradient(to right, ${theme.progressFrom}, ${theme.progressTo})` }}
                                            />
                                        </div>
                                        <p className="text-xs sm:text-base tracking-wide" style={{ fontFamily: theme.fontBody, fontWeight: "bold", color: theme.textMuted }}>
                                            {game.developmentProgress}% {t.gamePage.roadmap.vision.completed}
                                        </p>
                                    </div>
                                </HoverBorderPanel>
                            </div>
                        </PanelBlock>
                        <div className="h-[2px]" style={{ backgroundColor: theme.panelDividerBg }} />
                        <PanelBlock heading={t.gamePage.roadmap.roadmap.title} align="center" fontBody={theme.fontBody} accentBg={theme.accentBg} fontBodyColor={theme.fontBodyColor}>
                            <div className="space-y-4 sm:space-y-8">
                                {gameT.roadmap.map((phase: { phase: string; status: string; items: string[] }, i: number) => (
                                    <div key={i} className="border-2 p-5 sm:p-8" style={{ borderColor: theme.panelBorderOpacity }}>
                                        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 flex-wrap">
                                            {renderStatusIcon(phase.status)}
                                            <h3 className="text-base sm:text-2xl tracking-wider flex-1" style={{ fontFamily: theme.fontBody, color: theme.fontBodyColor }}>{phase.phase}</h3>
                                            <span
                                                className="text-[10px] sm:text-sm tracking-wider uppercase px-3 sm:px-4 py-1 border flex-shrink-0"
                                                style={{ fontFamily: theme.fontBody, borderColor: theme.panelBorderOpacity, color: theme.textMuted }}
                                            >
                                                {phase.status === "completed"   && t.gamePage.roadmap.roadmap.completed}
                                                {phase.status === "in-progress" && t.gamePage.roadmap.roadmap.inProgress}
                                                {phase.status === "planned"     && t.gamePage.roadmap.roadmap.planned}
                                                {phase.status === "to-decide"   && t.gamePage.roadmap.roadmap.toDecide}
                                            </span>
                                        </div>
                                        <ul className="space-y-2">
                                            {phase.items.map((item: string, j: number) => (
                                                <li key={j} className="flex items-start gap-2 sm:gap-3" style={{ color: theme.textMuted }}>
                                                    <div className="w-1.5 h-1.5 mt-2 flex-shrink-0" style={{ backgroundColor: theme.accentBg }} />
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
                className="scroll-mt-[100px] relative pt-16 sm:pt-32 overflow-hidden py-12 sm:py-16 border-y-2"
                style={{ backgroundColor: theme.bgColor, color: theme.fontBodyColor, borderColor: theme.panelBorderOpacity }}
            >
                <div className="container mx-auto px-4 sm:px-8 lg:px-16">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-6 sm:mb-7">
                            <h2 className="text-3xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6 tracking-wider" style={{ fontFamily: theme.fontTitle, color: theme.fontTitleColor }}>{t.gamePage.investment.title}</h2>
                            <div className="flex items-center justify-center gap-3 sm:gap-4">
                                <div className="w-12 sm:w-20 h-[2px]" style={{ backgroundColor: theme.accentBg }} />
                                <p className="text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] uppercase" style={{ fontFamily: theme.fontBody, color: theme.fontBodyColor }}>{t.gamePage.investment.subtitle}</p>
                                <div className="w-12 sm:w-20 h-[2px]" style={{ backgroundColor: theme.accentBg }} />
                            </div>
                            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-2">
                                <div className="w-16 sm:w-24 h-[2px]" style={{ backgroundColor: theme.accentBg }} />
                                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: theme.accentText }} />
                                <div className="w-16 sm:w-24 h-[2px]" style={{ backgroundColor: theme.accentBg }} />
                            </div>
                        </div>
                        <div className="space-y-4 sm:space-y-8 mb-8 sm:mb-12">
                            {[
                                { label: t.gamePage.investment.monetization, content: gameT.investment.monetization },
                                { label: t.gamePage.investment.roi,          content: gameT.investment.roi },
                            ].map(({ label, content }, i) => (
                                <div key={i} className="border-2 p-5 sm:p-8" style={{ borderColor: theme.panelBorderOpacity }}>
                                    <h3 className="text-lg sm:text-2xl mb-3 sm:mb-4 tracking-wider" style={{ fontFamily: theme.fontBody, color: theme.textSubtle }}>{label}</h3>
                                    <p className="text-xs sm:text-base tracking-wide leading-relaxed" style={{ fontFamily: theme.fontBody, color: theme.textMuted }}>{content}</p>
                                </div>
                            ))}
                        </div>
                        <div className="border-2 p-5 sm:p-8" style={{ borderColor: theme.investmentHighlightBorder, backgroundColor: theme.investmentHighlightBg }}>
                            <h3 className="text-lg sm:text-2xl mb-4 sm:mb-6 tracking-wider" style={{ fontFamily: theme.fontBody, color: theme.textSubtle }}>{t.gamePage.investment.keys}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {gameT.investment.keys.map((key: string, i: number) => (
                                    <div key={i} className="flex items-start gap-2 sm:gap-3">
                                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" style={{ color: theme.colorCompleted }} />
                                        <span className="text-xs sm:text-base tracking-wide" style={{ fontFamily: theme.fontBody, color: theme.textSubtle }}>{key}</span>
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

            <section id="contact" className="py-16 sm:py-24 border-t-2" style={{ backgroundColor: theme.bgColor, borderColor: theme.panelBorderOpacity }}>
                <div className="container mx-auto px-4 sm:px-8 lg:px-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 tracking-wider" style={{ fontFamily: theme.fontTitle, color: theme.fontTitleColor }}>{t.gamePage.contact.title}</h2>
                        <p className="text-sm sm:text-xl mb-8 sm:mb-12 tracking-wide" style={{ fontFamily: theme.fontBody, color: theme.textMuted }}>{t.gamePage.contact.description}</p>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
                            <ThemedButton
                                onClick={() => router.push("/#contact")}
                                theme={theme}
                                className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 text-xs sm:text-sm tracking-[0.2em] uppercase"
                                style={{ fontFamily: theme.fontBody, color: theme.fontBodyColor }}
                            >
                                {t.gamePage.contact.button}
                            </ThemedButton>
                            {game.links.pressKit && (
                                <ThemedOutlineLink
                                    href={game.links.pressKit}
                                    theme={theme}
                                    className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 text-xs sm:text-sm tracking-[0.2em] uppercase text-center"
                                    style={{ fontFamily: theme.fontBody, color: theme.textMuted, borderColor: theme.panelBorderOpacity }}
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