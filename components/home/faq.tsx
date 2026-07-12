"use client"

import {useLanguage} from "@/libs/utils/LanguageProvider";
import {AnimatePresence, motion} from "framer-motion";
import {Minus, Plus} from "lucide-react";
import {useState} from "react";

export function FAQ() {
    const {t} = useLanguage();
    const tt = t.faq_section

    type FAQItem = {
        question: string;
        answer: string;
    };

    const items: FAQItem[] = t.faq.studio_faq;

    const [open, setOpen] = useState<number | null>(null);

    return (
        <section
            id="faq"
            className="scroll-mt-[5px] relative bg-black text-white overflow-hidden"
            style={{minHeight: '20vh'}}
        >
            <div className="container mx-auto px-4 sm:p-8 lg:px-16 mb-10">
                <div className="max-w-3xl mx-auto">
                    <div className="border-t-2 border-white/20 pt-10 sm:pt-12">
                        <div className="text-center mb-6 sm:mb-8">
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
                            <p
                                className="text-sm sm:text-base lg:text-lg tracking-wide text-white/70 max-w-2xl mx-auto"
                                style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                            >
                                {tt.subtitle}
                            </p>
                        </div>
                        <div className="space-y-3">
                            {items.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                    viewport={{ once: true }}
                                    className={`border transition-all duration-300 ${
                                        open === i ? "border-white/60" : "border-white/25 hover:border-white/45"
                                    }`}
                                >
                                    <button
                                        onClick={() => setOpen(open === i ? null : i)}
                                        className="w-full flex items-center justify-between gap-6 px-8 py-6 text-left"
                                    >
                                    <span
                                        className="text-base tracking-wide"
                                        style={{ fontFamily: "Cinzel", fontWeight: open === i ? 400 : 300 }}
                                    >
                                        {item.question}
                                    </span>
                                        {open === i ? (
                                            <Minus className="w-4 h-4 shrink-0 text-white/60" />
                                        ) : (
                                            <Plus className="w-4 h-4 shrink-0 text-white/40" />
                                        )}
                                    </button>
                                    <AnimatePresence>
                                        {open === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-8 pb-6 border-t border-white/15 pt-4">
                                                    <p
                                                        className="text-white/65 leading-relaxed"
                                                        style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                                                    >
                                                        {item.answer}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}