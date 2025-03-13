import { motion } from "framer-motion";
import { memo } from "react";

interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeToggle = memo(({ isDark, toggleTheme }: ThemeToggleProps) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={toggleTheme}
    className={`
    p-3 rounded-xl transition-all duration-300
    ${
      isDark
        ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
    }
  `}
    aria-label='Toggle theme'
  >
    {isDark ? (
      <motion.svg
        className='w-5 h-5'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
        />
      </motion.svg>
    ) : (
      <motion.svg
        className='w-5 h-5'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        initial={{ rotate: 0 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 0.5 }}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
        />
      </motion.svg>
    )}
  </motion.button>
));

export default ThemeToggle;
