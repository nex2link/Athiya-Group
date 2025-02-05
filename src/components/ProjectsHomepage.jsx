import React, { useState, useEffect, useCallback, memo, useMemo } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import project1 from "../assets/project-1.jpg";
import project2 from "../assets/project-2.jpg";
import project3 from "../assets/project-3.jpg";
import project4 from "../assets/project-4.jpg";
import project5 from "../assets/project-5.jpg";

// Memoize the ProjectCard component
const MemoizedProjectCard = memo(ProjectCard);

// Optimized Navigation Button
const NavigationButton = memo(({ onClick, direction, disabled }) => (
  <motion.button
    onClick={onClick}
    className={`p-2 rounded-full bg-gray-900 text-white ${
      disabled ? 'opacity-50' : 'hover:bg-gray-800'
    }`}
    whileHover={disabled ? {} : { scale: 1.1 }}
    whileTap={disabled ? {} : { scale: 0.9 }}
    disabled={disabled}
  >
    {direction === 'left' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
  </motion.button>
));

const ProjectsHomepage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = useMemo(() => [
    {
      id: 1,
      title: "Dapoli, Ratnagiri",
      sqft: "00",
      image: project1
    },
    {
      id: 2,
      title: "Farm Dale",
      sqft: "00",
      image: project2
    },
    {
      id: 3,
      title: "AGrow Eco, Mahad",
      sqft: "00",
      image: project3
    },
    {
      id: 4,
      title: "shivsprash",
      sqft: "00",
      image: project4
    },
    {
      id: 5,
      title: "samarth Hill",
      sqft: "00",
      image: project5
    }
  ], []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Optimized navigation functions with debounce
  const navigate = useCallback((direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setCurrentIndex(prev => {
      if (direction === 'next') {
        return prev === projects.length - 1 ? 0 : prev + 1;
      } else {
        return prev === 0 ? projects.length - 1 : prev - 1;
      }
    });

    // Reset animation lock after transition
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, projects.length]);

  const nextSlide = useCallback(() => navigate('next'), [navigate]);
  const prevSlide = useCallback(() => navigate('prev'), [navigate]);

  // Touch handlers
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Memoized variants with reduced animations for mobile
  const variants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: isMobile ? 0.1 : 0.2 
      } 
    }
  }), [isMobile]);

  return (
    <section className="w-full max-w-8xl mx-auto sm:px-6 lg:px-16 py-8 sm:py-12 lg:py-16">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8 mb-12"
      >
        <motion.h1
          variants={{
            hidden: { opacity: 0, x: isMobile ? -20 : -50 },
            visible: { opacity: 1, x: 0 }
          }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight px-4"
        >
          Innovative real estate solutions for a future-ready lifestyle.
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, x: isMobile ? 20 : 50 },
            visible: { opacity: 1, x: 0 }
          }}
          className="text-gray-600 text-base sm:text-lg lg:ml-auto lg:max-w-md px-4"
        >
          Unlocking opportunities where modern living meets visionary development.
        </motion.p>
      </motion.div>

      <div className="relative overflow-hidden w-full">
        <div 
          className="py-8 sm:py-12"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            className="flex gap-4 sm:gap-6 lg:gap-8"
            initial={false}
            animate={{
              x: `-${currentIndex * 100}%`
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              type: "tween"
            }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="flex-none w-[260px] sm:w-[300px] lg:w-[340px]"
              >
                <MemoizedProjectCard 
                  project={project} 
                  index={index}
                  isVisible={Math.abs(index - currentIndex) <= 1}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation - Hidden during animation */}
        {!isAnimating && (
          <div className="flex justify-between w-full mt-8 p-3">
            <div className="flex items-center gap-4">
              <NavigationButton 
                onClick={prevSlide} 
                direction="left" 
                disabled={isAnimating}
              />
              <div className="w-16 h-px bg-gray-900" />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-px bg-gray-900" />
              <NavigationButton 
                onClick={nextSlide} 
                direction="right" 
                disabled={isAnimating}
              />
            </div>
          </div>
        )}

        {/* Mobile indicator dots */}
        {isMobile && (
          <div className="flex justify-center gap-2 mt-4">
            {projects.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-gray-900 scale-125' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(ProjectsHomepage);