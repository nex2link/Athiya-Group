import { motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import bgimgweb from '../assets/mumbai-skyline-webm.webp';

const BackgroundImage = lazy(() => import('./BackgroundImage'));

const Hero = () => {
  // Faster animation variants
  const fadeInUp = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        duration: 0.4
      }
    }
  };

  const fadeIn = {
    hidden: { 
      opacity: 0,
      scale: 0.98
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Even faster stagger
        delayChildren: 0.1,    // Minimal initial delay
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Faster text animation
  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    }
  };

  // Image animation variants
  const imageVariants = {
    hidden: { 
      scale: 1.2,
      opacity: 0 
    },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const title = "Transforming".split("");

  return (
    <section className="relative min-h-screen">
      <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="relative h-[90vh] mt-6 rounded-3xl overflow-hidden">
          {/* Background with animation */}
          <Suspense fallback={<div className="absolute inset-0 bg-gray-900" />}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={imageVariants}
              className="absolute inset-0"
            >
              <BackgroundImage imagePath={bgimgweb} />
            </motion.div>
          </Suspense>

          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ 
              opacity: 1, 
              backdropFilter: "blur(2px)",
              transition: { duration: 0.5 }
            }}
            className="absolute inset-0 bg-black/40" 
          />

          <div className="relative h-full flex items-center justify-center text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-3xl px-6"
            >
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 flex justify-center flex-wrap"
              >
                <div className="flex">
                  {title.map((letter, index) => (
                    <motion.span
                      key={index}
                      variants={letterAnimation}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.02, // Ultra-fast letter animation
                        type: "spring",
                        damping: 20,
                        stiffness: 200
                      }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </div>
                <motion.span 
                  variants={fadeInUp}
                  className="text-yellow-400 inline-block ml-4"
                  whileHover={{ 
                    scale: 1.05,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 10
                    }
                  }}
                >
                  Maha Mumbai
                </motion.span>
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
                <motion.button 
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(250, 204, 21, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 15
                  }}
                  className="bg-yellow-400 text-black px-8 py-3 rounded-lg 
                           transform transition-all duration-300 ease-out
                           hover:bg-yellow-400 hover:text-[#0F1F14]
                           focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                >
                  View Project
                </motion.button>
                <motion.button 
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 15
                  }}
                  className="bg-white text-[#0F1F14] px-8 py-3 rounded-lg
                           transform transition-all duration-300 ease-out
                           hover:bg-[#0F1F14] hover:text-white
                           focus:outline-none focus:ring-2 focus:ring-[#0F1F14] focus:ring-opacity-50"
                >
                  Get A Call!
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;