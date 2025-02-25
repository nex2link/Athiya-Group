import React, { useRef, useEffect, useState } from 'react';
import landfloat from "../assets/floating-land.png";
import { motion } from "framer-motion";

function FloatingLand() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  const benefits = [
    {
      id: "benefit1",
      position: "md:absolute md:left-[9%] lg:left-11 md:top-[14%] md:w-1/4 md:text-right",
      title: <>Smart & <span className="block -mt-1">Sustainable Living</span></>,
      description: "Eco-friendly infrastructure with modern amenities",
      delay: 0.3
    },
    {
      id: "benefit2",
      position: "md:absolute md:-left-3 lg:-left-4 md:bottom-[35%] md:w-1/4 md:text-right",
      title: "High ROI Potential",
      description: "Early investment advantages with rising property values",
      delay: 0.5
    },
    {
      id: "benefit3",
      position: "md:absolute md:right-[18%] lg:right-20 md:top-[2%] md:w-1/4",
      title: "Strategic Location",
      description: "At the core of Mumbai's next growth phase",
      delay: 0.7
    },
    {
      id: "benefit4",
      position: "md:absolute md:right-[4%] lg:right-5 md:top-[30%] md:w-1/4",
      title: <>Proximity to NAINA's <span className="block -mt-1">Development</span></>,
      description: "Direct benefits from planned infrastructure",
      delay: 0.9
    },
    {
      id: "benefit5",
      position: "md:absolute md:right-0 md:bottom-[15%] lg:bottom-20 md:w-1/4",
      title: <>Seamless <span className='block -mt-1'>Documentation</span></>,
      description: "Clear land titles and transparent transactions",
      delay: 1.1
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    }, { threshold: 0.25 });
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const floatVariants = {
    animate: {
      y: [0, -15, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const benefitVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i, duration: 0.8, ease: "easeOut" }
    })
  };

  return (
    <motion.div 
      ref={sectionRef}
      className="max-w-6xl mx-auto py-6 sm:py-8 md:py-12 lg:py-16 px-3 sm:px-4 overflow-hidden"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.h1 
        className="text-base sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-center text-gray-900 mb-3 sm:mb-5 md:mb-8 lg:mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8 }}
      >
        Why Invest in The <br/>Third New Town?
      </motion.h1>
      
      <div className="relative">
        <div className="flex justify-center">
          <motion.img 
            src={landfloat} 
            alt="Floating island with modern city" 
            className="w-4/5 z-10"
            variants={floatVariants}
            animate="animate"
          />
        </div>
        
        {/* Mobile view - benefits as pointers below image */}
        <div className="flex flex-col space-y-4 mt-6 md:hidden">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              className="flex items-start space-x-2 px-4"
              variants={benefitVariants}
              custom={benefit.delay}
            >
              <div className="bg-yellow-400 rounded-full w-2 h-2 mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-sm font-bold">{benefit.title}</h3>
                <p className="text-xs">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Desktop view - benefits positioned around image */}
        <div className="hidden md:block">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              className={benefit.position}
              variants={benefitVariants}
              custom={benefit.delay}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <h3 className="text-base lg:text-xl xl:text-2xl font-extrabold mb-1">{benefit.title}</h3>
              <p className="text-xs lg:text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default FloatingLand;