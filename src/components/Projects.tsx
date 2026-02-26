import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";

const Projects = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === "dark";
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: t("projects.filters.all") },
    { id: "web", label: t("projects.filters.web") },
    { id: "mobile", label: t("projects.filters.mobile") },
    { id: "enterprise", label: t("projects.filters.enterprise") },
  ];

  const projects = [
    {
      id: "kaspi",
      title: t("projects.kaspi.title"),
      description: t("projects.kaspi.description"),
      image: "/projects/kaspi.png",
      category: "enterprise",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      link: "https://kaspi.com",
      features: [
        t("projects.kaspi.features.1"),
        t("projects.kaspi.features.2"),
        t("projects.kaspi.features.3"),
      ],
    },
    {
      id: "youtube-downloader",
      title: t("projects.youtube.title"),
      description: t("projects.youtube.description"),
      image: "/projects/youtube.png",
      category: "web",
      tech: ["React", "Node.js", "Express", "FFmpeg"],
      link: "https://youtube-downloader.com",
      features: [
        t("projects.youtube.features.1"),
        t("projects.youtube.features.2"),
        t("projects.youtube.features.3"),
      ],
    },
    {
      id: "dog-monitor",
      title: t("projects.dogMonitor.title"),
      description: t("projects.dogMonitor.description"),
      image: "/projects/dog-monitor.png",
      category: "mobile",
      tech: ["React Native", "Node.js", "Raspberry Pi", "WebSocket"],
      link: "https://dog-monitor.com",
      features: [
        t("projects.dogMonitor.features.1"),
        t("projects.dogMonitor.features.2"),
        t("projects.dogMonitor.features.3"),
      ],
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section className='py-16 md:py-24'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
      >
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16'>
          {t("projects.title")}
        </h2>

        {/* Filters */}
        <div className='flex justify-center mb-8 md:mb-12'>
          <div
            className={`inline-flex rounded-lg p-1 ${isDark ? "bg-gray-900" : "bg-gray-100"
              }`}
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${activeFilter === filter.id
                    ? "bg-indigo-500 text-white"
                    : `${isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                    }`
                  }
                `}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                rounded-2xl overflow-hidden ${isDark ? "bg-gray-900" : "bg-white"
                }
                shadow-lg hover:shadow-xl transition-all duration-300
              `}
            >
              {/* Project Image */}
              <div className='relative aspect-video overflow-hidden'>
                <img
                  src={project.image}
                  alt={project.title}
                  className='w-full h-full object-cover transition-transform duration-300 hover:scale-110'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300'>
                  <div className='absolute bottom-4 left-4 right-4'>
                    <div className='flex flex-wrap gap-2'>
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className='px-2 py-1 text-xs font-medium bg-black/30 text-white rounded-full'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className='p-6'>
                <h3 className='text-xl font-bold mb-2'>{project.title}</h3>
                <p
                  className={`mb-4 ${isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                >
                  {project.description}
                </p>

                {/* Features */}
                <ul className='mb-6 space-y-2'>
                  {project.features.map((feature, i) => (
                    <li key={i} className='flex items-start'>
                      <svg
                        className='w-5 h-5 text-indigo-500 mr-2 mt-1 flex-shrink-0'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M5 13l4 4L19 7'
                        />
                      </svg>
                      <span
                        className={isDark ? "text-gray-400" : "text-gray-600"}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Project Link */}
                <a
                  href={project.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center text-indigo-500 hover:text-indigo-600'
                >
                  {t("projects.viewProject")}
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
                      d='M14 5l7 7m0 0l-7 7m7-7H3'
                    />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
