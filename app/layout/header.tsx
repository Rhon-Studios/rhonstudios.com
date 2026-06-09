"use client"
import {useEffect, useRef, useState} from "react";
import {AnimatePresence} from "framer-motion";
import {useLanguage} from "@/app/language/LanguageProvider";
import {useParams, usePathname, useRouter} from "next/navigation";
import {getGameById} from "@/app/games/gamesData";

export function Header() {
    const pathname = usePathname();
    const isIdPage = pathname && pathname.split("/").filter(Boolean).length === 1;
    const params = useParams();
    const gameId = params?.id as string;
    const game = gameId ? getGameById(gameId) : null;
    const headerLogo = isIdPage && game?.logo
        ? game.logo
        : "/logos/RhonStudiosCircleLogo.png";
    const headerLogoLarge = isIdPage && game?.logo
        ? game.logo
        : "/logos/IconHeader.png";
    const router = useRouter();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isInHero, setIsInHero] = useState(true);
    const { language, setLanguage, t } = useLanguage();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 50);

            if (isIdPage) {
                const heroEl = document.getElementById("hero");
                if (heroEl) {
                    const heroBottom = heroEl.getBoundingClientRect().bottom;
                    setIsInHero(heroBottom > 80);
                } else {
                    setIsInHero(false);
                }
            } else {
                setIsInHero(false);
            }
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isIdPage]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMenuOpen]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isMenuOpen]);

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setIsMenuOpen(false);
        }
    };

    const menuItems = [
        { id: "hero", label: t.menu.home },
        { id: "highlight", label: t.menu.highlight },
        { id: "games", label: t.menu.games },
        { id: "about", label: t.menu.about },
        { id: "contact", label: t.menu.contact },
    ];

    const game_menuItems = game
        ? [
            { id: "home_game", label: game.id },
            { id: "vision", label: t.game_menu.vision },
            { id: "roadmap", label: t.game_menu.roadmap },
            { id: "investment", label: t.game_menu.investment },
            { id: "gallery", label: t.game_menu.gallery },
            { id: "contact", label: t.game_menu.contact }
        ]
        : menuItems;

    const LangSwitcherMobile = () => (
        <div className="flex items-center border border-white rounded-sm overflow-hidden">
            <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 text-white text-xs transition-all duration-300 ${language === "en" ? "bg-white/20" : ""}`}
            >
                EN
            </button>
            <div className="w-px h-4 bg-white/40" />
            <button
                onClick={() => setLanguage("es")}
                className={`px-2 py-1 text-white text-xs transition-all duration-300 ${language === "es" ? "bg-white/20" : ""}`}
            >
                ES
            </button>
        </div>
    );

    const LangSwitcherDesktop = () => (
        <div className="relative flex items-center border-2 border-white rounded-sm overflow-hidden">
            <button
                onClick={() => setLanguage("en")}
                className="relative flex-1 px-4 py-2 tracking-widest uppercase hover:bg-white/10 transition-all duration-300"
                style={{ fontFamily: "Cinzel" }}
            >
                <p className="text-white text-center text-sm">EN</p>
                <span className={`absolute left-1/2 -translate-x-1/2 bottom-1 h-[2px] bg-white transition-all duration-300 ${language === "en" ? "w-8" : "w-0"}`} />
            </button>
            <div className="w-px h-6 bg-white/40" />
            <button
                onClick={() => setLanguage("es")}
                className="relative flex-1 px-4 py-2 tracking-widest uppercase hover:bg-white/10 transition-all duration-300"
                style={{ fontFamily: "Cinzel" }}
            >
                <p className="text-white text-center text-sm">ES</p>
                <span className={`absolute left-1/2 -translate-x-1/2 bottom-1 h-[2px] bg-white transition-all duration-300 ${language === "es" ? "w-8" : "w-0"}`} />
            </button>
        </div>
    );

    const HamburgerBtn = ({ border2 = false }: { border2?: boolean }) => (
        <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`relative w-10 h-10 ${border2 ? "border-2" : "border"} border-white rounded-sm flex flex-col items-center justify-center gap-1.5 hover:bg-white/10 transition-all duration-300`}
            aria-label="Toggle menu"
        >
            <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
    );

    const MobileMenuOverlay = ({ items, onHome }: { items: typeof menuItems; onHome?: () => void }) => (
        <div className="fixed inset-0 z-[200] bg-black/98 flex flex-col pt-24 pb-10 px-6 overflow-y-auto">
            <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-5 right-5 w-10 h-10 border border-white rounded-sm flex flex-col items-center justify-center gap-1.5"
                aria-label="Close menu"
            >
                <span className="w-5 h-0.5 bg-white rotate-45 translate-y-[0px]"></span>
                <span className="w-5 h-0.5 bg-white -rotate-45 -translate-y-[2px]"></span>
            </button>
            <div className="flex flex-col gap-4 mt-4">
                {onHome && (
                    <button
                        onClick={onHome}
                        className="group relative border-2 border-white/30 p-5 text-left hover:border-white hover:bg-white/5 transition-all duration-300"
                    >
                        <h3 className="text-lg tracking-wider uppercase text-white/80" style={{ fontFamily: "Cinzel", fontWeight: 300 }}>
                            {t.game_menu.home}
                        </h3>
                    </button>
                )}
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className="group relative border-2 border-white/30 p-5 text-left hover:border-white hover:bg-white/5 transition-all duration-300"
                    >
                        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/40 group-hover:border-white transition-colors duration-300"/>
                        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white/40 group-hover:border-white transition-colors duration-300"/>
                        <h3 className="text-lg tracking-wider uppercase text-white/80" style={{ fontFamily: "Cinzel", fontWeight: 300 }}>
                            {item.label}
                        </h3>
                    </button>
                ))}
            </div>
            <div className="mt-auto pt-8 flex justify-center">
                <LangSwitcherDesktop />
            </div>
        </div>
    );

    if (isIdPage) {
        return (
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
                    isScrolled ? "bg-black/95 backdrop-blur-sm shadow-2xl" : "bg-transparent"
                }`}
            >
                <nav className={`container mx-auto transition-all duration-500 ${isScrolled ? "py-2 lg:py-6" : "py-4 lg:py-10"}`}>
                    {isScrolled ? (
                        <>
                            
                            <div className="lg:hidden flex items-center justify-between px-4 py-2">
                                <img
                                    src={headerLogo}
                                    alt={game?.title ?? "Rhon Studios"}
                                    className="h-12 w-auto"
                                />
                                <div className="flex items-center gap-3">
                                    <LangSwitcherMobile />
                                    <HamburgerBtn />
                                </div>
                            </div>
                            <nav className="hidden lg:flex container mx-auto py-4 items-center justify-between relative">
                                <LangSwitcherDesktop />
                                <div className="hidden xl:flex items-center gap-4 absolute left-[32%] -translate-x-full">
                                    <h1 className="text-white text-4xl lg:text-5xl tracking-widest opacity-0 animate-fadeInLeft" style={{ fontFamily: game?.theme.fontTitle, textShadow: "0 4px 20px rgba(255,255,255,0.15)" }}>{game?.title}</h1>
                                </div>
                                <div className="absolute left-1/2 transform -translate-x-1/2">
                                    <a href="#">
                                        <img
                                            src={headerLogo}
                                            alt={game?.title ?? "Rhon Studios"}
                                            className="h-[90px] transition-all duration-500 ease-out scale-90 opacity-0 animate-logoPop"
                                        />
                                    </a>
                                </div>
                                <div className="hidden xl:flex items-center gap-4 absolute right-[32%] translate-x-full">
                                    <h1 className="text-white text-4xl lg:text-5xl tracking-widest opacity-0 animate-fadeInRight" style={{ fontFamily: game?.theme.fontTitle, textShadow: "0 4px 20px rgba(255,255,255,0.15)" }}>Rhon Studios</h1>
                                </div>
                                <div className="flex items-center gap-6 ml-auto">
                                    <HamburgerBtn border2 />
                                </div>
                            </nav>
                        </>
                    ) : (
                        <>
                            <div
                                className={`lg:hidden flex items-center justify-between px-4 py-2 transition-all duration-500 ${isInHero ? "opacity-0 pointer-events-none -translate-y-2" : "opacity-100 pointer-events-auto translate-y-0"}`}
                            >
                                <img
                                    src={headerLogo}
                                    alt={game?.title ?? "Rhon Studios"}
                                    className="h-[90px] transition-all duration-500 ease-out scale-90 opacity-0 animate-logoPop"
                                />
                                <div className="flex items-center gap-3">
                                    <LangSwitcherMobile />
                                    <HamburgerBtn />
                                </div>
                            </div>
                            <div className="hidden lg:grid grid-cols-3 items-center">
                                <ul className="flex gap-8 xl:gap-12 items-center text-white justify-start">
                                    <li>
                                        <button onClick={() => router.push(`/#games`)} style={{ fontFamily: game?.theme.fontTitle }} className="text-base lg:text-[22px] xl:text-[25px] tracking-wider uppercase hover:opacity-60 transition">
                                            {t.game_menu.home}
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => scrollTo("vision")} style={{ fontFamily: game?.theme.fontTitle }} className="text-base lg:text-[22px] xl:text-[25px] tracking-wider uppercase hover:opacity-60 transition">
                                            {t.game_menu.vision}
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => scrollTo("roadmap")} style={{ fontFamily: game?.theme.fontTitle }} className="text-base lg:text-[22px] xl:text-[25px] tracking-wider uppercase hover:opacity-60 transition">
                                            {t.game_menu.roadmap}
                                        </button>
                                    </li>
                                </ul>
                                <div className="flex flex-col items-center justify-center -mt-4 gap-4">
                                    <img
                                        src={headerLogoLarge}
                                        alt={game?.title ?? "Rhon Studios"}
                                        className="block w-auto h-[90px] lg:h-[130px] xl:h-[155px] shrink-0 transition-all duration-500 ease-out scale-90"
                                    />
                                    <LangSwitcherDesktop />
                                </div>
                                <ul className="flex gap-5 xl:gap-8 items-center text-white justify-end">
                                    <li>
                                        <button onClick={() => scrollTo("investment")} style={{ fontFamily: game?.theme.fontTitle }} className="text-base lg:text-[22px] xl:text-[25px] tracking-wider uppercase hover:opacity-60 transition">
                                            {t.game_menu.investment}
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => scrollTo("gallery")} style={{ fontFamily: game?.theme.fontTitle }} className="text-base lg:text-[22px] xl:text-[25px] tracking-wider uppercase hover:opacity-60 transition">
                                            {t.game_menu.gallery}
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => scrollTo("contact")} style={{ fontFamily: game?.theme.fontTitle }} className="text-base lg:text-[22px] xl:text-[25px] tracking-wider uppercase hover:opacity-60 transition">
                                            {t.game_menu.contact}
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </>
                    )}
                </nav>
                <AnimatePresence>
                    {isScrolled && isMenuOpen && (
                        <div ref={menuRef} className="hidden lg:block overflow-hidden bg-black/98 backdrop-blur-sm border-t-2 border-white/20">
                            <div className="container mx-auto px-4 lg:px-16 py-6 lg:py-8">
                                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-6">
                                    <button onClick={() => router.push("/#games")} className="group relative border-2 border-white/30 p-6 text-left hover:border-white hover:bg-white/5 transition-all duration-300">
                                        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/40 group-hover:border-white transition-colors duration-300"/>
                                        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white/40 group-hover:border-white transition-colors duration-300"/>
                                        <h3 className="text-l tracking-wider uppercase text-white/30 group-hover:text-white/80 mb-1 transition-colors" style={{ fontFamily: "Cinzel", fontWeight: 300 }}>
                                            {t.game_menu.home}
                                        </h3>
                                    </button>
                                    {game_menuItems.map((item) => (
                                        <button key={item.id} onClick={() => scrollTo(item.id)} className="group relative border-2 border-white/30 p-6 text-left hover:border-white hover:bg-white/5 transition-all duration-300">
                                            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/40 group-hover:border-white transition-colors duration-300"/>
                                            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white/40 group-hover:border-white transition-colors duration-300"/>
                                            <h3 className="text-l tracking-wider uppercase text-white/30 group-hover:text-white/80 mb-1 transition-colors" style={{ fontFamily: "Cinzel", fontWeight: 300 }}>
                                                {item.label}
                                            </h3>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {isMenuOpen && (
                        <div className="lg:hidden">
                            <MobileMenuOverlay items={game_menuItems} onHome={() => router.push("/#games")} />
                        </div>
                    )}
                </AnimatePresence>
            </header>
        );
    }

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
                isScrolled ? "bg-black/95 backdrop-blur-sm shadow-2xl" : "bg-transparent"
            }`}
        >
            <nav className={`container mx-auto transition-all duration-500 ${isScrolled ? "py-2 lg:py-6" : "py-4 lg:py-10 px-4 sm:px-8 lg:px-16"}`}>
                {isScrolled ? (
                    <>
                        
                        <div className="lg:hidden flex items-center justify-between px-4 py-2">
                            <img src="/logos/RhonStudiosCircleLogo.png" alt="Rhon Studios" className="h-12 w-auto" />
                            <div className="flex items-center gap-3">
                                <LangSwitcherMobile />
                                <HamburgerBtn />
                            </div>
                        </div>
                        
                        <nav className="hidden lg:flex container mx-auto py-4 items-center justify-between relative">
                            <LangSwitcherDesktop />
                            <div className="hidden xl:flex items-center gap-4 absolute left-[32%] -translate-x-full">
                                <h1 className="text-white text-4xl lg:text-5xl tracking-widest opacity-0 animate-fadeInLeft" style={{ fontFamily: "Rye", textShadow: "0 4px 20px rgba(255,255,255,0.15)" }}>Rhon</h1>
                            </div>
                            <div className="absolute left-1/2 transform -translate-x-1/2">
                                <a href="#">
                                    <img src="/logos/RhonStudiosCircleLogo.png" alt="Rhon Studios" className="h-[90px] transition-all duration-500 ease-out scale-90 opacity-0 animate-logoPop" />
                                </a>
                            </div>
                            <div className="hidden xl:flex items-center gap-4 absolute right-[32%] translate-x-full">
                                <h1 className="text-white text-4xl lg:text-5xl tracking-widest opacity-0 animate-fadeInRight" style={{ fontFamily: "Rye" }}>Studios</h1>
                            </div>
                            <div className="flex items-center gap-6 ml-auto">
                                <HamburgerBtn border2 />
                            </div>
                        </nav>
                    </>
                ) : (
                    <>
                        <div
                            className={`lg:hidden flex items-center justify-between px-4 py-2
                                transition-all duration-500
                                ${isInHero ? "opacity-0 pointer-events-none -translate-y-2" : "opacity-100 pointer-events-auto translate-y-0"}
                            `}
                        >
                            <img src="/logos/RhonStudiosCircleLogo.png" alt="Rhon Studios" className="h-12 w-auto" />
                            <div className="flex items-center gap-3">
                                <LangSwitcherMobile />
                                <HamburgerBtn />
                            </div>
                        </div>
                        <div className="hidden lg:grid grid-cols-3 items-center">
                            <ul className="flex gap-8 xl:gap-12 items-center text-white justify-start">
                                <li>
                                    <button onClick={() => scrollTo("highlight")} style={{ fontFamily: "Cinzel" }} className="text-base lg:text-[22px] xl:text-[25px] tracking-wider uppercase hover:opacity-60 transition">
                                        {t.menu.highlight}
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => scrollTo("games")} style={{ fontFamily: "Cinzel" }} className="text-base lg:text-[22px] xl:text-[25px] tracking-wider uppercase hover:opacity-60 transition">
                                        {t.menu.games}
                                    </button>
                                </li>
                            </ul>
                            <div className="flex flex-col items-center justify-center -mt-4 gap-4">
                                <img src="/logos/IconHeader.png" alt="Rhon Studios Header" className="block w-auto h-[90px] lg:h-[130px] xl:h-[155px] shrink-0 transition-all duration-500 ease-out scale-90" />
                                <LangSwitcherDesktop />
                            </div>
                            <ul className="flex gap-8 xl:gap-12 items-center text-white justify-end">
                                <li>
                                    <button onClick={() => scrollTo("about")} style={{ fontFamily: "Cinzel" }} className="text-base lg:text-[22px] xl:text-[25px] tracking-wider uppercase hover:opacity-60 transition">
                                        {t.menu.about}
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => scrollTo("contact")} style={{ fontFamily: "Cinzel" }} className="text-base lg:text-[22px] xl:text-[25px] tracking-wider uppercase hover:opacity-60 transition">
                                        {t.menu.contact}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </>
                )}
            </nav>
            <AnimatePresence>
                {isScrolled && isMenuOpen && (
                    <div ref={menuRef} className="hidden lg:block overflow-hidden bg-black/98 backdrop-blur-sm border-t-2 border-white/20">
                        <div className="container mx-auto px-4 lg:px-16 py-6 lg:py-8">
                            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
                                {menuItems.map((item) => (
                                    <button key={item.id} onClick={() => scrollTo(item.id)} className="group relative border-2 border-white/30 p-6 text-left hover:border-white hover:bg-white/5 transition-all duration-300">
                                        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/40 group-hover:border-white transition-colors duration-300"/>
                                        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white/40 group-hover:border-white transition-colors duration-300"/>
                                        <h3 className="text-l tracking-wider uppercase text-white/30 group-hover:text-white/80 mb-1 transition-colors" style={{ fontFamily: "Cinzel", fontWeight: 300 }}>
                                            {item.label}
                                        </h3>
                                        <div className="h-[2px] bg-white/30 group-hover:w-full group-hover:bg-white transition-all duration-500"/>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isMenuOpen && (
                    <div className="lg:hidden">
                        <MobileMenuOverlay items={menuItems} />
                    </div>
                )}
            </AnimatePresence>
        </header>
    );
}