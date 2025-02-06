import React, { useState, useEffect, useCallback, memo, useMemo } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "./ProjectCard";

import dapoliimg1 from "../assets/project-1.jpg";
import agroimg2 from "../assets/project-2.jpg";
import farmimg1 from "../assets/project-3.jpg";
import shivimg1 from "../assets/project-4.jpg";
import samimg1 from "../assets/project-5.jpg";

// Memoize the ProjectCard component
const MemoizedProjectCard = memo(ProjectCard);



const ProjectsHomepage = () => {

  
  // Memoized projects data
  const projects = useMemo(() => [
    {
      id: 2,
      title: "Dapoli 712",
      sqft: "5000",
      image: dapoliimg1
    },
    {
      id: 3,
      title: "AGrow Eco",
      sqft: "20000",
      image: agroimg2
    },
    {
      id: 4,
      title: "The Farm Dale",
      sqft: "5000",
      image: farmimg1
    },
    {
      id: 5,
      title: "Shivsprash",
      sqft: "5000",
      image: shivimg1
    },
    {
      id: 6,
      title: "Samarth Hill",
      sqft: "5000",
      image: samimg1
    }
  ], []);





  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });


  const extendedProjects = useMemo(()=>{
    const extendedProjects = [...projects];
    return[
      ...projects.slice(-3),
      ...projects,
      ...projects.slice(0, 3)

    ]
}, [projects]);

  const [currentIndex, setCurrentIndex] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Throttled resize handler
  useEffect(() => {
    let timeoutId = null;
    const handleResize = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth <= 768);
        timeoutId = null;
      }, 150);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Optimized navigation with requestAnimationFrame
  const navigate = useCallback((direction) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const targetIndex = direction ==='next'? currentIndex + 1 : currentIndex - 1
    
    requestAnimationFrame(() => {
      setCurrentIndex(targetIndex);

      if(targetIndex >= projects.length + 3){
        setTimeout(()=>{
          setIsAnimating(true);
          setCurrentIndex(3);
          setTimeout(() => setIsAnimating(false), 50)
        , 300})
      } else if (targetIndex < 3){
        setTimeout(()=>{
          setIsAnimating(true);
          setCurrentIndex(projects.length + 2)
          setTimeout(()=> setIsAnimating(false), 50)
        }, 300);
      }
      });

    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating, projects.length, currentIndex]);

  // Optimized Navigation Button with reduced re-renders
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

  // Optimized touch handling with throttling
  const handleSwipe = useCallback(() => {
    let startX = 0;
    let timeoutId = null;
    
    return {
      onTouchStart: (e) => {
        startX = e.touches[0].clientX;
      },
      onTouchEnd: (e) => {
        if (timeoutId) return;
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        timeoutId = setTimeout(() => {
          if (Math.abs(diff) > 50) {
            navigate(diff > 0 ? 'next' : 'prev');
          }
          timeoutId = null;
        }, 100);
      }
    };
  }, [navigate]);

  const swipeHandlers = useMemo(() => handleSwipe(), [handleSwipe]);

  // Animation controls based on viewport
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

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  , []);

  const cardWidth = isMobile ? 260 : 300;
  const gapWidth = isMobile ? 16 : 32;
  // Optimized carousel style with will-change
  const carouselStyle = useMemo(() => ({
    transform: `translateX(-${currentIndex * (cardWidth + gapWidth)}px)`,
    transition: isAnimating ? 'transform 0.3s ease-out' : 'none',
    willChange: 'transform',
  }), [currentIndex, prefersReducedMotion, isAnimating]);

  return (
    <section className="w-full max-w-[1920px] mx-auto sm:px-6 lg:px-16 py-8 sm:py-12 lg:py-16">
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
          {...swipeHandlers}
        >
          <div
            className="flex gap-4 sm:gap-6 lg:gap-8 w-max "
            style={carouselStyle}
          >
            {extendedProjects.map((project, index) => (
              <div
                key={`${project.id}-$${index}`}
                className="flex-none w-[260px] sm:w-[300px] lg:w-[300px] xl:w-[320px]"
              >
                <MemoizedProjectCard 
                  project={project} 
                  index={index}
                  isVisible={Math.abs(index - (currentIndex + 3)) <= 3}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation - Hidden during animation */}
        {!isAnimating && (
          <div className="flex justify-between w-full mt-8 p-3">
            <div className="flex items-center gap-4">
              <NavigationButton 
                onClick={() => navigate('prev')} 
                direction="left" 
                disabled={isAnimating}
              />
              <div className="w-16 h-px bg-gray-900" />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-px bg-gray-900" />
              <NavigationButton 
                onClick={() => navigate('next')} 
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