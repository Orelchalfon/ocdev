import { motion } from 'framer-motion';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

const ServiceCard = ({ icon, title, description, index }: ServiceCardProps) => (
  <motion.div
    className="glass-card p-6 hover:scale-105 transition-transform duration-300"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

export const Services = () => {
  const services = [
    {
      icon: '💻',
      title: 'Development',
      description: 'Full-stack development with MERN stack and modern web technologies.'
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Creating intuitive and beautiful user interfaces with modern design principles.'
    },
    {
      icon: '📱',
      title: 'Mobile Development',
      description: 'Cross-platform mobile app development with React Native.'
    },
    {
      icon: '⚡',
      title: 'Performance Optimization',
      description: 'Optimizing applications for speed and scalability.'
    },
    {
      icon: '🔒',
      title: 'Security',
      description: 'Implementing robust security measures and best practices.'
    },
    {
      icon: '🚀',
      title: 'DevOps',
      description: 'Setting up CI/CD pipelines and managing cloud infrastructure.'
    }
  ];

  return (
    <section id="services" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            The Service We Provide
            <br />
            <span className="gradient-text">For You</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Leveraging cutting-edge technologies to deliver exceptional digital experiences
            that drive business growth and user engagement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}; 