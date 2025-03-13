import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState, useRef } from 'react';

export const useScrollAnimation = (threshold = 180) => {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const difference = y - lastYRef.current;
    if (Math.abs(difference) > threshold) {
      setHidden(difference > 0);
      lastYRef.current = y;
    }
  });

  return { hidden };
}; 