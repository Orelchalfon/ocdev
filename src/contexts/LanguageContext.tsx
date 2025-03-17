import { createContext, ReactNode, useEffect, useState } from "react";
import { en, he } from "../config/translation";
import { Language, Translations } from "../types/translations";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string | unknown;
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
  const t = (key: string): string | unknown => {
    const value = key.split(".").reduce((obj: unknown, key) => {
      if (typeof obj === "object" && obj !== null) {
        return (obj as Record<string, unknown>)[key];
      }
      return undefined;
    }, translations[language]);

    return value ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContextProvider as default, LanguageContext };
