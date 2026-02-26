import { AnimatePresence, motion, Variants } from "framer-motion";
import { memo, useCallback, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

import { useLanguage } from "../../hooks/useLanguage";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { useTheme } from "../../hooks/useTheme";
import LanguageToggle from "../ui/LanguageToggle";
import ThemeToggle from "../ui/ThemeToggle";
import Menu from "./Menu";

// Main Navigation component using memo to prevent unnecessary rerenders
const Navigation = memo(() => {
  const { theme, toggleTheme } = useTheme();
  const { t, language, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const isDark = theme === "dark";

  // Use the scroll animation hook
  const { hidden } = useScrollAnimation();

  // Memoize nav links to prevent recreating on rerender
  const navLinks = useMemo(
    () => [
      { path: "/", label: t("nav.home") },
      { path: "/services", label: t("nav.services") },
      { path: "/portfolio", label: t("nav.portfolio") },
      { path: "/about", label: t("nav.about") },
      { path: "/contact", label: t("nav.contact") },
    ],
    [t]
  );

  // Memoize the toggle function
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  // Memoize the close menu function
  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <motion.header
      className='fixed top-0 left-0 right-0 z-50 px-4 pt-3'
      animate={hidden ? "hidden" : "visible"}
      initial='visible'
      whileHover={hidden ? "peeking" : "visible"}
      variants={
        {
          visible: { y: "0%" },
          hidden: { y: "-90%" },
          peeking: { y: "0%", cursor: "pointer" },
        } as Variants
      }
      transition={{ duration: 0.2 }}
    >
      <nav className='max-w-3xl mx-auto'>
        <div
          className={`
          rounded-3xl px-6 py-5 
          ${!isDark
              ? "bg-gray-900/80 shadow-lg shadow-purple-500/5"
              : "bg-white/80 shadow-lg shadow-indigo-500/5"
            }
          backdrop-blur-md
        `}
        >
          <div className='flex items-center justify-between'>
            {/* Logo */}
            <NavLink
              to='/'
              className='text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-transform'
            >
              OCD{"{ev}"}
            </NavLink>

            {/* Desktop Navigation */}
            <Menu navLinks={navLinks} isDark={!isDark} />

            {/* Theme and Language Controls */}
            <div className='hidden md:flex items-center space-x-4'>
              <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
              <LanguageToggle
                language={language}
                toggleLanguage={toggleLanguage}
              />
            </div>

            {/* Mobile Menu Button */}
            <div className='md:hidden'>
              <button
                type='button'
                aria-label={isOpen ? "Close menu" : "Open menu"}
                onClick={toggleMenu}
                className={`
                  p-2 rounded-xl transition-colors
                  ${!isDark
                    ? "hover:bg-gray-800 text-gray-300"
                    : "hover:bg-gray-100 text-gray-600"
                  }
                `}
              >
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d={
                      isOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`
                md:hidden mt-2 py-4 px-6 rounded-2xl z-50
                ${!isDark
                  ? "bg-gray-900/90 shadow-lg shadow-purple-500/5"
                  : "bg-white/90 shadow-lg shadow-indigo-500/5"
                }
                backdrop-blur-md
              `}
            >
              <Menu
                navLinks={navLinks}
                isDark={!isDark}
                isMobile={true}
                onLinkClick={closeMenu}
              />

              {/* Mobile theme and language toggles */}
              <div className='flex items-center space-x-3 mt-4 pt-3 border-t border-gray-700/20'>
                <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
                <LanguageToggle
                  language={language}
                  toggleLanguage={toggleLanguage}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
});

export default Navigation;
