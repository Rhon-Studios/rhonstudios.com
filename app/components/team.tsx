"use client"

import {Github, Linkedin, Mail, Twitter} from "lucide-react";
import {useLanguage} from "@/app/language/LanguageProvider";
import {useState} from "react";
import {number} from "motion";
import { motion } from "framer-motion";

type Team = {
    id: number;
    name: string;
    img: string;
    role: string;
    bioShort: string;
    bio: string;
    linkedin: string;
    github: string;
    twitter: string;
    email: string;
};

type Collaborators = {
    id: number,
    name: String,
    role: String,
    area: String,
}

export function Team() {
    const { t } = useLanguage();
    const teams: Team[] = t.ourteam["main-team"];
    const collaborators: Collaborators[] = t.ourteam["collaborators"];
    const [expandedId, setExpandedId] = useState<number | null>(null);

    return (
        <section
            id="team"
            className="scroll-mt-[250px] relative bg-black text-white pb-16 sm:pb-32"
            style={{ minHeight: '20vh' }}
        >
            <div className="container mx-auto px-4 sm:p-8 lg:px-16">
                <div className="max-w-3xl mx-auto">
                    <div className="border-t-2 border-white/20 pt-10 sm:pt-12">
                        <div className="text-center mb-6 sm:mb-8">
                            <div className="inline-block border-2 border-white px-6 sm:px-10 py-2 sm:py-3 mb-6 sm:mb-8">
                                <p
                                    className="text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase"
                                    style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                                >
                                    {t.team.top_title}
                                </p>
                            </div>
                            <h3
                                className="text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 tracking-wider"
                                style={{ fontFamily: "Rye" }}
                            >
                                {t.team.title}
                            </h3>
                            <p
                                className="text-sm sm:text-base lg:text-lg tracking-wide text-white/70 max-w-2xl mx-auto"
                                style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                            >
                                {t.team.subtitle}
                            </p>
                        </div>
                        <div className="hidden lg:flex flex-row flex-wrap justify-center gap-20 group">
                            {teams.map((team, index) => (
                                <div
                                    key={team.id}
                                    className={`relative border-2 border-white/60 p-6 hover:border-white transition-all duration-500 flex flex-col h-[500px] w-[300px]
                                        ${index % 2 === 0
                                        ? "group-hover:-translate-x-full"
                                        : "group-hover:translate-x-full"
                                    }
                                    `}
                                >
                                    <div className="aspect-square bg-white/5 border-2 border-white/20 mb-6 relative overflow-hidden group-hover:border-white/40 transition-all duration-300">
                                        {team.img ? (
                                            <img
                                                src={team.img}
                                                alt={team.name}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-6xl text-white/20" style={{ fontFamily: "Rye" }}>
                                                    {team.name.split(" ").map(n => n[0]).join("")}
                                                </div>
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/30 group-hover:border-white/50"></div>
                                        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/30 group-hover:border-white/50"></div>
                                    </div>
                                    <h4 className="text-2xl mb-2 tracking-wide" style={{ fontFamily: "Cinzel", fontWeight: "bold" }}>
                                        {team.name}
                                    </h4>
                                    <p className="text-sm tracking-wider text-white/60 mb-2" style={{ fontFamily: "Cinzel", fontWeight: 200, fontSize: "13px" }}>
                                        {team.role}
                                    </p>
                                    <p className="text-sm leading-relaxed tracking-wide text-white/80 mb-2 flex-grow" style={{ fontFamily: "Cinzel", fontWeight: 200 }}>
                                        {team.bioShort}
                                    </p>
                                    <div className="flex items-center gap-4 pt-4 border-t border-white/20">
                                        <a href={team.github} className="text-white/60 hover:text-white transition-colors duration-300" aria-label="GitHub">
                                            <Github className="w-5 h-5" />
                                        </a>
                                        <a href={team.linkedin} className="text-white/60 hover:text-white transition-colors duration-300" aria-label="LinkedIn">
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                        <a href={`mailto:${team.email}`} className="text-white/60 hover:text-white transition-colors duration-300" aria-label="Email">
                                            <Mail className="w-5 h-5" />
                                        </a>
                                        <a href={team.twitter} className="text-white/60 hover:text-white transition-colors duration-300" aria-label="Twitter">
                                            <Twitter className="w-5 h-5" />
                                        </a>
                                    </div>
                                    
                                    <div
                                        className={`absolute w-[320px] min-h-[100px] h-auto p-6 bg-black/80 backdrop-blur-md border-2 border-white/30
                                                    opacity-0 pointer-events-none
                                                    group-hover:opacity-100 transition-opacity duration-500 ease-out
                                            ${index % 2 === 0
                                            ? "top-0 left-full ml-2 overlay-left"
                                            : "bottom-0 right-full mr-2 overlay-right"
                                        }
                                        `}
                                    >
                                        <p className="text-sm leading-relaxed tracking-wide text-white/80 mb-6 flex-grow" style={{ fontFamily: "Cinzel" }}>
                                            {team.bio}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="lg:hidden flex flex-col gap-4">
                            {teams.map((team) => {
                                const isExpanded = expandedId === team.id;
                                return (
                                    <div
                                        key={team.id}
                                        className="relative border-2 border-white/60 p-5 transition-all duration-300 flex flex-col"
                                        style={{ minHeight: '100px' }}
                                    >
                                        
                                        <div className="flex gap-4 items-start">
                                            <div className="w-20 h-20 flex-shrink-0 border-2 border-white/20 relative overflow-hidden bg-white/5">
                                                {team.img ? (
                                                    <img src={team.img} alt={team.name} className="absolute inset-0 w-full h-full object-cover" />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <span className="text-2xl text-white/20" style={{ fontFamily: "Rye" }}>
                                                            {team.name.split(" ").map(n => n[0]).join("")}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-lg tracking-wide mb-0.5" style={{ fontFamily: "Cinzel", fontWeight: "bold" }}>
                                                    {team.name}
                                                </h4>
                                                <p className="text-xs tracking-wider text-white/60 mb-1" style={{ fontFamily: "Cinzel", fontWeight: 200 }}>
                                                    {team.role}
                                                </p>
                                                <p className="text-xs leading-relaxed tracking-wide text-white/70" style={{ fontFamily: "Cinzel", fontWeight: 200 }}>
                                                    {team.bioShort}
                                                </p>
                                            </div>
                                            
                                            <button
                                                onClick={() => setExpandedId(isExpanded ? null : team.id)}
                                                className="flex-shrink-0 w-8 h-8 border border-white/40 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all duration-300 mt-1"
                                                aria-label={isExpanded ? "Cerrar" : "Ver más"}
                                            >
                                                <span className={`text-lg leading-none transition-transform duration-300 ${isExpanded ? "rotate-45" : ""}`}>+</span>
                                            </button>
                                        </div>
                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-96 mt-4" : "max-h-0"}`}>
                                            <div className="border-t border-white/20 pt-4">
                                                <p className="text-xs leading-relaxed tracking-wide text-white/80 mb-4" style={{ fontFamily: "Cinzel", fontWeight: 200 }}>
                                                    {team.bio}
                                                </p>
                                                <div className="flex items-center gap-4">
                                                    <a href={team.github} className="text-white/60 hover:text-white transition-colors duration-300" aria-label="GitHub">
                                                        <Github className="w-4 h-4" />
                                                    </a>
                                                    <a href={team.linkedin} className="text-white/60 hover:text-white transition-colors duration-300" aria-label="LinkedIn">
                                                        <Linkedin className="w-4 h-4" />
                                                    </a>
                                                    <a href={`mailto:${team.email}`} className="text-white/60 hover:text-white transition-colors duration-300" aria-label="Email">
                                                        <Mail className="w-4 h-4" />
                                                    </a>
                                                    <a href={team.twitter} className="text-white/60 hover:text-white transition-colors duration-300" aria-label="Twitter">
                                                        <Twitter className="w-4 h-4" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/20 pt-16 mt-16 max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-block border border-white/40 px-8 py-2 mb-6">
                            <p
                                className="text-xs tracking-[0.3em] uppercase text-white/60"
                                style={{ fontFamily: "Cinzel", fontWeight: 300 }}
                            >
                                {t.team.collaborators.top_title}
                            </p>
                        </div>
                        <h3
                            className="text-4xl tracking-wider mb-4"
                            style={{ fontFamily: "Rye", fontWeight: 200 }}
                        >
                            {t.team.collaborators.title}
                        </h3>
                        <p
                            className="text-white/50 max-w-xl mx-auto leading-relaxed"
                            style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                        >
                            {t.team.collaborators.subtitle}
                        </p>
                    </div>

                    {collaborators.length > 0 ? (
                        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {collaborators.map((c, i) => (
                                <motion.div
                                    key={c.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.08 }}
                                    viewport={{ once: true }}
                                    className="border border-white/20 p-5 hover:border-white/40 transition-all duration-300"
                                >
                                    <div className="w-10 h-10 border border-white/20 flex items-center justify-center mb-4">
                                            <span className="text-white/30 text-sm" style={{ fontFamily: "Rye" }}>
                                                {c.name.charAt(0)}
                                            </span>
                                    </div>
                                    <p
                                        className="text-base tracking-wide mb-1"
                                        style={{ fontFamily: "Cinzel", fontWeight: 400 }}
                                    >
                                        {c.name}
                                    </p>
                                    <p
                                        className="text-xs text-white/40 leading-relaxed mb-2"
                                        style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                                    >
                                        {c.role}
                                    </p>
                                    <span
                                        className="text-xs tracking-wider border border-white/20 px-2 py-0.5 text-white/30"
                                        style={{ fontFamily: "Cinzel" }}
                                    >
                                            {c.area}
                                        </span>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: collaborators.length * 0.08 }}
                                viewport={{ once: true }}
                                className="border border-dashed border-white/15 p-5 flex flex-col items-center justify-center text-center min-h-[140px] hover:border-white/35 transition-all duration-300"
                            >
                                <p className="text-white/25 text-2xl mb-2">+</p>
                                <p
                                    className="text-xs tracking-wider text-white/30"
                                    style={{ fontFamily: "Cinzel" }}
                                >
                                    {t.team.collaborators.placeholder}
                                </p>
                            </motion.div>
                        </div>
                    ) : (
                        <div className="text-center py-12 border border-dashed border-white/15">
                            <p
                                className="text-white/30 tracking-wider"
                                style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                            >
                                {t.team.collaborators.empty}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}