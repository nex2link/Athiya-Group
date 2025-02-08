import React, { useState, useCallback, memo, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Memoized Expert Card Component
const ExpertCard = memo(({ image, name, isVisible, index }) => (
  <div 
    className={`
      transform transition-all duration-500 ease-in-out
      ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}
      aspect-square relative bg-black rounded-lg overflow-hidden
      hover:scale-105 transition-transform duration-300
    `}
  >
    <img
      src={image}
      alt={name}
      className="w-full h-full object-cover"
      loading="lazy"
      decoding="async"
    />
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
      <h3 className="text-white text-lg font-semibold">{name}</h3>
    </div>
  </div>
));

ExpertCard.displayName = 'ExpertCard';

const OurExperts = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef(null);

  const experts = [
    { id: 1, image: "/api/placeholder/400/400", name: "Expert 1" },
    { id: 2, image: "/api/placeholder/400/400", name: "Expert 2" },
    { id: 3, image: "/api/placeholder/400/400", name: "Expert 3" },
    { id: 4, image: "/api/placeholder/400/400", name: "Expert 4" },
    { id: 5, image: "/api/placeholder/400/400", name: "Expert 5" },
    { id: 6, image: "/api/placeholder/400/400", name: "Expert 6" },
  ];

  // Auto-advance slides
  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      if (!isAnimating) {
        handleNextSlide();
      }
    }, 5000);

    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
  }, [currentSlide, isAnimating]);

  const handleSlideChange = useCallback((direction) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const totalSlides = Math.ceil(experts.length / getVisibleSlidesCount());
    
    setCurrentSlide(prev => {
      if (direction === 'next') {
        return (prev + 1) % totalSlides;
      }
      return (prev - 1 + totalSlides) % totalSlides;
    });

    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, experts.length]);

  const handleNextSlide = useCallback(() => handleSlideChange('next'), [handleSlideChange]);
  const handlePrevSlide = useCallback(() => handleSlideChange('prev'), [handleSlideChange]);

  // Responsive slides calculation
  const getVisibleSlidesCount = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  // Get visible experts based on current slide
  const getVisibleExperts = () => {
    const slidesCount = getVisibleSlidesCount();
    const startIndex = currentSlide * slidesCount;
    return experts.slice(startIndex, startIndex + slidesCount);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 sm:py-16">
      {/* Heading with animation */}
      <div className="mb-8 sm:mb-12 opacity-0 animate-fade-in">
        <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-center sm:text-left">
          Meet Our Experts and World
          <br className="hidden sm:block" />
          Class Problem Solvers
        </h2>
      </div>

      {/* Experts Grid with Navigation */}
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

        {/* Navigation Arrows */}
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

        {/* Dots navigation */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: Math.ceil(experts.length / getVisibleSlidesCount()) }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setCurrentSlide(index);
                }
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-yellow-400 w-4' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
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