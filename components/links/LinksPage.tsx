"use client"

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import {useLanguage} from "@/libs/utils/LanguageProvider";
import { SOCIALS, SOCIAL_VARIANT_STYLES } from "@/libs/database/socialsData";

export default function LinksPage() {
    const { t } = useLanguage();
    const tt = t.links
    
    const LINKS = [
        { ...SOCIALS.discord },
        { ...SOCIALS.coffee, name: tt.links.coffee },
        { ...SOCIALS.twitter },
        { ...SOCIALS.instagram },
        { ...SOCIALS.youtube },
        { ...SOCIALS.linkedin },
        { ...SOCIALS.games, name: tt.links.games },
        { ...SOCIALS.join, name: tt.links.opps },
        { ...SOCIALS.devblog },
        { ...SOCIALS.mail, name: tt.links.contact },
        { ...SOCIALS.web, name: tt.links.web },
    ];

    return (
        <div className="bg-black text-white min-h-screen flex flex-col items-center justify-start px-5 pt-14 pb-10">
            <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8"
            >
                <a href="https://rhonstudios.com">
                    <img
                        src="/logos/RhonStudiosCircleLogo.png"
                        alt="Rhon Studios"
                        className="w-16 h-16 mx-auto mb-3 opacity-90"
                    />
                </a>
                <h1
                    className="text-2xl tracking-widest mb-1"
                    style={{ fontFamily: "Rye", fontWeight: 200 }}
                >
                    Rhon Studios
                </h1>
                <p
                    className="text-[11px] tracking-[0.2em] uppercase text-white/45"
                    style={{ fontFamily: "Cinzel", fontWeight: 300 }}
                >
                    {tt.subtitle}
                </p>
            </motion.div>

            <div className="w-full max-w-sm space-y-2">
                {LINKS.map((item, i) => {
                    const Icon = item.icon;
                    const styles = SOCIAL_VARIANT_STYLES[item.variant];
                    return (
                        <motion.a
                            key={item.id}
                            href={item.url}
                            target={item.url.startsWith("http") ? "_blank" : undefined}
                            rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: 0.05 + i * 0.04 }}
                            whileHover={{ x: 3 }}
                            className={`group flex items-center gap-3 border px-4 py-3 transition-all duration-200 ${styles.container}`}
                        >
                            <Icon className={`w-4 h-4 shrink-0 transition-colors ${styles.icon}`} />
                            <p
                                className="flex-1 text-sm tracking-wide text-white/85"
                                style={{ fontFamily: "Cinzel", fontWeight: 400 }}
                            >
                                {item.name}
                            </p>
                            <ExternalLink className="w-3 h-3 text-white/25 group-hover:text-white/60 transition-colors shrink-0" />
                        </motion.a>
                    );
                })}
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-[10px] text-white/25 tracking-widest mt-10"
                style={{ fontFamily: "Cinzel" }}
            >
                © {new Date().getFullYear()} Rhon Studios
            </motion.p>
        </div>
    );
}