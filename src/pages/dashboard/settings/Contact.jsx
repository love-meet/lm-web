import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mail, MessageSquare, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GetInTouch() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState(null); // null, 'sending', 'success', 'error'
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    if (validationErrors[name]) {
      setValidationErrors({ ...validationErrors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('sending');

    const errors = {};
    if (!formState.email.trim()) {
      errors.email = 'Please enter your email.';
    }
    if (!formState.subject.trim()) {
      errors.subject = 'Please enter a subject.';
    }
    if (!formState.message.trim()) {
      errors.message = 'Please enter your message.';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setSubmissionStatus(null);
      return;
    }

    try {
      console.log('Message submitted:', formState);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmissionStatus('success');
      setFormState({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Submission failed:', error);
      setSubmissionStatus('error');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const messageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans relative">
      <Link to="/settings" className="absolute top-6 left-6">
        <motion.button
          className="text-gray-400 hover:text-white transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft size={24} />
        </motion.button>
      </Link>

      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 inline-block"
            >
              Get In Touch
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light mt-4">
            Have a question or a concern? We're here to listen.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Information Section */}
          <div className="flex flex-col space-y-8">
            <motion.div
              className="bg-gray-900 rounded-xl p-6 border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Other Ways to Reach Us</h2>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-center space-x-3">
                  <Mail size={20} className="text-pink-400" />
                  <span>Email: <a href="mailto:app.lovemeet@gmail.com" className="hover:underline text-white">app.lovemeet@gmail.com</a></span>
                </li>
                <li className="flex items-center space-x-3">
                  <MessageSquare size={20} className="text-purple-400" />
                  <span>For direct inquiries, use the form.</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-gray-900 rounded-xl p-6 border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Find Your Own Answer</h2>
              <p className="text-gray-400 mb-4">
                Many questions are already answered in our comprehensive help center.
              </p>
              <Link to="/help" className="w-full flex items-center justify-center py-3 rounded-md font-semibold text-white transition-all duration-300 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                <Send size={20} className="mr-2" />
                Visit Our Help Center
              </Link>
            </motion.div>
          </div>

          {/* Contact Form Section */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-gray-900 rounded-xl shadow-lg p-6 md:p-8 space-y-6 border border-gray-800"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <h2 className="text-2xl font-semibold mb-4 text-white">Send a Direct Message</h2>
            
            {/* Name Input */}
            <motion.div variants={inputVariants}>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                Your Name (Optional)
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              />
            </motion.div>
            
            {/* Email Input */}
            <motion.div variants={inputVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  validationErrors.email ? 'border-red-500 ring-red-500' : 'focus:ring-pink-500'
                }`}
              />
              <AnimatePresence>
                {validationErrors.email && (
                  <motion.p className="text-red-500 text-sm mt-1" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    {validationErrors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Subject Input */}
            <motion.div variants={inputVariants}>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  validationErrors.subject ? 'border-red-500 ring-red-500' : 'focus:ring-pink-500'
                }`}
              />
              <AnimatePresence>
                {validationErrors.subject && (
                  <motion.p className="text-red-500 text-sm mt-1" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    {validationErrors.subject}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Message Textarea */}
            <motion.div variants={inputVariants}>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                Your Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleInputChange}
                rows="5"
                placeholder="Describe your issue or question..."
                className={`w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 resize-y focus:outline-none focus:ring-2 transition-all duration-300 ${
                  validationErrors.message ? 'border-red-500 ring-red-500' : 'focus:ring-pink-500'
                }`}
              ></textarea>
              <AnimatePresence>
                {validationErrors.message && (
                  <motion.p className="text-red-500 text-sm mt-1" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    {validationErrors.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Submit Button & Status */}
            <motion.div variants={inputVariants} className="pt-4">
              <motion.button
                type="submit"
                disabled={submissionStatus === 'sending' || submissionStatus === 'success'}
                className={`w-full py-3 rounded-md font-semibold text-white transition-all duration-300 ${
                  submissionStatus === 'sending' || submissionStatus === 'success'
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {submissionStatus === 'sending' && 'Sending...'}
                {submissionStatus === 'success' && 'Sent! We will be in touch!'}
                {submissionStatus === 'error' && 'Failed. Please try again.'}
                {submissionStatus === null && 'Submit Message'}
              </motion.button>
            </motion.div>
          </motion.form>
        </div>

        <AnimatePresence>
          {submissionStatus === 'success' && (
            <motion.div
              className="fixed bottom-6 left-1/2 -translate-x-1/2 p-4 rounded-xl bg-green-900 text-green-300 flex items-center justify-center space-x-2 shadow-lg"
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Check size={20} />
              <span>Your message has been sent successfully.</span>
            </motion.div>
          )}
          {submissionStatus === 'error' && (
            <motion.div
              className="fixed bottom-6 left-1/2 -translate-x-1/2 p-4 rounded-xl bg-red-900 text-red-300 flex items-center justify-center space-x-2 shadow-lg"
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <X size={20} />
              <span>Submission failed. Please try again.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}