// Services.jsx
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ServiceCard from "./ServiceCard";
import KnowMoreButton from "./KnowMoreButton";
import Serviceimg from "../assets/services.webp";
import consulticon from "../assets/icons/consult.png"
import investmenticon from "../assets/icons/investment.png"
import landdevlopmenticon from "../assets/icons/land-devlopment.png"
import legalicon from "../assets/icons/legal-icon.png"
import {Link} from "react-router-dom"

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      title: "Real Estate Consulting",
      description: "Expert advice to maximize property investments.",
      icon: consulticon
    },
    {
      title: "Land Development",
      description: "Transform land into premium spaces.",
      icon: landdevlopmenticon
    },
    {
      title: "Investment Strategies",
      description: "Customized plans for optimal returns.",
      icon: investmenticon
    },
    {
      title: "Legal Advisory",
      description: "Simplified legal support for transactions",
      icon: legalicon
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-gray-50">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-10 sm:mb-12 lg:mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Tailored Services, Trusted Expertise
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-base sm:text-lg">
            We offer a comprehensive range of real estate solutions designed to
            meet your unique needs, backed by our experience and unwavering
            commitment to excellence.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
          {/* Image Section */}
          <motion.div 
            className="lg:col-span-2 h-[300px] sm:h-[400px] lg:h-full"
            variants={itemVariants}
          >
            <div className="relative h-full w-full rounded-2xl sm:rounded-3xl overflow-hidden group">
              <img
                src={Serviceimg}
                alt="Misty landscape showcasing our real estate expertise"
                className="w-full h-full object-cover transform transition-transform duration-700 
                         group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 
                           transition-colors duration-300" />
            </div>
          </motion.div>

          {/* Services Grid */}
          <motion.div 
            className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 
                     lg:pl-8 mt-6 lg:mt-0"
            variants={containerVariants}
          >
            {services.map((service, index) => (
              <ServiceCard 
                key={index} 
                {...service} 
                index={index}
                inView={inView}
              />
            ))}
          </motion.div>
        </div>

        {/* Button */}
        <motion.div 
          className="mt-10 sm:mt-12 text-center"
          variants={itemVariants}
        >
          <Link to='/service'>
          <KnowMoreButton />
          </Link>
        </motion.div>

      </motion.div>
    </section>
  );
};



export default Services;