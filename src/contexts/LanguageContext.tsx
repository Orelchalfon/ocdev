import { createContext, ReactNode, useEffect, useState } from "react";
import { en, he } from "../config/translation";
import { Language, Translations } from "../types/translations";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  tArray: <T>(key: string) => T[];
}

const defaultLanguage: Language = "en";

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  t: (key: string) => key,
  toggleLanguage: () => {},
  tArray: (key: string) => [],
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
  const t = (key: string): string => {
    const value = key
      .split(".")
      .reduce(
        (obj: unknown, key) =>
          typeof obj === "object" && obj !== null
            ? (obj as Record<string, unknown>)[key]
            : undefined,
        translations[language]
      );

    return typeof value === "string" ? value : key;
  };

  // Add typed array translation helper
  const tArray = <T,>(key: string): T[] => {
    const value = key
      .split(".")
      .reduce(
        (obj: unknown, key) =>
          typeof obj === "object" && obj !== null
            ? (obj as Record<string, unknown>)[key]
            : undefined,
        translations[language]
      );

    return Array.isArray(value) ? (value as T[]) : [];
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, tArray }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContextProvider as default, LanguageContext };
