import React from 'react';
import { motion } from 'framer-motion';

const KnowMoreButton = () => {
  return (
    <div className="flex justify-end mt-6">
      <motion.button 
        className="group flex items-center gap-2 px-6 py-2 rounded-2xl
                   border border-gray-300 bg-white
                   hover:bg-gray-100 transition-all duration-300
                   focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-gray-900">Know More</span>
        <motion.svg 
          className="w-5 h-5 text-gray-900"
          viewBox="0 0 100 100"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.7 }}
        >
          <circle cx="50" cy="50" r="40" fill="currentColor" />
          <motion.path
            d="M35 50 L65 50 L55 40 M65 50 L55 60"
            fill="none"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.svg>
      </motion.button>
    </div>
  );
};

export default KnowMoreButton;