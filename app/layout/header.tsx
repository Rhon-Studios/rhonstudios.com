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
    const router = useRouter();
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { language, setLanguage, t } = useLanguage();
    const menuRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () =>  window.removeEventListener("scroll", handleScroll);
    }, []);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        if(isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
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
            { id: "home_game", label: game.id},
            { id: "vision", label: t.game_menu.vision },
            { id: "roadmap", label: t.game_menu.roadmap },
            { id: "investment", label: t.game_menu.investment },
            { id: "gallery", label: t.game_menu.gallery },
            { id: "contact", label: t.game_menu.contact }
        ]
        : menuItems;

    if (isIdPage) {
        return (
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
                    isScrolled
                        ? "bg-black/95 backdrop-blur-sm shadow-2x1"
                        : "bg-transparent"
                }`}
            >
                <div className="absolute bottom-0 left-o right-0 g-[2px] bg-white"></div>
                <nav
                    className={`container mx-auto transition-all duration-500 ${
                        isScrolled
                            ? "py-2 lg:py-6"
                            : "py-6 lg:py-10"
                    }`}
                >
                    {isScrolled ? (
                        <nav className="container mx-auto py-4 flex items-center justify-between relative">
                            <div className="flex items-center">
                                <div className="relative flex items-center border-2 border-white rounded-sm overflow-hidden">
                                    <button
                                        onClick={() => setLanguage("en")}
                                        className="relative font-cinzel flex-1 px-4 py-2 tracking-widest uppercase hover:bg-white/10 transition-all duration-300"
                                    >
                                        <p className="text-white text-center text-sm">
                                            EN
                                        </p>
                                        <span
                                            className={`absolute left-1/2 -translate-x-1/2 bottom-1 h-[2px] bg-white transition-all duration-300 ${
                                                language === "en" ? "w-8" : "w-0"
                                            }`}
                                        />
                                    </button>
                                    <div className="w-px h-6 bg-white/40" />
                                    <button
                                        onClick={() => setLanguage("es")}
                                        className="relative font-cinzel flex-1 px-4 py-2 tracking-widest uppercase hover:bg-white/10 transition-all duration-300"
                                    >
                                        <p className="text-white text-center text-sm">
                                            ES
                                        </p>
                                        <span
                                            className={`absolute left-1/2 -translate-x-1/2 bottom-1 h-[2px] bg-white transition-all duration-300 ${
                                                language === "es" ? "w-8" : "w-0"
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 absolute left-1/3 transform -translate-x-full">
                                <h1
                                    className="text-white font-rye text-4xl lg:text-5xl tracking-widest opacity-0 animate-fadeInLeft"
                                    style={{ textShadow: "0 4px 20px rgba(255,255,255,0.15)" }}
                                >
                                    Rhon
                                </h1>
                            </div>
                            <div className="absolute left-1/2 transform -translate-x-1/2">
                                <a href="#">
                                    <img
                                        src="/logos/RhonStudiosCircleLogo.png"
                                        alt="Rhon Studios Header"
                                        className="h-[90px] transition-all duration-500 ease-out scale-90 opacity-0 animate-logoPop"
                                    />
                                </a>
                            </div>
                            <div className="flex items-center gap-4 absolute right-1/3 transform translate-x-full">
                                <h1 className="text-white text-4xl lg:text-5xl font-rye tracking-widest opacity-0 animate-fadeInRight">
                                    Studios
                                </h1>
                            </div>
                            <div 
                                className="flex items-center gap-6 ml-auto"
                            >
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="relative w-10 h-10 border-2 border-white rounded-sm flex flex-col items-center justify-center gap-1.5 hover:bg-white/10 transition-all duration-300 opacity-0 animate-fadeInLeft"
                                    style={{ animationDelay: "0.1s" }}
                                    aria-label="Toggle menu"
                                >
                                    <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                                    <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                                    <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                                </button>
                            </div>
                        </nav>
                    ) : (
                        <div className="grid grid-cols-3 items-center">
                            <>
                                <ul className="flex gap-12 items-center text-white justify-start">
                                    <li className=" text-center">
                                        <button
                                            onClick={() => router.push(`/#games`)}
                                            className="text-sm tracking-wider uppercase hover:opacity-60 transition"
                                            style={{ fontFamily: "Cinzel", fontSize: 25 }}
                                        >
                                            {t.game_menu.home}
                                        </button>
                                    </li>
                                    <li className="text-center">
                                        <button
                                            onClick={() => scrollTo("vision")}
                                            className="text-sm tracking-wider uppercase hover:opacity-60 transition"
                                            style={{ fontFamily: "Cinzel", fontSize: 25 }}
                                        >
                                            {t.game_menu.vision}
                                        </button>
                                    </li>
                                    <li className="text-center">
                                        <button
                                            onClick={() => scrollTo("roadmap")}
                                            className="text-sm tracking-wider uppercase hover:opacity-60 transition"
                                            style={{ fontFamily: "Cinzel", fontSize: 25 }}
                                        >
                                            {t.game_menu.roadmap}
                                        </button>
                                    </li>
                                </ul>
                                <div className="flex flex-col items-center justify-center -mt-4 gap-6">
                                    <img
                                        src="/logos/IconHeader.png"
                                        alt="Rhon Studios Header"
                                        className="block w-auto h-[155] mx-6 shrink-0 transition-all duration-500 ease-out scale-90 "
                                    />
                                    <div className="flex items-center">
                                        <div className="relative flex items-center overflow-hidden">

                                            <button
                                                onClick={() => setLanguage("en")}
                                                className="relative flex-1 px-4 py-2 tracking-widest uppercase hover:bg-white/10 transition-all duration-300"
                                                style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                                            >
                                                <p className="text-white text-center text-sm">
                                                    EN
                                                </p>
                                                <span
                                                    className={`absolute left-1/2 -translate-x-1/2 bottom-1 h-[2px] bg-white transition-all duration-300 ${
                                                        language === "en" ? "w-8" : "w-0"
                                                    }`}
                                                />
                                            </button>
                                            <div className="w-px h-6 bg-white/40" />
                                            <button
                                                onClick={() => setLanguage("es")}
                                                className="relative flex-1 px-4 py-2 tracking-widest uppercase hover:bg-white/10 transition-all duration-300"
                                                style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                                            >
                                                <p className="text-white text-center text-sm">
                                                    ES
                                                </p>
                                                <span
                                                    className={`absolute left-1/2 -translate-x-1/2 bottom-1 h-[2px] bg-white transition-all duration-300 ${
                                                        language === "es" ? "w-8" : "w-0"
                                                    }`}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <ul
                                    className="flex gap-5 items-center text-white justify-end"
                                >
                                    <li className="text-center">
                                        <button
                                            onClick={() => scrollTo("investment")}
                                            className="text-sm tracking-wider uppercase hover:opacity-60 transition"
                                            style={{ fontFamily: "Cinzel", fontSize: 25 }}
                                        >
                                            {t.game_menu.investment}
                                        </button>
                                    </li>
                                    <li className="text-center">
                                        <button
                                            onClick={() => scrollTo("gallery")}
                                            className="text-sm tracking-wider uppercase hover:opacity-60 transition"
                                            style={{ fontFamily: "Cinzel", fontSize: 25 }}
                                        >
                                            {t.game_menu.gallery}
                                        </button>
                                    </li>
                                    <li className="text-center">
                                        <button
                                            onClick={() => scrollTo("contact")}
                                            className="text-sm tracking-wider uppercase hover:opacity-60 transition"
                                            style={{ fontFamily: "Cinzel", fontSize: 25 }}
                                        >
                                            {t.game_menu.contact}
                                        </button>
                                    </li>
                                </ul>
                            </>
                        </div>
                    )}
                </nav>
                <AnimatePresence>
                    {isScrolled && isMenuOpen && (
                        <div
                            ref={menuRef}
                            className="overflow-hidden bg-black/98 backdrop-blur-sm border-t-2 border-white/20"
                        >
                            <div className="container mx-auto px-8 lg:px-16 py-8">
                                <div className="grid md:grid-cols-2 lg:grid-cols-7 gap-6">
                                    <button
                                        onClick={() => router.push("/#games")}
                                        className="group relative border-2 border-white/30 p-6 text-left hover:border-white hover:bg-white/5 transition-all duration-300"
                                    >
                                        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/40 group-hover:border-white transition-colors duration-300"/>
                                        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white/40 group-hover:border-white transition-colors duration-300"/>
                                        <div className="flex items-center justify-center gap-4">
                                            <div>
                                                <h3
                                                    className="text-l tracking-wider uppercase text-white/30 group-hover:text-white/80 mb-1 transition-colors"
                                                    style={{ fontFamily: "Cinzel", fontWeight: 300}}
                                                >
                                                    {t.game_menu.home}
                                                </h3>
                                                <div className="2-12 h-[2px] bg-white/30 group-hover:w-full group-hover:bg-white transition-all duration-500"/>
                                            </div>
                                        </div>
                                    </button>
                                    {game_menuItems.map((item, index) => (
                                        <button
                                            key={item.id}
                                            onClick={() => scrollTo(item.id)}
                                            className="group relative border-2 border-white/30 p-6 text-left hover:border-white hover:bg-white/5 transition-all duration-300"
                                        >
                                            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/40 group-hover:border-white transition-colors duration-300"/>
                                            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white/40 group-hover:border-white transition-colors duration-300"/>
                                            <div className="flex items-center justify-center gap-4">
                                                <div>
                                                    <h3
                                                        className="text-l tracking-wider uppercase text-white/30 group-hover:text-white/80 mb-1 transition-colors"
                                                        style={{ fontFamily: "Cinzel", fontWeight: 300}}
                                                    >
                                                        {item.label}
                                                    </h3>
                                                    <div className="2-12 h-[2px] bg-white/30 group-hover:w-full group-hover:bg-white transition-all duration-500"/>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </header>
        )
    }
    
    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
                isScrolled
                    ? "bg-black/95 backdrop-blur-sm shadow-2x1"
                    : "bg-transparent"
            }`}
        >
            <div className="absolute bottom-0 left-o right-0 g-[2px] bg-white"></div>
            <nav
                className={`container mx-auto transition-all duration-500 ${
                    isScrolled 
                        ? "py-2 lg:py-6" 
                        : "py-6 lg:py-10 px-8 lg:px-16"
                }`}
            >
                    {isScrolled ? (
                        <nav className="container mx-auto py-4 flex items-center justify-between relative">
                            <div className="flex items-center">
                                <div className="relative flex items-center border-2 border-white rounded-sm overflow-hidden">

                                    <button
                                        onClick={() => setLanguage("en")}
                                        className="relative flex-1 px-4 py-2 tracking-widest uppercase hover:bg-white/10 transition-all duration-300"
                                        style={{ fontFamily: "Cinzel" }}
                                    >
                                        <p className="text-white text-center text-sm">
                                            EN
                                        </p>
                                        <span
                                            className={`absolute left-1/2 -translate-x-1/2 bottom-1 h-[2px] bg-white transition-all duration-300 ${
                                                language === "en" ? "w-8" : "w-0"
                                            }`}
                                        />
                                    </button>
                                    <div className="w-px h-6 bg-white/40" />
                                    <button
                                        onClick={() => setLanguage("es")}
                                        className="relative flex-1 px-4 py-2 tracking-widest uppercase hover:bg-white/10 transition-all duration-300"
                                        style={{ fontFamily: "Cinzel" }}
                                    >
                                        <p className="text-white text-center text-sm">
                                            ES
                                        </p>
                                        <span
                                            className={`absolute left-1/2 -translate-x-1/2 bottom-1 h-[2px] bg-white transition-all duration-300 ${
                                                language === "es" ? "w-8" : "w-0"
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 absolute left-1/3 transform -translate-x-full">
                                <h1
                                    className="text-white text-4xl lg:text-5xl tracking-widest opacity-0 animate-fadeInLeft"
                                    style={{ fontFamily: "Rye", textShadow: "0 4px 20px rgba(255,255,255,0.15)" }}
                                >
                                    Rhon
                                </h1>
                            </div>
                            <div className="absolute left-1/2 transform -translate-x-1/2">
                                <a href="#">
                                    <img
                                        src="/logos/RhonStudiosCircleLogo.png"
                                        alt="Rhon Studios Header"
                                        className="h-[90px] transition-all duration-500 ease-out scale-90 opacity-0 animate-logoPop"
                                    />
                                </a>
                            </div>
                            <div className="flex items-center gap-4 absolute right-1/3 transform translate-x-full">
                                <h1
                                    className="text-white text-4xl lg:text-5xl tracking-widest opacity-0 animate-fadeInRight"
                                    style={{ fontFamily: "Rye" }}
                                >
                                    Studios
                                </h1>
                            </div>
                            <div className="flex items-center gap-6 ml-auto">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="relative w-10 h-10 border-2 border-white rounded-sm flex flex-col items-center justify-center gap-1.5 hover:bg-white/10 transition-all duration-300 opacity-0 animate-fadeInLeft"
                                    style={{ animationDelay: "0.1s" }}
                                    aria-label="Toggle menu"
                                >
                                    <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                                    <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                                    <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                                </button>
                            </div>
                        </nav>
                    ) : (
                        <div className="grid grid-cols-3 items-center">
                            <>
                                <ul className="flex gap-12 items-center text-white justify-start">
                                    <li>    
                                        <button
                                            onClick={() => scrollTo("highlight")}
                                            className="text-sm tracking-wider uppercase hover:opacity-60 transition"
                                            style={{ fontFamily: "Cinzel", fontSize: 25 }}
                                        >
                                            {t.menu.highlight}
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => scrollTo("games")}
                                            className="text-sm tracking-wider uppercase hover:opacity-60 transition"
                                            style={{ fontFamily: "Cinzel", fontSize: 25 }}
                                        >
                                            {t.menu.games}
                                        </button>
                                    </li>
                                </ul>
                                <div className="flex flex-col items-center justify-center -mt-4 gap-6">
                                    <img
                                        src="/logos/IconHeader.png"
                                        alt="Rhon Studios Header"
                                        className="block w-auto h-[155] mx-6 shrink-0 transition-all duration-500 ease-out scale-90 "
                                    />
                                    <div className="flex items-center">
                                        <div className="relative flex items-center overflow-hidden">

                                            <button
                                                onClick={() => setLanguage("en")}
                                                className="relative flex-1 px-4 py-2 tracking-widest uppercase hover:bg-white/10 transition-all duration-300"
                                                style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                                            >
                                                <p className="text-white text-center text-sm">
                                                    EN
                                                </p>
                                                <span
                                                    className={`absolute left-1/2 -translate-x-1/2 bottom-1 h-[2px] bg-white transition-all duration-300 ${
                                                        language === "en" ? "w-8" : "w-0"
                                                    }`}
                                                />
                                            </button>
                                            <div className="w-px h-6 bg-white/40" />
                                            <button
                                                onClick={() => setLanguage("es")}
                                                className="relative flex-1 px-4 py-2 tracking-widest uppercase hover:bg-white/10 transition-all duration-300"
                                                style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                                            >
                                                <p className="text-white text-center text-sm">
                                                    ES
                                                </p>
                                                <span
                                                    className={`absolute left-1/2 -translate-x-1/2 bottom-1 h-[2px] bg-white transition-all duration-300 ${
                                                        language === "es" ? "w-8" : "w-0"
                                                    }`}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <ul
                                    className="flex gap-12 items-center text-white justify-end"
                                >
                                    <li>
                                        <button
                                            onClick={() => scrollTo("about")}
                                            className="text-sm tracking-wider uppercase hover:opacity-60 transition"
                                            style={{ fontFamily: "Cinzel", fontSize: 25 }}
                                        >
                                            {t.menu.about}
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => scrollTo("contact")}
                                            className="text-sm tracking-wider uppercase hover:opacity-60 transition"
                                            style={{ fontFamily: "Cinzel", fontSize: 25 }}
                                        >
                                            {t.menu.contact}
                                        </button>
                                    </li>
                                </ul>
                            </>
                        </div>
                    )}
            </nav>
            <AnimatePresence>
                {isScrolled && isMenuOpen && (
                    <div
                        ref={menuRef}
                        className="overflow-hidden bg-black/98 backdrop-blur-sm border-t-2 border-white/20"
                    >
                      <div className="container mx-auto px-8 lg:px-16 py-8">
                          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                              {menuItems.map((item, index) => (
                                  <button
                                      key={item.id}
                                      onClick={() => scrollTo(item.id)}
                                      className="group relative border-2 border-white/30 p-6 text-left hover:border-white hover:bg-white/5 transition-all duration-300"
                                  >
                                      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/40 group-hover:border-white transition-colors duration-300"/>
                                      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white/40 group-hover:border-white transition-colors duration-300"/>
                                      <div className="flex items-center justify-center gap-4">
                                          <div>
                                              <h3
                                                  className="text-xl tracking-wider uppercase text-white/30 group-hover:text-white/80 mb-1 transition-colors"
                                                  style={{ fontFamily: "Cinzel", fontWeight: 300}}
                                              >
                                                  {item.label}
                                              </h3>
                                              <div className="2-12 h-[2px] bg-white/30 group-hover:w-full group-hover:bg-white transition-all duration-500"/>
                                          </div>
                                      </div>
                                  </button>
                              ))}
                          </div>
                      </div>  
                    </div>
                )}
            </AnimatePresence>
        </header>
    )
}