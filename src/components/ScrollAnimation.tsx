import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  offset?: number;
}

export const ScrollAnimation = ({ children, className = '', offset = 0 }: ScrollAnimationProps) => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, offset], [1, 0]);
  const y = useTransform(scrollY, [0, offset], [0, -offset/2]);

  return (
    <motion.div
      className={`fixed z-50 ${className}`}
      style={{ opacity, y }}
    >
      {children}
    </motion.div>
  );
};