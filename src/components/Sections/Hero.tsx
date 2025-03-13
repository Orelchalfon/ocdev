import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
interface HeroProps {
  onExploreClick: () => void;
}

const TechStack = () => {
  const technologies = [
    { name: 'MERN Stack', icon: '🔄' },
    { name: 'React Native', icon: '📱' },
    { name: 'ASP.NET', icon: '⚡' },
    { name: 'MSSQL', icon: '🗄️' },
    { name: 'Three.js', icon: '🎮' },
    { name: 'Framer Motion', icon: '✨' }
  ];

  return (
    <div className="flex flex-wrap gap-4 mt-8">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          className="group relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .5 + 0.1 * index }}
        >
          <motion.span
            className="px-4 py-2 rounded-xl text-sm bg-white/5 border border-white/10 flex items-center gap-2
                     hover:bg-white/10 transition-colors cursor-pointer relative z-10"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{tech.icon}</span>
            {tech.name}
          </motion.span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-xl
                     opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </motion.div>
      ))}
    </div>
  );
};

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      dx: number;
      dy: number;
      size: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };

    const createParticles = () => {
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          dx: (Math.random() - 0.5) * 0.5,
          dy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 10,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(147, 51, 234, 0.2)';
        ctx.fill();

        particles.forEach((particle2, j) => {
          if (i === j) return;
          const dx = particle.x - particle2.x;
          const dy = particle.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.strokeStyle = `rgba(147, 51, 234, ${0.1 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full "
    />
  );
};

const CodeSnippet = () => (
  <motion.div
    className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block"
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.8 }}
  >
    <pre className="text-sm bg-zinc-800 p-4 rounded-xl border border-zinc-700 font-mono">
      <code className="text-purple-400">const</code>{" "}
      <code className="text-blue-400">developer</code>{" "}
      <code className="text-white">= {`{`}</code>
      <br />
      <code className="text-white ml-4">name: </code>
      <code className="text-green-400">'Orel Chalfon'</code>,
      <br />
      <code className="text-white ml-4">stack: </code>
      <code className="text-yellow-400">['MERN', 'React Native', 'ASP.NET']</code>,
      <br />
      <code className="text-white ml-4">passion: </code>
      <code className="text-green-400">'Building the future of web'</code>
      <br />
      <code className="text-white">{`}`}</code>
    </pre>
  </motion.div>
);

export const Hero = ({ onExploreClick }: HeroProps) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 150], [1, 0])
  return (
    <section id="home" className="min-h-screen pt-32 px-6 relative  overflow-hidden">
      <ParticleField />

      <div className="max-w-7xl mx-auto relative ">
        <motion.div
          className="max-w-3xl"
          style={{ y }}
        >
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
                Full-Stack Developer
              </span>
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Orel Chalfon
          </motion.h1>

          <motion.p
            className="text-xl text-gray-400 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            Crafting scalable and innovative solutions with cutting-edge technology.
            Specializing in full-stack development with a focus on performance and user experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white
                       hover:from-purple-700 hover:to-blue-700 transition-all duration-300
                       shadow-lg shadow-purple-500/25"
              onClick={onExploreClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.button>
            <motion.a
              href="#contact"
              className="px-8 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors
                       shadow-lg shadow-purple-500/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>

          <TechStack />
        </motion.div>

        <CodeSnippet />
      </div>
      <motion.div
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 md:bottom-8"
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
          className="w-6 h-10 border-2 rounded-full flex justify-center border-gray-400 dark:border-gray-500"
        >
          <motion.div
            animate={{
              y: [2, 6, 2],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
            className="w-1 h-2 rounded-full mt-2 bg-gray-400 dark:bg-gray-500"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};