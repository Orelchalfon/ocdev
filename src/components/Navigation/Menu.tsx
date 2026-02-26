import { motion } from "framer-motion";
import { memo } from "react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../../hooks/useLanguage";
import { useIsRTL, useDirectionClasses } from "../../utils/directionUtils";

interface NavLinkItem {
  path: string;
  label: string;
}

interface MenuProps {
  navLinks: NavLinkItem[];
  isDark: boolean;
  isMobile?: boolean;
  onLinkClick?: () => void;
}

const containerVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  closed: {
    opacity: 0,
    y: 20,
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 }
  }
};

const Menu = memo(
  ({ navLinks, isDark, isMobile = false, onLinkClick }: MenuProps) => {
    const { language } = useLanguage();
    const isRTL = useIsRTL();
    const directionClasses = useDirectionClasses();
    
    const containerClasses = isMobile
      ? "flex flex-col space-y-1"
      : `hidden md:flex ${
          isRTL ? "flex-row-reverse" : ""
        } items-center space-x-2`;

    return (
      <motion.ul 
        variants={containerVariants}
        initial={isMobile ? "closed" : "open"}
        animate="open"
        className={containerClasses}
      >
        {navLinks.map((link) => (
          <motion.li
            variants={itemVariants}
            key={link.path}
          >
            <NavLink
              to={link.path}
              onClick={onLinkClick}
              className={({ isActive }) => `
                px-4 py-${
                  isMobile ? "3" : "2"
                } rounded-xl transition-all duration-300
                ${!isMobile && "relative overflow-hidden"}
                ${
                  isDark 
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }
                ${
                  isActive
                    ? isDark
                      ? "text-white bg-white/10"
                      : "text-gray-900 bg-gray-900/5"
                    : "hover:bg-gray-500/10"
                }
              `}
            >
              {link.label}
            </NavLink>
          </motion.li>
        ))}
      </motion.ul>
    );
  }
);

export default Menu;

