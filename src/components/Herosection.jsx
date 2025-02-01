import { motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import bgimg from '../assets/mumbai-skyline.jpg';

// Lazy load the background image
const BackgroundImage = lazy(() => import('./BackgroundImage'));

const Hero = () => {
  // Animation variants for better organization and reusability
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  // Stagger children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section className="relative min-h-screen">
      <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="relative h-[90vh] mt-6 rounded-3xl overflow-hidden">
          {/* Background with lazy loading and loading state */}
          <Suspense fallback={<div className="absolute inset-0 bg-gray-900" />}>
            <BackgroundImage imagePath={bgimg} />
          </Suspense>

          {/* Optimized overlay gradient */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

          {/* Content with improved responsive layout */}
          <div className="relative h-full flex items-center justify-center text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-3xl px-6"
            >
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6"
              >
                Transforming{' '}
                <span className="text-yellow-400 inline-block transform transition-transform hover:scale-105">
                  Maha Mumbai
                </span>
              </motion.h1>
              
              <motion.p 
                variants={fadeIn}
                className="text-xl sm:text-2xl text-gray-200 mb-10"
              >
                Your Gateway to Prosperity
              </motion.p>

              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <button 
                  className="bg-[#0F1F14] text-white px-8 py-3 rounded-lg 
                           transform transition-all duration-300 ease-out
                           hover:bg-yellow-400 hover:text-[#0F1F14] hover:scale-105
                           focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50
                           active:scale-95"
                >
                  View Project
                </button>
                <button 
                  className="bg-white text-[#0F1F14] px-8 py-3 rounded-lg
                           transform transition-all duration-300 ease-out
                           hover:bg-[#0F1F14] hover:text-white hover:scale-105
                           focus:outline-none focus:ring-2 focus:ring-[#0F1F14] focus:ring-opacity-50
                           active:scale-95"
                >
                  Get A Call!
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Hero;