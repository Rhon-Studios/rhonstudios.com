"use client"

import {useLanguage} from "@/app/language/LanguageProvider";
import {AnimatePresence, motion} from "framer-motion";
import {Award, Briefcase, Clock, FileText, Monitor, TrendingUp} from "lucide-react";
import {opportunitiesData, projectsData} from "@/app/DataBases/oportunitiesData";
import React, {useState} from "react";
import { ApplicationModal } from "./ApplicationModal"
interface ModalState {
    projectID: string;
    roleTitle: string;
}

interface AreaFilter {
    title: string;
    area: "art" | "programming" | "design" | "audio" | "narrative" | "marketing" | "other";
}

export default function Join() {
    const { t } = useLanguage();
    const tt = t.join_page;
    const areaLabels = {
        "art": tt.filters.areas.art,
        "programming": tt.filters.areas.programming,
        "design": tt.filters.areas.design,
        "audio": tt.filters.areas.audio,
        "narrative": tt.filters.areas.narrative,
        "marketing": tt.filters.areas.marketing,
        "other": tt.filters.areas.other,
    }
    const CONDITION_ICONS = [Award, TrendingUp, Briefcase, Monitor, Clock, FileText];
    const conditions = tt.conditions.items;
    const [areaFilter, setAreaFilter] = useState<"all" | AreaFilter["area"]>("all");
    const [projectFilter, setProjectFilter] = useState<string>("all");
    const [modal, setModal] = useState<ModalState | null>(null);
    const [expandedRole, setExpandedRole] = useState<string | null>(null);
    const projectsWithRoles = projectsData.filter((project) =>
        opportunitiesData.some((o) => o.projectId === project.id)
    );
    const sorted = [...projectsWithRoles].sort((a, b) => a.order - b.order);
    const rolesInScope = opportunitiesData.filter((o) =>
        projectFilter === "all" || o.projectId === projectFilter
    );
    const areas: Array<"all" | AreaFilter["area"]> = ["all", ...Array.from(new Set(opportunitiesData.map((opp) => opp.area))),];
    const areasWithRoles = new Set<AreaFilter["area"]>(rolesInScope.map((o) => o.area));
    const handleProjectFilter = (id: string) => {
        setProjectFilter(id);
        const newRoles = opportunitiesData.filter((o) => id === "all" || o.projectId === id);
        const newAreas = new Set<string>(newRoles.map((o) => o.area));
        if (areaFilter !== "all" && !newAreas.has(areaFilter)) {
            setAreaFilter("all");
        }
    };

    return (
        <div className="bg-black min-h-screen">
            <section
                id="home_join"
                className="relative h-screen bg-black text-white overflow-hidden flex items-center justify-center"
            >
                <div className="absolute inset-0 bg-black" />
                <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-16 text-center">
                    <div className="mb-6 sm:mb-8">
                        <div className="inline-block border-2 border-white px-6 sm:px-10 py-2 sm:py-3 mt-[120px] sm:mt-[250px]">
                            <p
                                className="text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase"
                                style={{ fontFamily: "Cinzel" }}
                            >
                                {tt.top_title}
                            </p>
                        </div>
                    </div>
                    <h1
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] mb-4 sm:mb-6 tracking-wider leading-none"
                        style={{ fontFamily: "Rye", fontWeight: 200 }}
                    >
                        {tt.title}
                    </h1>
                    <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12">
                        <div className="w-12 sm:w-24 h-[2px] bg-white" />
                        <div
                            className="text-sm sm:text-xl tracking-[0.2em] uppercase"
                            style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                        >
                            {tt.subtitle}
                        </div>
                        <div className="w-12 sm:w-24 h-[2px] bg-white" />
                    </div>
                    <p
                        className="text-sm sm:text-base lg:text-lg max-w-xs sm:max-w-xl lg:max-w-3xl mx-auto mb-10 sm:mb-16 leading-relaxed tracking-wide px-2"
                        style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                    >
                        {tt.description}
                    </p>
                </div>
                <div className="absolute top-4 sm:top-8 left-4 sm:left-8 w-10 sm:w-16 h-10 sm:h-16 border-t-2 border-l-2 border-white" />
                <div className="absolute top-4 sm:top-8 right-4 sm:right-8 w-10 sm:w-16 h-10 sm:h-16 border-t-2 border-r-2 border-white" />
                <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 w-10 sm:w-16 h-10 sm:h-16 border-b-2 border-l-2 border-white" />
                <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 w-10 sm:w-16 h-10 sm:h-16 border-b-2 border-r-2 border-white" />
            </section>
            <section
                id="conditions"
                className="scroll-mt-[100px] relative bg-black text-white pt-16 sm:pt-32 overflow-hidden py-12 sm:py-16"
            >
                <div className="container mx-auto px-6 sm:px-8 lg:px-16">
                    <div className="text-center mb-10 sm:mb-16">
                        <div className="inline-block border-2 border-white px-6 sm:px-10 py-2 sm:py-3 mb-6 sm:mb-8">
                            <p
                                className="text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase"
                                style={{ fontFamily: "Cinzel" }}
                            >
                                {tt.conditions.top_title}
                            </p>
                        </div>
                        <h2
                            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-6 sm:mb-8 tracking-wider"
                            style={{ fontFamily: "Rye" }}
                        >
                            {tt.conditions.title}
                        </h2>
                        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                            <div className="w-12 sm:w-24 h-[2px] bg-white" />
                            <p
                                className="text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] uppercase"
                                style={{ fontFamily: "Cinzel" }}
                            >
                                {tt.conditions.subtitle}
                            </p>
                            <div className="w-12 sm:w-24 h-[2px] bg-white" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {conditions.map((c, i) => {
                            const Icon = CONDITION_ICONS[i];
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.07 }}
                                    viewport={{ once: true }}
                                    className="border-2 border-white/20 p-6 sm:p-8 hover:border-white/60 transition-all duration-300 group"
                                >
                                    <Icon className="w-6 h-6 text-white/45 mb-4 group-hover:text-white/70 transition-colors duration-300" />
                                    <h3
                                        className="text-lg sm:text-xl tracking-wide mb-2"
                                        style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                                    >
                                        {c.title}
                                    </h3>
                                    <p
                                        className="text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-300"
                                        style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                                    >
                                        {c.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <section
                id="legal"
                className="scroll-mt-[100px] relative bg-black text-white pt-16 sm:pt-20 overflow-hidden pb-12 sm:pb-16"
            >
                <div className="container mx-auto px-6 sm:px-8 lg:px-16">
                    <div className="max-w-4xl mx-auto border-2 border-white/25 p-6 sm:p-10">
                        <p
                            className="text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white mb-3"
                            style={{ fontFamily: "Cinzel" }}
                        >
                            {tt.legal.title}
                        </p>
                        <div className="w-12 h-[1px] bg-white/30 mb-4" />
                        <p
                            className="text-sm sm:text-base text-white/65 leading-relaxed tracking-wide"
                            style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                        >
                            {tt.legal.description}
                        </p>
                    </div>
                </div>
            </section>
            <section
                id="roles"
                className="scroll-mt-[100px] relative bg-black text-white pt-16 sm:pt-32 overflow-hidden py-12 sm:py-16"
            >
                <div className="container mx-auto px-6 sm:px-8 lg:px-16">
                    <div className="text-center mb-10 sm:mb-16">
                        <div className="inline-block border-2 border-white px-6 sm:px-10 py-2 sm:py-3 mb-6 sm:mb-8">
                            <p
                                className="text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase"
                                style={{ fontFamily: "Cinzel" }}
                            >
                                {tt.roles.top_title}
                            </p>
                        </div>
                        <h2
                            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-6 sm:mb-8 tracking-wider"
                            style={{ fontFamily: "Rye" }}
                        >
                            {tt.roles.title}
                        </h2>
                        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                            <div className="w-12 sm:w-24 h-[2px] bg-white" />
                            <p
                                className="text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] uppercase"
                                style={{ fontFamily: "Cinzel" }}
                            >
                                {tt.roles.subtitle}
                            </p>
                            <div className="w-12 sm:w-24 h-[2px] bg-white" />
                        </div>
                    </div>
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-8">
                            <p
                                className="text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white mb-4"
                                style={{ fontFamily: "Cinzel" }}
                            >
                                {tt.filters.project_label}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => handleProjectFilter("all")}
                                    className={`text-[9px] sm:text-xs tracking-[0.15em] uppercase px-4 py-2 border-2 transition-all duration-200 ${
                                        projectFilter === "all"
                                            ? "border-white bg-white text-black"
                                            : "border-white/25 text-white/45 hover:border-white/55 hover:text-white"
                                    }`}
                                    style={{ fontFamily: "Cinzel" }}
                                >
                                    {tt.filters.all}
                                </button>
                                {sorted.map((p) => (
                                    <button
                                        key={p.id}
                                        onClick={() => handleProjectFilter(p.id)}
                                        className={`text-[9px] sm:text-xs tracking-[0.15em] uppercase px-4 py-2 border-2 transition-all duration-200 ${
                                            projectFilter === p.id
                                                ? "border-white bg-white text-black"
                                                : "border-white/25 text-white/45 hover:border-white/55 hover:text-white"
                                        }`}
                                        style={{ fontFamily: "Cinzel" }}
                                    >
                                        {t.join.projects[p.id as keyof typeof t.join.projects].name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mb-14">
                            <p
                                className="text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white mb-4"
                                style={{ fontFamily: "Cinzel" }}
                            >
                                {tt.filters.area_label}
                            </p>
                            <div className="flex flex-wrap gap-2">

                                {areas.map((key) => {
                                    const isActive = areaFilter === key;
                                    const hasRoles = key === "all" || areasWithRoles.has(key);
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => hasRoles && setAreaFilter(key)}
                                            disabled={!hasRoles}
                                            className={`text-[9px] sm:text-xs tracking-[0.15em] uppercase px-4 py-2 border-2 transition-all duration-200 ${
                                                isActive
                                                    ? "border-white bg-white text-black"
                                                    : !hasRoles
                                                        ? "border-white/10 text-white/20 cursor-not-allowed line-through"
                                                        : "border-white/25 text-white/45 hover:border-white/55 hover:text-white"
                                            }`}
                                            style={{ fontFamily: "Cinzel" }}
                                        >
                                            {key === "all" ? tt.filters.areas.all : areaLabels[key]}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        {opportunitiesData
                            .filter((o) => projectFilter === "all" || o.projectId === projectFilter)
                            .filter((o) => areaFilter === "all" || o.area === areaFilter)
                            .sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1))
                            .map((opp) => {
                                const project = projectsData.find((p) => p.id === opp.projectId)!;
                                const cardKey = opp.id;
                                const isExpanded = expandedRole === cardKey;
                                const projectT = t.join.projects[project.id as keyof typeof t.join.projects];
                                const oppT = t.join.opportunities[opp.id as keyof typeof t.join.opportunities];
                                return (
                                    <motion.div
                                        key={opp.id}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.45 }}
                                        viewport={{ once: true }}
                                        className={`border-2 transition-all duration-300 mb-4 ${
                                            opp.status === "filled"
                                                ? "border-white/15 opacity-50"
                                                : "border-white/30 hover:border-white/60"
                                        }`}
                                    >
                                        <div className="p-6 sm:p-8">
                                            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    {opp.featured && (
                                                        <span
                                                            className="text-[9px] sm:text-xs tracking-[0.15em] uppercase px-3 py-1 bg-white text-black"
                                                            style={{ fontFamily: "Cinzel" }}
                                                        >
                                                            ★ Urgente
                                                        </span>
                                                    )}
                                                    <span
                                                        className="text-[9px] sm:text-xs tracking-[0.2em] uppercase border-2 border-white/35 px-3 py-1 text-white/65"
                                                        style={{ fontFamily: "Cinzel" }}
                                                    >
                                                        {oppT.area}
                                                    </span>
                                                    <span
                                                        className="text-[9px] sm:text-xs tracking-[0.2em] uppercase px-3 py-1 border-2"
                                                        style={{
                                                            fontFamily: "Cinzel",
                                                            borderColor: project.secondaryColor,
                                                            color: project.secondaryColor,
                                                        }}
                                                    >
                                                        {projectT.name}
                                                    </span>
                                                </div>
                                                <span
                                                    className={`text-[9px] sm:text-xs tracking-[0.15em] uppercase px-3 py-1 border-2 ${
                                                        opp.status === "open" ? "border-white/45 text-white/75" : "border-white/15 text-white"
                                                    }`}
                                                    style={{ fontFamily: "Cinzel" }}
                                                >
                                                    {opp.status === "open" ? "● Abierta" : "○ Cubierta"}
                                                </span>
                                            </div>
                                            <h4
                                                className="text-xl sm:text-2xl tracking-wide mb-3"
                                                style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                                            >
                                                {oppT.title}
                                            </h4>
                                            <p
                                                className="text-sm text-white/55 leading-relaxed mb-4"
                                                style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                                            >
                                                {oppT.shortDescription}
                                            </p>
                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="border-t-2 border-white/15 pt-4 mt-2 grid md:grid-cols-2 gap-6">
                                                            <div>
                                                                <p
                                                                    className="text-[9px] sm:text-xs tracking-[0.2em] uppercase text-white/40 mb-3"
                                                                    style={{ fontFamily: "Cinzel" }}
                                                                >
                                                                    Lo que buscamos
                                                                </p>
                                                                <ul className="space-y-2">
                                                                    {oppT.requirements.map((r, i) => (
                                                                        <li
                                                                            key={i}
                                                                            className="flex items-start gap-2 text-sm text-white/65"
                                                                            style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                                                                        >
                                                                            <span className="mt-1 text-white shrink-0">✦</span>{r}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                            <div>
                                                                <p
                                                                    className="text-[9px] sm:text-xs tracking-[0.2em] uppercase text-white/40 mb-3"
                                                                    style={{ fontFamily: "Cinzel" }}
                                                                >
                                                                    Lo que ofrecemos
                                                                </p>
                                                                <ul className="space-y-2">
                                                                    {oppT.offer.map((o, i) => (
                                                                        <li
                                                                            key={i}
                                                                            className="flex items-start gap-2 text-sm text-white/65"
                                                                            style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                                                                        >
                                                                            <span className="mt-1 text-white shrink-0">✦</span>{o}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                            <div className="flex items-center gap-4 mt-4 pt-4 border-t-2 border-white/10">
                                                <button
                                                    onClick={() => setExpandedRole(isExpanded ? null : cardKey)}
                                                    className="text-[9px] sm:text-xs tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors duration-300"
                                                    style={{ fontFamily: "Cinzel" }}
                                                >
                                                    {isExpanded ? "Ver menos ↑" : "Ver más ↓"}
                                                </button>
                                                {opp.status === "open" && (
                                                    <button
                                                        onClick={() => setModal({ projectID: project.id, roleTitle: oppT.title })}
                                                        className="ml-auto border-2 border-white/50 px-6 py-2 text-[9px] sm:text-xs tracking-[0.2em] uppercase hover:border-white hover:bg-white hover:text-black transition-all duration-300"
                                                        style={{ fontFamily: "Cinzel", fontWeight: 300 }}
                                                    >
                                                        Quiero colaborar →
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })
                        }
                    </div>
                </div>
            </section>
            <AnimatePresence>
                {modal && (
                    <ApplicationModal initial={modal} onClose={() => setModal(null)} />
                )}
            </AnimatePresence>
        </div>
    )
}