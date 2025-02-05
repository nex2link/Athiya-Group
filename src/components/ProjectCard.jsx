import React, { memo } from "react";
import { motion } from "framer-motion";

const ProjectCard = memo(({ project, index }) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group rounded-2xl overflow-hidden "
    >
      <div className="aspect-[4/5] overflow-hidden">
        <motion.img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
          initial={{ scale: 1 }}
          transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
        />
      </div>

      {/* Content moved below image */}
      <div className="p-4 space-y-3 bg-white">
        <h3 className="text-lg font-semibold text-gray-900">
          {project.title}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600 text-sm">
            {project.sqft} Sqft
          </span>
          
          <motion.button 
            className="bg-[#B7BEBA] text-black px-4 py-1.5 rounded-full text-sm 
                     transform transition-all duration-300 ease-out
                     hover:bg-gray-800 hover:text-white hover:scale-105
                     active:scale-95 focus:outline-none focus:ring-2 
                     focus:ring-gray-900 focus:ring-opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Know More
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;