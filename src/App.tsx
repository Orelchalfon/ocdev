import { useState, useEffect } from 'react';
import {
  Navbar,
  Hero,
  Services,
  Projects,
  Contact,
  Footer
} from './components';
import { useScrollTo } from './hooks/useScrollTo';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollTo = useScrollTo();

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onNavigate={scrollTo}
      />

      <Hero onExploreClick={() => scrollTo('projects')} />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
