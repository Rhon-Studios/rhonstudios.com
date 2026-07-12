"use client"

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import {DevBlogPost, getDevBlogBySlug} from "@/libs/database/devblogsData";
import { useLanguage } from "@/libs/utils/LanguageProvider";
import { ArrowLeft, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import {team, collaborators, TeamMember} from "@/libs/database/teamData";

function getAuthor(post: DevBlogPost) {
    if (post.authorType === "team") {
        return team.find(member => member.id === post.authorId);
    }

    if (post.authorType === "collaborator") {
        return collaborators.find(col => col.id === post.authorId);
    }

    return null;
}

export default function DevBlogPage() {
    const { slug } = useParams();

    const post = getDevBlogBySlug(slug as string);
    if (!post) {
        return <div>Post not found</div>;
    }
    const author = getAuthor(post);
    const router = useRouter();
    const { t } = useLanguage();
    const devT = t.devblogs[post.id];

    return (
        <div className="bg-black text-white min-h-screen pt-32">
            <article className="relative pt-32 sm:pt-48 pb-24 sm:pb-32 px-6 sm:px-8 lg:px-16">
                <div className="container mx-auto max-w-4xl">
                    <button
                        onClick={() => router.push("/devblogs")}
                        className="inline-flex items-center gap-2 text-white/40 hover:text-white transition mb-10 sm:mb-12 text-sm tracking-wider"
                        style={{ fontFamily: "Cinzel" }}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Todos los posts
                    </button>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                        <span className="text-xs tracking-[0.2em] uppercase border-2 border-white/30 px-3 py-1 text-white/55" style={{ fontFamily: "Cinzel" }}>
                            {post.project}
                        </span>
                        <span className="text-xs text-white/30" style={{ fontFamily: "Cinzel" }}>
                            {new Date(post.publishedAt).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-white/30" style={{ fontFamily: "Cinzel" }}>
                            <Clock className="w-3 h-3" /> {post.readingTime} min de lectura
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl tracking-wider mb-6 sm:mb-8 leading-tight" style={{ fontFamily: "Rye", fontWeight: 200 }}>
                        {devT.title}
                    </h1>

                    <div className="text-base sm:text-lg text-white/60 leading-relaxed mb-10 sm:mb-12 border-l-2 border-white/20 pl-5 sm:pl-6" style={{ fontFamily: "Cinzel", fontWeight: 200 }}>
                        <ReactMarkdown>
                            {devT.excerpt}
                        </ReactMarkdown>
                    </div>
                    <div className="w-full h-[2px] bg-white/15 mb-10 sm:mb-12" />
                    <div className="text-white/75 text-base sm:text-lg lg:text-xl text-justify leading-relaxed space-y-6" style={{ fontFamily: "Cormorant" }}>
                        <ReactMarkdown>
                            {devT.content}
                        </ReactMarkdown>
                        <div className="mt-16 pt-8 border-t border-white/15 ml-auto text-right w-fit">
                            <p
                                className="text-sm uppercase tracking-[0.2em] text-white/40 mb-2"
                                style={{ fontFamily: "Cinzel" }}
                            >
                                Escrito por
                            </p>

                            <h3
                                className="text-2xl text-white"
                                style={{ fontFamily: "Rye", fontWeight: 200 }}
                            >
                                {author?.name ?? "Unknown author"}
                            </h3>

                            <p
                                className="text-white/50"
                                style={{ fontFamily: "Cormorant" }}
                            >
                                {post.authorType === "team"
                                    ? (author as TeamMember).role
                                    : ""}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="absolute top-6 sm:top-8 left-6 sm:left-8 w-12 sm:w-16 h-12 sm:h-16 border-t-2 border-l-2 border-white/20" />
                <div className="absolute top-6 sm:top-8 right-6 sm:right-8 w-12 sm:w-16 h-12 sm:h-16 border-t-2 border-r-2 border-white/20" />
            </article>
        </div>
    );
}