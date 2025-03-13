// Define image URLs
const projectImages = {
  kaspiProject: new URL('./placeholders/kaspi-project.png', import.meta.url).href,
  youtubeProject: new URL('./placeholders/youtube-project.png', import.meta.url).href,
  dogMonitoringProject: new URL('./placeholders/dog-monitoring-project.png', import.meta.url).href,
} as const;

const profileImage = new URL('./placeholders/profile.png', import.meta.url).href;

// Export all images
export const images = {
  projects: projectImages,
  profile: profileImage,
} as const; 