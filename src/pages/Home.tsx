import { motion } from "framer-motion";
import Contact from "../components/Contact";
import Portfolio from "../components/Portfolio";
import { Hero } from "../components/Sections/Hero";
import Skills from "../components/Skills";
const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero onExploreClick={() => {}} key={"home"} />
      <Skills />
      <Portfolio />
      <Contact />
    </motion.div>
  );
};

export default Home;
