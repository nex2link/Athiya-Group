import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import dapoliimg1 from "../assets/project-1.webp";
import farmimg1 from "../assets/project-2.webp";
import agroimg2 from "../assets/project-3.webp";
import shivimg1 from "../assets/project-4.webp";
import samimg1 from "../assets/project-5.webp";

const projects = [
  { id: 2, image: farmimg1, title: "Agrow Eco", sqft: "Mahad, Raigad" },
  { id: 4, image: samimg1, title: "Samarth Hill", sqft: "Vaibhavwadi, Sindhdurg" },
  { id: 3, image: shivimg1, title: "Shivsparash", sqft: "Tala, Raigad" },
  { id: 5, image: agroimg2, title: "Farm Dale", sqft: "Pali, Raigad" },
  { id: 6, image: dapoliimg1, title: "Dalopli", sqft: "Dapoli, Ratnagiri" }
];

const HomeProject = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const carouselTrackRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle touch start
  const handleTouchStart = e => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
    setIsPaused(true); // Pause auto-scroll on touch
  };

  // Handle touch move
  const handleTouchMove = e => {
    if (!isDragging) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // Handle touch end
  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsPaused(false); // Resume auto-scroll
    
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    if (Math.abs(distance) > minSwipeDistance) {
      distance > 0 ? nextSlide() : prevSlide();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };
  
  // Go to next slide
  const nextSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // Go to previous slide
  const prevSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  // Auto-scroll for mobile
  useEffect(() => {
    if (!isMobile || isPaused) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isMobile, currentIndex, isPaused]);

  return (
    <section className="relative py-10 min-h-[60vh] md:min-h-[80vh]">
      {isMobile ? (
        // Mobile Carousel
        <div className="w-full px-4">
          <h2 className="text-2xl font-bold text-center mb-6">Our Projects</h2>
          <div 
            ref={containerRef}
            className="mobile-carousel relative w-full max-w-[90%] mx-auto touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="carousel-inner w-full transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div 
                  key={project.id}
                  className="carousel-item w-full flex-shrink-0"
                  style={{ 
                    position: 'absolute', 
                    left: `${index * 100}%`,
                    width: '100%' 
                  }}
                >
                  <ProjectCard 
                    project={project}
                    index={index}
                    isVisible={index === currentIndex}
                  />
                </div>
              ))}
            </div>
            
            {/* Simple dot indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-black' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Desktop Layout with CSS-based continuous scroll animation
        <div className="carousel-container relative w-full overflow-hidden py-12">
          <h2 className="text-2xl font-bold text-center mb-6">Our Projects</h2>
          <div 
            className="carousel-wrapper relative w-full overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div 
              ref={carouselTrackRef}
              className="carousel-track flex"
              style={{
                animation: 'scroll 25s linear infinite',
                animationPlayState: isPaused ? 'paused' : 'running',
                width: 'fit-content' // Allow the track to be as wide as needed
              }}
            >
              {/* First set of items */}
              {projects.map(project => (
                <div 
                  key={project.id}
                  className="carousel-item mx-3"
                  style={{ width: '350px', flexShrink: 0 }}
                >
                  <ProjectCard 
                    project={project}
                    index={project.id}
                    isVisible={true}
                  />
                </div>
              ))}
              
              {/* Duplicate set for seamless looping */}
              {projects.map(project => (
                <div 
                  key={`clone-${project.id}`}
                  className="carousel-item mx-3"
                  style={{ width: '350px', flexShrink: 0 }}
                >
                  <ProjectCard 
                    project={project}
                    index={project.id}
                    isVisible={true}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <style jsx="true">{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .mobile-carousel {
          height: 450px;
          overflow: hidden;
          touch-action: pan-y;
          position: relative;
          box-sizing: border-box;
        }
        
        .carousel-inner {
          position: relative;
          height: 100%;
          width: 100%;
          will-change: transform;
        }
        
        /* CSS Animation for continuous scrolling */
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%); /* Move exactly one set of items */
          }
        }
        
        .carousel-container {
          padding: 0 20px;
        }
        
        .carousel-wrapper {
          margin: 0 auto;
          max-width: calc(100% - 100px);
        }
        
        .carousel-track {
          display: flex;
          width: fit-content;
          will-change: transform;
          transition: animation-play-state 0.3s ease;
        }
        
        .carousel-item {
          transition: transform 0.3s ease;
        }
        
        .carousel-item:hover {
          transform: scale(1.02);
        }
      `}</style>
    </section>
  );
};

export default HomeProject;