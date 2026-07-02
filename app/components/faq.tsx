import {useLanguage} from "@/app/language/LanguageProvider";

export function FAQ() {
    const {t} = useLanguage();
    const tt = t.team

    return (
        <section
            id="faq"
            className="scroll-mt-[5px] relative bg-black text-white pt-16 sm:pt-32 overflow-hidden"
            style={{minHeight: '20vh'}}
        >
            <div className="container mx-auto px-4 sm:p-8 lg:px-16">
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
                    </div>
                </div>
            </div>
        </section>
    )
}