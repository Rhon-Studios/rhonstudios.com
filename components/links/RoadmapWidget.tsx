// components/links/RoadmapWidget.tsx
"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/libs/utils/LanguageProvider";

const ROADMAP = [
  {
    id: 1,
    name_es: "Prototipo jugable",
    name_en: "Playable prototype",
    progress: 100,
    status: "done" as const,
  },
  {
    id: 2,
    name_es: "Beta cerrada",
    name_en: "Closed beta",
    progress: 60,
    status: "active" as const,
  },
  {
    id: 3,
    name_es: "Lanzamiento Steam",
    name_en: "Steam launch",
    progress: 5,
    status: "upcoming" as const,
  },
];

const STATUS_STYLES = {
  done: {
    bar: "bg-emerald-400",
    label_es: "Completado",
    label_en: "Done",
    text: "text-emerald-300",
  },
  active: {
    bar: "bg-amber-400",
    label_es: "En curso",
    label_en: "In progress",
    text: "text-amber-300",
  },
  upcoming: {
    bar: "bg-white/25",
    label_es: "Próximo",
    label_en: "Upcoming",
    text: "text-white/40",
  },
};

export default function RoadmapWidget() {
  const { t } = useLanguage();
  const tt = t.links.roadmap;
  const lang = (t as unknown as "en" | "es") ?? "en";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full md:w-[280px] shrink-0"
    >
      <p
        className="text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2 px-1"
        style={{ fontFamily: "Cinzel" }}
      >
        {tt.title}
      </p>
      <div className="border border-white/10 bg-white/[0.02] px-4 py-4 space-y-4">
        {ROADMAP.map((step) => {
          const s = STATUS_STYLES[step.status];
          return (
            <div key={step.id}>
              <div className="flex items-center justify-between mb-1.5">
                <p
                  className="text-xs text-white/80"
                  style={{ fontFamily: "Cinzel", fontWeight: 500 }}
                >
                  {lang === "es" ? step.name_es : step.name_en}
                </p>
                <span
                  className={`text-[9px] uppercase tracking-wider ${s.text}`}
                  style={{ fontFamily: "Cinzel" }}
                >
                  {lang === "es" ? s.label_es : s.label_en}
                </span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${step.progress}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`h-full rounded-full ${s.bar}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
