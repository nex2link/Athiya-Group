import React, { useState, useCallback, memo, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AnandKamble from "../assets/anandkamble.jpg"
import swetamestry from "../assets/shewtamestry.jpeg"
import premanandkamble from "../assets/Premanand-Kamble.jpg"

const ExpertCard = memo(({ image, name, isVisible, index }) => (
  <div 
    className={`
      transform transition-all duration-500 ease-in-out
      ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}
      aspect-square relative bg-black rounded-lg overflow-hidden
      hover:scale-105 transition-transform duration-300
    `}
  >
    <img src={image} alt={name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
      <h3 className="text-white text-lg font-semibold">{name}</h3>
    </div>
  </div>
));

ExpertCard.displayName = 'ExpertCard';

const OurExperts = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const timeoutRef = useRef(null);

  const experts = [
    { id: 1, image: AnandKamble, name: "Anand Kamble" },
    { id: 2, image: swetamestry, name: "Shewta Mestry" },
    { id: 3, image: premanandkamble, name: "Premanand Kamble" },
  ];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-advance slides only on smaller screens
  useEffect(() => {
    const visibleSlides = getVisibleSlidesCount();
    const needsCarousel = experts.length > visibleSlides;
    
    if (needsCarousel) {
      timeoutRef.current = setInterval(() => {
        if (!isAnimating) handleNextSlide();
      }, 5000);
    }

    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [currentSlide, isAnimating, windowWidth]);

  const getVisibleSlidesCount = () => {
    if (windowWidth < 640) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };

  const handleSlideChange = useCallback((direction) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const visibleSlides = getVisibleSlidesCount();
    const totalSlides = Math.ceil(experts.length / visibleSlides);
    
    setCurrentSlide(prev => {
      if (direction === 'next') return (prev + 1) % totalSlides;
      return (prev - 1 + totalSlides) % totalSlides;
    });

    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, experts.length]);

  const handleNextSlide = useCallback(() => handleSlideChange('next'), [handleSlideChange]);
  const handlePrevSlide = useCallback(() => handleSlideChange('prev'), [handleSlideChange]);

  // Get visible experts based on current slide
  const getVisibleExperts = () => {
    const visibleSlides = getVisibleSlidesCount();
    const startIndex = currentSlide * visibleSlides;
    return experts.slice(startIndex, startIndex + visibleSlides);
  };

  const showControls = getVisibleSlidesCount() < experts.length;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 sm:py-16">
      <div className="mb-8 sm:mb-12 opacity-0 animate-fade-in">
        <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-center sm:text-left">
          Meet Our Experts and World
          <br className="hidden sm:block" />
          Class Problem Solvers
        </h2>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {getVisibleExperts().map((expert, index) => (
            <ExpertCard
              key={expert.id}
              {...expert}
              isVisible={!isAnimating}
              index={index}
            />
          ))}
        </div>

        {/* Navigation Arrows - only visible when needed */}
        {showControls && (
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 pointer-events-none">
            <button 
              onClick={handlePrevSlide}
              disabled={isAnimating}
              className="transform -translate-x-4 p-2 sm:p-4 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all duration-300 pointer-events-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
            <button 
              onClick={handleNextSlide}
              disabled={isAnimating}
              className="transform translate-x-4 p-2 sm:p-4 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all duration-300 pointer-events-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          </div>
        )}

        {/* Dots navigation - only visible when needed */}
        {showControls && (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: Math.ceil(experts.length / getVisibleSlidesCount()) }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) setCurrentSlide(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-yellow-400 w-4' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <style global="true">{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default memo(OurExperts);