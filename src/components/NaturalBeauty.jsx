import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import rect1 from "../assets/Rectangle-1.png";
import rect2 from "../assets/Rectangle-2.png";
import rect3 from "../assets/Rectangle-3.png";

// Combined hooks for better performance and fewer lines
function useResponsiveSettings() {
  const [settings, setSettings] = useState({
    prefersReducedMotion: false,
    width: undefined,
  });

  useEffect(() => {
    // Handle reduced motion preference
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const motionHandler = () => 
      setSettings(s => ({ ...s, prefersReducedMotion: mq.matches }));
    
    // Handle window resize
    const resizeHandler = () => 
      setSettings(s => ({ ...s, width: window.innerWidth }));
    
    // Set initial values
    motionHandler();
    resizeHandler();
    
    // Add event listeners
    mq.addEventListener("change", motionHandler);
    window.addEventListener("resize", resizeHandler);
    
    // Cleanup
    return () => {
      mq.removeEventListener("change", motionHandler);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);
  
  return settings;
}

const AnimatedImg = ({ src, alt, text, delay = 0, className = "" }) => {
  const { prefersReducedMotion } = useResponsiveSettings();
  
  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true, amount: 0.1 }}
      className="w-full text-center"
    >
      <img 
        src={src} 
        alt={alt} 
        className={`w-full mx-auto rounded shadow-sm ${className}`}
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.style.display = "none";
        }} 
      />
      {text && <p className="text-sm mt-2 text-gray-600">{text}</p>}
    </motion.div>
  );
};

function NaturalBeauty() {
  const { prefersReducedMotion, width } = useResponsiveSettings();
  
  return (
    <div className="p-4 mx-auto w-full max-w-screen-xl relative">
      {/* Title section */}
      <div className="mb-8 md:absolute md:top-20 md:left-10 lg:left-40 text-center md:text-left z-10">
        <motion.h1
          className="text-3xl sm:text-4xl font-extrabold text-gray-900"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          Natural Beauty Meets <br className="hidden sm:block" /> Urban Comfort
        </motion.h1>
        <motion.p
          className="text-gray-700 mt-2"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          Third New Town offers a unique blend of natural <br className="hidden sm:block" /> beauty and urban convenience
        </motion.p>
      </div>

      <div className="flex flex-col md:flex-row items-center">
        {/* Left Section - Empty on mobile, half on desktop */}
        <div className="hidden md:block md:w-1/2"></div>

        {/* Right Section - Full width on mobile, half on desktop */}
        <div className="w-full md:w-1/2 md:pr-8 lg:pr-16">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className={`w-full sm:w-1/2 ${width >= 768 ? "mt-64" : "mt-16"}`}>
              <AnimatedImg
                src={rect2}
                alt="Green landscape"
                text="Lush green surroundings and scenic coastline."
                delay={0.2}
                className="max-w-full sm:max-w-xs"
              />
            </div>
            <div className="flex flex-col sm:w-1/2">
              <div className="mb-5">
                <AnimatedImg
                  src={rect1}
                  alt="Beachside villa"
                  className="max-w-full sm:max-w-xs"
                />
              </div>
              <div>
                <AnimatedImg
                  src={rect3}
                  alt="Beach sunset view"
                  text="Proximity to hill stations, beaches and cultural landmarks"
                  delay={0.2}
                  className="max-w-full sm:max-w-xs"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NaturalBeauty;
