// Testimonials.jsx
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Quote } from "lucide-react";
import TestimonialCard from "./TestimonialCard";
import testimg1 from "../assets/test-1.png";
import testimg2 from "../assets/test-2.png";
import testimg3 from "../assets/test-3.png";

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    {
      image: testimg1,
      name: "Mr. & Mrs. Onkar Bhogle & Manali Bhogle",
      role: "",
      testimonial: "Buying farmland in Maharashtra is challenging if you're not from an agricultural background. Athiya Group made it possible by guiding us through 7/12 documentation and more. Trusting in the plot's future value, we took the plunge, and now we proudly own a beautiful farmhouse. Thanks, Athiya Group."
    },
    {
      image: testimg2,
      name: "Mr. Arvind Bhupi",
      role: "",
      testimonial: "Acquiring farmland in Maharashtra was challenging without an agricultural background, but Athiya Group made it achievable. Their guidance with paperwork, including the 7/12 documents, gave us the confidence to invest. Today, we proudly own a stunning farm—thanks to Athiya Group."
    },
    {
      image: testimg3,
      name: "Mr. & Mrs. K. N. Balasbramaniam",
      role: "",
      testimonial: "Athiya Group’s professionalism truly impressed us. Their dedicated team ensured a smooth project completion, delivering results well within the expected timeframe while keeping us informed at every step."
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
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