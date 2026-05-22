import {Github, Linkedin, Mail, Twitter} from "lucide-react";
import {useLanguage} from "@/app/language/LanguageProvider";

type Team = {
    id: number;
    name: string;
    img: string;
    role: string;
    bioShort: string;
    bio: string;
    linkedin: string;
    github: string;
    twitter: string;
    email: string;
};
export function Team() {
    const { t } = useLanguage();
    const teams: Team[] = t.team.team;
    return (
        <section
            id="team"
            className="snap-center scroll-mt-[200px] relative bg-black text-white pb-32"
            style={{
                minHeight: '20vh',
            }}
        >
            <div className="container mx-auto p-4 md:p-8 lg:px-16">
                <div className="max-w-3xl mx-auto">
                    <div className="border-t-2 border-white/20 pt-12">
                        <div className="text-center mb-8">
                            <div className="inline-block border-2 border-white px-10 py-3 mb-8">
                                <p
                                    className="text-xs tracking-[0.3em] uppercase"
                                    style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                                >
                                    {t.team.top_title}
                                </p>
                            </div>
                            <h3
                                className="text-5xl lg:text-5xl mb-6 tracking-wider"
                                style={{ fontFamily: "Rye" }}
                            >
                                {t.team.title}
                            </h3>
                            <p
                                className="text-lg tracking-wide text-white/70 max-w-2xl mx-auto"
                                style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                            >
                                {t.team.subtitle}
                            </p>
                        </div>
                        <div className="group justify-center items-center flex flex-row flex-wrap">
                            <div className="flex flex-row flex-wrap justify-center gap-20">
                                {teams.map((team, index) => (
                                    <div
                                        key={team.id}
                                        className={`relative border-2 border-white/60 p-6 hover:border-white transition-all duration-300 flex flex-col h-[500px] w-[300px]
                                            ${index % 2 === 0 
                                                ? "group-hover:-translate-x-full"
                                                : "group-hover:translate-x-full"
                                            }
                                        `}
                                    >
                                        <div className="aspect-square bg-white/5 border-2 border-white/20 mb-6 relative overflow-hidden group-hover:border-white/40 transition-all duration-300">
                                            {team.img ? (
                                                <img
                                                    src={team.img}
                                                    alt={team.name}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div
                                                        className="text-6xl text-white/20"
                                                        style={{ fontFamily: "Rye" }}
                                                    >
                                                        {team.name.split(" ").map(n => n[0]).join("")}
                                                    </div>
                                                </div>
                                            )}
                                            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/30 group-hover:border-white/50"></div>
                                            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/30 group-hover:border-white/50"></div>
                                        </div>
                                        <h4
                                            className="text-2xl mb-2 tracking-wide"
                                            style={{ fontFamily: "Cinzel", fontWeight: "bold" }}
                                        >
                                            {team.name}
                                        </h4>
                                        <p
                                            className="text-sm tracking-wider text-white/60 mb-2"
                                            style={{ fontFamily: "Cinzel", fontWeight: 200, fontSize: "13px" }}
                                        >
                                            {team.role}
                                        </p>
                                        <p
                                            className="text-sm leading-relaxed tracking-wide text-white/80 mb-2 flex-grow"
                                            style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                                        >
                                            {team.bioShort}
                                        </p>
                                        <div className="flex items-center gap-4 pt-4 border-t border-white/20">
                                            <a
                                                href={`mailto:${team.github}`}
                                                className="text-white/60 hover:text-white transition-colors duration-300"
                                                aria-label="Email"
                                            >
                                                <Github className="w-5 h-5" />
                                            </a>
                                            <a
                                                href={team.linkedin}
                                                className="text-white/60 hover:text-white transition-colors duration-300"
                                                aria-label="LinkedIn"
                                            >
                                                <Linkedin className="w-5 h-5" />
                                            </a>
                                            <a
                                                href={`mailto:${team.email}`}
                                                className="text-white/60 hover:text-white transition-colors duration-300"
                                                aria-label="Email"
                                            >
                                                <Mail className="w-5 h-5" />
                                            </a>
                                            <a
                                                href={team.twitter}
                                                className="text-white/60 hover:text-white transition-colors duration-300"
                                                aria-label="Twitter"
                                            >
                                                <Twitter className="w-5 h-5" />
                                            </a>
                                        </div>
                                        <div
                                            className={`absolute w-[320px] min-h-[100px] h-auto p-6 bg-black/80 backdrop-blur-md border-2 border-white/30 opacity-0 pointer-events-none 
                                                        group-hover:opacity-100 transition-transform duration-500 ease-out
                                                ${index % 2 === 0
                                                    ? "top-0 left-full ml-2 overlay-left"
                                                    : "bottom-0 right-full mr-2 overlay-right"
                                                }
                                            `}
                                        >
                                            <p 
                                                className="text-sm leading-relaxed tracking-wide text-white/80 mb-6 flex-grow"
                                                style={{ fontFamily: "Cinzel" }}
                                            >
                                                {team.bio}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
        
            