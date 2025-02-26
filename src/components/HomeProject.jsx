import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import dapoliimg1 from "../assets/project-1.webp";
import farmimg1 from "../assets/project-2.webp";
import agroimg2 from "../assets/project-3.webp";
import shivimg1 from "../assets/project-4.webp";
import samimg1 from "../assets/project-5.webp";

// Define projects data
const projects = [
  { id: 2, image: farmimg1, title: "Agrow Eco, Mahad", sqft: "5 to 20" },
  { id: 3, image: shivimg1, title: "Shivsparash", sqft: "5 to 20" },
  { id: 4, image: samimg1, title: "Samarth Hill", sqft: "5 to 20" },
  { id: 5, image: agroimg2, title: "Farm Dale, Pali", sqft: "5 to 20" },
  { id: 6, image: dapoliimg1, title: "Dalopli, Ratnagiri", sqft: "5 to 20" }
];

// Project Card Component
const ProjectCard = ({ project, onKnowMore }) => (
  <motion.div 
    className="flex flex-col w-[350px] mt-20 flex-shrink-0"
    style={{ y: project.id % 2 === 0 ? -40 : 0 }}
    whileHover={{ y: project.id % 2 === 0 ? -50 : -10 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <div className="group relative h-[400px] overflow-hidden bg-neutral-200 rounded-3xl">
      <div 
        style={{
          backgroundImage: `url(${project.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
        role="img"
        aria-label={project.title}
      />
    </div>
    <div className="p-4 rounded-b-3xl bg-white">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{project.title}</h3>
        <motion.button 
          onClick={() => onKnowMore(project.id)}
          className="px-4 py-1 bg-[#b7beba] text-black rounded-lg hover:bg-black hover:text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Know More
        </motion.button>
      </div>
      <p className="mt-2 text-gray-600">{project.sqft} sqft</p>
    </div>
  </motion.div>
);

const HomeProject = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Handle navigation when clicking "Know More"
  const handleKnowMore = (id) => {
    navigate(`/project?id=${id}`);
    localStorage.setItem('activeProject', id.toString());
  };
  
  // Check device type
  useEffect(() => {
    const checkDevice = () => {
      // Check if it's a mobile device
      setIsMobile(window.innerWidth <= 768);
      // Check if it's a large desktop
      setIsDesktop(window.innerWidth >= 1920);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Number of cards to display based on screen size
  const getDisplayCount = () => {
    if (isDesktop) return projects.length;
    if (isMobile) return 3; // Show fewer cards on mobile
    return 6; // Medium screens
  };
  
  // Create appropriate number of cards
  const displayProjects = projects.slice(0, getDisplayCount());
  
  return (
    <section className="relative py-10 min-h-[80vh] overflow-hidden">
      <div className="flex items-center justify-center">
        {isDesktop ? (
          // Desktop layout - static grid
          <div className="flex flex-wrap justify-center gap-8 px-4">
            {projects.map((project) => (
              <ProjectCard 
                key={`desktop-${project.id}`}
                project={project}
                onKnowMore={handleKnowMore}
              />
            ))}
          </div>
        ) : (
          // Mobile and tablet layout - CSS-based animation instead of JS
          <div className="relative w-full overflow-hidden">
            <div className={`flex gap-4 px-4 ${isMobile ? 'mobile-scroll' : 'tablet-scroll'}`}>
              {/* Duplicate projects for infinite scroll effect */}
              {[...projects, ...projects, ...projects].map((project, index) => (
                <ProjectCard 
                  key={`scroll-${project.id}-${index}`}
                  project={project}
                  onKnowMore={handleKnowMore}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CSS animations for scrolling */}
      <style jsx="true">{`
        /* Slower animation for mobile */
        .mobile-scroll {
          animation: scrollMobile 60s linear infinite;
          will-change: transform;
          transform: translateZ(0);
        }
        
        /* Faster animation for tablet */
        .tablet-scroll {
          animation: scrollTablet 50s linear infinite;
          will-change: transform;
          transform: translateZ(0);
        }
        
        /* Pause animation on hover/touch */
        .mobile-scroll:hover, .tablet-scroll:hover,
        .mobile-scroll:active, .tablet-scroll:active {
          animation-play-state: paused;
        }
        
        @keyframes scrollMobile {
          0% {
            transform: translateX(0) translateZ(0);
          }
          100% {
            transform: translateX(calc(-366px * ${projects.length})) translateZ(0);
          }
        }
        
        @keyframes scrollTablet {
          0% {
            transform: translateX(0) translateZ(0);
          }
          100% {
            transform: translateX(calc(-366px * ${projects.length})) translateZ(0);
          }
        }
        
        /* For reduced motion preference */
        @media (prefers-reduced-motion) {
          .mobile-scroll, .tablet-scroll {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default HomeProject;
