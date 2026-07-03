"use client"

import {Facebook, Instagram, Linkedin, MessageSquare, Music2, Twitter, Youtube} from 'lucide-react';
import {useLanguage} from "@/app/language/LanguageProvider";
import {useParams, usePathname, useRouter} from "next/navigation";
import {getGameById} from "@/app/DataBases/gamesData";
import React from "react";

export function Footer() {
    const pathname = usePathname();
    const params = useParams();
    const router = useRouter();
    const currentYear = new Date().getFullYear();
    const { t } = useLanguage();

    const gameId = params?.id as string | undefined;
    const game = gameId ? getGameById(gameId) : null;

    const isMainPage = pathname === "/";
    const isJoinPage = pathname === "/join";
    const isDevBlogPage = pathname === "/devblogs" || pathname.startsWith("/devblogs/");
    const isGamePage = !!gameId;

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        } else {
            router.push(`/#${id}`);
        }
    };

    type FooterSubLink = {
        id: string;
        label: string;
        onClick: () => void;
    };

    type FooterLink = {
        id: string;
        label: string;
        onClick: () => void;
        subs?: FooterSubLink[];
    };

    const homeLinks: { id: string; label: string; subs?: { id: string; label: string }[] }[] = [
        { id: "hero", label: t.menu.home, subs: [
                { id: "highlight", label: t.menu.highlight },
            ]},
        { id: "games", label: t.menu.games, subs: [
                { id: "ourvision", label: t.menu.ourvision },
                { id: "devblog", label: t.menu.devblog },
            ]},
        { id: "about", label: t.menu.about, subs: [
                { id: "team", label: t.menu.team },
                { id: "community", label: t.menu.community },
            ]},
        { id: "contact", label: t.menu.contact, subs: [
                { id: "join", label: t.menu.join },
                { id: "faq", label: t.menu.faq },
            ]},
    ];

    const joinLinks: { id: string; label: string }[] = [
        { id: "home_join",  label: t.join_menu.join },
        { id: "conditions", label: t.join_menu.conditions ?? "Condiciones" },
        { id: "roles",      label: t.join_menu.opportunities },
    ];

    const gameLinks: FooterLink[] = game
        ? [
            { id: "home_game",  label: game.title,             onClick: () => router.push("/#games") },
            { id: "vision",     label: t.game_menu.vision,      onClick: () => scrollTo("vision") },
            { id: "roadmap",    label: t.game_menu.roadmap,     onClick: () => scrollTo("roadmap") },
            { id: "investment", label: t.game_menu.investment,  onClick: () => scrollTo("investment") },
            { id: "gallery",    label: t.game_menu.gallery,     onClick: () => scrollTo("gallery") },
            { id: "contact",    label: t.game_menu.contact,     onClick: () => scrollTo("contact") },
        ]
        : homeLinks.map((l) => ({
            ...l,
            onClick: () => scrollTo(l.id),
            subs: l.subs?.map((s) => ({ ...s, onClick: () => scrollTo(s.id) })),
        }));

    const goToDevblogs = () => {
        if (pathname === "/devblogs") {
            scrollTo("devblogs_index");
        } else {
            router.push("/devblogs#devblogs_index");
        }
    };

    const devBlogLinks: FooterLink[] = [
        {
            id: "devblogs",
            label: t.devblog_menu.devblogs,
            onClick: goToDevblogs,
        },
    ];

    const links: FooterLink[] = isGamePage
        ? gameLinks
        : isJoinPage
            ? joinLinks.map((l) => ({ ...l, onClick: () => scrollTo(l.id) }))
            : isDevBlogPage
                ? devBlogLinks
                : homeLinks.map((l) => ({
                    ...l,
                    onClick: () => scrollTo(l.id),
                    subs: l.subs?.map((s) => ({ ...s, onClick: () => scrollTo(s.id) })),
                }));

    const linksTitle = isGamePage
        ? (game?.title ?? t.footer.links)
        : isJoinPage
            ? (t.join_menu.join ?? t.footer.links)
            : isDevBlogPage
                ? t.devblog_menu.devblogs
                : t.footer.links;

    const footerLogo = isGamePage && game?.logo
        ? game.logo
        : "/Logos/RhonLabel.png";
    const footerLogoAlt = isGamePage ? (game?.title ?? "Rhon Studios") : "Rhon Studios";

    const showBackLink = isJoinPage || isGamePage || isDevBlogPage;

    return (
        <footer
            id="footer"
            className={`relative bg-black text-white border-t-2 border-white py-10 sm:py-12`}
        >
            <div className="container mx-auto px-6 sm:px-8 lg:px-16">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
                    <div className="flex flex-col items-center sm:items-start justify-center gap-4">
                        <img
                            src={footerLogo}
                            alt={footerLogoAlt}
                            className="w-28 sm:w-35 h-auto"
                        />
                    </div>
                    <div className="text-center">
                        <h4
                            className="text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 sm:mb-6 border-b-2 border-white pb-2 inline-block"
                            style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                        >
                            {linksTitle}
                        </h4>
                        <ul className="space-y-2 sm:space-y-3">
                            {showBackLink && (
                                <button
                                    onClick={() => router.push("/")}
                                    className="text-xs sm:text-sm tracking-wide hover:opacity-60 transition"
                                    style={{ fontFamily: "Cinzel" }}
                                >
                                    {t.join_menu.home ?? "Rhon Studios"}
                                </button>
                            )}
                            {links.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={item.onClick}
                                        className="text-xs sm:text-sm tracking-wide hover:opacity-60 transition"
                                        style={{ fontFamily: "Cinzel" }}
                                    >
                                        {item.label}
                                    </button>
                                    {item.subs && item.subs.length > 0 && (
                                        <div className="mt-1.5 flex items-center justify-center gap-0 flex-wrap">
                                            {item.subs.map((sub, i) => (
                                                <span key={sub.id} className="flex items-center">
                                                    {i > 0 && (
                                                        <span className="text-white/20 mx-1.5 text-[9px] select-none">·</span>
                                                    )}
                                                    <button
                                                        onClick={sub.onClick}
                                                        className="text-[10px] sm:text-[11px] tracking-wide text-white/50 hover:text-white/80 transition"
                                                        style={{ fontFamily: "Cinzel" }}
                                                    >
                                                        {sub.label}
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="text-center">
                        <h4
                            className="text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4 border-b-2 border-white pb-2 inline-block"
                            style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                        >
                            {t.footer.follow}
                        </h4>

                        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8 place-items-center mx-auto max-w-[220px]">
                            <a
                                href="https://discord.gg/7T8n8VYRkw"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 sm:w-12 sm:h-12 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                                aria-label="Discord"
                            >
                                <MessageSquare size={18} strokeWidth={2} />
                            </a>

                            <a
                                href="https://x.com/RhonStudios"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 sm:w-12 sm:h-12 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                                aria-label="Twitter"
                            >
                                <Twitter size={18} strokeWidth={2} />
                            </a>

                            <a
                                href="https://www.youtube.com/@RhonStudios"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 sm:w-12 sm:h-12 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                                aria-label="Youtube"
                            >
                                <Youtube size={18} strokeWidth={2} />
                            </a>

                            <a
                                href="https://instagram.com/rhonstudios"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 sm:w-12 sm:h-12 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                                aria-label="Instagram"
                            >
                                <Instagram size={18} strokeWidth={2} />
                            </a>

                            <a
                                href="https://www.tiktok.com/rhon.studios"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 sm:w-12 sm:h-12 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                                aria-label="TikTok"
                            >
                                <Music2 size={18} strokeWidth={2} />
                            </a>

                            <a
                                href="https://www.linkedin.com/company/rhon-studios"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 sm:w-12 sm:h-12 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={18} strokeWidth={2} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[2px] bg-white/30 mb-6 sm:mb-8" />
                <div className="text-center">
                    <p
                        className="text-[10px] sm:text-xs tracking-wide opacity-60"
                        style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                    >
                        © {currentYear} Rhon Studios. {t.footer.rights}
                    </p>
                </div>
            </div>
        </footer>
    );
}