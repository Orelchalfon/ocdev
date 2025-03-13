import { motion } from 'framer-motion';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggle = ({ isDark, onToggle }: ThemeToggleProps) => (
  <motion.button
    className="relative w-10 h-10 rounded-full bg-white/5 border border-zinc-700 flex items-center justify-center hover:bg-zinc-800 active:ring-0 focus:ring-0 overflow-hidden"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onToggle}
    aria-label="Toggle theme"
  >
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={false}
      animate={{
        y: isDark ? 0 : -40,
        opacity: isDark ? 1 : 0,
      }}
      transition={{ duration: 0.2 }}
    >
      <svg
        className="w-5 h-5 text-yellow-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </motion.div>

    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={false}
      animate={{
        y: isDark ? 40 : 0,
        opacity: isDark ? 0 : 1,
      }}
      transition={{ duration: 0.2 }}
    >
      <svg
        className="w-5 h-5 text-yellow-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    </motion.div>
  </motion.button>
); 