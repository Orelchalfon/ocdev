import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";

const NotFound = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Get text from t function
  const title = t("notFound.title") || "Page Not Found";
  const description = t("notFound.description") || "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.";
  const goBack = t("notFound.goBack") || "Go Back";
  const goHome = t("notFound.goHome") || "Go Home";

  return (
    <motion.div
      className='min-h-[80vh] flex items-center justify-center px-4'
      initial='hidden'
      animate='visible'
      variants={containerVariants}
    >
      <div className='text-center max-w-2xl'>
        <motion.div className='mb-8' variants={itemVariants}>
          <div className='inline-block relative'>
            <span className='text-9xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text'>
              404
            </span>
            <motion.div
              className='absolute -bottom-4 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </div>
        </motion.div>

        <motion.h1
          className='text-3xl md:text-4xl font-bold mb-4'
          variants={itemVariants}
        >
          {title}
        </motion.h1>

        <motion.p
          className={`text-lg mb-8 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
          variants={itemVariants}
        >
          {description}
        </motion.p>

        <motion.div
          className='flex flex-col sm:flex-row gap-4 justify-center'
          variants={itemVariants}
        >
          <motion.button
            onClick={() => navigate(-1)}
            className='px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z'
                clipRule='evenodd'
              />
            </svg>
            {goBack}
          </motion.button>

          <motion.button
            onClick={() => navigate("/")}
            className='px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
            </svg>
            {goHome}
          </motion.button>
        </motion.div>

        {/* Fun code element, showing a "404" in code */}
        <motion.div
          className='mt-12 max-w-md mx-auto overflow-hidden rounded-lg'
          variants={itemVariants}
          transition={{ delay: 0.8 }}
        >
          <pre
            className={`text-left p-4 text-sm font-mono rounded-lg ${
              isDark ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <code>
              <span className='text-pink-500'>try</span> {"{"}
              <br />
              {"  "}
              <span className='text-green-500'>// Looking for this page</span>
              <br />
              {"  "}
              <span className='text-blue-500'>const</span>{" "}
              <span className='text-yellow-500'>page</span> ={" "}
              <span className='text-purple-500'>await</span>{" "}
              <span className='text-yellow-500'>findPage</span>(
              <span className='text-orange-500'>
                "{window.location.pathname}"
              </span>
              );
              <br />
              {"}"} <span className='text-pink-500'>catch</span> (error) {"{"}
              <br />
              {"  "}
              <span className='text-purple-500'>console.error</span>(
              <span className='text-orange-500'>
                "Error 404: Page not found"
              </span>
              );
              <br />
              {"  "}
              <span className='text-green-500'>
                // Please try another route
              </span>
              <br />
              {"}"}
            </code>
          </pre>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;
