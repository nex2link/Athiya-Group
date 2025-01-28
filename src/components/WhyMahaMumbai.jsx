import React, { useState, useEffect } from "react";
import maha1 from "../assets/maha1.jpg";
import maha2 from "../assets/maha2.jpg";
import maha3 from "../assets/maha3.jpg";

const WhyMahaMumbai = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      image: maha1,
      alt: "Airport runway with plane"
    },
    {
      image: maha2,
      alt: "Coastal road view"
    },
    {
      image: maha3,
      alt: "Metro infrastructure"
    }
    // Duplicate images for continuous scroll
  ];

  // Double the images array for smooth infinite scroll
  const scrollImages = [...features, ...features];

  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 py-10 overflow-hidden">
        <div className="flex gap-6">
          {/* Left section with animation */}
          <div 
            className={`bg-[#E5EFE1] rounded-3xl p-8 transition-all duration-1000 ease-in-out
              ${isVisible ? 'flex-1 opacity-100' : 'w-0 opacity-0'}`}
          >
            <h2 className="text-4xl font-bold mb-4 pr-14">Why<br />Maha Mumbai?</h2>
            <p className="text-gray-700">Invest in the Future of Maha Mumbai</p>
          </div>

          {/* Images section with scroll animation */}
          <div className="flex-[2] overflow-hidden">
            <div 
              className="flex gap-4 animate-scroll"
              style={{
                animation: isVisible ? 'scroll 20s linear infinite' : 'none',
              }}
            >
              {scrollImages.map((feature, index) => (
                <div 
                  key={index} 
                  className="rounded-3xl overflow-hidden flex-shrink-0 w-1/3"
                >
                  <img 
                    src={feature.image} 
                    alt={feature.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-end mt-6">
          <button 
            className={`flex items-center border px-4 py-2 rounded-2xl hover:bg-gray-100 
              transition-all duration-1000 ease-in-out
              ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
            style={{ transitionDelay: '1000ms' }}
          >
            <span>Know More</span>
            <svg className="w-5 h-5" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="currentColor" />
              <path
                d="M35 50 L65 50 L55 40 M65 50 L55 60"
                fill="none"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* Add the keyframes for scroll animation */}
      <style jsx="true">{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default WhyMahaMumbai;