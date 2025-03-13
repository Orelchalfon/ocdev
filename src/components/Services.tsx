import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Services = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  
  // Get main services from translation
  const mainServices = t('services.mainServices') as unknown as Array<{
    icon: string;
    title: string;
    description: string;
  }>;

  return (
    <section className="py-16 md:py-24" id="services">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          {t('services.title')}
        </motion.h2>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {mainServices && mainServices.map((service, index) => (
          <motion.div
            key={index}
            variants={item}
            className={`group p-8 rounded-2xl ${
              theme === "dark"
                ? "bg-gray-900/50 hover:bg-gray-800/50"
                : "bg-gray-100 hover:bg-gray-200"
            } transition-colors`}
          >
            <div className="mb-4">
              <span className="text-4xl">{service.icon}</span>
            </div>
            <h3 className={`text-xl font-semibold mb-3 group-hover:text-indigo-400 transition-colors`}>
              {service.title}
            </h3>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              {service.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Services; 