import { motion } from 'framer-motion';
import { images } from '../../assets/images';

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  index: number;
}

const ProjectCard = ({ image, title, description, index }: ProjectCardProps) => (
  <motion.div
    className="glass-card overflow-hidden group cursor-pointer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className="relative">
      <div className="w-full h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/20">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        )}
      </div>
      <motion.div
        className="absolute inset-0 bg-purple-600/80 flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          className="button-primary"
          initial={{ y: 20, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          View Project
        </motion.button>
      </motion.div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  </motion.div>
);

export const Projects = () => {
  const projects = [
    {
      image: images.projects.kaspiProject,
      title: 'Kaspi - Financial Education Platform',
      description: 'A comprehensive platform teaching financial literacy to children through interactive tasks and rewards.'
    },
    {
      image: images.projects.youtubeProject,
      title: 'YouTube Downloader',
      description: 'A fast and efficient YouTube video downloader with multiple format options and batch processing.'
    },
    {
      image: images.projects.dogMonitoringProject,
      title: 'Dog Monitoring System',
      description: 'IoT-based system using Raspberry Pi for monitoring and interacting with pets remotely.'
    }
  ];

  const decorationVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="projects" className="py-20 px-6 relative overflow-hidden">
      {/* Background Decorations */}
      <motion.div
        className="absolute top-40 -left-20 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl"
        variants={decorationVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-20 -right-20 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl"
        variants={decorationVariants}
        animate="animate"
        style={{ animationDelay: "1s" }}
      />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Our Awesome
            <br />
            <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our latest projects showcasing innovative solutions
            and cutting-edge technology implementations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}; 