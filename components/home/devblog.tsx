import {useLanguage} from "@/libs/utils/LanguageProvider";
import {devBlogPosts} from "@/libs/database/devblogsData";
import { motion } from "framer-motion";
import {ArrowRight} from "lucide-react";
import {useRouter} from "next/navigation";

export function DevBlog() {
    const {t} = useLanguage();
    const tt = t.devblog

    const featured = devBlogPosts.filter((p) => p.featured).slice(0, 3);
    const router = useRouter();

    return (
        <section
            id="devblog"
            className="scroll-mt-[5px] relative bg-black text-white pt-16 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
            style={{minHeight: '20vh'}}
        >
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10 sm:mb-16">
                    <div className="inline-block border-2 border-white px-6 sm:px-10 py-2 sm:py-3 mb-6 sm:mb-8">
                        <p
                            className="text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase"
                            style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                        >
                            {tt.top_title}
                        </p>
                    </div>
                    <h3
                        className="text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 tracking-wider"
                        style={{ fontFamily: "Rye" }}
                    >
                        {tt.title}
                    </h3>
                    <div className="flex items-center justify-center gap-3 sm:gap-6 mb-6 sm:mb-8">
                        <div className="w-8 sm:w-24 h-[2px] bg-white"></div>
                        <p
                            className="text-[10px] sm:text-sm tracking-[0.15em] sm:tracking-[0.3em] uppercase"
                            style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                        >
                            {tt.subtitle}
                        </p>
                        <div className="w-8 sm:w-24 h-[2px] bg-white"></div>
                    </div>
                    <p
                        className="text-sm sm:text-base lg:text-lg max-w-3xl mx-auto text-white/70 leading-relaxed tracking-wide"
                        style={{ fontFamily: "Cinzel"}}
                    >
                        {tt.description}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
                    {featured.map((post, index) => {
                        const devT = t.devblogs[post.id]
                        return(
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                viewport={{ once: true }}
                                className="border border-white/30 p-5 sm:p-6 hover:border-white/65 transition-all duration-300 group flex flex-col"
                            >
                                <div className="flex items-center justify-between mb-4 gap-2">
                                        <span
                                            className="text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase border border-white/30 px-2 sm:px-3 py-1 text-white/55 whitespace-nowrap"
                                            style={{ fontFamily: "Cinzel" }}
                                        >
                                            {post.project}
                                        </span>
                                    <span
                                        className="text-xs text-white/30 whitespace-nowrap"
                                        style={{ fontFamily: "Cinzel" }}
                                    >
                                            {post.readingTime} min
                                        </span>
                                </div>
                                <h3
                                    className="text-base sm:text-lg tracking-wide mb-3 leading-snug flex-1 group-hover:text-white/90 transition"
                                    style={{ fontFamily: "Cinzel", fontWeight: 400 }}
                                >
                                    {devT.title}
                                </h3>
                                <p
                                    className="text-sm text-white/45 leading-relaxed mb-4 line-clamp-3"
                                    style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                                >
                                    {devT.excerpt}
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t border-white/10 gap-2">
                                        <span
                                            className="text-xs text-white/30 whitespace-nowrap"
                                            style={{ fontFamily: "Cinzel" }}
                                        >
                                            {new Date(post.publishedAt).toLocaleDateString("es-ES", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                    <button
                                        onClick={() => router.push(`/devblogs/${post.slug}`)}
                                        className="text-xs tracking-[0.2em] uppercase text-white/40 group-hover:text-white transition whitespace-nowrap"
                                        style={{ fontFamily: "Cinzel" }}
                                    >
                                        {tt.button}
                                    </button>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
                <div className="flex justify-center mb-16">
                    <motion.a
                        href="/devblogs"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 sm:gap-3 border-2 border-white px-6 sm:px-10 py-3 sm:py-4 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white hover:bg-white hover:text-black transition-all duration-300 group"
                        style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                    >
                        {tt.view_all}
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.a>
                </div>

            </div>
            <div className="absolute top-4 left-4 sm:top-8 sm:left-8 w-8 h-8 sm:w-16 sm:h-16 border-t-2 border-l-2 border-white/20"></div>
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-8 h-8 sm:w-16 sm:h-16 border-t-2 border-r-2 border-white/20"></div>
            <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 w-8 h-8 sm:w-16 sm:h-16 border-b-2 border-l-2 border-white/20"></div>
            <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-8 h-8 sm:w-16 sm:h-16 border-b-2 border-r-2 border-white/20"></div>
        </section>
    )
}