import React, { memo } from "react";
import { motion } from "framer-motion";

const ProjectCard = memo(({ project, index }) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group rounded-2xl overflow-hidden bg-gray-900"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <motion.img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
          whileHover={{ scale: 1.1 }}
          initial={{ scale: 1 }}
          transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
        />
      </div>

      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-4 sm:p-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 space-y-2">
          <motion.h3 
            className="text-lg sm:text-xl font-semibold text-white mb-1"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {project.title}
          </motion.h3>
          
          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-white text-sm sm:text-base">
              {project.sqft} Sqft
            </span>
            
            <motion.button 
              className="bg-gray-200/90 px-4 py-1.5 rounded-full text-sm 
                         transform transition-all duration-300 ease-out
                         hover:bg-white hover:scale-105 hover:shadow-lg
                         active:scale-95 focus:outline-none focus:ring-2 
                         focus:ring-white focus:ring-opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Know More
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Hover Overlay */}
      <motion.div 
        className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 
                   transition-opacity duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.2 }}
      />
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;