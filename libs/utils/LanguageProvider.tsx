"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import en from "@/locales/en.json";
import es from "@/locales/es.json";
import gamesEn from "@/locales/games/en.json";
import gamesEs from "@/locales/games/es.json";
import projectsEn from "@/locales/join/en.json";
import projectsEs from "@/locales/join/es.json";
import ourteamEn from "@/locales/ourteam/en.json";
import ourteamEs from "@/locales/ourteam/es.json";
import devblogEn from "@/locales/devblogs/en.json";
import devblogEs from "@/locales/devblogs/es.json";
import faqEn from "@/locales/faq/en.json";
import faqEs from "@/locales/faq/es.json";

type Language = "en" | "es";

const translations = {
  en: {
    ...en,
    game_list: gamesEn,
    join: projectsEn,
    ourteam: ourteamEn,
    devblogs: devblogEn,
    faq: faqEn,
  },
  es: {
    ...es,
    game_list: gamesEs,
    join: projectsEs,
    ourteam: ourteamEs,
    devblogs: devblogEs,
    faq: faqEs,
  },
};

type Translations = typeof translations.en;

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: "en",
  setLanguage: () => {},
  t: translations.en,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("es");

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
