import React, { useRef, useEffect, useState } from 'react';
import airport from "../assets/airport.jpg"
import bridge from "../assets/bridge.jpg"
import road from "../assets/road.jpg"

const projects = [
  {
    title: "Navi Mumbai International Airport",
    description: "A world-class airport set to transform regional and international connectivity.",
    image: airport,
  },
  {
    title: "",
    description: "",
    image: bridge,
  },
  {
    title: "",
    description: "",
    image: road,
  }
];

const KeyHighlights = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  
  // Calculate total width of one set of items
  const itemWidths = projects.map((_, index) => 
    index === 0 ? 750 : 400
  );
  const gapWidth = 20; // gap-5 equals 20px
  const totalWidth = itemWidths.reduce((a, b) => a + b, 0) + (projects.length - 1) * gapWidth;

  useEffect(() => {
    let animationFrameId;
    let speed = 1; // Pixels per frame

    const animate = () => {
      if (!isHovered) {
        setTranslateX(prev => {
          if (Math.abs(prev) >= totalWidth) {
            return 0;
          }
          return prev - speed;
        });
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, totalWidth]);

  // Create three sets of items for smooth infinite scroll
  const extendedProjects = [...projects, ...projects, ...projects];

  return (
    <div className="w-full bg-white py-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Headers */}
        <div className="text-center mb-12">
          <h3 className="text-gray-600 text-lg mb-2">Key Highlights</h3>
          <h2 className="text-4xl font-bold mb-2">Exceptional Connectivity</h2>
          <p className="text-gray-600">Maha Mumbai is the nucleus of major infrastructure projects</p>
        </div>

        {/* Slider Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            className="flex gap-5"
            style={{ 
              transform: `translateX(${translateX}px)`,
              transition: 'transform 0.1s linear'
            }}
          >
            {extendedProjects.map((project, index) => (
              <div
                key={index}
                className={`flex-shrink-0 relative rounded-2xl overflow-hidden
                  ${index % projects.length === 0 ? 'w-[600]' : 'w-[400px]'}`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className={`w-full object-cover ${
                    index % projects.length === 0 ? 'h-[400px]' : 'h-[400px]'
                  }`}
                />
                <div className={`absolute bottom-0 left-0 right-0 p-8 
                  ${index % projects.length === 0
                    ? 'bg-gradient-to-t from-black/90 via-black/50 to-transparent h-3/5' 
                    : 'bg-gradient-to-t from-black/80 via-black/40 to-transparent h-1/2'}`}>
                  <div className={`${index % projects.length === 0 ? 'max-w-[80%]' : 'max-w-full'}`}>
                    <h3 className={`font-semibold mb-3 text-white
                      ${index % projects.length === 0 ? 'text-3xl' : 'text-xl'}`}>
                      {project.title}
                    </h3>
                    <p className={`text-white/90 
                      ${index % projects.length === 0 ? 'text-lg' : 'text-sm'}`}>
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyHighlights;