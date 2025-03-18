import { motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import Footer from "./Footer";
import Navigation from "./Navigation";
import ParticleField from "./effects/ParticleField";

const Layout = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div
      className={`relative min-h-screen ${
        isDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className='fixed inset-0 -z-10 pointer-events-none'>
        <div
          className={`absolute inset-0 opacity-30 ${
            isDark
              ? "bg-gradient-to-b from-indigo-950 via-gray-900 to-gray-900"
              : "bg-gradient-to-b from-indigo-50 via-gray-50 to-gray-50"
          }`}
        />

        <div
          className={`absolute inset-0 opacity-20 ${
            isDark
              ? "bg-gradient-to-tr from-purple-900 via-transparent to-transparent"
              : "bg-gradient-to-tr from-purple-100 via-transparent to-transparent"
          }`}
        />
      </div>

      <ParticleField />

      <Navigation />

      <motion.main
        key={location.pathname}
        variants={pageVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ type: "spring" }}
        className='min-h-screen relative z-10 '
      >
        <Outlet />
      </motion.main>

      <Footer />
    </div>
  );
};

export default Layout;
