import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { FormEvent, useEffect, useState } from "react";
import Notification from "./ui/Notification";
import TrackedForm from "./ui/TrackedForm";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [notificationClass, setNotificationClass] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  // Handle notification timer
  useEffect(() => {
    if (isNotificationVisible) {
      const timer = setTimeout(() => {
        setIsNotificationVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isNotificationVisible]);

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
    setIsNotificationVisible(false);

    try {
      // Prepare template parameters matching your EmailJS template
      const templateParams = {
        from_name: formData.name,
        user_name: formData.name,
        user_email: formData.email,
        reply_to: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: "your-email@example.com", // Replace with your email
      };

      // Send email using EmailJS
      const result = await emailjs.send(
        "service_orelyofolio", // Your EmailJS service ID
        "template_orelyofolio", // Your EmailJS template ID
        templateParams,
        "ayAReS0YEgu_5jdVT" // Your EmailJS public key
      );

      if (result.status === 200) {
        // Success notification
        setNotificationClass("notification-success");
        setNotificationMessage(
          "Thank you! Your message has been sent successfully."
        );
        setIsNotificationVisible(true);

        // Reset form
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send email");
      }
    } catch (err) {
      console.error("Contact form error:", err);

      // Error notification
      setNotificationClass("notification-error");
      setNotificationMessage(
        "Failed to send your message. Please try again later."
      );
      setIsNotificationVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='py-16 md:py-24 relative' id='contact'>
      {isNotificationVisible && (
        <div className='fixed top-20 right-4 z-50'>
          <Notification
            classNames={notificationClass}
            message={notificationMessage}
            emoji={notificationClass.includes("success") ? "✅" : "❌"}
          />
        </div>
      )}

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
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
