import React, { useState, useEffect, useRef } from 'react';
import roadvec from "../assets/roadvec.png";
import pinimg from "../assets/pin.png";

const TimeLine = () => {
  const [visiblePins, setVisiblePins] = useState([]);
  const [visibleTexts, setVisibleTexts] = useState([]);
  const [headingVisible, setHeadingVisible] = useState(false);
  const timelineRef = useRef(null);

  // Number of pins
  const pins = [
    { 
      id: 1, 
      year: "2025", 
      description: "Surveys and studies commence for new town planning",
      className: "left-12 sm:left-8 md:left-24 lg:left-32 xl:left-48 top-5 md:top-6 lg:top-8"
    },
    { 
      id: 2, 
      year: "2026", 
      description: "Master plan completion targeted for August",
      className: "left-1/2 -translate-x-1/2 top-11 md:top-20 lg:top-32" 
    },
    { 
      id: 3, 
      year: "2029", 
      description: "Contributing to MMR's $300 billion GDP goal",
      className: "right-10 sm:right-4 md:right-24 lg:right-32 xl:right-48 top-16 md:top-24 lg:top-44" 
    }
  ];

  const startAnimation = () => {
    setHeadingVisible(true);
    setVisiblePins([]);
    setVisibleTexts([]);
    
    const headingDelay = 100;
    const pinDelay = 300;
    const textDelay = 300;
    
    setTimeout(() => {
      pins.forEach((item, index) => {
        setTimeout(() => setVisiblePins(prev => [...prev, item.id]), (index + 1) * pinDelay);
        setTimeout(() => setVisibleTexts(prev => [...prev, item.id]), (index + 1) * pinDelay + textDelay);
      });
    }, headingDelay);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && startAnimation(),
      { threshold: 0.3 }
    );
    
    if (timelineRef.current) {
      observer.observe(timelineRef.current);
      return () => {
        if (timelineRef.current) {
          observer.unobserve(timelineRef.current);
        }
      };
    }
  }, []);

  return (
    <div className="p-4 mb-14 sm:p-6 md:p-8 lg:p-12 xl:px-16" ref={timelineRef}>
      <div className={`mb-6 md:mb-8 lg:mb-12 transition-opacity duration-700 ${headingVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">Development Timeline</h1>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">&amp; Economic Impact</h1>
      </div>
      
      <div className="relative pt-20 sm:pt-28 md:pt-36 lg:pt-52">
        {/* Road vector image */}
        <div className="relative w-full">
          <img src={roadvec} alt="Road vector" className="w-full" />
        </div>
        
        {/* Timeline pins with content */}
        <div className="absolute top-0 left-0 w-full h-full">
          {pins.map(item => (
            <div key={item.id} className={`absolute ${item.className}`}>
              {visiblePins.includes(item.id) && (
                <div className="animate-bounce-in">
                  <img 
                    src={pinimg} 
                    alt="Timeline pin" 
                    className="w-8 h-16 sm:w-12 sm:h-24 md:w-16 md:h-32 lg:w-20 lg:h-48" 
                  />
                </div>
              )}
              {visibleTexts.includes(item.id) && (
                <div className="absolute top-20 sm:top-12 md:top-36 lg:top-24 left-2 sm:left-8 md:left-2 lg:left-14 w-20 sm:w-32 md:w-40 lg:w-60 animate-fade-in">
                  <h2 className="text-sm sm:text-lg md:text-xl font-extrabold">{item.year}</h2>
                  <p className="text-[6px] sm:text-xs md:text-sm">{item.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes bounceIn {
          0% { transform: translateY(-100px); opacity: 0; }
          60% { transform: translateY(10px); }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .animate-bounce-in {
          animation: bounceIn 0.6s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TimeLine;