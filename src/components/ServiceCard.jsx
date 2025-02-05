import React from "react";
import { motion } from "framer-motion";


// ServiceCard.jsx
const ServiceCard = ({ title, description, icon, index, inView }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
      className="group flex flex-col items-start gap-4 p-6 rounded-xl
                   transition-colors duration-300
                 transform hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="w-16 h-16 rounded-full bg-[#0A2919] flex items-center justify-center
                    transform transition-transform duration-300 group-hover:scale-110">
        <span className="text-2xl"><img src={icon}  />
        </span>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 text-base leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

export default ServiceCard;