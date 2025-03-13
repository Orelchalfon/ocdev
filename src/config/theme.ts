export const themeConfig = {
  colors: {
    primary: {
      light: '#6366f1',
      dark: '#818cf8',
    },
    navbar: {
      bg: {
        light: 'white/80',
        dark: 'gray-900/80',
      },
      text: {
        light: 'gray-800',
        dark: 'gray-100',
      },
      hover: {
        light: 'gray-100',
        dark: 'gray-800',
      },
    },
    card: {
      bg: {
        light: 'white',
        dark: 'gray-900',
      },
      hover: {
        light: 'gray-50',
        dark: 'gray-800',
      },
    },
  },
  radius: {
    navbar: '3xl',
    buttons: 'xl',
    cards: '2xl',
  },
  animation: {
    duration: 200,
  },
  glassmorphism: {
    light: 'bg-white/80 backdrop-blur-sm',
    dark: 'bg-gray-900/80 backdrop-blur-sm',
  },
  neumorphism: {
    light: 'shadow-lg hover:shadow-xl',
    dark: 'shadow-lg shadow-gray-800 hover:shadow-xl hover:shadow-gray-700',
  },
}; 