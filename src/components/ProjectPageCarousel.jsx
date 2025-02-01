import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Home, Star, Share, Loader2 } from "lucide-react";
import proimg from "../assets/services.jpg"

const ProjectPageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);

  const projects = [
    {
      id: 1,
      url: proimg,
      title: "Dapoli 712 – Coastal Living in Kelashi",
      type: "Residential Plot",
      rating: "4.5",
      description: "Experience beachfront living with modern amenities.",
      highlights: [
        "10 mins from the Beach",
        "1 hour from Mumbai-Goa Highway",
        "2 hours from Navi Mumbai International Airport",
      ],
      details: [
        { price: "₹X lakhs", area: "5000 Sq.ft", type: "Residential Plot" },
        { price: "₹X lakhs", area: "5000 Sq.ft", type: "Residential Plot" },
      ],
    },
    {
      id: 2,
      url: proimg,
      title: "Dapoli 712 – Coastal Living in Kelashi",
      type: "Residential Plot",
      rating: "4.5",
      description: "lorem",
      highlights: [
        "10 mins from the Beach",
        "1 hour from Mumbai-Goa Highway",
        "2 hours from Navi Mumbai International Airport",
      ],
      details: [
        { price: "₹X lakhs", area: "5000 Sq.ft", type: "Residential Plot" },
        { price: "₹X lakhs", area: "5000 Sq.ft", type: "Residential Plot" },
      ],
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  }, [projects.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  }, [projects.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    autoPlayRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [nextSlide]);

  const onTouchStart = (e) => {
    setIsDragging(true);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const onTouchMove = (e) => {
    if (!isDragging) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    setIsDragging(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    autoPlayRef.current = setInterval(nextSlide, 5000);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow">
        <div className="min-h-[400px] md:min-h-[600px] relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 h-full">
            <div className="py-6 md:h-24 flex items-center overflow-hidden">
              <h1 
                className="text-2xl md:text-4xl font-bold text-gray-900 transition-transform duration-500"
                style={{ transform: `translateY(${isLoading ? '20px' : '0'})`, opacity: isLoading ? 0 : 1 }}
              >
                {projects[currentIndex].title}
              </h1>
            </div>

            <div className="relative h-[400px] md:h-[600px]">
              <div 
                className="flex gap-2 md:gap-4 items-center justify-center h-full"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                role="region"
                aria-label="Project images carousel"
              >
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                </button>

                {/* Mobile View */}
                <div className="block md:hidden w-full h-full relative">
                  {projects.map((project, index) => (
                    <div
                      key={project.id}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <div className="relative h-full rounded-lg overflow-hidden shadow-xl">
                        {isLoading && index === currentIndex && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                            <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
                          </div>
                        )}
                        <img
                          src={project.url}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          onLoad={handleImageLoad}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 rounded-b-lg">
                          <div className="flex items-center justify-between text-white">
                            <div className="flex items-center gap-1">
                              <Home className="w-3 h-3" />
                              <span className="text-xs font-medium">{project.type}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs font-medium">
                                {project.rating}/Review
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop View */}
                <div 
                  ref={carouselRef}
                  className="hidden md:flex gap-4 items-center touch-pan-x overflow-hidden"
                >
                  {projects.map((project, index) => (
                    <div
                      key={project.id}
                      className={`transition-transform duration-500 ease-out transform-gpu flex-shrink-0 ${
                        index === currentIndex 
                          ? "w-96 h-72" 
                          : "w-72 h-48"
                      } relative`}
                    >
                      <div className={`relative h-full rounded-lg overflow-hidden ${
                        index === currentIndex ? "shadow-xl" : "shadow-md"
                      }`}>
                        {isLoading && index === currentIndex && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                            <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
                          </div>
                        )}
                        <img
                          src={project.url}
                          alt={project.title}
                          className={`w-full h-full object-cover transition-opacity duration-500 ${
                            index === currentIndex 
                              ? "opacity-100" 
                              : "opacity-70"
                          }`}
                          onLoad={handleImageLoad}
                        />
                        {index === currentIndex && (
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg">
                            <div className="flex items-center justify-between text-white">
                              <div className="flex items-center gap-2">
                                <Home className="w-4 h-4" />
                                <span className="text-sm font-medium">{project.type}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">
                                  {project.rating}/Review
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                </button>
              </div>

              <div className="flex justify-center gap-2 mt-4">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? "bg-blue-600 w-8" 
                        : "bg-gray-300 w-4 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                    aria-current={index === currentIndex ? "true" : "false"}
                  />
                ))}
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-600 max-w-2xl mx-auto transition-opacity duration-300"
                   style={{ opacity: isLoading ? 0 : 1 }}>
                  {projects[currentIndex].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectPageCarousel;