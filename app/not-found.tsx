"use client";

import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/libs/utils/LanguageProvider";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <section
      id="Error"
      className="scroll-mt-[160px] relative h-screen bg-black text-white overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />
      <div className="relative z-10 text-center">
        <h1 className={`text-3xl sm:text-4xl mb-8 text-white`} style={{ fontFamily: "Rye" }}>
          {t.error.title}
        </h1>
        <button
          onClick={() => router.push(`/#hero`)}
          className={`inline-flex items-center gap-2 border-2 border-white px-6 sm:px-8 py-3 hover:bg-white hover:text-black transition-all duration-300`}
          style={{ fontFamily: "Cinzel" }}
        >
          <ArrowLeft size={18} />
          {t.error.button}
        </button>
      </div>
    </section>
  );
}
