import { motion } from "framer-motion";
import { useReducer, useRef } from "react";
import TrackedVideo from "./ui/TrackedVideo";

const projects = [
  {
    title: "Mobile App Design",
    video: "/assets/videos/zentry-pc.mp4",
    category: "UI/UX Design",
    filterId: "design",
  },
  {
    title: "Website Redesign",
    video: "/assets/videos/codesandbox-pc.mp4",
    category: "Web Development",
    filterId: "web",
  },
  {
    title: "Brand Identity",
    video: "/portfolio3.demo.mp4",
    category: "Branding",
    filterId: "design",
  },
];

type VideoState = {
  hoveredIndex: number | null;
  playingIndex: number | null;
};

type VideoAction =
  | { type: "HOVER_ENTER"; index: number }
  | { type: "HOVER_LEAVE"; index: number };

const videoReducer = (state: VideoState, action: VideoAction): VideoState => {
  switch (action.type) {
    case "HOVER_ENTER":
      return {
        ...state,
        hoveredIndex: action.index,
        playingIndex: action.index,
      };
    case "HOVER_LEAVE":
      return { ...state, hoveredIndex: null, playingIndex: null };
    default:
      return state;
  }
};

type PortfolioProps = {
  activeFilter?: string;
  /** When false, omits the max-w container (for use inside page wrappers) */
  contained?: boolean;
};

const Portfolio = ({ activeFilter = "all", contained = true }: PortfolioProps) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const filteredProjects = projects.filter(
    (project) => activeFilter === "all" || project.filterId === activeFilter
  );
  const [, dispatch] = useReducer(videoReducer, {
    hoveredIndex: null,
    playingIndex: null,
  });

  const handleMouseEnter = (index: number) => {
    const project = filteredProjects[index];
    if (!project?.video) return;
    dispatch({ type: "HOVER_ENTER", index });
    const video = videoRefs.current[index];
    if (video) {
      video.muted = false;
      video.play().catch((error) => {
        console.error("Video play failed:", error);
      });
    }
  };

  const handleMouseLeave = (index: number) => {
    dispatch({ type: "HOVER_LEAVE", index });
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.muted = true;
    }
  };

  const inner = (
    <>
      <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-12 md:mb-16'
        >
          <h2
            id='portfolio-heading'
            className='text-3xl md:text-4xl font-bold mb-6'
          >
            Our Awesome
            <br />
            Portfolio
          </h2>
        </motion.header>

        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
          {filteredProjects.map((project, index) => (
            <motion.li
              key={index}
              onMouseOver={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className='group relative overflow-hidden rounded-2xl cursor-pointer shadow-inner shadow-zinc-500'
            >
              <article className='relative aspect-[16/9]'>
                <figure className='h-full'>
                  {project?.video && (
                    <TrackedVideo
                      ref={(el) =>
                        (videoRefs.current[index] = el as HTMLVideoElement)
                      }
                      src={project.video}
                      title={project.title}
                      muted
                      loop
                      preload='metadata'
                      playsInline
                      controls={false}
                      className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
                      aria-labelledby={`video-${index}-caption`}
                    />
                  )}
                  <figcaption className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <div className='absolute bottom-0 left-0 right-0 p-6'>
                      <h3
                        id={`video-${index}-caption`}
                        className='text-xl font-semibold text-white mb-2'
                      >
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
    </>
  );

  return (
    <section className={contained ? "py-16" : ""}>
      {contained ? (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>{inner}</div>
      ) : (
        inner
      )}
    </section>
  );
};

export default Portfolio;
