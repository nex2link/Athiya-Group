import React, { useEffect, useRef } from 'react';
import bussinessimg from "../assets/bussiness-meeting.jpg";
import teamimg from "../assets/team-meeting.jpg";

const OurMission = () => {
  const sectionRef = useRef(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
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

  return (
    <div 
      ref={sectionRef}
      className="container mx-auto px-4 py-16 max-w-7xl opacity-0 transition-all duration-1000"
    >
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-16 lg:mb-24">
        <div className="lg:w-1/2 flex flex-col">
          <div className="mb-8 lg:mb-12 transform transition-all duration-700 delay-100">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="block transform hover:translate-x-2 transition-transform duration-300">
                We don't just
              </span>
              <span className="block transform hover:translate-x-2 transition-transform duration-300 delay-100">
                build properties
              </span>
              <span className="block transform hover:translate-x-2 transition-transform duration-300 delay-200">
                We craft experiences.
              </span>
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-lg group">
            <img 
              src={teamimg} 
              alt="Team meeting" 
              loading="lazy"
              decoding="async"
              className="mission-image w-full h-64 object-cover transform transition-all duration-700 
                group-hover:scale-110 filter group-hover:brightness-110 opacity-0"
              ref={el => imageRefs.current[0] = el}
              onLoad={() => imageRefs.current[0]?.classList.add('loaded')}
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 
              transition-opacity duration-500" />
          </div>
        </div>
        
        <div className="lg:w-1/2 space-y-6 transform transition-all duration-700 delay-300">
          <p className="text-gray-700 text-lg leading-relaxed hover:text-gray-900 transition-colors duration-300">
            With over seven years of expertise in real estate, we are committed to
            transparency, quality, and innovation.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed hover:text-gray-900 transition-colors duration-300">
            From premium residential and commercial projects to sustainable farm
            developments, we ensure every project reflects our dedication to excellence.
            Our team of experts delivers strategic planning, seamless execution,
            and long-term value, making every investment a step toward growth.
          </p>
        </div>
      </div>

      {/* Bottom Section with Centered Mission */}
      <div className="relative">
        <div className="text-center max-w-2xl mx-auto transform transition-all duration-700 delay-200">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 hover:scale-105 transition-transform duration-300">
            Our Mission
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-12 sm:mb-20 
            hover:text-gray-900 transition-colors duration-300">
            We strive to create sustainable real estate opportunities,
            ensuring profitable investments and long-lasting relationships.
          </p>
        </div>
        
        {/* Business meeting image - positioned in bottom right */}
        <div className="lg:absolute -bottom-32 lg:-bottom-52 right-0 w-full sm:w-96 lg:w-72 
          transform transition-all duration-700 hover:scale-105 hover:-rotate-2">
          <div className="relative overflow-hidden rounded-lg group">
            <img 
              src={bussinessimg}
              alt="Business meeting" 
              loading="lazy"
              decoding="async"
              className="mission-image w-full h-48 object-cover transform transition-all duration-700 
                group-hover:scale-110 filter group-hover:brightness-110 opacity-0"
              ref={el => imageRefs.current[1] = el}
              onLoad={() => imageRefs.current[1]?.classList.add('loaded')}
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 
              transition-opacity duration-500" />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        .mission-image {
          opacity: 0;
          transition: opacity 0.7s ease-in-out;
        }
        
        .mission-image.loaded {
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
    </div>
  );
};

export default OurMission;