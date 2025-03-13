import { useState } from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => (
  <motion.div
    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  />
);

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('idle');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      setFormStatus('success');
      const form = e.target as HTMLFormElement;
      form.reset();
    } catch (error) {
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 relative overflow-hidden">
      {/* Background Decorations */}
      <motion.div
        className="absolute top-40 -left-20 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 -right-20 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Contact us for the service
            <br />
            <span className="gradient-text">you want to use</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Let's discuss your project and see how I can help you create
            something amazing together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="button-primary w-full flex items-center justify-center space-x-2 h-12"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Send Message</span>
                  )}
                </button>
                {formStatus === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-500 text-sm mt-2"
                  >
                    Message sent successfully!
                  </motion.p>
                )}
                {formStatus === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2"
                  >
                    Failed to send message. Please try again.
                  </motion.p>
                )}
              </div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <p className="flex items-center space-x-3">
                  <span className="text-2xl">📧</span>
                  <span>orel.chalfon@example.com</span>
                </p>
                <p className="flex items-center space-x-3">
                  <span className="text-2xl">📱</span>
                  <span>+1 (234) 567-8900</span>
                </p>
                <p className="flex items-center space-x-3">
                  <span className="text-2xl">📍</span>
                  <span>Tel Aviv, Israel</span>
                </p>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">Social Links</h3>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  className="text-2xl hover:text-purple-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>👨‍💻</span>
                </motion.a>
                <motion.a
                  href="#"
                  className="text-2xl hover:text-purple-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>💼</span>
                </motion.a>
                <motion.a
                  href="#"
                  className="text-2xl hover:text-purple-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>🐙</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 