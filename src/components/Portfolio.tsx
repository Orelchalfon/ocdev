import { motion } from "framer-motion";
import { useReducer, useRef } from "react";

const projects = [
  {
    title: "Mobile App Design",
    video: "/assets/videos/zentry-pc.mp4",
    category: "UI/UX Design",
  },
  {
    title: "Website Redesign",
    video: "/assets/videos/codesandbox-pc.mp4",
    category: "Web Development",
  },
  {
    title: "Brand Identity",
    video: "/portfolio3.png",
    category: "Branding",
  },
];

type VideoState = {
  hoveredIndex: number | null;
  playingIndex: number | null;
};

type VideoAction = 
  | { type: 'HOVER_ENTER'; index: number }
  | { type: 'HOVER_LEAVE'; index: number };

const videoReducer = (state: VideoState, action: VideoAction): VideoState => {
  switch (action.type) {
    case 'HOVER_ENTER':
      return { ...state, hoveredIndex: action.index, playingIndex: action.index };
    case 'HOVER_LEAVE':
      return { ...state, hoveredIndex: null, playingIndex: null };
    default:
      return state;
  }
};

const Portfolio = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [, dispatch] = useReducer(videoReducer, { 
    hoveredIndex: null,
    playingIndex: null 
  });

  const handleMouseEnter = (index: number) => {
    dispatch({ type: 'HOVER_ENTER', index });
    const video = videoRefs.current[index];
    if (video) {
      video.muted = false;
      video.play().catch(error => {
        console.error('Video play failed:', error);
      });
    }
  };

  const handleMouseLeave = (index: number) => {
    dispatch({ type: 'HOVER_LEAVE', index });
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.muted = true;
    }
  };

  return (
    <section className='py-16 md:py-24 px-4 lg:px-8 lg:bg-gradient-to-b from-zinc-50 via-zinc-300 to-zinc-0 ' id='portfolio' aria-labelledby="portfolio-heading">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='text-center mb-16'
      >
        <h2 id="portfolio-heading" className='text-3xl md:text-4xl font-bold mb-6'>
          Our Awesome
          <br />
          Portfolio
        </h2>
      </motion.header>

      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8   '>
        {projects.map((project, index) => (
          <motion.li
            key={index}
            onMouseOver={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className='group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg shadow-zinc-500 '
          >
            <article className='relative aspect-[16/9]'>
              <figure className='h-full'>
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={project.video}
                  muted
                  loop
                  preload="metadata"
                  playsInline
                  className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
                  aria-labelledby={`video-${index}-caption`}
                />
                <figcaption className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <div className='absolute bottom-0 left-0 right-0 p-6'>
                    <h3 id={`video-${index}-caption`} className='text-xl font-semibold text-white mb-2'>
                      {project.title}
                    </h3>
                    <p className='text-gray-300'>{project.category}</p>
                  </div>
                </figcaption>
              </figure>
            </article>
          </motion.li>
        ))}
      </ul>

      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='text-center mt-12'
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors inline-flex items-center gap-2'
          aria-label="See more portfolio projects"
        >
          See More
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden="true"
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M17 8l4 4m0 0l-4 4m4-4H3'
            />
          </svg>
        </motion.button>
      </motion.footer>
    </section>
  );
};

export default Portfolio;
