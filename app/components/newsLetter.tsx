import {useLanguage} from "@/app/language/LanguageProvider";

export function NewsLetter() {
    const { t } = useLanguage();
    return (
        <section
            id="newsLetter"
            className="snap-center scroll-mt-[100px] relative bg-black text-white pb-32 pt-20 overflow-hidden"
        >
            <div className="max-w-6xl mx-auto">
                <div className="mt-11 text-center border-2 border-white/50 p-12">
                    <h3 className="text-3xl mb-4 tracking-wider font-rye">
                        {t.newsLetter.title}
                    </h3>
                    <p
                        className="text-lg text-white/70 tracking-wide mb-8"
                        style={{ fontFamily: "Cinzel" }}
                    >
                        {t.newsLetter.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                        <input
                            type="email"
                            placeholder="rhonstudios@email.com"
                            className="flex-1 bg-transparent border-2 border-white/40 px-10 py-4 focus:border-white focus:outline-none transition-colors tracking-wide"
                            style={{ fontFamily: "Cormorant Garamond", fontWeight: 200 }}
                        />
                        <button
                            className="border-2 border-white/70 px-12 py-4 text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap"
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