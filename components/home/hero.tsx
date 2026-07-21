"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/libs/utils/LanguageProvider";
import { gamesData } from "@/libs/database/gamesData";

const titles = gamesData.map((game) => game.title);
export function Hero() {
  const [index, setIndex] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  //TODO: Add scroll detection to change the hero section's appearance when scrolling down
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="scroll-mt-40 relative h-screen bg-black text-white overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black"></div>
      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-16 text-center">
        <div className="mb-6 sm:mb-8">
          <div className="inline-block border border-white px-6 sm:px-8 py-2 sm:py-3 sm:mt-10 md:mt-25 lg:mt-65">
            <p
              className="text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase"
              style={{ fontFamily: "Cinzel" }}
            >
              {t.hero.subtitle}
            </p>
          </div>
        </div>
        <h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] mb-4 sm:mb-6 tracking-wider leading-none"
          style={{ fontFamily: "Rye", fontWeight: 200 }}
        >
          Rhon Studios
        </h1>
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="w-12 sm:w-24 h-0.5 bg-white"></div>
          <AnimatePresence mode="wait">
            <motion.div
              key={titles[index]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-sm sm:text-xl tracking-[0.2em] uppercase"
              style={{ fontFamily: "Cinzel", fontWeight: 200 }}
            >
              {titles[index]}
            </motion.div>
          </AnimatePresence>
          <div className="w-12 sm:w-24 h-0.5 bg-white"></div>
        </div>
        <p
          className="text-sm sm:text-base lg:text-lg max-w-xs sm:max-w-xl lg:max-w-3xl mx-auto mb-10 sm:mb-16 leading-relaxed tracking-wide px-2"
          style={{ fontFamily: "Cinzel" }}
        >
          {t.hero.description.p1}
          <br />
          {t.hero.description.p2}
        </p>

        <motion.button
          onClick={() => scrollTo("games")}
          className="group relative"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <span
            className="cursor-pointer inline-block px-10 sm:px-16 py-4 sm:py-5 border-2 border-white text-xs sm:text-sm tracking-[0.2em] uppercase bg-black group-hover:bg-white group-hover:text-black transition-all duration-300"
            style={{ fontFamily: "Cinzel", fontWeight: 200 }}
          >
            {t.hero.button}
          </span>
        </motion.button>

        <div className="mt-5 sm:mt-5">
          <div className="inline-block">
            <div className="w-24 h-24 sm:w-32 sm:h-32 border-2 border-white rounded-full flex items-center justify-center">
              <div className="text-center">
                <div
                  className="text-xl sm:text-2xl"
                  style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                >
                  100%
                </div>
                <div
                  className="text-[8px] sm:text-[9px] tracking-wider"
                  style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                >
                  {t.hero.soul_products.p1} <br /> {t.hero.soul_products.p2}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 w-10 sm:w-16 h-10 sm:h-16 border-t-2 border-l-2 border-white"></div>
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 w-10 sm:w-16 h-10 sm:h-16 border-t-2 border-r-2 border-white"></div>
      <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 w-10 sm:w-16 h-10 sm:h-16 border-b-2 border-l-2 border-white"></div>
      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 w-10 sm:w-16 h-10 sm:h-16 border-b-2 border-r-2 border-white"></div>
    </section>
  );
}
