import { motion } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";
import { Service } from "../types/translations";

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

type ServicesProps = {
  /** When false, omits the max-w container (for use inside page wrappers) */
  contained?: boolean;
};

const Services = ({ contained = true }: ServicesProps) => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  // For strings
  const title = t<string>("services.title");

  // For arrays
  const mainServices = t<Service[]>("services.mainServices");

  const inner = (
    <>
      <div className='text-center mb-12 md:mb-16'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-3xl md:text-4xl font-bold mb-6'
        >
          {title}
        </motion.h2>
      </div>

      <motion.div
        variants={container}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'
      >
        {mainServices.map((service, index) => (
          <motion.div
            key={index}
            variants={item}
            className={`group p-6 md:p-8 rounded-2xl ${theme === "dark"
                ? "bg-gray-900/50 hover:bg-gray-800/50"
                : "bg-gray-100 hover:bg-gray-200"
              } transition-colors`}
          >
            <div className='mb-4'>
              <span className='text-4xl'>{service.icon}</span>
            </div>
            <h3
              className={`text-xl font-semibold mb-3 group-hover:text-indigo-400 transition-colors`}
            >
              {service.title}
            </h3>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              {service.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </>
  );

  return (
    <section className={contained ? "py-16 md:py-24" : ""} id='services'>
      {contained ? (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>{inner}</div>
      ) : (
        inner
      )}
    </section>
  );
};

export default Services;
