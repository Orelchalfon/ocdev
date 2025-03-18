import { createContext, ReactNode, useEffect, useState } from "react";
import { en, he } from "../config/translation";
import { Language, Translations } from "../types/translations";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: {
    <T extends string>(key: string): T;
    <T extends any[]>(key: string): T;
  };
}

const defaultLanguage: Language = "en";

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  t: (key: string) => key,
  toggleLanguage: () => {},
});

const translations: Record<Language, Translations> = { en, he };

const LanguageContextProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage || defaultLanguage;
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "he" : "en"));
  };

  // Function to translate keys
  const t = <T,>(key: string): T => {
    const value = key
      .split(".")
      .reduce(
        (obj: unknown, key) =>
          typeof obj === "object" && obj !== null
            ? (obj as Record<string, unknown>)[key]
            : undefined,
        translations[language]
      );

    return (typeof value !== "undefined" ? value : key) as T;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContextProvider as default, LanguageContext };
