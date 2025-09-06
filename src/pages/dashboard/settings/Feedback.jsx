import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Feedback() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    category: '',
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

    // Simple validation check
    const errors = {};
    if (!formState.category) {
      errors.category = 'Please select a feedback type.';
    }
    if (!formState.message.trim()) {
      errors.message = 'Please enter your message.';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setSubmissionStatus(null);
      return;
    }

    // Simulate an API call
    try {
      console.log('Feedback submitted:', formState);

      // Simulate a successful response
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmissionStatus('success');
      setFormState({ name: '', email: '', category: '', message: '' }); // Reset form
    } catch (error) {
      console.error('Feedback submission failed:', error);
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
        className="max-w-xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 inline-block"
            >
              Share Your Feedback
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light mt-4">
            We value your opinion! Tell us what you think.
          </p>
        </header>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-gray-900 rounded-xl shadow-lg p-6 md:p-8 space-y-6 border border-gray-800"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Category Dropdown */}
          <motion.div variants={inputVariants}>
            <label htmlFor="category" className="block text-sm font-medium text-gray-400 mb-2">
              Feedback Type <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formState.category}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 transition-all duration-300 ${
                validationErrors.category ? 'border-red-500 ring-red-500' : 'focus:ring-pink-500'
              }`}
            >
              <option value="" disabled>Select a category</option>
              <option value="General Feedback">General Feedback</option>
              <option value="Feature Request">Feature Request</option>
              <option value="Bug Report">Bug Report</option>
              <option value="Other">Other</option>
            </select>
            <AnimatePresence>
              {validationErrors.category && (
                <motion.p
                  className="text-red-500 text-sm mt-1"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {validationErrors.category}
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
              placeholder="Tell us about your experience..."
              className={`w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 resize-y focus:outline-none focus:ring-2 transition-all duration-300 ${
                validationErrors.message ? 'border-red-500 ring-red-500' : 'focus:ring-pink-500'
              }`}
            ></textarea>
            <AnimatePresence>
              {validationErrors.message && (
                <motion.p
                  className="text-red-500 text-sm mt-1"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {validationErrors.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Name and Email fields */}
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0">
            <motion.div className="flex-1" variants={inputVariants}>
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
            <motion.div className="flex-1" variants={inputVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                Your Email (Optional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              />
            </motion.div>
          </div>

          {/* Submit Button & Status */}
          <motion.div variants={inputVariants} className="text-center pt-4">
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
              {submissionStatus === 'success' && 'Sent! Thank You!'}
              {submissionStatus === 'error' && 'Failed. Please try again.'}
              {submissionStatus === null && 'Submit Feedback'}
            </motion.button>
          </motion.div>
        </motion.form>

        <AnimatePresence>
          {submissionStatus === 'success' && (
            <motion.div
              className="mt-6 p-4 rounded-xl bg-green-900 text-green-300 flex items-center justify-center space-x-2"
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Check size={20} />
              <span>Feedback submitted successfully!</span>
            </motion.div>
          )}
          {submissionStatus === 'error' && (
            <motion.div
              className="mt-6 p-4 rounded-xl bg-red-900 text-red-300 flex items-center justify-center space-x-2"
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