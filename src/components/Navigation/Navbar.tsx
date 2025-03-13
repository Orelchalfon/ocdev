import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';
import { MenuButton, MobileMenu } from './MobileMenu';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
    isMenuOpen: boolean;
    setIsMenuOpen: (isOpen: boolean) => void;
    onNavigate: (sectionId: string) => void;
}

export const Navbar = ({
    isDarkMode,
    toggleTheme,
    isMenuOpen,
    setIsMenuOpen,
    onNavigate
}: NavbarProps) => {
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();
    const lastYRef = useRef(0);

    useMotionValueEvent(scrollY, "change", (y) => {
        const difference = y - lastYRef.current;
        if (Math.abs(difference) > 180) {
            setHidden(difference > 0);
            lastYRef.current = y;
        }
    });

    const menuItems = ['Home', 'Services', 'Portfolio', 'About'];

    return (
        <>
            <motion.nav
                className="fixed top-2 left-0 w-full z-50 px-4 "
                animate={hidden ? "hidden" : "visible"}
                initial="visible"
                whileHover={hidden ? "peeking" : "visible"}
                onFocusCapture={hidden ? () => {
                    setHidden(false)
                } : undefined}
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-90%" },
                    peeking: { y: 0, cursor: "pointer" }
                }}
                transition={{ duration: 0.2 }}
            >
                <motion.div
                    className="mx-auto max-w-2xl rounded-full backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border border-gray-200/20 dark:border-gray-700/20 shadow-lg shadow-black/5 px-6 py-3"
                >
                    <div className="flex justify-between items-center">
                        <motion.div
                            className="text-xl font-bold"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                                {`OCD{ev}`}
                            </span>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {menuItems.map((item) => (
                                <motion.a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="nav-link text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onNavigate(item.toLowerCase());
                                    }}
                                    whileHover={{ y: -2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {item}
                                </motion.a>
                            ))}
                        </div>

                        <div className="flex items-center space-x-4">

                            <ThemeToggle isDark={isDarkMode} onToggle={toggleTheme} />
                            <MenuButton
                                isOpen={isMenuOpen}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden"
                            />
                        </div>
                    </div>
                </motion.div>
            </motion.nav>

            <MobileMenu
                isOpen={isMenuOpen}
                closeMenu={() => setIsMenuOpen(!isMenuOpen)}
                onNavigate={onNavigate}
            />
        </>
    );
}; 