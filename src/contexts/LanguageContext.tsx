import { createContext, ReactNode, useEffect, useState } from "react";
import { en, he } from "../config/translation";

// Updated type definitions that can handle arrays
type TranslationValue = string | TranslationObject | TranslationArray | Record<string, any>;

interface TranslationObject {
  [key: string]: TranslationValue;
}

type TranslationArray = Array<TranslationObject>;



// Define the shape of our LanguageContext
interface LanguageContextType {
  language: string;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

// Create the LanguageContext
const defaultLanguage = "en";

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  t: (key: string) => key,
  toggleLanguage: () => { },
});

// Define the LanguageProvider component
const LanguageContextProvider = ({ children }: { children: ReactNode }) => {
  const translations: Record<string, any> = { en, he };

  const [language, setLanguage] = useState<string>(() => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || defaultLanguage;
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === "en" ? "he" : "en");
  };

  // Function to translate keys
  const t = (key: string): string => {
    const value = key.split('.').reduce((obj: any, key) => obj?.[key], translations[language]);
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the LanguageContext
export { LanguageContextProvider as default, LanguageContext };

