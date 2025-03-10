import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "./TestimonialCard";
import testimg1 from "../assets/test-1.png";
import testimg2 from "../assets/test-2.png";
import testimg3 from "../assets/test-3.png";
import testimg4 from "../assets/test-4.png";

const Testimonials = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

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
      testimonial: "Athiya Group's professionalism truly impressed us. Their dedicated team ensured a smooth project completion, delivering results well within the expected timeframe while keeping us informed at every step."
    },
    {
      image: testimg4,
      name: "Mr. Amit Prabhale",
      role: "",
      testimonial: "Athiya Group's transparency and support made my land purchase in Mahad seamless. Their efficient team handled everything quickly, and I was so satisfied that I bought 2 acres instead of one. Truly exceptional service!"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const getVisibleItems = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
    }
    return 1;
  };

  const visibleItems = getVisibleItems();
  const maxIndex = testimonials.length - visibleItems;

  const nextSlide = () => setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCurrentIndex(prev => Math.max(prev - 1, 0));

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-[#B7BEBA] overflow-hidden">
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

        {/* Carousel Container with Absolute Positioned Navigation */}
        <div className="relative">
          {/* Left Navigation Button */}
          <button 
            onClick={prevSlide} 
            disabled={currentIndex === 0}
            className={`absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full shadow-md
              ${currentIndex === 0 ? 'bg-gray-300 text-gray-500' : 'bg-gray-800 text-white'} 
              hover:bg-gray-700 transition-colors`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="overflow-hidden">
            <motion.div 
              ref={carouselRef}
              className="flex transition-all duration-500 ease-in-out"
              initial={false}
              animate={{ x: `-${currentIndex * 100 / visibleItems}%` }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className={`flex-none w-full md:w-1/2 lg:w-1/3 px-3`}
                >
                  <TestimonialCard 
                    {...testimonial} 
                    index={index}
                    inView={inView}
                  />
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Right Navigation Button */}
          <button 
            onClick={nextSlide} 
            disabled={currentIndex >= maxIndex}
            className={`absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full shadow-md
              ${currentIndex >= maxIndex ? 'bg-gray-300 text-gray-500' : 'bg-gray-800 text-white'} 
              hover:bg-gray-700 transition-colors`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-gray-800 w-6' : 'bg-gray-400'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;