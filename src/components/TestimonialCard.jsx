  // TestimonialCard.jsx
  import { motion } from "framer-motion";
  import { Quote } from "lucide-react";

  const TestimonialCard = ({ image, name, role, testimonial, index, inView }) => {
    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: index * 0.1 },
      },
    };

    return (
      <motion.div
        variants={cardVariants}
        className="group h-full bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl 
                  flex flex-col items-center text-center
                  shadow-lg hover:shadow-xl transform transition-all duration-300
                  hover:-translate-y-1"
      >
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white shadow-lg
                        transform transition-transform duration-300 group-hover:scale-105">
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2"
          >
            <Quote className="w-4 h-4 text-white" />
          </motion.div>
        </div>

        <h3 className="font-semibold text-lg sm:text-xl text-gray-900 mb-1">
          {name}
        </h3>
        
        {role && <p className="text-sm text-gray-500 mb-2">{role}</p>}

        <p className="text-gray-600 text-base leading-relaxed">
          "{testimonial}"
        </p>
      </motion.div>
    );
  };

  export default TestimonialCard;