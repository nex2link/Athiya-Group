import React, { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import KnowMoreButton from "./KnowMoreButton";
import airpot from "../assets/airport.jpg"
import bridge from "../assets/bridge.jpg"
import highway from "../assets/road.jpg"
import { Link } from "react-router-dom";

const WhyMahaMumbai = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // State for carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const features = [
    {
      image: airpot,
      alt: "Airport runway with plane",
      title: "World-Class Infrastructure"
    },
    {
      image: bridge,
      alt: "Coastal road view",
      title: "Strategic Location"
    },
    {
      image: highway,
      alt: "Metro infrastructure",
      title: "Modern Connectivity"
    }
  ];

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Auto-slide functionality for mobile
  useEffect(() => {
    let interval;
    if (isMobile && !isPaused) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % features.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isMobile, isPaused, features.length]);

  // Handle touch events for mobile
  const handleTouchStart = (e) => {
    setIsPaused(true);
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Create duplicated array for desktop infinite scroll
  const desktopScrollImages = [...features, ...features, ...features].map((feature, index) => ({
    ...feature,
    key: `${feature.title}-${index}`
  }));

  return (
    <section className="w-full py-8 sm:py-12 lg:py-16 overflow-hidden bg-gray-50">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.6 } }
        }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
          {/* Left section */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
            }}
            className="bg-[#E5EFE1] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 
                       lg:flex-1 transform transition-all duration-500"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 pr-8 lg:pr-14">
              Why<br />Maha Mumbai?
            </h2>
            <p className="text-gray-700 text-base sm:text-lg">
              Invest in the Future of Maha Mumbai
            </p>
          </motion.div>

          {/* Images section */}
          {isMobile ? (
            /* Mobile Carousel */
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
              }}
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentIndex}
                  initial={{ 
                    opacity: 0,
                    x: 50,
                    scale: 0.95
                  }}
                  animate={{ 
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    transition: {
                      opacity: { duration: 0.5, ease: "easeInOut" },
                      x: { duration: 0.5, ease: "easeOut" },
                      scale: { duration: 0.5, ease: "easeOut" }
                    }
                  }}
                  exit={{ 
                    opacity: 0,
                    x: -50,
                    scale: 0.95,
                    transition: {
                      opacity: { duration: 0.3, ease: "easeInOut" },
                      x: { duration: 0.3, ease: "easeIn" },
                      scale: { duration: 0.3, ease: "easeIn" }
                    }
                  }}
                  className="absolute inset-0 will-change-transform"
                >
                  <img 
                    src={features[currentIndex].image}
                    alt={features[currentIndex].alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: {
                          delay: 0.2,
                          duration: 0.4
                        }
                      }}
                      className="text-white text-lg font-medium"
                    >
                      {features[currentIndex].title}
                    </motion.p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2">
                {features.map((_, index) => (
                  <motion.div
                    key={index}
                    initial={false}
                    animate={{
                      scale: index === currentIndex ? 1.25 : 1,
                      opacity: index === currentIndex ? 1 : 0.5
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                    className="w-2 h-2 rounded-full bg-white"
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            /* Desktop infinite scroll */
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
              }}
              className="lg:flex-[2] relative overflow-hidden rounded-2xl sm:rounded-3xl"
            >
              <div className="relative">
                <div 
                  className="flex gap-4 sm:gap-6 animate-scroll"
                  style={{ width: "max-content" }}
                >
                  {desktopScrollImages.map((feature, index) => (
                    <motion.div 
                      key={feature.key}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { 
                          opacity: 1, 
                          y: 0,
                          transition: { duration: 0.5, delay: index * 0.1 }
                        }
                      }}
                      className="relative flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px] 
                               rounded-xl sm:rounded-2xl overflow-hidden group"
                    >
                      <div className="aspect-[4/3]">
                        <img 
                          src={feature.image} 
                          alt={feature.alt}
                          className="w-full h-full object-cover transform transition-transform duration-700 
                                   group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 
                                      transition-colors duration-300" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t 
                                    from-black/60 to-transparent">
                        <p className="text-white text-lg font-medium">{feature.title}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Button */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.4, duration: 0.6 }
            }
          }}
          className="flex justify-end mt-6 sm:mt-8"
        >
          <Link to="/mahamumbai">
          <KnowMoreButton />
          </Link>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        .animate-scroll {
          animation: scrollX 20s linear infinite;
          will-change: transform;
        }

        @keyframes scrollX {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-scroll {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyMahaMumbai;