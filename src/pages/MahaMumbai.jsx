import React, { useState, useEffect } from 'react'
import { useSmootherScroll } from '../hooks/useSmootherScroll';
import { applyScrollOptimizations } from '../utils/scrollOptimizer';
import bgimgWEb from '../assets/mumbai-skyline-webm.webp';
import GrowthSection from '../components/GrowthSection';
import KeyHighlights from '../components/KeyHighlights';
import NaturalBeauty from '../components/NaturalBeauty';
import WhyChooseUs from '../components/WhyChooseUs';
import TimeLine from '../components/TimeLine';
import FloatingLand from '../components/FloatingLand';


const OptimizedImageSection = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);


    

  useEffect(() => {    
    // Check if element is in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' 
      }
    );

    const element = document.getElementById('skyline-section');
    if (element) {
      observer.observe(element);
    }

    // Preload image
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
    };

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [src]);

  return (
    <div 
      id="skyline-section"
      className="relative h-[100vh] w-full overflow-hidden mt-24 py-36"
    >
     
      {/* Loading placeholder */}
      <div 
        className={`absolute inset-0 bg-gray-100 transition-opacity duration-500 ease-out ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-100 to-gray-200" />
      </div>

      {/* Main image container */}
      <div className="absolute inset-0">
        <img 
          className={`h-full w-full object-cover transition-all duration-1000 ease-out ${
            isLoaded && isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Enhanced gradient overlays */}
      <div className="absolute top-0 left-0 right-0">
        {/* Primary fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent"></div>
        
        {/* Soft middle blend */}
        <div className="h-24 -mt-8 bg-gradient-to-b from-[#F8F9FA]/30 via-[#F8F9FA]/20 to-transparent"></div>
        
        {/* Subtle warm undertone */}
        <div className="h-32 -mt-16 bg-gradient-to-b from-[#F5F5F5]/10 via-[#E8E8E8]/5 to-transparent opacity-40"></div>
      </div>

      {/* Subtle texture overlay */}
      <div 
        className="absolute top-0 left-0 right-0 h-48 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Content overlay - if needed */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {/* Add any content that should appear over the image here */}
      </div>
    </div>
  );
};

const MahaMumbai = () => {

  useSmootherScroll();
    
    useEffect(() => {
      applyScrollOptimizations();
    }, []);


  return (
    <div className="relative">
       <div className="scroll-content">
      <OptimizedImageSection 
        src={bgimgWEb} 
        alt="Mumbai Skyline" 
      />
      
      {/* Main content sections */}
      <div className="relative z-10">
        <GrowthSection />
        <KeyHighlights />
        <TimeLine/>
        <FloatingLand/>
        <NaturalBeauty />
        <WhyChooseUs />

      </div>

      </div>
    </div>
  );
};

export default MahaMumbai;