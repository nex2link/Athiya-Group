import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Aboutimg from "../assets/About-us.jpg";

const AboutUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="px-4 sm:px-6 lg:px-16 my-8 sm:my-12 lg:my-14">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="bg-[#0A2919] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 
                   flex flex-col lg:flex-row justify-between items-center
                   shadow-xl hover:shadow-2xl transition-shadow duration-500"
      >
        {/* Content Section */}
        <motion.div 
          className="flex-1 max-w-xl lg:mr-12 mb-10 sm:mb-12 lg:mb-0" // Added margin bottom for mobile
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4"
            variants={itemVariants}
          >
            About Us
          </motion.h2>
          
          <motion.h3 
            className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6"
            variants={itemVariants}
          >
            Built on Excellence, Driven by Vision
          </motion.h3>
          
          <motion.p 
            className="text-gray-200 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed"
            variants={itemVariants}
          >
            With over seven years of expertise, Athiya Group has redefined 
            real estate excellence through innovative projects and a 
            commitment to client satisfaction. Explore our journey of growth, 
            milestones, and the people behind our success.
          </motion.p>
          
          <motion.button 
            className="bg-white px-6 py-3 rounded-full text-[#0A2919] font-medium
                       transform transition-all duration-300 ease-out
                       hover:bg-gray-100 hover:scale-105 hover:shadow-lg
                       focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
                       active:scale-95"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Know More About Us!
          </motion.button>
        </motion.div>

        {/* Image Section */}
        <motion.div 
          className="w-full lg:w-[400px] h-64 sm:h-80 lg:h-[450px] flex-shrink-0"
          variants={imageVariants}
        >
          <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden
                          transform transition-transform duration-700 hover:scale-105">
            <img 
              src={Aboutimg} 
              alt="Modern architectural design showcasing Athiya Group's excellence" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:opacity-0 transition-opacity duration-300" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUs;