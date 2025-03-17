import { motion } from "framer-motion";
import ServicesComponent from "../components/Services";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";
import { ConsultingService } from "../types/translations";

const Services = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();

  const additionalServices: ConsultingService[] = [
    {
      title: t("services.consulting.title"),
      description: t("services.consulting.description"),
      feature1: t("services.consulting.feature1"),
      feature2: t("services.consulting.feature2"),
      feature3: t("services.consulting.feature3"),
    },
    {
      title: t("services.maintenance.title"),
      description: t("services.maintenance.description"),
      feature1: t("services.maintenance.feature1"),
      feature2: t("services.maintenance.feature2"),
      feature3: t("services.maintenance.feature3"),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className='py-24'
    >
      {/* Main Services */}
      <section className='mb-24'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-3xl md:text-4xl font-bold text-center mb-16'
        >
          {t("services.title")}
        </motion.h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {mainServices.map((service: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`p-8 rounded-2xl ${
                theme === "dark"
                  ? "bg-gray-900/50 hover:bg-gray-800/50"
                  : "bg-gray-100 hover:bg-gray-200"
              } transition-colors`}
            >
              <div className='flex items-center mb-4'>
                <span className='mr-3 text-2xl'>{service.icon}</span>
                <h3 className='text-2xl font-semibold'>{service.title}</h3>
              </div>
              <p className='text-lg mb-4'>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Services */}
      <section className='mt-24'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-3xl md:text-4xl font-bold text-center mb-16'
        >
          {t("services.additionalTitle")}
        </motion.h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {additionalServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`p-8 rounded-2xl ${
                theme === "dark"
                  ? "bg-gray-900/50 hover:bg-gray-800/50"
                  : "bg-gray-100 hover:bg-gray-200"
              } transition-colors`}
            >
              <h3 className='text-2xl font-semibold mb-4'>{service.title}</h3>
              <p className={`mb-6 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                {service.description}
              </p>
              <ul className='space-y-3'>
                {[service.feature1, service.feature2, service.feature3].map(
                  (feature, featureIndex) => (
                    <li key={featureIndex} className='flex items-center'>
                      <svg
                        className='w-5 h-5 text-indigo-500 mr-3'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M5 13l4 4L19 7'
                        />
                      </svg>
                      <span
                        className={
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Services;
