import React, { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const useScreenSize = () => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileOrTablet(window.innerWidth <= 1024);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isMobileOrTablet;
};

const ProjectCard = memo(({ project, index, isVisible }) => {
  const navigate = useNavigate();
  const isMobileOrTablet = useScreenSize();

  const handleKnowMore = (projectId) => {
    navigate(`/project?id=${projectId}`);
    localStorage.setItem('activeProject', projectId.toString());
  };

  if (!project) return null;

  // Define variants based on screen size
  const variants = isMobileOrTablet ? {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  } : {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  };

  // Only apply the alternating height on desktop
  const cardOffset = !isMobileOrTablet && project.id % 2 === 0 ? -40 : 0;
  
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate={isVisible ? "animate" : "initial"}
      style={{ y: cardOffset }}
      whileHover={isMobileOrTablet ? {} : { y: cardOffset - 20 }} // Adjust hover offset based on initial position
      transition={{ 
        duration: 0.5, 
        delay: isMobileOrTablet ? 0 : index * 0.1 
      }}
      exit="exit"
      className="flex flex-col w-full sm:w-[350px] mt-4 md:mt-10 flex-shrink-0 mx-auto rounded-3xl overflow-hidden"
    >
      <div className="relative w-full h-[300px] sm:h-[300px] md:h-[400px] overflow-hidden bg-neutral-200 rounded-3xl">
        <div 
          style={{
            backgroundImage: `url(${project.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
          className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-105"
          aria-label={project.title}
        />
      </div>

      <div className="flex items-center justify-between p-4 space-t-3 bg-white rounded-b-3xl">
        <div>
        <h3 className="text-lg font-semibold text-gray-900">
          {project.title}
        </h3>
          <span className="text-gray-600 text-sm">
            {project.sqft} Sqft
          </span>
          </div>
          <motion.button 
            onClick={() => handleKnowMore(project.id)}
            className="bg-[#B7BEBA] text-black px-4 py-1.5 rounded-full text-sm 
                     transform transition-all duration-300 ease-out
                     hover:bg-gray-800 hover:text-white hover:scale-105
                     active:scale-95 focus:outline-none focus:ring-2 
                     focus:ring-gray-900 focus:ring-opacity-50"
            whileHover={isMobileOrTablet ? {} : { scale: 1.05 }}
            whileTap={isMobileOrTablet ? {} : { scale: 0.95 }}
          >
            Know More
          </motion.button>
        </div>
    
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;