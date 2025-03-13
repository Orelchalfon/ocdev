import { motion } from "framer-motion";
import { memo } from "react";

interface LanguageToggleProps {
  language: string;
  toggleLanguage: () => void;
}

const LanguageToggle = memo(
  ({ language, toggleLanguage }: LanguageToggleProps) => (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration:.1 }}
      onClick={toggleLanguage}
      className={`
    w-10 h-10 rounded-xl flex items-center justify-center text-lg font-medium
    bg-gradient-to-r from-indigo-500 to-purple-500 text-white
    hover:from-indigo-600 hover:to-purple-600 transition-all duration-300
  `}
    >
      {language === "en" ? "EN" : "עב"}
    </motion.button>
  )
);

export default LanguageToggle;
