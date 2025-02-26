import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import rect1 from "../assets/Rectangle-1.png";
import rect2 from "../assets/Rectangle-2.png";
import rect3 from "../assets/Rectangle-3.png";

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return prefersReducedMotion;
}

// Custom hook for responsive design
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }
    
    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return windowSize;
}

const AnimatedImg = ({ src, alt, text, delay = 0, className = "", style = {} }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
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
        style={style}
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
  const prefersReducedMotion = usePrefersReducedMotion();
  const { width } = useWindowSize();
  const isLargeScreen = width >= 1024;

  // Determine rect2 image size based on screen width
  const rect2ImgWidth = isLargeScreen ? 250 : 350; // 100px larger on mobile/tablet
  
  // Determine margin top based on screen width
  const topMargin = width >= 768 ? 250 : 50;

  return (
    <div className="p-4 mx-auto w-full max-w-screen-xl relative">
      {/* Title section - Mobile: stacked, Desktop: absolute positioned */}
      <div className="md:absolute md:top-20 md:left-40  md:mb-0 text-center md:text-left z-10">
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

        {/* Right Section - Full width on mobile, half on desktop with original desktop layout */}
        <div className="w-full md:w-1/2 md:mr-40">
          <div className="flex flex-col sm:flex-row gap-4 ">
            <div className="w-full md:mt-16 mx-auto" style={{ marginTop: `${topMargin}px` }}>
              <AnimatedImg
                src={rect2}
                alt="Green landscape"
                text="Lush green surroundings and scenic coastline."
                delay={0.2}
                style={{ 
                  width: `${rect2ImgWidth}px`, 
                  maxWidth: "unset" 
                }}
              />
            </div>
            <div className="flex flex-col">
              <div className="mb-5" style={{ maxWidth: "calc(380px + 180px)" }}>
                <AnimatedImg
                  src={rect1}
                  alt="Beachside villa"
                  style={{ 
                    width: isLargeScreen ? "320px" : "350px", 
                    maxWidth: "unset" 
                  }}
                />
              </div>
              <div className="max-w-xs mx-auto" style={{ maxWidth: "calc(380px + 180px)" }}>
                <AnimatedImg
                  src={rect3}
                  alt="Beach sunset view"
                  text="Proximity to hill stations, beaches and cultural landmarks"
                  delay={0.2}
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
