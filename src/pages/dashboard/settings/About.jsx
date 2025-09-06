import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const aboutContent = {
  main: "Love Meet is more than just a dating app; it's a platform built to help people create genuine connections, find companionship, and experience love in its truest form.",
  introHighlight: "We believe that modern dating should be easier, safer, and more meaningful.",
  ourStory: "Created by a passionate team of innovators at High Score Tech, Love Meet combines technology with human understanding. We designed the app to go beyond simple swipes, offering features that encourage authentic conversations and lasting relationships. Our goal is to make finding a connection feel natural and exciting.",
  ourValues: "At our core, inclusivity, respect, and security are paramount. Whether you're looking for friendship, romance, or something deeper, our app provides the space to meet people who truly align with your values and interests. Your safety and well-being are at the heart of everything we do.",
  ourMission: "Our mission is simple: to bring people together in a way that feels real and exciting. With Love Meet, finding love isn't just a chance—it's a choice you can make with confidence. We are dedicated to building a community where every connection has the potential to become something beautiful."
};

export default function About({ onBack }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans relative">
      <motion.button
        onClick={onBack}
        className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft size={24} />
      </motion.button>

      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.header
          className="text-center mb-12 md:mb-16"
          variants={textVariants}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            About <br />
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 inline-block"
            >
              Love Meet
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] font-light">
            {aboutContent.main}
          </p>
        </motion.header>

        <motion.section
          className="bg-gray-900 rounded-xl p-6 md:p-8 mb-8"
          variants={textVariants}
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-pink-500">
            Our Story
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            {aboutContent.ourStory}
          </p>
        </motion.section>

        <motion.hr className="border-gray-700 my-8" variants={textVariants} />

        <motion.section
          className="bg-gray-900 rounded-xl p-6 md:p-8 mb-8"
          variants={textVariants}
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-purple-500">
            Our Values
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            {aboutContent.ourValues}
          </p>
        </motion.section>

        <motion.hr className="border-gray-700 my-8" variants={textVariants} />

        <motion.section
          className="bg-gray-900 rounded-xl p-6 md:p-8"
          variants={textVariants}
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-pink-500">
            Our Mission
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            {aboutContent.ourMission}
          </p>
        </motion.section>

        <motion.footer
          className="mt-12 text-center text-[var(--text-muted)] text-sm"
          variants={textVariants}
        >
          <p>Love Meet &copy; 2025 High Score Tech. All rights reserved.</p>
          <p>Version v1.0.0</p>
        </motion.footer>
      </motion.div>
    </div>
  );
}
