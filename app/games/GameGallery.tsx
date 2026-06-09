"use client"
import {useLanguage} from "@/app/language/LanguageProvider";
import {useEffect, useState} from "react";
import { X, ZoomIn, Image as ImageIcon } from "lucide-react";
import type { GameTheme } from "@/app/[id]/page.tsx"

interface GalleryImage {
    url: string;
    title: string;
    category: "screenshot" | "concept-art" | "gameplay" | "characters" | "environment";
}

interface GameGalleryProps {
    images: GalleryImage[];
    gameTitle: string;
    theme: GameTheme;
}

export function GameGallery({ images, gameTitle, theme }: GameGalleryProps) {
    const { t } = useLanguage();
    const categoryLabels = {
        "screenshot": t.gameGallery.screenshot,
        "concept-art": t.gameGallery.conceptArt,
        "gameplay": t.gameGallery.gameplay,
        "characters": t.gameGallery.characters,
        "environment": t.gameGallery.environment
    }
    const [selectedImages, setSelectedImages] = useState<GalleryImage | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [filter, setFilter] = useState<string | "all">("all");

    const categories: Array<"all" | GalleryImage["category"]> = ["all", ...Array.from(new Set(images.map(img => img.category)))];
    const filteredImages = filter === "all"
        ? images
        : images.filter(img => img.category === filter);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") setSelectedImages(null);
        };
        if (selectedImages) {
            window.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            window.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "";
        };
    }, [selectedImages]);

    if (!images || images.length === 0) return null;

    return (
        <section
            id="gallery"
            className={`snap-start relative ${theme.bgColor} ${theme.fontBodyColor} pt-16 sm:pt-32 overflow-hidden py-12 sm:py-16 border-y-2 ${theme.panelBorderOpacity}`}
        >
            <div className="container mx-auto px-4 sm:px-8 lg:px-16 max-w-full">
                <div className="mx-auto">
                    <div className="text-center mb-6 sm:mb-7">
                        <h2
                            className={`text-3xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6 tracking-wider ${theme.fontTitleColor}`}
                            style={{ fontFamily: theme.fontTitle }}
                        >
                            {t.gameGallery.title}
                        </h2>
                        <div className="flex items-center justify-center gap-3 sm:gap-4">
                            <div className={`w-12 sm:w-20 h-[2px] ${theme.accentBg}`}/>
                            <p
                                className={`text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] uppercase ${theme.fontBodyColor}`}
                                style={{ fontFamily: theme.fontBody }}
                            >
                                {t.gameGallery.subtitle}
                            </p>
                            <div className={`w-12 sm:w-20 h-[2px] ${theme.accentBg}`}/>
                        </div>
                        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-2">
                            <div className={`w-16 sm:w-24 h-[2px] ${theme.accentBg}`}/>
                            <ImageIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${theme.accentText}`} />
                            <div className={`w-16 sm:w-24 h-[2px] ${theme.accentBg}`}/>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-16 px-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`border-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all duration-300 
                                    ${filter === category
                                    ? `${theme.accentBorder} ${theme.accentBg} ${theme.accentHoverText}`
                                    : `${theme.panelBorderOpacity} ${theme.panelBorderHover} ${theme.fontBodyColor}`
                                }
                                `}
                                style={{ fontFamily: theme.fontBody }}
                            >
                                {category === "all" ? t.gameGallery.all : categoryLabels[category]}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                        {filteredImages.map((image, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => setSelectedImages(image)}
                                className={`relative aspect-video overflow-hidden border-2 ${theme.cardBorderOpacity} cursor-pointer group bg-black`}
                            >
                                <img
                                    src={image.url}
                                    alt={image.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className={`absolute top-3 left-3 sm:top-4 sm:left-4 border ${theme.panelBorderOpacity} bg-black/80 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1`}>
                                    <span
                                        className={`text-[9px] sm:text-xs tracking-wider uppercase ${theme.textMuted}`}
                                        style={{ fontFamily: theme.fontBody }}
                                    >
                                        {categoryLabels[image.category]}
                                    </span>
                                </div>
                                <div
                                    className={`
                                        absolute inset-0 bg-black/80 
                                        transition-opacity duration-500
                                        flex flex-col items-center justify-center gap-3 sm:gap-4
                                        ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}
                                    `}
                                >
                                    <ZoomIn className={`w-8 h-8 sm:w-12 sm:h-12 ${theme.textMuted}`} />
                                    <h3
                                        className={`text-base sm:text-xl tracking-wider text-center px-4 ${theme.fontBodyColor}`}
                                        style={{ fontFamily: theme.fontBody }}
                                    >
                                        {image.title}
                                    </h3>
                                </div>
                                <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-r-2 ${theme.cardBorderOpacity} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                                <div className={`absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-l-2 ${theme.cardBorderOpacity} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedImages && (
                <div
                    onClick={() => setSelectedImages(null)}
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-3 sm:p-4 lg:p-20"
                >
                    <button
                        onClick={() => setSelectedImages(null)}
                        className={`absolute top-3 right-3 sm:top-8 sm:right-8 ${theme.fontBodyColor} ${theme.textMuted} transition-colors z-10 border-2 ${theme.panelBorderOpacity} p-1.5 sm:p-2 hover:${theme.accentBorder}`}
                    >
                        <X className="w-5 h-5 sm:w-8 sm:h-8"/>
                    </button>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-7xl w-full px-2 sm:px-4 lg:px-20"
                    >
                        <div className={`relative border-2 ${theme.panelBorderOpacity} overflow-hidden bg-black`}>
                            <img
                                src={selectedImages.url}
                                alt={selectedImages.title}
                                className="w-full h-auto object-contain max-h-[70vh] sm:max-h-none"
                            />
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-transparent to-black/70"></div>
                            <div className={`absolute top-3 left-3 sm:top-4 sm:left-4 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-l-2 ${theme.textSubtle}`}></div>
                            <div className={`absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-r-2 ${theme.textSubtle}`}></div>
                        </div>
                        <div className="mt-3 sm:mt-6 text-center">
                            <div className={`inline-block border ${theme.panelBorderOpacity} px-3 sm:px-4 py-1 mb-2 sm:mb-4`}>
                                <span
                                    className={`text-[9px] sm:text-xs tracking-wider uppercase ${theme.textMuted}`}
                                    style={{ fontFamily: theme.fontBody }}
                                >
                                    {categoryLabels[selectedImages.category]}
                                </span>
                            </div>
                            <h3
                                className={`text-lg sm:text-2xl lg:text-3xl mb-1 sm:mb-2 tracking-wider ${theme.fontTitleColor}`}
                                style={{ fontFamily: theme.fontTitle }}
                            >
                                {selectedImages.title}
                            </h3>
                            <p
                                className={`text-xs sm:text-sm tracking-wider ${theme.textMuted}`}
                                style={{ fontFamily: theme.fontBody }}
                            >
                                {gameTitle}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}