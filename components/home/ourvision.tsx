import {useLanguage} from "@/libs/utils/LanguageProvider";

type Box = {
    id: number,
    num: string,
    text: string,
};
export function OurVision() {
    const { t } = useLanguage();
    const boxes: Box[] = Array.isArray(t.ourvision?.boxes) ? t.ourvision.boxes : [];
    return (
        <section
            id="outvision"
            className="scroll-mt-[170px] relative bg-black text-white pb-16 sm:pb-32 overflow-hidden"
            style={{ minHeight: '100vh' }}
        >
            <div className="container mx-auto px-6 sm:px-8 lg:px-16">
                <div className="max-w-3xl mx-auto">
                    <div className="border-t-2 border-white/20 pt-12 sm:pt-20"/>
                    <div className="text-center mb-10 sm:mb-16">
                        <div className="inline-block border-2 border-white px-6 sm:px-10 py-2 sm:py-3 mb-6 sm:mb-8">
                            <p
                                className="text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase"
                                style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                            >
                                {t.ourvision.top_title}
                            </p>
                        </div>
                        <h3
                            className="text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 tracking-wider"
                            style={{ fontFamily: "Rye" }}
                        >
                            {t.ourvision.title}
                        </h3>
                        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                            <div className="w-12 sm:w-24 h-[2px] bg-white"></div>
                            <p
                                className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase"
                                style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                            >
                                {t.ourvision.subtitle}
                            </p>
                            <div className="w-12 sm:w-24 h-[2px] bg-white"></div>
                        </div>
                        <p
                            className="text-sm sm:text-base lg:text-lg max-w-3xl mx-auto text-white/70 leading-relaxed tracking-wide"
                            style={{ fontFamily: "Cinzel"}}
                        >
                            {t.ourvision.description.p1}
                            <br/>
                            {t.ourvision.description.p2} <strong>{t.ourvision.description.p3}</strong>
                        </p>
                    </div>
                </div>
                <div className="mx-auto border-2 border-white p-6 sm:p-12 text-center">
                    <h3
                        className="text-xl sm:text-2xl lg:text-3xl mb-4 sm:mb-6 tracking-wide"
                        style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                    >
                        {t.ourvision.commitment}
                    </h3>
                    <p
                        className="text-sm sm:text-base lg:text-lg leading-relaxed tracking-wide text-white/80 mb-6"
                        style={{ fontFamily: "Cinzel" }}
                    >
                        {t.ourvision.com_description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-10">
                        {boxes.map((box) => (
                            <div key={box.id} className="border-l-2 border-white/30 pl-4 sm:pl-6 text-left">
                                <div className="text-3xl sm:text-4xl mb-2 tracking-wide" style={{ fontFamily: "Rye" }}>
                                    {box.num}
                                </div>
                                <p className="text-xs sm:text-sm tracking-wider text-white/60" style={{ fontFamily: "Cinzel" }}>
                                    {box.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}