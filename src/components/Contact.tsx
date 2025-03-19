import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import TrackedForm from "./ui/TrackedForm";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Reset status
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        "service_id", // Replace with your EmailJS service ID
        "template_id", // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          reply_to: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        "public_key" // Replace with your EmailJS public key
      );

      if (result.status === 200) {
        setSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        // Note: No need to call onFormComplete() here as TrackedForm handles it automatically
      } else {
        throw new Error("Failed to send email");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setError("Failed to send your message. Please try again later.");
      // Note: No need to call onFormError() here as TrackedForm handles it automatically
    } finally {
      setLoading(false);
    }
  };

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <TrackedForm
            formName='Contact Form'
            formId='contact-form'
            onSubmit={handleSubmit}
            className='space-y-6 bg-gray-900/50 p-8 rounded-2xl'
          >
            {success && (
              <div className='bg-green-500/20 border border-green-500 text-green-200 px-4 py-3 rounded mb-4'>
                Thank you! Your message has been sent successfully.
              </div>
            )}

            {error && (
              <div className='bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded mb-4'>
                {error}
              </div>
            )}

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
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-white'
                  placeholder='Your name'
                  required
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
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-white'
                  placeholder='your@email.com'
                  required
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
                value={formData.subject}
                onChange={handleChange}
                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-white'
                placeholder='How can we help?'
                required
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
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-white'
                placeholder='Your message...'
                required
              ></textarea>
            </div>

            <div className='text-center'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type='submit'
                disabled={loading}
                className='bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors inline-flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed'
              >
                {loading ? "Sending..." : "Send Message"}
                {!loading && (
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
                )}
              </motion.button>
            </div>
          </TrackedForm>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
