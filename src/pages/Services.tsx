import { motion } from "framer-motion";
import ServicesComponent from "../components/Services";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";
import { ConsultingService } from "../types/translations";

const Services = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const additionalServices: ConsultingService[] = [
    {
      title: t("services.consulting.title") as string,
      description: t("services.consulting.description") as string,
      feature1: t("services.consulting.feature1") as string,
      feature2: t("services.consulting.feature2") as string,
      feature3: t("services.consulting.feature3") as string,
    },
    {
      title: t("services.maintenance.title") as string,
      description: t("services.maintenance.description") as string,
      feature1: t("services.maintenance.feature1") as string,
      feature2: t("services.maintenance.feature2") as string,
      feature3: t("services.maintenance.feature3") as string,
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
      <ServicesComponent />

      {/* Additional Services */}
      <section className='mt-24'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-3xl md:text-4xl font-bold text-center mb-16'
        >
          {t("services.additionalTitle") as string}
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
              <p
                className={`mb-6 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
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
