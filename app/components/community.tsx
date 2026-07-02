import {useLanguage} from "@/app/language/LanguageProvider";
import {ArrowRight, Instagram, LucideIcon, MessageSquare, Twitter, Youtube} from "lucide-react";
import { motion } from "framer-motion";

type SocialId = "discord" | "twitter" | "instagram" | "youtube";

const socials: {
    id: SocialId;
    icon: LucideIcon;
    name: string;
    handle: string;
    url: string;
    highlight?: boolean;
}[] = [
    {
        id: "discord",
        icon: MessageSquare,
        name: "Discord",
        handle: "Rhon Studios",
        url: "https://discord.gg/7T8n8VYRkw",
        highlight: true,
    },
    {
        id: "twitter",
        icon: Twitter,
        name: "Twitter / X",
        handle: "@RhonStudios",
        url: "https://x.com/RhonStudios",
        highlight: false,
    },
    {
        id: "instagram",
        icon: Instagram,
        name: "Instagram",
        handle: "@rhonstudios",
        url: "https://www.instagram.com/rhonstudios/",
        highlight: false,
    },
    {
        id: "youtube",
        icon: Youtube,
        name: "YouTube",
        handle: "Rhon Studios",
        url: "https://www.youtube.com/@RhonStudios",
        highlight: false,
    },
]

export function Community() {
    const {t} = useLanguage();
    const tt = t.community
    
    return (
        <section
            id="community"
            className="scroll-mt-[5px] relative bg-black text-white pt-16 sm:pt-32 overflow-hidden"
            style={{minHeight: '20vh'}}
        >
            <div className="container mx-auto px-4 sm:p-8 lg:px-16">
                <div className="max-w-6xl mx-auto">
                    <div className="border-t-2 border-white/20 pt-12 sm:pt-20"/>
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
                        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                            <div className="w-12 sm:w-24 h-[2px] bg-white"></div>
                            <p
                                className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase"
                                style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                            >
                                {tt.subtitle}
                            </p>
                            <div className="w-12 sm:w-24 h-[2px] bg-white"></div>
                        </div>
                        <p
                            className="text-sm sm:text-base lg:text-lg max-w-3xl mx-auto text-white/70 leading-relaxed tracking-wide"
                            style={{ fontFamily: "Cinzel"}}
                        >
                            {tt.description}
                        </p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="border-2 border-white p-10 mb-8 flex flex-col md:flex-row items-center gap-8 hover:bg-white/[0.02] transition-all duration-300 group"
                    >
                        <div className="w-20 h-20 border-2 border-white flex items-center justify-center group-hover:bg-white/5 transition-all duration-300">
                            <MessageSquare className="w-9 h-9 text-white/70" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-2" style={{ fontFamily: "Cinzel" }}>
                                {tt.discord.title}
                            </p>
                            <h3 className="text-3xl tracking-wide mb-2" style={{ fontFamily: "Cinzel", fontWeight: 400 }}>
                                Discord
                            </h3>
                            <p className="text-white/60 leading-relaxed" style={{ fontFamily: "Cinzel", fontWeight: 200 }}>
                                {tt.discord.description}
                            </p>
                        </div>
                        <a
                            href="https://discord.gg/7T8n8VYRkw"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 inline-flex items-center gap-3 border-2 border-white px-8 py-4 text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300"
                        >
                            {tt.discord.button}
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-4">
                        {socials.filter((s) => !s.highlight).map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <motion.a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="border border-white/25 p-6 hover:border-white/60 hover:bg-white/[0.02] transition-all duration-300 group block"
                                >
                                    <Icon className="w-6 h-6 text-white/45 mb-4 group-hover:text-white/70 transition-colors" />
                                    <h4
                                        className="text-lg tracking-wide mb-1"
                                        style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                                    >
                                        {social.name}
                                    </h4>
                                    <p
                                        className="text-xs tracking-widest text-white/35 mb-3"
                                        style={{ fontFamily: "Cinzel" }}
                                    >
                                        {social.handle}
                                    </p>
                                    <p
                                        className="text-sm text-white/50 leading-relaxed mb-4"
                                        style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                                    >
                                        {tt.socials[social.id].text}
                                    </p>
                                    <span
                                        className="text-xs tracking-[0.2em] uppercase text-white/40 group-hover:text-white/70 transition-colors"
                                        style={{ fontFamily: "Cinzel" }}
                                    >
                                        {tt.socials[social.id].cta} →
                                    </span>
                                </motion.a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}