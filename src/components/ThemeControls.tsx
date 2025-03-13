import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";

const ThemeControls = () => {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  useMotionValueEvent(scrollY, "change", (y) => {
    const difference = y - lastYRef.current;
    if (Math.abs(difference) > 180) {
      setHidden(difference > 0);
      lastYRef.current = y;
    }
  });

  return (
    <motion.div
      animate={hidden ? "hidden" : "visible"}
      initial='visible'
      whileHover='visible'
      variants={{
        visible: { x: "0%" },
        hidden: { x: "-90%" },
      }}
      transition={{ duration: 0.2 }}
      className='fixed top-5 left-5 z-50 flex flex-col gap-3'
    >
      {/* Theme Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className='p-3 rounded-full bg-white/80 shadow-lg backdrop-blur-sm'
        aria-label='Toggle theme'
      >
        {theme === "dark" ? (
          <svg
            className='w-5 h-5 text-gray-800'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
            />
          </svg>
        ) : (
          <svg
            className='w-5 h-5 text-gray-800'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
            />
          </svg>
        )}
      </motion.button>

      {/* Language Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleLanguage}
        className='p-3 rounded-full bg-white/80 shadow-lg backdrop-blur-sm'
      >
        <span className='text-gray-800 font-medium'>
          {language.toUpperCase()}
        </span>
      </motion.button>
    </motion.div>
  );
};

export default ThemeControls;
