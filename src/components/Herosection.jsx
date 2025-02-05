import { motion } from 'framer-motion';
import { lazy, Suspense, useEffect, useState, memo } from 'react';
import bgimgweb from '../assets/mumbai-skyline-webm.webp';
import { Link } from 'react-router-dom';

// Memoize BackgroundImage component
const BackgroundImage = memo(({ imagePath, onLoad }) => (
  <div className="absolute inset-0">
    <picture>
      <source srcSet={imagePath} type="image/webp" />
      <img
        src={imagePath}
        alt="Mumbai Skyline"
        onLoad={onLoad}
        className="w-full h-full object-cover"
        loading="eager"
      />
    </picture>
  </div>
));

BackgroundImage.displayName = 'BackgroundImage';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Optimize resize listener with debounce
  useEffect(() => {
    let timeoutId;
    const checkMobile = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth <= 768);
      }, 100);
    };

    // Initial check
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Image preload
    const img = new Image();
    img.src = bgimgweb;
    img.onload = () => setIsLoaded(true);

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  // Reduced animation complexity for better performance
  const fadeUpVariant = {
    hidden: { opacity: 0, y: isMobile ? 10 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariant = {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  };

  return (
    <section className="relative min-h-screen w-screen overflow-x-hidden px-6">
      <div className="w-full max-w-[2000px] mx-auto px-4">
        <div className="relative h-[90vh] mt-6 rounded-3xl overflow-hidden">
          {/* Background Image */}
          <Suspense fallback={
            <div className="absolute inset-0 bg-gray-900 animate-pulse" />
          }>
            {isLoaded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <BackgroundImage 
                  imagePath={bgimgweb}
                  onLoad={() => setIsLoaded(true)}
                />
              </motion.div>
            )}
          </Suspense>

          {/* Optimized overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

          {/* Content */}
          <div className="relative h-full flex items-center justify-center text-center">
            <div className="w-full max-w-3xl px-4 sm:px-6">
              <motion.h1 
                initial="hidden"
                animate="visible"
                variants={fadeUpVariant}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6"
              >
                <span className="block mb-2">Transforming</span>
                <span className="text-yellow-400 inline-block">
                  Maha Mumbai
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl sm:text-2xl text-gray-200 mb-10"
              >
                Your Gateway to Prosperity
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link to='/mahamumbai'>
                <motion.button 
                  variants={buttonVariant}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full sm:w-auto bg-yellow-400 text-black px-8 py-3 rounded-lg 
                           transition-colors duration-200
                           hover:bg-yellow-300
                           focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                >
                  View Project
                </motion.button>
                </Link>
                <Link to="/contactus">
                <motion.button 
                  variants={buttonVariant}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full sm:w-auto bg-white text-[#0F1F14] px-8 py-3 rounded-lg
                           transition-colors duration-200
                           hover:bg-gray-100
                           focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                >
                  Get A Call!
                </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);