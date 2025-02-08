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

const MemoizedProjectCard = memo(ProjectCard);

const NavigationButton = memo(({ onClick, direction, disabled }) => (
  <motion.button
    onClick={onClick}
    className={`p-2 rounded-full ${
      disabled ? 'bg-gray=300 cursor-not-allowed' : 'bg-gray-900 text-white hover:bg-gray-800'
    }`}
    whileHover={disabled ? {} : { scale: 1.1 }}
    whileTap={disabled ? {} : { scale: 0.9 }}
    disabled={disabled}
  >
    {direction === 'left' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
  </motion.button>
));

NavigationButton.displayName = 'NavigationButton';

const Navigation = memo(({ onPrev, onNext, isAnimating, canGoPrev, canGoNext }) => (
  <div className="flex justify-between w-full mt-8 p-3">
    <div className="flex items-center gap-4">
      <NavigationButton 
        onClick={onPrev} 
        direction="left" 
        disabled={isAnimating || !canGoPrev}
      />
      <div className="w-16 h-px bg-gray-900" />
    </div>
    
    <div className="flex items-center gap-4">
      <div className="w-16 h-px bg-gray-900" />
      <NavigationButton 
        onClick={onNext} 
        direction="right" 
        disabled={isAnimating || !canGoNext}
      />
    </div>
  </div>
));

Navigation.displayName = 'Navigation';

const ProjectsHomepage = () => {
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [visibleCards, setVisibleCards] = useState(1);

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

  useEffect(() => {
    let timeoutId = null;
    const handleResize = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        setIsMobile(width <= 768);
        // Calculate visible cards based on viewport
        if (width < 640) setVisibleCards(1);        // mobile
        else if (width < 1024) setVisibleCards(2);  // tablet
        else setVisibleCards(3);                    // desktop
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
    
    if (containerRef.current) {
      containerRef.current.style.willChange = 'transform';
    }
  }, [currentIndex, cardWidth, gapWidth]);

  const handleTouchMove = useCallback((e) => {
    if (!touchRef.current.isDragging) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchRef.current.startX;
    const deltaY = touch.clientY - touchRef.current.startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      e.preventDefault();
      
      // Calculate boundaries
      const maxTranslate = 0;
      const minTranslate = -((projects.length - 1) * (cardWidth + gapWidth));
      
      // Limit the translation within bounds
      const proposedTranslate = touchRef.current.prevTranslate + deltaX;
      const boundedTranslate = Math.max(minTranslate, Math.min(maxTranslate, proposedTranslate));
      
      touchRef.current.currentTranslate = boundedTranslate;  // Store bounded value

      const timeElapsed = Date.now() - touchRef.current.startTime;
      touchRef.current.velocity = deltaX / timeElapsed;

      if (touchRef.current.animationFrame) {
        cancelAnimationFrame(touchRef.current.animationFrame);
      }

      touchRef.current.animationFrame = requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.style.transform = `translateX(${boundedTranslate}px)`;  // Use bounded value
          containerRef.current.style.transition = 'none';
        }
      });
    }
  }, [cardWidth, gapWidth, projects.length]);
  const handleTouchEnd = useCallback((e) => {
    if (!touchRef.current.isDragging) return;
    
    if (touchRef.current.animationFrame) {
      cancelAnimationFrame(touchRef.current.animationFrame);
    }

    const { velocity, currentTranslate, prevTranslate } = touchRef.current;
    const deltaX = currentTranslate - prevTranslate;
    const timeElapsed = Date.now() - touchRef.current.startTime;
    
    const momentumThreshold = 0.1;
    const minSwipeDistance = 50;
    
    let newIndex = currentIndex;
    const maxIndex = projects.length - visibleCards;
    
    if (Math.abs(velocity) > momentumThreshold || Math.abs(deltaX) > minSwipeDistance) {
      const direction = deltaX > 0 ? -1 : 1;
      newIndex = Math.max(0, Math.min(currentIndex + direction, maxIndex));
    }
    
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
}, [currentIndex, projects.length, cardWidth, gapWidth, visibleCards]);

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

  // Update your navigate function
  const navigate = useCallback((direction) => {
    if (isAnimating || isDragging) return;
    
    const targetIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    const maxIndex = projects.length - visibleCards;
    
    if (targetIndex < 0 || targetIndex > maxIndex) return;
    
    setIsAnimating(true);
    setCurrentIndex(targetIndex);
    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating, isDragging, currentIndex, projects.length, visibleCards]);

  const handlePrev = useCallback(() => navigate('prev'), [navigate]);
  const handleNext = useCallback(() => navigate('next'), [navigate]);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = useMemo(() => ({
    hidden: { 
      opacity: 0,
      transform: 'translateZ(0)'
    },
    visible: { 
      opacity: 1,
      transform: 'translateZ(0)',
      transition: { 
        staggerChildren: isMobile ? 0.15 : 0.25,
        delayChildren: 0.1,
        ease: [0.25, 0.1, 0.25, 1],
        duration: 0.6
      } 
    }
  }), [isMobile]);

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
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="flex-none w-[260px] sm:w-[300px] lg:w-[300px] xl:w-[320px]"
              >
                <MemoizedProjectCard 
                  project={project} 
                  index={index}
                  isVisible={Math.abs(index - currentIndex) <= 3}
                />
              </div>
            ))}
          </div>
        </div>

  <Navigation 
    onPrev={handlePrev}
    onNext={handleNext}
    isAnimating={isAnimating || isDragging}
    canGoPrev={currentIndex > 0}
    canGoNext={currentIndex < projects.length - visibleCards}
  />

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