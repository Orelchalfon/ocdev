import { motion } from "framer-motion";
import ContactForm from "../components/Contact";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";

const Contact = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const contactInfo = [
    {
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
          />
        </svg>
      ),
      title: t("contact.phoneTitle"),
      content: "+972 (52) 636-5123",
    },
    {
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
          />
        </svg>
      ),
      title: t("contact.emailTitle"),
      content: "orelchalfon12@gmail.com",
    },
    {
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
          />
        </svg>
      ),
      title: t("contact.addressTitle"),
      content: "Avney Hefez, IL 4486100",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className='py-24'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Contact Info */}
        <section className='mb-24'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-4xl md:text-5xl font-bold text-center mb-16'
          >
            {t("contact.title")}
          </motion.h1>

          <div className='grid md:grid-cols-3 gap-8'>
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`p-6 rounded-2xl text-center ${
                  theme === "dark" ? "bg-gray-900/50" : "bg-gray-100"
                }`}
              >
                <div className='w-12 h-12 mx-auto mb-4 text-indigo-500 flex items-center justify-center'>
                  {info.icon}
                </div>
                <h3 className='text-xl font-semibold mb-2'>{info.title}</h3>
                <p
                  className={
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }
                >
                  {info.content}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Map Section */}
        <section className='mb-24'>
          <div
            className={`w-full h-96 rounded-2xl overflow-hidden ${
              theme === "dark" ? "bg-gray-900/50" : "bg-gray-100"
            }`}
          >
            {/* Add your map component here */}
            <div className='w-full h-full bg-gray-800/50 flex items-center justify-center'>
              <span
                className={theme === "dark" ? "text-gray-400" : "text-gray-600"}
              >
                Map Component
              </span>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <ContactForm />
      </div>
    </motion.div>
  );
};

export default Contact;
