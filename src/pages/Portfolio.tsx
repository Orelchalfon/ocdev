import { motion } from "framer-motion";
import { useState } from "react";
import PortfolioComponent from "../components/Portfolio";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";

const Portfolio = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: t("portfolio.filter.all") },
    { id: "web", label: t("portfolio.filter.web") },
    { id: "mobile", label: t("portfolio.filter.mobile") },
    { id: "design", label: t("portfolio.filter.design") },
  ];

  const featuredProjects = [
    {
      title: t("portfolio.featured.project1.title"),
      description: t("portfolio.featured.project1.description"),
      image: "/featured-project1.jpg",
      category: "web",
      link: "#",
    },
    {
      title: t("portfolio.featured.project2.title"),
      description: t("portfolio.featured.project2.description"),
      image: "/featured-project2.jpg",
      category: "mobile",
      link: "#",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className='py-24'
    >
      {/* Featured Projects */}
      <section className='mb-24'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-3xl md:text-4xl font-bold text-center mb-16'
        >
          {t("portfolio.featured.title")}
        </motion.h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`rounded-2xl overflow-hidden ${
                theme === "dark" ? "bg-gray-900" : "bg-gray-100"
              }`}
            >
              <div className='relative aspect-video'>
                <img
                  src={project.image}
                  alt={project.title}
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='p-8'>
                <h3 className='text-2xl font-semibold mb-4'>{project.title}</h3>
                <p
                  className={`mb-6 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {project.description}
                </p>
                <a
                  href={project.link}
                  className='inline-flex items-center text-indigo-500 hover:text-indigo-600'
                >
                  {t("portfolio.viewProject")}
                  <svg
                    className='w-5 h-5 ml-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17 8l4 4m0 0l-4 4m4-4H3'
                    />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Filters */}
      <div className='flex justify-center mb-12'>
        <div
          className={`inline-flex rounded-lg p-1 ${
            theme === "dark" ? "bg-gray-900" : "bg-gray-100"
          }`}
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === filter.id
                  ? "bg-indigo-500 text-white"
                  : `${
                      theme === "dark"
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Grid */}
      <PortfolioComponent />
    </motion.div>
  );
};

export default Portfolio;
