import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export const MenuButton = ({ isOpen, onClick, className = "" }: MenuButtonProps) => (
  <button
    className={`md:hidden p-2 ${className}`}
    onClick={onClick}
    aria-label="Toggle menu"
  >
    <div className="w-6 h-5 relative flex flex-col justify-between">
      <motion.span
        className="w-full h-0.5 bg-current absolute"
        animate={{
          top: isOpen ? "50%" : "0%",
          rotate: isOpen ? 45 : 0,
          translateY: isOpen ? "-50%" : "0%"
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="w-full h-0.5 bg-current absolute top-1/2 -translate-y-1/2"
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="w-full h-0.5 bg-current absolute"
        animate={{
          bottom: isOpen ? "50%" : "0%",
          rotate: isOpen ? -45 : 0,
          translateY: isOpen ? "50%" : "0%"
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  </button>
);

interface MobileMenuProps {
  isOpen: boolean;
  closeMenu: () => void;
  onNavigate: (sectionId: string) => void;
}

export const MobileMenu = ({ isOpen, closeMenu, onNavigate }: MobileMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeMenu]);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const menuItems = ['home', 'services', 'projects', 'about', 'contact'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
          />
          <motion.div
            ref={menuRef}
            className="md:hidden fixed top-[4rem] left-0 right-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md p-4 border-t border-gray-200/20 dark:border-gray-700/20 shadow-lg z-50"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <nav className="flex flex-col space-y-4">
              {menuItems.map((section) => (
                <motion.a
                  key={section}
                  href={`#${section}`}
                  className="nav-link capitalize text-gray-700 dark:text-gray-200 hover:text-purple-500 dark:hover:text-purple-400"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(section);
                    closeMenu();
                  }}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {section}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}; 