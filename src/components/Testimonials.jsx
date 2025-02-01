// Testimonials.jsx
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Quote } from "lucide-react";
import TestimonialCard from "./TestimonialCard";
import testimg1 from "../assets/test-1.jpg";
import testimg2 from "../assets/test-2.jpg";
import testimg3 from "../assets/test-3.jpg";

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    {
      image: testimg1,
      name: "Mr. Arvind Bhupi",
      role: "Property Investor",
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut labore et dolore magna aliqua ut labore et dolore magna"
    },
    {
      image: testimg2,
      name: "Mr. Arvind Bhupi",
      role: "Real Estate Developer",
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut labore et dolore magna aliqua ut labore et dolore magna"
    },
    {
      image: testimg3,
      name: "Mr. Arvind Bhupi",
      role: "Business Owner",
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut labore et dolore magna aliqua ut labore et dolore magna"
    }
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

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-[#B7BEBA]">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          className="text-center mb-10 sm:mb-16"
        >
          <div className="flex justify-center mb-4">
            <Quote className="w-10 h-10 text-gray-800" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our Users Say About Us
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Discover why our clients trust us with their real estate journey
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index} 
              {...testimonial} 
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;