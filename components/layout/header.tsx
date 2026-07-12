"use client"
import {useEffect, useRef, useState} from "react";
import {AnimatePresence} from "framer-motion";
import {ArrowLeft} from "lucide-react";
import {useLanguage} from "@/libs/utils/LanguageProvider";
import {useParams, usePathname, useRouter} from "next/navigation";
import {getGameById} from "@/libs/database/gamesData";

type SubItem = { label: string; type: "scroll"; id: string };
interface NavGroupProps {
    primary: string;
    onPrimary: () => void;
    subs?: SubItem[];
    align: "left" | "right";
    scrollTo: (id: string) => void;
    fontFamily?: string;
}

function NavGroup({primary, onPrimary, subs = [], scrollTo, fontFamily = "Cinzel",}: NavGroupProps) {
    return (
        <div className="flex flex-col items-center text-center">
            <button
                onClick={onPrimary}
                className="tracking-wider uppercase hover:opacity-60 transition text-base lg:text-[22px] xl:text-[25px] leading-none text-white"
                style={{ fontFamily }}
            >
                {primary}
            </button>

            {subs.length > 0 && (
                <>
                    <div className="w-full h-px bg-white/15 mt-3 mb-2" />
                    <div className="flex items-center justify-center gap-0 flex-wrap">
                        {subs.map((sub, i) => (
                            <span key={sub.label} className="flex items-center">
                                {i > 0 && (
                                    <span
                                        className="text-white/20 mx-2 leading-none select-none"
                                        style={{ fontFamily, fontSize: 13 }}
                                    >
                                        ·
                                    </span>
                                )}
                                <button
                                    onClick={() => scrollTo(sub.id)}
                                    className="tracking-wider uppercase text-white/40 hover:text-white/75 transition-colors leading-none text-sm lg:text-base"
                                    style={{ fontFamily }}
                                >
                                    {sub.label}
                                </button>
                            </span>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}


export function Header() {
    const pathname = usePathname();
    const params = useParams();
    const gameId = params?.id as string;
    const isCollabPage = pathname.startsWith("/collaborators");
    const isIdPage = !!gameId && !isCollabPage;
    const isJoinPage = pathname === "/join";
    const isDevPage = pathname.startsWith("/devblogs");
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

    const isLinksPage = pathname === "/links";

    if (isLinksPage) {
        return null;
    }

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
        { id: "hero", label: t.menu.home, subs: [{ id: "highlight", label: t.menu.highlight }] },
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

    const game_menuItems = game
        ? [
            { id: "home_game",  label: game.id },
            { id: "vision",     label: t.game_menu.vision },
            { id: "roadmap",    label: t.game_menu.roadmap },
            { id: "investment", label: t.game_menu.investment },
            { id: "gallery",    label: t.game_menu.gallery },
            { id: "contact",    label: t.game_menu.contact },
        ]
        : menuItems;

    const joinMenuItems = [
        { id: "home_join",  label: t.join_menu.join },
        { id: "conditions", label: t.join_menu.conditions },
        { id: "roles",      label: t.join_menu.opportunities },
    ];
    
    const devblogItems = [
        { id: "devblog_idex", label: t.devblog_menu.devblogs}
    ]

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
            <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
            <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
    );

    const MobileMenuOverlay = ({items, onHome, homeLabel,}: {
        items: { id: string; label: string }[];
        onHome?: () => void;
        homeLabel?: string;
    }) => (
        <div className="fixed inset-0 z-[200] bg-black/98 flex flex-col pt-24 pb-10 px-6 overflow-y-auto">
            <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-5 right-5 w-10 h-10 border border-white rounded-sm flex flex-col items-center justify-center gap-1.5"
                aria-label="Close menu"
            >
                <span className="w-5 h-0.5 bg-white rotate-45 translate-y-[0px]" />
                <span className="w-5 h-0.5 bg-white -rotate-45 -translate-y-[2px]" />
            </button>
            <div className="flex flex-col gap-4 mt-4">
                {onHome && (
                    <button
                        onClick={onHome}
                        className="group relative border-2 border-white/30 p-5 text-left hover:border-white hover:bg-white/5 transition-all duration-300"
                    >
                        <h3 className="text-lg tracking-wider uppercase text-white/80" style={{ fontFamily: "Cinzel", fontWeight: 300 }}>
                            {homeLabel ?? t.game_menu.home}
                        </h3>
                    </button>
                )}
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className="group relative border-2 border-white/30 p-5 text-left hover:border-white hover:bg-white/5 transition-all duration-300"
                    >
                        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/40 group-hover:border-white transition-colors duration-300" />
                        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white/40 group-hover:border-white transition-colors duration-300" />
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

    const ScrolledLogoBar = ({ logo, logoAlt, titleLeft, titleRight, titleFont }: {
        logo: string;
        logoAlt: string;
        titleLeft?: string;
        titleRight?: string;
        titleFont?: string;
    }) => (
        <nav className="hidden lg:flex container mx-auto py-4 items-center justify-between relative">
            <LangSwitcherDesktop />
            {titleLeft && (
                <div className="hidden xl:flex items-center gap-4 absolute left-[32%] -translate-x-full">
                    <h1 className="text-white text-4xl lg:text-5xl tracking-widest opacity-0 animate-fadeInLeft" style={{ fontFamily: titleFont, textShadow: "0 4px 20px rgba(255,255,255,0.15)" }}>
                        {titleLeft}
                    </h1>
                </div>
            )}
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <a href="#">
                    <img src={logo} alt={logoAlt} className="h-[90px] transition-all duration-500 ease-out scale-90 opacity-0 animate-logoPop" />
                </a>
            </div>
            {titleRight && (
                <div className="hidden xl:flex items-center gap-4 absolute right-[32%] translate-x-full">
                    <h1 className="text-white text-4xl lg:text-5xl tracking-widest opacity-0 animate-fadeInRight" style={{ fontFamily: titleFont, textShadow: "0 4px 20px rgba(255,255,255,0.15)" }}>
                        {titleRight}
                    </h1>
                </div>
            )}
            <div className="flex items-center gap-6 ml-auto">
                <HamburgerBtn border2 />
            </div>
        </nav>
    );

    const DropdownBtn = ({ label, onClick }: { label: string; onClick: () => void }) => (
        <button
            onClick={onClick}
            className="group relative border-2 border-white/30 p-6 text-left hover:border-white hover:bg-white/5 transition-all duration-300"
        >
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/40 group-hover:border-white transition-colors duration-300" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white/40 group-hover:border-white transition-colors duration-300" />
            <h3 className="text-l tracking-wider uppercase text-white/30 group-hover:text-white/80 mb-1 transition-colors" style={{ fontFamily: "Cinzel", fontWeight: 300 }}>
                {label}
            </h3>
        </button>
    );

    if (isJoinPage) {
        return (
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${isScrolled ? "bg-black/95 backdrop-blur-sm shadow-2xl" : "bg-transparent"}`}>
                <nav className={`container mx-auto transition-all duration-500 ${isScrolled ? "py-2 lg:py-4 px-4 sm:px-8 lg:px-16" : "py-4 lg:py-8 px-4 sm:px-8 lg:px-16"}`}>
                    {isScrolled ? (
                        <>
                            
                            <div className="lg:hidden flex items-center justify-between px-4 py-2">
                                <img src="/logos/RhonStudiosCircleLogo.png" alt="Rhon Studios" className="h-12 w-auto" />
                                <div className="flex items-center gap-3">
                                    <LangSwitcherMobile />
                                    <HamburgerBtn />
                                </div>
                            </div>
                            <ScrolledLogoBar
                                logo="/logos/RhonStudiosCircleLogo.png"
                                logoAlt="Rhon Studios"
                                titleLeft="Rhon"
                                titleRight="Studios"
                                titleFont="Rye"
                            />
                        </>
                    ) : (
                        <>
                            <div className="lg:hidden flex items-center justify-between px-4 py-2">
                                <button
                                    onClick={() => router.push("/")}
                                    className="flex items-center gap-2 text-white"
                                    style={{ fontFamily: "Cinzel" }}
                                >
                                    <ArrowLeft size={20} />
                                </button>
                                <img src="/logos/RhonStudiosCircleLogo.png" alt="Rhon Studios" className="h-12 w-auto" />
                                <div className="flex items-center gap-3">
                                    <LangSwitcherMobile />
                                    <HamburgerBtn />
                                </div>
                            </div>
                            <div className="hidden lg:grid grid-cols-3 items-center">
                                <div className="flex justify-start gap-8 xl:gap-12">
                                    <button
                                        onClick={() => router.push("/#about")}
                                        style={{ fontFamily: "Cinzel" }}
                                        className="text-base lg:text-[22px] xl:text-[25px] tracking-wider uppercase text-white hover:opacity-60 transition"
                                    >
                                        {t.join_menu.home}
                                    </button>
                                    <button
                                        onClick={() => scrollTo("home_join")}
                                        style={{ fontFamily: "Cinzel" }}
                                        className="text-base lg:text-[22px] xl:text-[25px] tracking-wider uppercase text-white hover:opacity-60 transition"
                                    >
                                        {t.join_menu.join}
                                    </button>
                                </div>
                                <div className="flex flex-col items-center justify-center gap-4">
                                    <a href="/">
                                        <img
                                            src="/logos/IconHeader.png"
                                            alt="Rhon Studios"
                                            className="block w-auto h-[90px] lg:h-[110px] shrink-0 transition-all duration-500 ease-out scale-90"
                                        />
                                    </a>
                                    <LangSwitcherDesktop />
                                </div>
                                <div className="flex justify-end gap-8 xl:gap-12">
                                    <button
                                        onClick={() => scrollTo("conditions")}
                                        style={{ fontFamily: "Cinzel" }}
                                        className="text-base lg:text-[22px] xl:text-[25px] tracking-wider uppercase text-white hover:opacity-60 transition"
                                    >
                                        {t.join_menu.conditions ?? "Condiciones"}
                                    </button>
                                    <button
                                        onClick={() => scrollTo("roles")}
                                        style={{ fontFamily: "Cinzel" }}
                                        className="text-base lg:text-[22px] xl:text-[25px] tracking-wider uppercase text-white hover:opacity-60 transition"
                                    >
                                        {t.join_menu.opportunities}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </nav>
                <AnimatePresence>
                    {isScrolled && isMenuOpen && (
                        <div ref={menuRef} className="hidden lg:block overflow-hidden bg-black/98 backdrop-blur-sm border-t-2 border-white/20">
                            <div className="container mx-auto px-4 lg:px-16 py-6 lg:py-8">
                                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-6">
                                    <DropdownBtn label={t.join_menu.home} onClick={() => router.push("/")} />
                                    {joinMenuItems.map((item) => (
                                        <DropdownBtn key={item.id} label={item.label} onClick={() => scrollTo(item.id)} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {isMenuOpen && (
                        <div className="lg:hidden">
                            <MobileMenuOverlay
                                items={joinMenuItems}
                                onHome={() => { router.push("/"); setIsMenuOpen(false); }}
                                homeLabel={t.join_menu.home}
                            />
                        </div>
                    )}
                </AnimatePresence>
            </header>
        );
    }

    if (isIdPage) {
        return (
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${isScrolled ? "bg-black/95 backdrop-blur-sm shadow-2xl" : "bg-transparent"}`}>
                <nav className={`container mx-auto transition-all duration-500 ${isScrolled ? "py-2 lg:py-6" : "py-4 lg:py-10"}`}>
                    {isScrolled ? (
                        <>
                            <div className="lg:hidden flex items-center justify-between px-4 py-2">
                                <img src={headerLogo} alt={game?.title ?? "Rhon Studios"} className="h-12 w-auto" />
                                <div className="flex items-center gap-3">
                                    <LangSwitcherMobile />
                                    <HamburgerBtn />
                                </div>
                            </div>
                            <ScrolledLogoBar
                                logo={headerLogo}
                                logoAlt={game?.title ?? "Rhon Studios"}
                                titleLeft={game?.title}
                                titleRight="Rhon Studios"
                                titleFont={game?.theme.fontTitle}
                            />
                        </>
                    ) : (
                        <>
                            <div className={`lg:hidden flex items-center justify-between px-4 py-2 transition-all duration-500 ${isInHero ? "opacity-0 pointer-events-none -translate-y-2" : "opacity-100 pointer-events-auto translate-y-0"}`}>
                                <img src={headerLogo} alt={game?.title ?? "Rhon Studios"} className="h-[90px] transition-all duration-500 ease-out scale-90 opacity-0 animate-logoPop" />
                                <div className="flex items-center gap-3">
                                    <LangSwitcherMobile />
                                    <HamburgerBtn />
                                </div>
                            </div>
                            <div className="hidden lg:grid grid-cols-3 items-center">
                                <ul className="flex gap-8 xl:gap-12 items-center text-white justify-start">
                                    <li>
                                        <button onClick={() => router.push("/#games")} style={{ fontFamily: game?.theme.fontTitle }} className="text-base lg:text-[22px] xl:text-[25px] tracking-wider uppercase hover:opacity-60 transition">
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
                                    <img src={headerLogoLarge} alt={game?.title ?? "Rhon Studios"} className="block w-auto h-[90px] lg:h-[130px] xl:h-[155px] shrink-0 transition-all duration-500 ease-out scale-90" />
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
                                    <DropdownBtn label={t.game_menu.home} onClick={() => router.push("/#games")} />
                                    {game_menuItems.map((item) => (
                                        <DropdownBtn key={item.id} label={item.label} onClick={() => scrollTo(item.id)} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {isMenuOpen && (
                        <div className="lg:hidden">
                            <MobileMenuOverlay
                                items={game_menuItems}
                                onHome={() => { router.push("/#games"); setIsMenuOpen(false); }}
                                homeLabel={t.game_menu.home}
                            />
                        </div>
                    )}
                </AnimatePresence>
            </header>
        );
    }

    if (isCollabPage) {
        return (
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${isScrolled ? "bg-black/95 backdrop-blur-sm shadow-2xl" : "bg-transparent"}`}>
                <nav className="container mx-auto py-4 lg:py-6 px-4 sm:px-8 lg:px-16 flex items-center justify-between">
                    <button
                        onClick={() => router.push("/#team")}
                        className="flex items-center gap-2 text-white/70 hover:text-white transition"
                        style={{ fontFamily: "Cinzel" }}
                    >
                        <ArrowLeft size={18} />
                        <span className="hidden sm:inline text-sm tracking-wider uppercase">
                        {t.menu.team}
                    </span>
                    </button>

                    <a href="/" className="absolute left-1/2 -translate-x-1/2">
                        <img src="/logos/RhonStudiosCircleLogo.png" alt="Rhon Studios" className="h-11 lg:h-14 w-auto" />
                    </a>

                    <LangSwitcherDesktop />
                </nav>
            </header>
        );
    }

    if (isDevPage) {
        return (
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${isScrolled ? "bg-black/95 backdrop-blur-sm shadow-2xl" : "bg-transparent"}`}>
                <nav className={`container mx-auto transition-all duration-500 ${isScrolled ? "py-2 lg:py-4 px-4 sm:px-8 lg:px-16" : "py-4 lg:py-8 px-4 sm:px-8 lg:px-16"}`}>
                    {isScrolled ? (
                        <>

                            <div className="lg:hidden flex items-center justify-between px-4 py-2">
                                <img src="/logos/RhonStudiosCircleLogo.png" alt="Rhon Studios" className="h-12 w-auto" />
                                <div className="flex items-center gap-3">
                                    <LangSwitcherMobile />
                                    <HamburgerBtn />
                                </div>
                            </div>
                            <ScrolledLogoBar
                                logo="/logos/RhonStudiosCircleLogo.png"
                                logoAlt="Rhon Studios"
                                titleLeft="Rhon"
                                titleRight="Studios"
                                titleFont="Rye"
                            />
                        </>
                    ) : (
                        <>
                            <div className="lg:hidden flex items-center justify-between px-4 py-2">
                                <button
                                    onClick={() => router.push("/")}
                                    className="flex items-center gap-2 text-white"
                                    style={{ fontFamily: "Cinzel" }}
                                >
                                    <ArrowLeft size={20} />
                                </button>
                                <img src="/logos/RhonStudiosCircleLogo.png" alt="Rhon Studios" className="h-12 w-auto" />
                                <div className="flex items-center gap-3">
                                    <LangSwitcherMobile />
                                    <HamburgerBtn />
                                </div>
                            </div>
                            <div className="hidden lg:grid grid-cols-3 items-center">
                                <div className="flex justify-end gap-8 xl:gap-12">
                                    <button
                                        onClick={() => router.push("/#about")}
                                        style={{ fontFamily: "Cinzel" }}
                                        className="text-base lg:text-[22px] xl:text-[25px] tracking-wider uppercase text-white hover:opacity-60 transition"
                                    >
                                        {t.devblog_menu.home}
                                    </button>
                                </div>
                                <div className="flex flex-col items-center justify-center gap-4">
                                    <a href="/">
                                        <img
                                            src="/logos/IconHeader.png"
                                            alt="Rhon Studios"
                                            className="block w-auto h-[90px] lg:h-[110px] shrink-0 transition-all duration-500 ease-out scale-90"
                                        />
                                    </a>
                                    <LangSwitcherDesktop />
                                </div>
                                <div className="flex justify-start gap-8 xl:gap-12">
                                    <button
                                        onClick={() => scrollTo("devblog_index")}
                                        style={{ fontFamily: "Cinzel" }}
                                        className="text-base lg:text-[22px] xl:text-[25px] tracking-wider uppercase text-white hover:opacity-60 transition"
                                    >
                                        {t.devblog_menu.devblogs}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </nav>
                <AnimatePresence>
                    {isScrolled && isMenuOpen && (
                        <div ref={menuRef} className="hidden lg:block overflow-hidden bg-black/98 backdrop-blur-sm border-t-2 border-white/20">
                            <div className="container mx-auto px-4 lg:px-16 py-6 lg:py-8">
                                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-6">
                                    <DropdownBtn label={t.join_menu.home} onClick={() => router.push("/")} />
                                    {devblogItems.map((item) => (
                                        <DropdownBtn key={item.id} label={item.label} onClick={() => scrollTo(item.id)} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {isMenuOpen && (
                        <div className="lg:hidden">
                            <MobileMenuOverlay
                                items={devblogItems}
                                onHome={() => { router.push("/"); setIsMenuOpen(false); }}
                                homeLabel={t.join_menu.home}
                            />
                        </div>
                    )}
                </AnimatePresence>
            </header>
        );
    }

    const DropdownGroupBtn = ({ label, onClick, subs = [],}: {
        label: string;
        onClick: () => void;
        subs?: { id: string; label: string }[];
    }) => (
        <div className="group relative border-2 border-white/30 p-6 text-left hover:border-white hover:bg-white/5 transition-all duration-300">
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/40 group-hover:border-white transition-colors duration-300" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white/40 group-hover:border-white transition-colors duration-300" />

            <button
                onClick={onClick}
                className="text-l tracking-wider uppercase text-white/30 group-hover:text-white/80 mb-1 transition-colors"
                style={{ fontFamily: "Cinzel", fontWeight: 300 }}
            >
                {label}
            </button>

            {subs.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
                    {subs.map((sub, i) => (
                        <span key={sub.id} className="flex items-center">
                        {i > 0 && <span className="text-white/15 mr-2 text-[10px]">·</span>}
                            <button
                                onClick={() => scrollTo(sub.id)}
                                className="text-[11px] tracking-wide uppercase text-white/25 hover:text-white/70 transition-colors"
                                style={{ fontFamily: "Cinzel" }}
                            >
                            {sub.label}
                        </button>
                    </span>
                    ))}
                </div>
            )}
        </div>
    );
    
    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${isScrolled ? "bg-black/95 backdrop-blur-sm shadow-2xl" : "bg-transparent"}`}>
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
                        
                        <ScrolledLogoBar
                            logo="/logos/RhonStudiosCircleLogo.png"
                            logoAlt="Rhon Studios"
                            titleLeft="Rhon"
                            titleRight="Studios"
                            titleFont="Rye"
                        />
                    </>
                ) : (
                    <>
                        <div className={`lg:hidden flex items-center justify-between px-4 py-2 transition-all duration-500 ${isInHero ? "opacity-0 pointer-events-none -translate-y-2" : "opacity-100 pointer-events-auto translate-y-0"}`}>
                            <img src="/logos/RhonStudiosCircleLogo.png" alt="Rhon Studios" className="h-12 w-auto" />
                            <div className="flex items-center gap-3">
                                <LangSwitcherMobile />
                                <HamburgerBtn />
                            </div>
                        </div>
                        <div className="hidden lg:grid grid-cols-3 items-center">
                            <ul className="flex gap-8 xl:gap-12 items-center text-white justify-start">
                                <NavGroup
                                    primary={t.menu.highlight}
                                    onPrimary={() => scrollTo("highlight")}
                                    subs={[
                                    ]}
                                    align="left"
                                    scrollTo={scrollTo}
                                />
                                <NavGroup
                                    primary={t.menu.games}
                                    onPrimary={() => scrollTo("games")}
                                    subs={[
                                        { label: t.menu.ourvision, type: "scroll", id: "ourvision" },
                                        { label: t.menu.devblog, type: "scroll", id: "devblog" },
                                    ]}
                                    align="left"
                                    scrollTo={scrollTo}
                                />
                            </ul>
                            <div className="flex flex-col items-center justify-center -mt-4 gap-4">
                                <img src="/logos/IconHeader.png" alt="Rhon Studios Header" className="block w-auto h-[90px] lg:h-[130px] xl:h-[155px] shrink-0 transition-all duration-500 ease-out scale-90" />
                                <LangSwitcherDesktop />
                            </div>
                            <ul className="flex gap-8 xl:gap-12 items-center text-white justify-end">
                                <NavGroup
                                    primary={t.menu.about}
                                    onPrimary={() => scrollTo("about")}
                                    subs={[
                                        { label: t.menu.team, type: "scroll", id: "team" },
                                        { label: t.menu.community, type: "scroll", id: "community" },
                                    ]}
                                    align="right"
                                    scrollTo={scrollTo}
                                />
                                <NavGroup
                                    primary={t.menu.contact}
                                    onPrimary={() => scrollTo("contact")}
                                    subs={[
                                        { label: t.menu.join, type: "scroll", id: "join" },
                                        { label: t.menu.faq, type: "scroll", id: "faq" },
                                    ]}
                                    align="left"
                                    scrollTo={scrollTo}
                                />
                            </ul>
                        </div>
                    </>
                )}
            </nav>
            <AnimatePresence>
                {isScrolled && isMenuOpen && (
                    <div ref={menuRef} className="hidden lg:block overflow-hidden bg-black/98 backdrop-blur-sm border-t-2 border-white/20">
                        <div className="container mx-auto px-4 lg:px-16 py-6 lg:py-8">
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                                {menuItems.map((item) => (
                                    <DropdownGroupBtn
                                        key={item.id}
                                        label={item.label}
                                        onClick={() => scrollTo(item.id)}
                                        subs={item.subs}
                                    />
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