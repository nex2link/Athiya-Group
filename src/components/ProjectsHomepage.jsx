import React, { useState, useEffect, useCallback, memo, useMemo, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "./ProjectCard";

import dapoliimg1 from "../assets/project-1.jpg";
import agroimg2 from "../assets/project-2.jpg";
import farmimg1 from "../assets/project-3.jpg";
import shivimg1 from "../assets/project-4.jpg";
import samimg1 from "../assets/project-5.jpg";

// Memoized ProjectCard 
const MemoizedProjectCard = memo(ProjectCard);

// NavigationButton component
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

NavigationButton.displayName = 'NavigationButton';

// Navigation container component
const Navigation = memo(({ onPrev, onNext, isAnimating }) => (
  <div className="flex justify-between w-full mt-8 p-3">
    <div className="flex items-center gap-4">
      <NavigationButton 
        onClick={onPrev} 
        direction="left" 
        disabled={isAnimating}
      />
      <div className="w-16 h-px bg-gray-900" />
    </div>
    
    <div className="flex items-center gap-4">
      <div className="w-16 h-px bg-gray-900" />
      <NavigationButton 
        onClick={onNext} 
        direction="right" 
        disabled={isAnimating}
      />
    </div>
  </div>
));

Navigation.displayName = 'Navigation';

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

  const extendedProjects = useMemo(() => {
    return [
      ...projects.slice(-3),
      ...projects,
      ...projects.slice(0, 3)
    ];
  }, [projects]);

  const [currentIndex, setCurrentIndex] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef(null);
  const touchRef = useRef({
    startX: 0,
    startY: 0,
    startTime: 0,
    isDragging: false,
    currentTranslate: 0,
    prevTranslate: 0,
    velocity: 0,
    animationFrame: null
  });

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

  const cardWidth = isMobile ? 260 : 300;
  const gapWidth = isMobile ? 16 : 32;

  // Optimized touch handling with velocity and momentum
  const handleTouchStart = useCallback((e) => {
    if (touchRef.current.animationFrame) {
      cancelAnimationFrame(touchRef.current.animationFrame);
    }

    const touch = e.touches[0];
    touchRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now(),
      isDragging: true,
      currentTranslate: -currentIndex * (cardWidth + gapWidth),
      prevTranslate: -currentIndex * (cardWidth + gapWidth),
      velocity: 0,
      animationFrame: null
    };
    
    setIsDragging(true);
    
    // Apply GPU acceleration
    if (containerRef.current) {
      containerRef.current.style.willChange = 'transform';
    }
  }, [currentIndex, cardWidth, gapWidth]);

  const handleTouchMove = useCallback((e) => {
    if (!touchRef.current.isDragging) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchRef.current.startX;
    const deltaY = touch.clientY - touchRef.current.startY;

    // Check if scrolling is more horizontal than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      e.preventDefault();
      
      const currentTranslate = touchRef.current.prevTranslate + deltaX;
      touchRef.current.currentTranslate = currentTranslate;

      // Calculate velocity
      const timeElapsed = Date.now() - touchRef.current.startTime;
      touchRef.current.velocity = deltaX / timeElapsed;

      // Use requestAnimationFrame for smooth animation
      if (touchRef.current.animationFrame) {
        cancelAnimationFrame(touchRef.current.animationFrame);
      }

      touchRef.current.animationFrame = requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.style.transform = `translateX(${currentTranslate}px)`;
          containerRef.current.style.transition = 'none';
        }
      });
    }
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (!touchRef.current.isDragging) return;
    
    if (touchRef.current.animationFrame) {
      cancelAnimationFrame(touchRef.current.animationFrame);
    }

    const { velocity, currentTranslate, prevTranslate } = touchRef.current;
    const deltaX = currentTranslate - prevTranslate;
    const timeElapsed = Date.now() - touchRef.current.startTime;
    
    // Calculate final position based on velocity and distance
    const momentumThreshold = 0.1;
    const minSwipeDistance = 50;
    
    let newIndex = currentIndex;
    
    if (Math.abs(velocity) > momentumThreshold || Math.abs(deltaX) > minSwipeDistance) {
      const direction = deltaX > 0 ? -1 : 1;
      newIndex = currentIndex + direction;
      
      // Handle edge cases
      if (newIndex >= projects.length + 3) {
        newIndex = 3;
      } else if (newIndex < 3) {
        newIndex = projects.length + 2;
      }
    }
    
    // Animate to final position with easing
    requestAnimationFrame(() => {
      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(${-newIndex * (cardWidth + gapWidth)}px)`;
        containerRef.current.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        containerRef.current.style.willChange = 'auto';
      }
      
      setCurrentIndex(newIndex);
      setIsDragging(false);
      touchRef.current.isDragging = false;
    });
  }, [currentIndex, projects.length, cardWidth, gapWidth]);

  // Add passive touch listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const options = { passive: false };
    
    container.addEventListener('touchstart', handleTouchStart, options);
    container.addEventListener('touchmove', handleTouchMove, options);
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchEnd);
      
      if (touchRef.current.animationFrame) {
        cancelAnimationFrame(touchRef.current.animationFrame);
      }
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Navigation functions
  const navigate = useCallback((direction) => {
    if (isAnimating || isDragging) return;
    setIsAnimating(true);

    const targetIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
    requestAnimationFrame(() => {
      setCurrentIndex(targetIndex);

      if (targetIndex >= projects.length + 3) {
        setTimeout(() => {
          setIsAnimating(true);
          setCurrentIndex(3);
          setTimeout(() => setIsAnimating(false), 50);
        }, 300);
      } else if (targetIndex < 3) {
        setTimeout(() => {
          setIsAnimating(true);
          setCurrentIndex(projects.length + 2);
          setTimeout(() => setIsAnimating(false), 50);
        }, 300);
      }
    });

    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating, isDragging, projects.length, currentIndex]);

  const handlePrev = useCallback(() => navigate('prev'), [navigate]);
  const handleNext = useCallback(() => navigate('next'), [navigate]);

  // Animation controls based on viewport
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Memoized variants
  const variants = useMemo(() => ({
    hidden: { 
      opacity: 0,
      transform: 'translateZ(0)' // Enable hardware acceleration
    },
    visible: { 
      opacity: 1,
      transform: 'translateZ(0)',
      transition: { 
        staggerChildren: isMobile ? 0.15 : 0.25,
        delayChildren: 0.1,
        ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for smoother motion
        duration: 0.6
      } 
    }
  }), [isMobile]);

    // Optimized text animation variants
const textVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    transform: 'translateZ(0)',
    filter: 'blur(8px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    transform: 'translateZ(0)',
    filter: 'blur(0px)',
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};


  return (
    <section className="w-full max-w-[1920px] mx-auto sm:px-6 lg:px-16 py-8 sm:py-12 lg:py-16">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8 mb-12"
        style={{
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden'
        }}
      >
        <motion.div
          variants={textVariants}
          className="perspective"
          style={{
            willChange: 'transform, opacity, filters',
            backfaceVisibility: 'hidden'
          }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight px-4">
          Innovative real estate solutions for a future-ready lifestyle.
          </h1>
        </motion.div>

        <motion.div
          variants={textVariants}
          className="perspective"
          style={{
            willChange: 'transform, opacity, filter',
            backfaceVisibility: 'hidden'
          }}
        >
          <p className="text-gray-600 text-base sm:text-lg lg:ml-auto lg:max-w-md px-4">
          Unlocking opportunities where modern living meets visionary development.
          </p>
        </motion.div>
      </motion.div>

      <div className="relative overflow-hidden w-full">
        <div 
          ref={containerRef}
          className="py-8 sm:py-12"
        >
          <div
            className={`flex gap-4 sm:gap-6 lg:gap-8 w-max ${isDragging ? 'touch-none' : ''}`}
            style={{
              transform: `translateX(${-currentIndex * (cardWidth + gapWidth)}px)`,
              transition: isAnimating && !isDragging ? 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
            }}
          >
            {extendedProjects.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
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

        <Navigation 
          onPrev={handlePrev}
          onNext={handleNext}
          isAnimating={isAnimating || isDragging}
        />

        {/* Mobile indicator dots */}
        {isMobile && (
          <div className="flex justify-center gap-2 mt-4">
            {projects.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex - 3 ? 'bg-gray-900 scale-125' : 'bg-gray-300'
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