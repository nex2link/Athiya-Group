import React, { useState, useEffect, useCallback } from "react";
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
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

  // Optimized resize handler with debounce
  const checkIfMobile = useCallback(() => {
    const mobileBreakpoint = 640;
    const isMobileView = window.innerWidth < mobileBreakpoint;
    if (isMobileView !== isMobile) {
      setIsMobile(isMobileView);
    }
  }, [isMobile]);

  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkIfMobile, 150);
    };

    checkIfMobile();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [checkIfMobile]);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Optimized auto-slide with RAF
  useEffect(() => {
    let rafId;
    let lastTime = 0;
    const interval = 3000; // Increased interval for smoother transitions

    const animate = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const progress = timestamp - lastTime;

      if (isMobile && !isPaused && progress >= interval) {
        setCurrentIndex((prev) => (prev + 1) % features.length);
        lastTime = timestamp;
      }

      rafId = requestAnimationFrame(animate);
    };

    if (isMobile && !isPaused) {
      rafId = requestAnimationFrame(animate);
    }

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isMobile, isPaused, features.length]);

  // Optimized touch handlers
  const handleTouchStart = useCallback((e) => {
    setIsPaused(true);
    setTouchStart(e.touches[0].clientX);
    setTouchEnd(null);
  }, []);

  const handleTouchMove = useCallback((e) => {
    setTouchEnd(e.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) {
      setIsPaused(false);
      return;
    }

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) > minSwipeDistance) {
      const direction = distance > 0 ? 1 : -1;
      setCurrentIndex((prev) => {
        const next = prev + direction;
        if (next < 0) return features.length - 1;
        if (next >= features.length) return 0;
        return next;
      });
    }

    setTouchStart(null);
    setTouchEnd(null);
    setIsPaused(false);
  }, [touchStart, touchEnd, features.length]);

  // Mobile carousel variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }
    })
  };

  // Create optimized desktop scroll images
  const desktopScrollImages = [...features, ...features].map((feature, index) => ({
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
          visible: { opacity: 1, transition: { duration: 0.4 } }
        }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
          {/* Left section */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { 
                opacity: 1, 
                x: 0, 
                transition: { 
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                } 
              }
            }}
            className="bg-[#E5EFE1] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 
                       lg:flex-1 will-change-transform"
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
              <AnimatePresence
                initial={false}
                mode="wait"
                custom={touchStart && touchEnd ? Math.sign(touchEnd - touchStart) : 1}
              >
                <motion.div
                  key={currentIndex}
                  custom={touchStart && touchEnd ? Math.sign(touchEnd - touchStart) : 1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 will-change-transform"
                  style={{
                    containIntrinsicSize: '100%',
                    contain: 'layout'
                  }}
                >
                  <img 
                    src={features[currentIndex].image}
                    alt={features[currentIndex].alt}
                    className="w-full h-full object-cover transform-gpu"
                    loading="lazy"
                    style={{
                      willChange: 'transform',
                      backfaceVisibility: 'hidden'
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                          delay: 0.1
                        }
                      }}
                      className="text-white text-lg font-medium will-change-transform"
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
                      scale: index === currentIndex ? 1.2 : 1,
                      opacity: index === currentIndex ? 1 : 0.6
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                    className="w-2 h-2 rounded-full bg-white will-change-transform"
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
              }}
              className="lg:flex-[2] relative overflow-hidden rounded-2xl sm:rounded-3xl"
            >
              <div className="relative">
                <div 
                  className="flex gap-4 sm:gap-6 smooth-scroll"
                  style={{ 
                    width: "max-content",
                    willChange: 'transform'
                  }}
                >
                  {desktopScrollImages.map((feature, index) => (
                    <motion.div 
                      key={feature.key}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { 
                          opacity: 1, 
                          y: 0,
                          transition: { 
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                            delay: index * 0.1 
                          }
                        }
                      }}
                      className="relative flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px] 
                               rounded-xl sm:rounded-2xl overflow-hidden group"
                      style={{ contain: 'layout' }}
                    >
                      <div className="aspect-[4/3]">
                        <img 
                          src={feature.image} 
                          alt={feature.alt}
                          className="w-full h-full object-cover transform-gpu transition-transform 
                                   duration-700 group-hover:scale-110"
                          loading="lazy"
                          style={{
                            willChange: 'transform',
                            backfaceVisibility: 'hidden'
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 
                                      transition-opacity duration-300" />
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

        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: 0.3
              }
            }
          }}
          className="flex justify-end mt-6 sm:mt-8"
        >
          <Link to="/mahamumbai">
            <KnowMoreButton />
          </Link>
        </motion.div>
      </motion.div>

      <style>{`
        .smooth-scroll {
          animation: smoothScrollX 30s linear infinite;
          will-change: transform;
        }

        @keyframes smoothScrollX {
          0% {
            transform: translateX(0) translateZ(0);
          }
          100% {
            transform: translateX(-50%) translateZ(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .smooth-scroll {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyMahaMumbai;