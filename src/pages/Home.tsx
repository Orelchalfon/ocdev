import { motion } from "framer-motion";
import Contact from "../components/Contact";
import Hero from "../components/Hero";
import Portfolio from "../components/Portfolio";
import Skills from "../components/Skills";
const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <Skills />
      <Portfolio />
      <Contact />
    </motion.div>
  );
};

export default Home;
