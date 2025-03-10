import React, { useEffect, useState } from 'react';
import airport from "../assets/airport-third.webp"
import bridge from "../assets/atal-setu.webp"
import road from "../assets/green-highway.webp"
import itpark from "../assets/it-park.webp"
import corporate from "../assets/corporate.webp"
import ecofrnd from "../assets/eco-frnd.webp"

const KeyHighlights = () => {
  const [translateX, setTranslateX] = useState(0);
  
  const projects = [
    {
      title: "Navi Mumbai International Airport",
      description: "A world-class airport set to transform regional and international connectivity.",
      image: airport,
    },
    {
      title: "Strategic location near Atal Setu ",
      description: "Ensuring excellent connectivity",
      image: bridge,
    },
    {
      title: "Green Highway from Dhatum to Chowk",
      description: "Sustainable transport infrastructure",
      image: road,
    },
    {
      title: "IT parks, Data Centers & Smart City initiatives",
      description: "Driving the digital economy",
      image: itpark,
    },
    {
      title: "Eco-Friendly Development",
      description: "Integrating forests, hills, and farmland",
      image: ecofrnd,
    },
    {
      title: "Corporate Investments",
      description: "Data hubs attracting major players like Reliance",
      image: corporate,
    }
  ];
  
  const totalWidth = projects.reduce((acc, _, i) => acc + (i === 0 ? 600 : 400), 0) + (projects.length - 1) * 20;

  useEffect(() => {
    let animationId;
    const animate = () => {
      setTranslateX(prev => (Math.abs(prev) >= totalWidth ? 0 : prev - 1));
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [totalWidth]);

  const extendedProjects = [...projects, ...projects, ...projects];

  return (
    <div className="w-full bg-white py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-gray-600 text-lg mb-2">Key Highlights</h3>
          <h2 className="text-4xl font-bold mb-2">Exceptional Connectivity</h2>
          <p className="text-gray-600">Maha Mumbai is the nucleus of major infrastructure projects</p>
        </div>

        <div className="relative">
          <div 
            className="flex gap-5"
            style={{ 
              transform: `translateX(${translateX}px)`,
              transition: 'transform 0.1s linear'
            }}
          >
            {extendedProjects.map((project, index) => {
              const isPrimary = index % projects.length === 0;
              
              return (
                <div
                  key={index}
                  className={`flex-shrink-0 relative overflow-hidden ${isPrimary ? 'w-[600px]' : 'w-[400px]'}`}
                  style={{ borderRadius: '15px' }}
                >
                  <div className="relative overflow-hidden" style={{ borderRadius: '15px' }}>
                    <img
                      src={project.image}
                      alt={project.title || "Project image"}
                      className="w-full object-cover h-[400px] rounded-[15px]"
                      style={{ borderRadius: '0' }}
                    />
                  </div>
                  <div 
                    className="absolute bottom-0 left-0 right-0 p-7"
                    style={{
                      background: isPrimary 
                        ? 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 15%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)'
                        : 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 20%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0) 100%)',
                      height: isPrimary ? '75%' : '65%'
                    }}
                  >
                    <div className={`${isPrimary ? 'max-w-[80%]' : 'max-w-full'} absolute bottom-5 left-8`}>
                      <h3 className={`font-semibold mb-3 text-gray-900 ${isPrimary ? 'text-2xl' : 'text-xl'}`}>
                        {project.title}
                      </h3>
                      <p className={`text-gray-700 ${isPrimary ? 'text-lg' : 'text-md'}`}>
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyHighlights;