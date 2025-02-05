import React, { useRef, useEffect, useState } from 'react';
import mountainview from '../assets/mountain-senic.jpg';
import fogyyland from '../assets/foggy-land.jpg';
import seaview from '../assets/sea-view.jpg';

const NaturalBeauty = () => {
  const sectionRef = useRef(null);
  const imageRefs = useRef([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = (index) => {
    if (imageRefs.current[index]) {
      imageRefs.current[index].classList.add('loaded');
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
        {/* Left Column - Text and First Image */}
        <div className="space-y-6 sm:space-y-8">
          <div className={`
            transform transition-all duration-1000 delay-100
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              <span className="block transform transition-all duration-700 hover:translate-x-2">
                Natural Beauty Meets
              </span>
              <span className="block transform transition-all duration-700 delay-100 hover:translate-x-2 mt-2">
                Urban Comfort
              </span>
            </h2>
            <p className="text-gray-700 text-lg sm:text-xl">
              Maha Mumbai offers a unique blend of natural beauty and urban convenience
            </p>
          </div>

          <div className={`
            relative group
            transform transition-all duration-1000 delay-200
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            <div className="overflow-hidden rounded-3xl">
              <img
                src={mountainview}
                alt="Scenic mountain view"
                className="natural-image w-full h-[300px] sm:h-[400px] object-cover 
                  transform transition-all duration-700
                  group-hover:scale-110 filter group-hover:brightness-110"
                ref={el => imageRefs.current[0] = el}
                onLoad={() => handleImageLoad(0)}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/30 to-transparent 
              opacity-0  transition-opacity duration-500"/>
            <p className="mt-4 text-gray-700 text-lg transform transition-all duration-300 
              group-hover:translate-x-2">
              Lush green surroundings and scenic coastline.
            </p>
          </div>
        </div>

        {/* Right Column - Staggered Images */}
        <div className="space-y-6 sm:space-y-8 pt-0 lg:pt-24">
          <div className={`
            relative group
            transform transition-all duration-1000 delay-300
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            <div className="overflow-hidden rounded-3xl">
              <img
                src={fogyyland}
                alt="Foggy landscape"
                className="natural-image w-full h-[300px] sm:h-[400px] object-cover 
                  transform transition-all duration-700
                  group-hover:scale-110 filter group-hover:brightness-110"
                ref={el => imageRefs.current[1] = el}
                onLoad={() => handleImageLoad(1)}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/30 to-transparent 
              opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
          </div>

          <div className={`
            relative group
            transform transition-all duration-1000 delay-400
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            <div className="overflow-hidden rounded-3xl">
              <img
                src={seaview}
                alt="Coastal view"
                className="natural-image w-full h-[250px] sm:h-[300px] object-cover 
                  transform transition-all duration-700
                  group-hover:scale-110 filter group-hover:brightness-110"
                ref={el => imageRefs.current[2] = el}
                onLoad={() => handleImageLoad(2)}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/30 to-transparent 
              opacity-0  transition-opacity duration-500"/>
            <p className="mt-4 text-gray-700 text-lg transform transition-all duration-300 
              group-hover:translate-x-2">
              Proximity to hill stations, beaches, and cultural landmarks.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .natural-image {
          opacity: 0;
          transition: opacity 0.7s ease-in-out;
        }
        
        .natural-image.loaded {
          opacity: 1;
        }
        
        @media (prefers-reduced-motion: reduce) {
          *, ::before, ::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </section>
  );
};

export default NaturalBeauty;