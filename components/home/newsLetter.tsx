import {useLanguage} from "@/libs/utils/LanguageProvider";

export function NewsLetter() {
    const { t } = useLanguage();
    return (
        <section
            id="newsLetter"
            className="scroll-mt-[100px] relative bg-black text-white pb-16 sm:pb-32 pt-12 sm:pt-20 overflow-hidden"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-8">
                <div className="mt-8 sm:mt-11 text-center border-2 border-white/50 p-6 sm:p-12">
                    <h3
                        className="text-2xl sm:text-3xl mb-3 sm:mb-4 tracking-wider font-rye"
                        style={{ fontFamily: "Rye"}}
                    >
                        {t.newsLetter.title}
                    </h3>
                    <p
                        className="text-sm sm:text-lg text-white/70 tracking-wide mb-6 sm:mb-8"
                        style={{ fontFamily: "Cinzel" }}
                    >
                        {t.newsLetter.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-2xl mx-auto">
                        <input
                            type="email"
                            placeholder="rhonstudios@email.com"
                            className="flex-1 bg-transparent border-2 border-white/40 px-4 sm:px-10 py-3 sm:py-4 focus:border-white focus:outline-none transition-colors tracking-wide text-sm sm:text-base"
                            style={{ fontFamily: "Cormorant_Garamond", fontWeight: 200 }}
                        />
                        <button
                            className="border-2 border-white/70 px-8 sm:px-12 py-3 sm:py-4 text-xs sm:text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap"
                            style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                        >
                            {t.newsLetter.subscribe}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}