import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <footer className="py-8 px-6 text-center text-gray-400">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-2xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Orel
          </motion.div>
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}; 