import { animate } from 'framer-motion';
import { useCallback } from 'react';

export const useScrollTo = () => {
  const scrollTo = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const offset = 80; // Height of the fixed navbar
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    animate(window.scrollY, offsetPosition, {
      type: "spring",
      stiffness: 100,
      damping: 20,
      onUpdate: (value) => window.scrollTo(0, value)
    });
  }, []);

  return scrollTo;
}; 