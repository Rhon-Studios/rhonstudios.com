"use client"

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/app/language/LanguageProvider";
import { gamesData } from "@/app/games/gamesData";
import {useRouter} from "next/navigation";

export function Highlight() {

    const router = useRouter();
    const maskRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();
    
    useEffect(() => {
        const el = maskRef.current;
        if (!el) return;
        
        const handleMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            el.style.setProperty("--x", `${x}px`);
            el.style.setProperty("--y", `${y}px`);
        };
        
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    const game = gamesData.find((g) => g.id === "tonkori");
    if (!game) return null;

    return (
        <section
            id="highlight"
            className="snap-center scroll-mt-[120px] relative bg-black text-white overflow-hidden flex items-center justify-center"
            style={{
                height: "calc(100vh - 106px)",
            }}
        >
            <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{
                    backgroundImage: `url(${game.media.maskImage})`,
                    backgroundSize: "40%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            />
            <div
                ref={maskRef}
                className="absolute inset-0 transition-[mask-image] duration-300"
                style={{
                    backgroundImage: `url(${game.media.WebkitMaskImage})`,
                    backgroundSize: "40%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "brightness(1.2) contrast(1.1)",
                    WebkitMaskImage: `
                        radial-gradient(
                            300px at var(--x, 50%) var(--y, 50%),
                            rgba(0,0,0,1) 30%,
                            rgba(0,0,0,0.8) 70%,
                            rgba(0,0,0,0) 80%
                        )
                    `,
                    maskImage: `
                        radial-gradient(
                          350px at var(--x) var(--y),
                          rgba(0,0,0,1) 0%,
                          rgba(0,0,0,0.9) 40%,
                          rgba(0,0,0,0.4) 65%,
                          rgba(0,0,0,0) 100%
                        )
                    `,
                }}
            />
            <div className="absolute inset-0 bg-black/40" />
            <h1
                className="relative text-center pointer-events-none px-4 text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
                style={{ fontFamily: game.font, fontWeight: 400 }}
            >
                {game.title}
            </h1>
            <svg 
                width="193" 
                height="200" 
                viewBox="0 0 193 200" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-4 left-4 sm:top-8 sm:left-8 w-12 h-12 sm:w-16 sm:h-16"
            >
                <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ 
                        duration: 2,
                        ease: "easeIn",
                    }}
                    d="M1 200V1H192.5" 
                    stroke="white" 
                    strokeWidth="2"
                />
            </svg>
            <svg 
                width="193" 
                height="200" 
                viewBox="0 0 193 200" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-12 h-12 sm:w-16 sm:h-16"
            >
                <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{
                        duration: 2,
                        ease: "easeIn",
                    }}
                    d="M191.5 0V199H0" 
                    stroke="white"
                    strokeWidth="2"
                />
            </svg>
            <div className="absolute top-8 left-1/2 -translate-x-1/2 mt-10">
                <div className="inline-block border-2 border-white/80 px-6 sm:px-10 py-1 sm:py-2 rounded-md bg-black/60 backdrop-blur-sm">
                    <p
                        className="text-[8px] text-center sm:text-xs tracking-[0.3em] uppercase text-white"
                        style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                    >
                        {t.highlight.game_header}
                    </p>
                </div>
            </div>
            <button
                onClick={() => router.push(`/${game.id}`)}
                className="absolute inset-0 transition-opacity duration-300 translate-y-3/8"
            >
                    <span
                        className="inline-block px-6 sm:px-16 py-3 sm:py-5 border-2 border-white text-xs sm:text-sm tracking-[0.2em] uppercase bg-black hover:bg-white hover:text-black transition-all duration-300"                        style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                    >
                        {t.highlight.button}
                    </span>
            </button>
        </section>
    );
}