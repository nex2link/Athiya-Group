import React, { useState, useEffect, useCallback } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import KnowMoreButton from "./KnowMoreButton";
import airpot from "../assets/airport.webp";
import bridge from "../assets/bridge.webp";
import highway from "../assets/road.webp";

const WhyMahaMumbai = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const features = [
    { image: airpot, alt: "Airport runway with plane", title: "World-Class Infrastructure" },
    { image: bridge, alt: "Coastal road view", title: "Strategic Location" },
    { image: highway, alt: "Metro infrastructure", title: "Modern Connectivity" }
  ];

  const checkIfMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      let timeoutId = setTimeout(checkIfMobile, 150);
      return () => clearTimeout(timeoutId);
    };
    checkIfMobile();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [checkIfMobile]);

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  useEffect(() => {
    let rafId;
    const animate = (timestamp, lastTime = 0) => {
      if (isMobile && !isPaused && timestamp - lastTime >= 3000) {
        setCurrentIndex(prev => (prev + 1) % features.length);
        lastTime = timestamp;
      }
      rafId = requestAnimationFrame(time => animate(time, lastTime));
    };
    if (isMobile && !isPaused) rafId = requestAnimationFrame(time => animate(time));
    return () => rafId && cancelAnimationFrame(rafId);
  }, [isMobile, isPaused, features.length]);

  const handleTouch = useCallback({
    start: e => { setIsPaused(true); setTouchStart(e.touches[0].clientX); setTouchEnd(null); },
    move: e => setTouchEnd(e.touches[0].clientX),
    end: () => {
      if (!touchStart || !touchEnd) return setIsPaused(false);
      const distance = touchStart - touchEnd;
      if (Math.abs(distance) > 50) {
        const direction = distance > 0 ? 1 : -1;
        setCurrentIndex(prev => (prev + direction + features.length) % features.length);
      }
      setTouchStart(null); setTouchEnd(null); setIsPaused(false);
    }
  }, [touchStart, touchEnd, features.length]);

  const desktopScrollImages = [...features, ...features].map((feature, index) => ({
    ...feature, key: `${feature.title}-${index}`
  }));

  return (
    <section className="w-full py-8 sm:py-12 lg:py-16 overflow-hidden bg-gray-50">
      <motion.div ref={ref} initial="hidden" animate={controls} 
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
          <motion.div className="bg-[#E5EFE1] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 lg:flex-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 pr-8 lg:pr-14">
            Third<br />New Town
            </h2>
            <p className="text-gray-700 text-base sm:text-lg">Invest in the Future of Maha Mumbai</p>
          </motion.div>

          {isMobile ? (
            <motion.div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
              onTouchStart={handleTouch.start} onTouchMove={handleTouch.move} onTouchEnd={handleTouch.end}>
              <AnimatePresence initial={false} mode="wait">
                <Link to="/mahamumbai" key={currentIndex} className="block h-full">
                  <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                    className="absolute inset-0">
                    <img src={features[currentIndex].image} alt={features[currentIndex].alt}
                      className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="text-white text-lg font-medium">{features[currentIndex].title}</p>
                    </div>
                  </motion.div>
                </Link>
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div className="lg:flex-[2] relative overflow-hidden rounded-2xl sm:rounded-3xl">
              <div className="flex gap-4 sm:gap-6 smooth-scroll">
                {desktopScrollImages.map((feature, index) => (
                  <Link to="/mahamumbai" key={feature.key} 
                    className="relative flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px] rounded-xl sm:rounded-2xl overflow-hidden group">
                    <div className="aspect-[4/3]">
                      <img src={feature.image} alt={feature.alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        loading="lazy" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-opacity duration-300" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="text-white text-lg font-medium">{feature.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <motion.div className="flex justify-end mt-6 sm:mt-8">
          <Link to="/mahamumbai"><KnowMoreButton /></Link>
        </motion.div>
      </motion.div>

      <style>{`
        .smooth-scroll {
          animation: smoothScrollX 15s linear infinite;
        }
        @keyframes smoothScrollX {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .smooth-scroll { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default WhyMahaMumbai;