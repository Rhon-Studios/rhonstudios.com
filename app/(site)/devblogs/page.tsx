"use client"

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";
import { devBlogPosts, DevBlogPost as DevBlogPostData } from "@/libs/database/devblogsData";
import {useLanguage} from "@/libs/utils/LanguageProvider";
import {useRouter} from "next/navigation";


type ProjectFilter = "Todos" | "Tonkori" | "Afterlight" | "Estudio" | "General";
const FILTERS: ProjectFilter[] = ["Todos", "Tonkori", "Afterlight", "Estudio", "General"];

export default function DevBlogsIndex() {
    const [filter, setFilter] = useState<ProjectFilter>("Todos");
    const filtered = devBlogPosts.filter(
        (p) => filter === "Todos" || p.project === filter
    );

    return (
        <div className="bg-black text-white min-h-screen pt-30">
            <section className="relative pt-48 pb-24 px-8 lg:px-16 border-b border-white/10">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-6xl lg:text-7xl mb-8 tracking-wider"
                        style={{ fontFamily: "Rye", fontWeight: 200 }}
                    >
                        DevBlog
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto"
                        style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                    >
                        No construimos en silencio. Aquí contamos todo: las decisiones que tomamos, los problemas que encontramos y el porqué detrás de cada elección.
                    </motion.p>
                </div>
                <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-white/20"></div>
                <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-white/20"></div>
            </section>
            <section className="py-24 px-8 lg:px-16" id="devblog_index">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-wrap gap-2 mb-12">
                        {FILTERS.map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`text-xs tracking-[0.15em] uppercase px-4 py-2 border transition-all duration-200 ${
                                    filter === f
                                        ? "border-white bg-white text-black"
                                        : "border-white/25 text-white/45 hover:border-white/55 hover:text-white"
                                }`}
                                style={{ fontFamily: "Cinzel" }}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    {filtered.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 border border-white/10">
                            <BookOpen className="w-8 h-8 text-white/20 mx-auto mb-4" />
                            <p className="text-white/30 tracking-wider" style={{ fontFamily: "Cinzel", fontWeight: 200 }}>
                                No hay posts en esta categoría todavía.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

function PostCard({ post }: { post: DevBlogPostData }) {
    const { t } = useLanguage();
    const devT = t.devblogs[post.id];
    const router = useRouter();
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="border border-white/25 p-6 hover:border-white/60 transition-all duration-300 group flex flex-col"
        >
            <div className="flex items-center justify-between mb-4">
                <span
                    className="text-xs tracking-[0.2em] uppercase border border-white/30 px-3 py-1 text-white/55"
                    style={{ fontFamily: "Cinzel" }}
                >
                    {post.project}
                </span>
                <div className="flex items-center gap-1 text-white/30">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs" style={{ fontFamily: "Cinzel" }}>{post.readingTime} min</span>
                </div>
            </div>
            <h3
                className="text-xl tracking-wide mb-3 leading-snug flex-1 group-hover:text-white/90 transition"
                style={{ fontFamily: "Cinzel", fontWeight: 400 }}
            >
                {devT.title}
            </h3>
            <p
                className="text-sm text-white/45 leading-relaxed mb-5 line-clamp-3"
                style={{ fontFamily: "Cinzel", fontWeight: 200 }}
            >
                {devT.excerpt}
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
                {devT.tags.map((tag) => (
                    <span
                        key={tag}
                        className="text-xs text-white/30 border border-white/15 px-2 py-0.5"
                        style={{ fontFamily: "Cinzel" }}
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-xs text-white/30" style={{ fontFamily: "Cinzel" }}>
                    {new Date(post.publishedAt).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </span>
                <button
                    onClick={() => router.push(`/devblogs/${post.slug}`)}
                    className="text-xs tracking-[0.2em] uppercase text-white/40 group-hover:text-white transition flex items-center gap-1"
                    style={{ fontFamily: "Cinzel" }}
                >
                    Leer <ArrowLeft className="w-3 h-3 rotate-180" />
                </button>
            </div>
        </motion.div>
    );
}