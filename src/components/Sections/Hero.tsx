import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import CodeSnippet from "../ui/CodeSnippet";
import TechStack from "../ui/TechStack";

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero = ({ onExploreClick }: HeroProps) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 350], [1, 0.25]);

  const { language, t } = useLanguage();
  const languageProgress = useSpring(0, {
    stiffness: 300,
    damping: 20,
  });

  useEffect(() => {
    const target = language === "he" ? 1 : 0;
    languageProgress.set(target);
  }, [language, languageProgress]);

  const x = useTransform(languageProgress, [0, 1], ["0%", "75%"]);
  const scale = useTransform(languageProgress, [0, 1], [0.95, 1]);

  return (
    <section
      id='home'
      className='min-h-screen pt-32 px-6 relative  overflow-hidden'
    >
      <div className='max-w-7xl mx-auto relative '>
        <motion.div
          className={`max-w-3xl flex flex-col ${
            language === "he" && "items-end text-right"
          }`}
          style={{
            y,
            x,
            scale,
            opacity,
            transformOrigin: language === "he" ? "right center" : "left center",
          }}
        >
          <motion.div
            className='mb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className='inline-block'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className='text-sm font-medium px-3 py-1  rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 '>
                {t("hero.title")}
              </span>
            </motion.div>
          </motion.div>

          <motion.h1
            className='text-5xl md:text-7xl font-bold mb-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Orel Chalfon
          </motion.h1>

          <motion.p
            className='text-xl text-gray-400 mb-8 max-w-2xl'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            Crafting scalable and innovative solutions with cutting-edge
            technology. Specializing in full-stack development with a focus on
            performance and user experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className='flex flex-wrap gap-4'
          >
            <motion.button
              className='px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white
                       hover:from-purple-700 hover:to-blue-700 transition-all duration-300
                       shadow-lg shadow-purple-500/25'
              onClick={onExploreClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.button>
            <motion.a
              href='#contact'
              className='px-8 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors
                       shadow-lg shadow-purple-500/10'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>

          <TechStack />
        </motion.div>

        <CodeSnippet />
      </div>
      <motion.div
        className='absolute bottom-20 left-1/2 transform -translate-x-1/2 md:bottom-8'
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
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
          className='w-6 h-10 border-2 rounded-full flex justify-center border-gray-400 dark:border-gray-500'
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
            className='w-1 h-2 rounded-full mt-2 bg-gray-400 dark:bg-gray-500'
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
