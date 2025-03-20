import { motion } from "framer-motion";
import { Suspense, lazy } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  useOutboundClickTracking,
  usePageViewTracking,
  useScrollTracking,
  useSearchTracking,
} from "../hooks/useAnalytics";
import { useTheme } from "../hooks/useTheme";
import Footer from "./Footer";
import Navigation from "./Navigation/Navigation";

// Lazy load non-critical components
const ParticleField = lazy(() => import("./effects/ParticleField"));

const Layout = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const location = useLocation();

  usePageViewTracking();
  useScrollTracking();
  useOutboundClickTracking();
  useSearchTracking();

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
    <div className={`min-h-screen ${isDark ? "dark" : ""}`}>
      <Navigation />

      {/* Lazy load particle effects */}
      <Suspense
        fallback={
          <div className='fixed inset-0 -z-10 bg-gray-100 dark:bg-gray-900' />
        }
      >
        <ParticleField />
      </Suspense>

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
