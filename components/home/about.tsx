"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/libs/utils/LanguageProvider";

export function About() {
  const { t } = useLanguage();
  return (
    <section
      id="about"
      className="scroll-mt-[5px] relative bg-black text-white pt-16 sm:pt-32 overflow-hidden"
      style={{ minHeight: "20vh" }}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <div className="inline-block border-2 border-white px-6 sm:px-10 py-2 sm:py-3 mb-6 sm:mb-8">
              <p
                className="text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase"
                style={{ fontFamily: "Cinzel" }}
              >
                {t.about.top_title}
              </p>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-6 sm:mb-8 tracking-wider"
              style={{ fontFamily: "Rye" }}
            >
              {t.about.title}
            </h2>
            <div className="flex items-center justify-center gap-4 sm:gap-6 mb-10 sm:mb-16">
              <div className="w-12 sm:w-24 h-[2px] bg-white" />
              <p
                className="text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] uppercase"
                style={{ fontFamily: "Cinzel" }}
              >
                Rhon Studios
              </p>
              <div className="w-12 sm:w-24 h-[2px] bg-white" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 mt-7">
            <div>
              <h3
                className="text-xl sm:text-2xl md:text-4xl lg:text-5xl mb-3 tracking-wide"
                style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
              >
                {t.about.section_1.title}
              </h3>
              <p
                className="text-sm sm:text-base lg:text-lg leading-relaxed tracking-wide text-white/80 mb-4 sm:mb-6"
                style={{ fontFamily: "Cinzel" }}
              >
                {t.about.section_1.text.p1}
              </p>
              <p
                className="text-sm sm:text-base lg:text-lg leading-relaxed tracking-wide text-white/80"
                style={{ fontFamily: "Cinzel" }}
              >
                {t.about.section_1.text.p2}
              </p>
            </div>
            <div>
              <h3
                className="text-xl sm:text-2xl md:text-4xl lg:text-5xl mb-3 tracking-wide"
                style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
              >
                {t.about.section_2.title}
              </h3>
              <p
                className="text-sm sm:text-base lg:text-lg leading-relaxed tracking-wide text-white/80 mb-4 sm:mb-6"
                style={{ fontFamily: "Cinzel" }}
              >
                {t.about.section_2.text.p1.p1}
                <strong> {t.about.section_2.text.p1.p2}</strong>
              </p>
              <p
                className="text-sm sm:text-base lg:text-lg leading-relaxed tracking-wide text-white/80"
                style={{ fontFamily: "Cinzel" }}
              >
                {t.about.section_2.text.p2}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mt-10 sm:mt-15 mb-10 sm:mb-12">
            <div className="group border-2 border-white/30 p-6 sm:p-8 hover:border-white/60 transition-all duration-300 text-center">
              <h4
                className="text-xl sm:text-2xl mb-3 sm:mb-4 tracking-wider"
                style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
              >
                {t.about.creativity.title}
              </h4>
              <p
                className="text-xs sm:text-sm tracking-wide opacity-70 group-hover:opacity-100 transition-all duration-300"
                style={{ fontFamily: "Cinzel" }}
              >
                {t.about.creativity.text}
              </p>
            </div>
            <div className="group border-2 border-white/30 p-6 sm:p-8 hover:border-white/60 transition-all duration-300 text-center">
              <h4
                className="text-xl sm:text-2xl mb-3 sm:mb-4 tracking-wider"
                style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
              >
                {t.about.passion.title}
              </h4>
              <p
                className="text-xs sm:text-sm tracking-wide opacity-70 group-hover:opacity-100 transition-all duration-300"
                style={{ fontFamily: "Cinzel" }}
              >
                {t.about.passion.text}
              </p>
            </div>
            <div className="group border-2 border-white/30 p-6 sm:p-8 hover:border-white/60 transition-all duration-300 text-center">
              <h4
                className="text-xl sm:text-2xl mb-3 sm:mb-4 tracking-wider"
                style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
              >
                {t.about.quality.title}
              </h4>
              <p
                className="text-xs sm:text-sm tracking-wide opacity-70 group-hover:opacity-100 transition-all duration-300"
                style={{ fontFamily: "Cinzel" }}
              >
                {t.about.quality.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
