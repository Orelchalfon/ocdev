import { motion } from "framer-motion";
import { useLanguage } from "../../hooks/useLanguage";
const TechStack = () => {
  const { language } = useLanguage();
  const technologies = [
    { name: "MERN Stack", icon: "🔄" },
    { name: "React Native", icon: "📱" },
    { name: "ASP.NET", icon: "⚡" },
    { name: "MSSQL", icon: "🗄️" },
    { name: "Three.js", icon: "🎮" },
    { name: "Framer Motion", icon: "✨" },
  ];

  return (
    <div
      className={`hidden md:flex md:flex-wrap ${
        language === "he" && "flex-row-reverse"
      } max-w-md gap-4 mt-8`}
    >
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          className='group relative'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + 0.1 * index }}
        >
          <motion.span
            className='px-4 py-2 rounded-xl text-sm bg-white/5 border border-white/10 flex items-center gap-2
                     hover:bg-white/10 transition-colors cursor-pointer relative z-10'
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{tech.icon}</span>
            {tech.name}
          </motion.span>
          <motion.div
            className='absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-xl
                     opacity-0 group-hover:opacity-100 transition-opacity'
          />
        </motion.div>
      ))}
    </div>
  );
};

export default TechStack;
