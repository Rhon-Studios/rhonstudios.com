"use client"

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/app/language/LanguageProvider";
import { useRouter } from "next/navigation";
import { GameData, gamesData } from "@/app/games/gamesData";

export function Games(){

    const router = useRouter();
    const [selectedGame, setSelectedGame] = useState<GameData | null>(null);
    const { t } = useLanguage();

    return (
        <section
            id="games"
            className="snap-center scroll-mt-[100px] relative bg-black text-white pt-16 sm:pt-32 overflow-hidden"
            style={{ minHeight: '100vh' }}
        >
            <div className="container mx-auto px-4 sm:p-8 lg:px-16">
                <div className="text-center">
                    <div className="inline-block border-2 border-white px-6 sm:px-10 py-2 sm:py-3 mb-6 sm:mb-8">
                        <p
                            className="text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase"
                            style={{ fontFamily: "Cinzel" }}
                        >
                            {t.games.top_title}
                        </p>
                    </div>
                    <h2
                        className="text-4xl sm:text-5xl lg:text-7xl mb-6 sm:mb-8 tracking-wider"
                        style={{ fontFamily: "Rye" }}
                    >
                        {t.games.title}
                    </h2>
                    <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12">
                        <div className="w-12 sm:w-24 lg:w-100 h-[2px] bg-white"/>
                        <p
                            className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase"
                            style={{ fontFamily: "Cinzel" }}
                        >
                            {t.games.subtitle}
                        </p>
                        <div className="w-12 sm:w-24 lg:w-100 h-[2px] bg-white"/>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-12">
                    {gamesData.map((game, index) => {
                        const gameT = t.game_list[game.id];
                        return (
                            <div
                                onClick={() => setSelectedGame(game)}
                                key={game.id}
                                className="relative border-2 border-white p-5 sm:p-6 md:p-8 overflow-hidden group h-auto md:h-[350px] flex flex-col justify-center cursor-pointer hover:bg-white/5 transition-all duration-300"
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-40"
                                    style={{
                                        backgroundImage: `url(${game.heroImage})`,
                                        filter: "greyscale(100%)"
                                    }}
                                />
                                <div className="relative z-10 pl-4 sm:pl-10">
                                    <h3
                                        className="text-3xl sm:text-4xl md:text-5xl tracking-wide mb-3"
                                        style={{ fontFamily: game.font, fontWeight: "bold" }}
                                    >
                                        {game.title}
                                    </h3>
                                </div>
                                <p
                                    className="text-sm sm:text-base lg:text-lg leading-relaxed tracking-wide text-white/70 mb-6 sm:mb-8 relative z-10 pl-4 sm:pl-10"
                                    style={{ fontFamily: "Cinzel" }}
                                >
                                    {gameT.subtitle}
                                </p>
                                <div className="absolute top-4 left-4 w-6 sm:w-8 h-6 sm:h-8 border-t-2 border-l-2 border-white/50 opacity-100"></div>
                                <div className="absolute top-4 right-4 w-6 sm:w-8 h-6 sm:h-8 border-t-2 border-r-2 border-white/50 opacity-100"></div>
                                <div className="absolute bottom-4 left-4 w-6 sm:w-8 h-6 sm:h-8 border-b-2 border-l-2 border-white/50 opacity-100"></div>
                                <div className="absolute bottom-4 right-4 w-6 sm:w-8 h-6 sm:h-8 border-b-2 border-r-2 border-white/50 opacity-100"></div>
                            </div>
                        )
                    })}
                </div>
                <div className="text-center mt-12 sm:mt-20">
                    <p
                        className="text-sm sm:text-lg tracking-wide opacity-60"
                        style={{ fontFamily: "Cinzel" }}
                    >
                        {t.games.more_projects}
                    </p>
                </div>
            </div>
            <AnimatePresence>
                {selectedGame && (() => {
                    const selectedGameT = t.game_list[selectedGame.id];
                    return (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 sm:px-6 overflow-y-auto py-6"
                            onClick={() => setSelectedGame(null)}
                        >
                            <div
                                className="relative max-w-6xl w-full bg-black border-2 border-white/20 p-5 sm:p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center my-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="group relative aspect-video bg-black border-2 border-white/20 flex items-center justify-center overflow-hidden">
                                        {selectedGame.heroImage ? (
                                            <img
                                                src={selectedGame.heroImage}
                                                alt={selectedGame.title}
                                                className="opacity-60 w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-center">
                                                <div
                                                    className="text-3xl sm:text-4xl mb-2 text-white/40"
                                                    style={{ fontFamily: selectedGame.font }}
                                                >
                                                    {selectedGame.title}
                                                </div>
                                                <div
                                                    className="text-xs sm:text-sm text-white/30 tracking-wider"
                                                    style={{ fontFamily: "Cinzel"}}
                                                >
                                                    {t.games.game_card.no_image}
                                                </div>
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 w-10 sm:w-12 h-10 sm:h-12 border-t-2 border-l-2 border-white/40 group-hover:border-white/80"></div>
                                        <div className="absolute bottom-4 right-4 w-10 sm:w-12 h-10 sm:h-12 border-b-2 border-r-2 border-white/40 group-hover:border-white/80"></div>
                                    </motion.div>
                                </div>
                                <div>
                                    <div className="mb-4 sm:mb-6">
                                        <h3
                                            className="text-3xl sm:text-4xl lg:text-6xl mb-2 sm:mb-3 tracking-wider text-white/80"
                                            style={{ fontFamily: selectedGame.font, fontWeight: 200}}
                                        >
                                            {selectedGame.title}
                                        </h3>
                                        <p
                                            className="text-base sm:text-xl text-white/70 tracking-wide"
                                            style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                                        >
                                            {selectedGameT.subtitle}
                                        </p>
                                    </div>
                                    <p
                                        className="text-sm sm:text-base leading-relaxed tracking-wide text-white/70 mb-6 sm:mb-8"
                                        style={{ fontFamily: "Cinzel"}}
                                    >
                                        {selectedGameT.description}<br/>{selectedGameT.description2}
                                    </p>
                                    <div className="space-y-3 mb-6 sm:mb-8">
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <div className="w-2 h-2 bg-white flex-shrink-0"/>
                                            <span className="text-xs sm:text-sm tracking-wider text-white/60" style={{ fontFamily: "Cinzel" }}>
                                                {t.games.game_card.state}
                                            </span>
                                            <span className="text-xs sm:text-sm tracking-wider" style={{ fontFamily: "Cinzel" }}>
                                                {selectedGameT.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <div className="w-2 h-2 bg-white flex-shrink-0"></div>
                                            <span className="text-xs sm:text-sm tracking-wider text-white/60" style={{ fontFamily: "Cinzel" }}>
                                                {t.games.game_card.year}
                                            </span>
                                            <span className="text-xs sm:text-sm tracking-wider" style={{ fontFamily: "Cinzel" }}>
                                                {selectedGameT.year}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <div className="w-2 h-2 bg-white flex-shrink-0"></div>
                                            <span className="text-xs sm:text-sm tracking-wider text-white/60" style={{ fontFamily: "Cinzel" }}>
                                                {t.games.game_card.genre}
                                            </span>
                                            <span className="text-xs sm:text-sm tracking-wider" style={{ fontFamily: "Cinzel" }}>
                                                {selectedGameT.genre}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => router.push(`/${selectedGame.id}`)}
                                        className="w-full sm:w-auto border-2 border-white px-8 sm:px-12 py-3 text-xs sm:text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300"
                                        style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                                    >
                                        {t.games.game_card.know_more}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })()}
            </AnimatePresence>
        </section>
    )
}