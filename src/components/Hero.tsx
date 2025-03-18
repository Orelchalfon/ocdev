import { Canvas } from "@react-three/fiber";
import { motion, useAnimation } from "framer-motion";
import { memo, useEffect, useMemo } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";
import { TechSphere } from "./3d/TechSphere";
import ParticleField from "./effects/ParticleField";

// Extract TechCanvas component to prevent re-renders of the 3D canvas
const TechCanvas = memo(() => (
  <Canvas camera={{ position: [0, 0, 6] }}>
    <TechSphere />
  </Canvas>
));

const Hero = memo(() => {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const isDark = theme === "dark";
  const controls = useAnimation();
  const isRTL = language === "he";

  // Memoize technologies to prevent recreation on re-renders
  const technologies = useMemo(
    () => [
      { name: t("hero.tech.react"), icon: "⚛️" },
      { name: t("hero.tech.nodejs"), icon: "🟢" },
      { name: t("hero.tech.typescript"), icon: "📘" },
      { name: t("hero.tech.mongodb"), icon: "🍃" },
      { name: t("hero.tech.express"), icon: "⚡" },
      { name: t("hero.tech.reactNative"), icon: "📱" },
      { name: t("hero.tech.aspnet"), icon: "🔷" },
      { name: t("hero.tech.mssql"), icon: "💾" },
    ],
    [t]
  );

  // Memoize direction-specific classes
  const directionClasses = useMemo(
    () => ({
      textAlign: isRTL ? "text-right" : "text-left",
      flexDirection: isRTL ? "flex-row-reverse" : "flex-row",
      gridColumns: isRTL ? "md:col-start-2" : "",
      techSpherePosition: isRTL ? "md:col-start-1 row-start-1" : "",
      marginClasses: isRTL ? "ml-2" : "mr-2",
    }),
    [isRTL]
  );

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    });
  }, [controls]);

  // Memoize text variants to prevent recreation
  const textVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.1,
          duration: 0.5,
          ease: [0.6, -0.05, 0.01, 0.99],
        },
      }),
    }),
    []
  );

  // Memoize gradient class based on theme
  const gradientClass = useMemo(
    () =>
      isDark
        ? "from-indigo-900/20 via-purple-900/10 to-transparent"
        : "from-indigo-500/10 via-purple-500/5 to-transparent",
    [isDark]
  );

  // Memoize scroll indicator styles
  const scrollIndicatorStyles = useMemo(
    () => ({
      container: !isDark ? "border-gray-700/50" : "border-gray-300/50",
      dot: !isDark ? "bg-gray-700/50" : "bg-gray-300/50",
    }),
    [isDark]
  );

  return (
    <section className='relative flex min-h-screen items-center overflow-hidden pt-20'>
      {/* Particle Background */}
      <ParticleField />

      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`} />

      <div className='container relative z-10 mx-auto px-4 lg:px-8'>
        <div
          className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 ${directionClasses.textAlign}`}
        >
          {/* Left Content */}
          <motion.div
            className={`col-span-2 md:col-span-1 ${directionClasses.gridColumns}`}
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className='overflow-hidden'>
              <motion.h1
                className='mb-2 text-2xl font-bold lg:text-7xl'
                custom={1}
                initial='hidden'
                animate='visible'
                variants={textVariants}
              >
                <motion.span
                  className={`inline-block ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {t("hero.name")}
                </motion.span>
              </motion.h1>

              <motion.div
                custom={2}
                initial='hidden'
                animate='visible'
                variants={textVariants}
                className='mb-6'
              >
                <h2 className='text-5xl font-bold lg:text-7xl'>
                  <span className='animate-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
                    {t("hero.title")}
                  </span>
                </h2>
              </motion.div>
            </div>

            <motion.p
              className='mb-8 max-w-2xl text-xl text-gray-400'
              custom={3}
              initial='hidden'
              animate='visible'
              variants={textVariants}
            >
              {t("hero.description")}
            </motion.p>

            {/* Tech Stack */}
            <motion.div
              className={`mb-8 flex flex-wrap ${directionClasses.flexDirection} gap-3`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {technologies.map((tech, index) => (
                <motion.button
                  key={tech.name}
                  className={`rounded-lg px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all duration-300 ${
                    isDark
                      ? "bg-gray-800/30 text-gray-300 hover:bg-gray-700/50"
                      : "bg-gray-100/80 text-gray-800 hover:bg-gray-200/90"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: isDark
                      ? "0 0 20px rgba(139, 92, 246, 0.3)"
                      : "0 0 20px rgba(99, 102, 241, 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={isRTL ? "ml-2" : "mr-2"}>{tech.icon}</span>
                  {tech.name}
                </motion.button>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className={`flex flex-wrap ${directionClasses.flexDirection} gap-4`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.a
                href='#portfolio'
                className='group relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 py-3 font-medium text-white order-1'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className='relative z-10'>
                  {t("hero.cta.viewProjects")}
                </span>
                <motion.div
                  className='absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600'
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              <motion.a
                href='#contact'
                className={`rounded-lg border px-8 py-3 font-medium backdrop-blur-sm transition-all duration-300 ${
                  isDark
                    ? "border-gray-700 text-gray-300 hover:bg-gray-800/50"
                    : "border-gray-300 text-gray-800 hover:bg-gray-100/80"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("hero.cta.hireUs")}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Tech Sphere */}
          <motion.div
            className={`relative hidden h-[600px] lg:block md:col-span-1 ${directionClasses.techSpherePosition}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <TechCanvas />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className='absolute bottom-8 left-1/2 -translate-x-1/2 transform'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className={`flex h-10 w-6 justify-center rounded-full border-2 ${scrollIndicatorStyles.container}`}
          animate={{
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <motion.div
            animate={{
              y: [2, 6, 2],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className={`mt-2 h-2 w-1 rounded-full ${scrollIndicatorStyles.dot}`}
          />
        </motion.div>
      </motion.div>
    </section>
  );
});

export default Hero;
