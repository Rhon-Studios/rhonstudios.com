"use client";

import {
  Coffee,
  ExternalLink,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  Play,
  Twitter,
  Youtube,
} from "lucide-react";
import { useLanguage } from "@/libs/utils/LanguageProvider";
import { useParams, useRouter } from "next/navigation";
import { collaborators } from "@/libs/database/teamData";
import { gamesData } from "@/libs/database/gamesData";
import { motion } from "framer-motion";

function getProjectTheme(area: string) {
  const game = gamesData.find((g) => g.title.toLowerCase() === area.toLowerCase());
  return game?.theme ?? null;
}

export default function CollaboratorDetail() {
  const { id } = useParams<{ id: string }>();
  const collab = collaborators.find((c) => c.id === id && c.visible);

  const router = useRouter();

  const { t } = useLanguage();
  const tt = t.collaboratorsDetails;

  const params = useParams();

  const LINK_CONFIG = [
    { key: "portfolio", icon: ExternalLink, label: "Portfolio" },
    { key: "web", icon: Globe, label: tt.links.web },
    { key: "github", icon: Github, label: "GitHub" },
    { key: "linkedin", icon: Linkedin, label: "LinkedIn" },
    { key: "twitter", icon: Twitter, label: "Twitter / X" },
    { key: "instagram", icon: Instagram, label: "Instagram" },
    { key: "youtube", icon: Youtube, label: "YouTube" },
    { key: "buymeacoffee", icon: Coffee, label: tt.links.buymeacoffee },
    { key: "email", icon: Mail, label: "Email" },
  ] as const;

  if (!collab) {
    return (
      <section
        id="collaboratorError"
        className="scroll-mt-[160px] relative h-screen bg-black text-white overflow-hidden flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />
        <div className="relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl mb-8" style={{ fontFamily: "Cinzel" }}>
            {tt.notfound}
          </h1>
          <button
            onClick={() => router.push(`/#team`)}
            className={`inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-sm tracking-wider hover:border-white transition`}
            style={{ fontFamily: "Cinzel" }}
          >
            {tt.back}
          </button>
        </div>
      </section>
    );
  }

  const initials = collab.name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const activeLinks = LINK_CONFIG.filter(
    (cfg) => collab.links[cfg.key as keyof typeof collab.links]
  );
  const mediaImages = collab.media.filter((w) => w.type === "image" || w.type === "video");
  const mediaLinks = collab.media.filter((w) => w.type === "link");

  const collabT = t.ourteam.collaborators[collab.id];
  const isActive = collab.status === "active";
  const projectTheme = getProjectTheme(collab.area);

  return (
    <div
      className=" text-white min-h-screen"
      style={{ backgroundColor: projectTheme?.bgColor ?? "black" }}
    >
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        {collab.coverImage ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${collab.coverImage})`,
              filter: "grayscale(100%) brightness(0.25)",
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="relative z-10 w-full container mx-auto px-8 lg:px-16 pb-16 pt-40">
          <div className="flex flex-col md:flex-row items-end gap-8 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="shrink-0 w-32 h-32 border-2 overflow-hidden bg-white/[0.04] flex items-center justify-center"
              style={{ borderColor: projectTheme?.accentBorder ?? "white" }}
            >
              {collab.photo ? (
                <img
                  src={collab.photo}
                  alt={collab.name}
                  className="w-full h-full object-cover grayscale"
                />
              ) : (
                <span className="text-4xl text-white/20" style={{ fontFamily: "Rye" }}>
                  {initials}
                </span>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span
                  className="text-xs tracking-[0.25em] uppercase border border-white/35 px-3 py-1 text-white/70"
                  style={{ fontFamily: "Cinzel" }}
                >
                  {collabT.role}
                </span>
                <span
                  className="text-xs tracking-[0.25em] uppercase px-3 py-1"
                  style={{
                    fontFamily: "Cinzel",
                    border: `1px solid ${projectTheme?.panelBorderOpacity ?? "white"}`,
                    color: projectTheme?.accentText ?? "white",
                  }}
                >
                  {collab.area}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 text-xs tracking-[0.2em] uppercase px-3 py-1 border ${
                    isActive
                      ? "border-emerald-400/50 text-emerald-300"
                      : "border-white/20 text-white/35"
                  }`}
                  style={{ fontFamily: "Cinzel" }}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive
                        ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]"
                        : "bg-white/30"
                    }`}
                  />
                  {isActive ? "Activo" : "Alumni"}
                </span>
              </div>
              <h1
                className="text-5xl lg:text-6xl tracking-wider mb-2"
                style={{ fontFamily: "Rye", fontWeight: 200 }}
              >
                {collab.name}
              </h1>
              <p
                className="text-lg text-white/70 tracking-wide"
                style={{ fontFamily: "Cinzel", fontWeight: 200 }}
              >
                {collabT.subrole}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-8 lg:px-16 py-16 max-w-10xl">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {collabT.tagline && (
              <motion.blockquote
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="border-l-2 pl-6"
                style={{ borderColor: projectTheme?.accentBorder ?? "white" }}
              >
                <p
                  className="text-xl text-white/85 leading-relaxed italic"
                  style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                >
                  "{collabT.tagline}"
                </p>
              </motion.blockquote>
            )}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p
                className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4"
                style={{ fontFamily: "Cinzel" }}
              >
                {tt.about}
              </p>
              <p
                className="text-base text-white/80 leading-relaxed"
                style={{ fontFamily: "Cinzel", fontWeight: 200 }}
              >
                {collabT.bio}
              </p>
            </motion.div>
            {mediaImages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <p
                  className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4"
                  style={{ fontFamily: "Cinzel" }}
                >
                  {tt.work}
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {mediaImages.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.97 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="group relative aspect-video border border-white/20 overflow-hidden bg-white/[0.03] hover:border-white/45 transition-colors duration-300"
                    >
                      {item.url ? (
                        item.type === "video" ? (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <video
                              src={item.url}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                              muted
                              loop
                              playsInline
                              onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
                              onMouseLeave={(e) => {
                                const v = e.currentTarget as HTMLVideoElement;
                                v.pause();
                                v.currentTime = 0;
                              }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <Play className="w-8 h-8 text-white/40 group-hover:opacity-0 transition-opacity" />
                            </div>
                          </div>
                        ) : (
                          <img
                            src={item.url}
                            alt={item.caption ?? ""}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                        )
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p
                            className="text-white/25 text-xs tracking-wider text-center px-4"
                            style={{ fontFamily: "Cinzel" }}
                          >
                            {item.caption ?? "Próximamente"}
                          </p>
                        </div>
                      )}
                      {item.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-3 py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <p
                            className="text-xs text-white/80 truncate"
                            style={{ fontFamily: "Cinzel" }}
                          >
                            {item.caption}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
          <div className="space-y-6">
            {activeLinks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <p
                  className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4"
                  style={{ fontFamily: "Cinzel" }}
                >
                  Links
                </p>
                <div className="space-y-2.5">
                  {activeLinks.map((cfg) => {
                    const Icon = cfg.icon;
                    const href = collab.links[cfg.key as keyof typeof collab.links]!;
                    const isEmail = href.startsWith("mailto:");
                    return (
                      <motion.a
                        key={cfg.key}
                        href={isEmail ? href : href}
                        target={isEmail ? undefined : "_blank"}
                        rel={isEmail ? undefined : "noopener noreferrer"}
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-3 border border-white/25 hover:border-white/70 px-4 py-3.5 transition-all duration-200 group"
                      >
                        <Icon className="w-4 h-4 text-white/45 group-hover:text-white transition-colors shrink-0" />
                        <span
                          className="text-sm tracking-wider text-white/70 group-hover:text-white transition-colors flex-1"
                          style={{ fontFamily: "Cinzel", fontWeight: 300 }}
                        >
                          {cfg.label}
                        </span>
                        <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-white/75 transition-colors shrink-0" />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            )}
            {mediaLinks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <p
                  className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4"
                  style={{ fontFamily: "Cinzel" }}
                >
                  Portfolio
                </p>
                <div className="space-y-2.5">
                  {mediaLinks.map((item, i) => (
                    <motion.a
                      key={i}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      className="flex items-start gap-3 border border-white/20 hover:border-white/60 px-4 py-3.5 transition-all duration-200 group"
                    >
                      <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white/75 transition-colors shrink-0 mt-0.5" />
                      <span
                        className="text-sm text-white/65 group-hover:text-white/90 transition-colors leading-snug"
                        style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                      >
                        {item.caption ?? item.url}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
            {collabT.contributions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <p
                  className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4"
                  style={{ fontFamily: "Cinzel" }}
                >
                  {tt.contributions}
                </p>
                <ul className="space-y-3">
                  {collabT.contributions.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 border border-white/18 px-5 py-3 hover:border-white/40 transition-colors duration-200"
                    >
                      <span
                        className="shrink-0 mt-0.5"
                        style={{ fontFamily: "Cinzel", color: projectTheme?.accentText ?? "white" }}
                      >
                        ✦
                      </span>
                      <span
                        className="text-sm text-white/75"
                        style={{ fontFamily: "Cinzel", fontWeight: 200 }}
                      >
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="border border-white/20 p-5 text-center"
            >
              <p
                className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-3"
                style={{ fontFamily: "Cinzel" }}
              >
                {tt.collaborate.title}
              </p>
              <button onClick={() => router.push(`/#team`)}>
                <p
                  className="text-2xl tracking-widest text-white/70 hover:text-white transition-colors"
                  style={{ fontFamily: "Rye" }}
                >
                  Rhon Studios
                </p>
              </button>
              <div className="w-8 h-px bg-white/20 mx-auto my-3" />
              <button
                onClick={() => router.push(`/#team`)}
                className="text-[10px] tracking-[0.2em] uppercase text-white/40 hover:text-white/75 transition-colors"
                style={{ fontFamily: "Cinzel" }}
              >
                {tt.collaborate.see} →
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
