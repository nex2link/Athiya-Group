import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCard"; // Import your existing ProjectCard component
import dapoliimg1 from "../assets/project-1.webp";
import farmimg1 from "../assets/project-2.webp";
import agroimg2 from "../assets/project-3.webp";
import shivimg1 from "../assets/project-4.webp";
import samimg1 from "../assets/project-5.webp";

// Define projects data
const projects = [
  { id: 2, image: farmimg1, title: "Agrow Eco", sqft: "5 to 20" },
  { id: 3, image: shivimg1, title: "Shivsparash", sqft: "5 to 20" },
  { id: 4, image: samimg1, title: "Samarth Hill", sqft: "5 to 20" },
  { id: 5, image: agroimg2, title: "Farm Dale, Pali", sqft: "5 to 20" },
  { id: 6, image: dapoliimg1, title: "Dapoli, Ratnagiri", sqft: "5 to 20" }
];

const HomeProject = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle touch start
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  // Handle touch move
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // Handle touch end
  const handleTouchEnd = () => {
    setIsDragging(false);
    
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        // Swiped left - next slide
        nextSlide();
      } else {
        // Swiped right - previous slide
        prevSlide();
      }
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };
  
  // Go to next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // Go to previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  // Auto-slide for mobile only (with larger interval to avoid performance issues)
  useEffect(() => {
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isMobile, currentIndex]);

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
        // Desktop Layout - Simple horizontal scroll with fixed width cards
        <div className="flex items-center justify-center overflow-hidden">
          <div className="flex gap-6 px-8 py-12 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className="snap-center"
                style={{ width: '350px', flexShrink: 0 }}
              >
                <ProjectCard 
                  project={project}
                  index={index}
                  isVisible={true}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      
      <style jsx="true">{`
        /* Hide scrollbar for clean UI */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* For mobile optimization */
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
      `}</style>
    </section>
  );
};

export default HomeProject;
