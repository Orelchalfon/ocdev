import { motion } from "framer-motion";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  duration: number;
  delay: number;
}

interface ParticleFieldProps {
  isDark?: boolean;
  count?: number;
}

const ParticleField: React.FC<ParticleFieldProps> = memo(
  ({ isDark = false, count = 50 }) => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [windowSize, setWindowSize] = useState({
      width: typeof window !== 'undefined' ? window.innerWidth : 1920,
      height: typeof window !== 'undefined' ? window.innerHeight : 1080
    });

    // Update window size on resize
    useEffect(() => {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Determine particle colors based on theme
    const getParticleColors = useCallback((isDark: boolean) => {
      return isDark 
        ? ['rgba(139, 92, 246, 0.5)', 'rgba(79, 70, 229, 0.5)', 'rgba(67, 56, 202, 0.5)', 'rgba(124, 58, 237, 0.5)']
        : ['rgba(165, 180, 252, 0.5)', 'rgba(196, 181, 253, 0.5)', 'rgba(186, 230, 253, 0.5)', 'rgba(199, 210, 254, 0.5)'];
    }, []);

    // Generate particles
    const generateParticles = useCallback(() => {
      const colors = getParticleColors(isDark);
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
       size: Math.random() * 2 + 10,
        opacity: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 10 + 10, // Slower, more subtle movement (10-30s)
        delay: Math.random() * -10 // Staggered start times
      }));
    }, [count, isDark, getParticleColors]);

    // Update particles when theme changes
    useEffect(() => {
      setParticles(generateParticles());
    }, [isDark, generateParticles,count, windowSize]);

    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full shadow-md shadow-slate-100 inset-0"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              backdropFilter: 'blur(10px)'

            }}
            animate={{
              x: [
                0,
                Math.random() * 30 - 15,
                Math.random() * 20 - 10,
                Math.random() * 40 - 20,
                0
              ],
              y: [
                0,
                Math.random() * 30 - 15,
                Math.random() * 20 - 10,
                Math.random() * 40 - 20,
                0
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: particle.duration,
              delay: particle.delay,
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1]
            }}
          />
        ))}
      </div>
    );
  }
);

export default ParticleField;
