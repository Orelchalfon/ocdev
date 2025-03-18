import { motion } from "framer-motion";

const WhyChooseUs = () => {
  return (
    <section className='py-16 md:py-24' id='why-choose-us'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className='text-3xl md:text-4xl font-bold mb-6'>
            Why OCD{"ev"} Is The
            <br />
            Best Choice?
          </h2>
          <p className='text-gray-400 text-lg mb-8'>
            Watch this one minute video so you understand why you should use our
            services!
          </p>
        </motion.div>

        {/* Right Content - Video Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className='relative aspect-video rounded-2xl overflow-hidden  shadow-inner shadow-zinc-300'
        >
          {/* Video Thumbnail with Play Button */}
          <div className='relative w-full h-full bg-gray-900 rounded-2xl overflow-hidden group'>
            <img
              src='/video-thumbnail.webp'
              alt='OCDev services explainer video'
              loading='lazy'
              width={1280}
              height={720}
              className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
            />

            {/* Play Button */}
            <motion.div
              className='absolute inset-0 flex items-center justify-center'
              whileHover={{ scale: 1.1 }}
            >
              <button
                className='w-16 h-16 md:w-20 md:h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white transition-transform duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                aria-label='Play video'
              >
                <svg
                  className='w-8 h-8 md:w-10 md:h-10'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </button>
            </motion.div>

            {/* Overlay */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
          </div>

          {/* Decorative Elements */}
          <motion.div
            className='absolute -top-4 -left-4 w-12 h-12 text-indigo-500'
            animate={{
              rotate: 360,
              transition: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
          >
            <svg viewBox='0 0 24 24' fill='currentColor'>
              <path d='M12 22l-4-4h8l-4 4zm0-20l4 4H8l4-4zm0 6l4 4H8l4-4zm0 6l4 4H8l4-4z' />
            </svg>
          </motion.div>

          <motion.div
            className='absolute -bottom-4 -right-4 w-16 h-16 text-purple-500'
            animate={{
              scale: [1, 1.1, 1],
              transition: { duration: 2, repeat: Infinity },
            }}
          >
            <svg viewBox='0 0 24 24' fill='currentColor'>
              <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
