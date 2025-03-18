import { motion } from "framer-motion";
import { lazy } from "react";
import { Hero } from "../components/Sections/Hero";
import WhyChooseUs from "../components/WhyChooseUs";
const Skills = lazy(() => import("../components/Skills"));

const Portfolio = lazy(() => import("../components/Portfolio"));
const Contact = lazy(() => import("../components/Contact"));
const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero onExploreClick={() => {}} key={"home"} />
      <WhyChooseUs />

      <Skills />
      <Portfolio />
      <Contact />
    </motion.div>
  );
};

export default Home;
