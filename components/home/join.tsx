"use client"

import {useLanguage} from "@/libs/utils/LanguageProvider";
import { opportunitiesData, getTopProjects } from "@/libs/database/oportunitiesData";
import { motion } from "framer-motion";
import {ArrowRight, Users} from "lucide-react";
import {useRouter} from "next/navigation";

export function Join() {

    const openCount = opportunitiesData.filter((o) => o.status === "open").length;
    const projectCards = getTopProjects(4).map((project) => {
        const openRoles = opportunitiesData.filter(
            (o) => o.projectId === project.id && o.status === "open"
        ).length;
        return { project, openRoles };
    });
    const {t} = useLanguage();
    const tt = t.join_part
    const router = useRouter();

    return (
        <section
            id="join"
            className="scroll-mt-[100px] relative bg-black text-white pt-16 sm:pt-32 pb-16 sm:pb-24 overflow-hidden"
            style={{ minHeight: '100vh' }}
        >
            <div className="container mx-auto px-4 sm:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <div className="inline-block border-2 border-white px-6 sm:px-10 py-2 sm:py-3 mb-6 sm:mb-8">
                            <p
                                className="text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase"
                                style={{ fontFamily: "Cinzel" }}
                            >
                                {tt.top_title}
                            </p>
                        </div>
                        <h2
                            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-6 sm:mb-8 tracking-wider"
                            style={{ fontFamily: "Rye" }}
                        >
                            {tt.title}
                        </h2>
                        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-8 sm:mb-16 lg:mb-7">
                            <div className="w-8 sm:w-24 h-[2px] bg-white"/>
                            <p
                                className="text-[10px] sm:text-sm tracking-[0.15em] sm:tracking-[0.3em] uppercase"
                                style={{ fontFamily: "Cinzel" }}
                            >
                                {tt.subtitle}
                            </p>
                            <div className="w-8 sm:w-24 h-[2px] bg-white"/>
                        </div>
                        <p
                            className="text-base sm:text-lg tracking-wide text-white/70 max-w-2xl mx-auto mb-8 sm:mb-10 px-2"
                            style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                        >
                            {tt.description}
                        </p>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 sm:gap-3 border border-white/30 px-5 sm:px-8 py-3 sm:py-4 mb-5"
                        >
                            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white/60" />
                            <span
                                className="text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/80"
                                style={{ fontFamily: "Cinzel", fontWeight: 300 }}
                            >
                                {openCount} {tt.count}
                            </span>
                        </motion.div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
                        {projectCards.map(({project, openRoles}, index) => {
                            const projectT = t.join.projects[project.id as keyof typeof t.join.projects];
                            return (
                                <motion.div
                                    key={project.id}
                                    initial={{opacity: 0, y: 30}}
                                    whileInView={{opacity: 1, y: 0}}
                                    transition={{duration: 0.6, delay: index * 0.15}}
                                    viewport={{once: true}}
                                    className="border border-white/30 p-5 sm:p-8 hover:border-white/70 transition-all duration-300 group flex flex-col justify-between min-h-[160px] sm:min-h-[200px]"
                                    style={{background: project.accentColor}}
                                >
                                    <div>
                                        <h3
                                            className="text-2xl sm:text-3xl tracking-wide mb-3"
                                            style={{fontFamily: "Rye", fontWeight: 400}}
                                        >
                                            {projectT.name}
                                        </h3>
                                        <p
                                            className="text-sm text-white/50 leading-relaxed line-clamp-2"
                                            style={{fontFamily: "Cinzel", fontWeight: 200}}
                                        >
                                            {projectT.shortDescription}
                                        </p>
                                    </div>
                                    <div className="mt-6">
                                        <span
                                            className={`text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase border px-2.5 sm:px-3 py-1 inline-block ${
                                                openRoles > 0
                                                    ? "border-white/50 text-white/70"
                                                    : "border-white/20 text-white/30"
                                            }`}
                                            style={{fontFamily: "Cinzel"}}
                                        >
                                            {openRoles > 0 ? `${openRoles} rol${openRoles !== 1 ? "es" : ""} ${openRoles !== 1 ? tt.card.open_p : tt.card.open}` : tt.card.no_offers}
                                        </span>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                    <div className="text-center">
                        <motion.button
                            onClick={() => router.push(`/join`)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-2 sm:gap-3 border-2 border-white px-8 sm:px-12 py-3 sm:py-4 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300"
                            style={{ fontFamily: "Cinzel", fontWeight: 300 }}
                        >
                            {tt.button}
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    </div>
                </div>
            </div>
            <div className="absolute top-4 left-4 sm:top-8 sm:left-8 w-8 h-8 sm:w-16 sm:h-16 border-t-2 border-l-2 border-white/20"></div>
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-8 h-8 sm:w-16 sm:h-16 border-t-2 border-r-2 border-white/20"></div>
            <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 w-8 h-8 sm:w-16 sm:h-16 border-b-2 border-l-2 border-white/20"></div>
            <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-8 h-8 sm:w-16 sm:h-16 border-b-2 border-r-2 border-white/20"></div>
        </section>
    )
}