import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section className='py-16 md:py-24' id='contact'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl md:text-4xl font-bold mb-6'>
            Contact us for the service
            <br />
            you want to use
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='space-y-6 bg-gray-900/50 p-8 rounded-2xl'
        >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-300 mb-2'
              >
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-white'
                placeholder='Your name'
              />
            </div>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-300 mb-2'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-white'
                placeholder='your@email.com'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='subject'
              className='block text-sm font-medium text-gray-300 mb-2'
            >
              Subject
            </label>
            <input
              type='text'
              id='subject'
              name='subject'
              className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-white'
              placeholder='How can we help?'
            />
          </div>

          <div>
            <label
              htmlFor='message'
              className='block text-sm font-medium text-gray-300 mb-2'
            >
              Message
            </label>
            <textarea
              id='message'
              name='message'
              rows={6}
              className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-white'
              placeholder='Your message...'
            ></textarea>
          </div>

          <div className='text-center'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type='submit'
              className='bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors inline-flex items-center gap-2'
            >
              Send Message
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M14 5l7 7m0 0l-7 7m7-7H3'
                />
              </svg>
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
