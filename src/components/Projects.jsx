import React, { useState, useEffect, useCallback, memo } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import project1 from "../assets/project-1.jpg";
import project2 from "../assets/project-2.jpg";
import project3 from "../assets/project-3.jpg";
import project4 from "../assets/project-4.jpg";
import project5 from "../assets/project-5.jpg";

const Projects = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      id: 1,
      title: "Dapoli, Ratnagiri",
      sqft: "00",
      image: project1
    },
    {
      id: 2,
      title: "Farm Dale",
      sqft: "00",
      image: project2
    },
    {
      id: 3,
      title: "AGrow Eco, Mahad",
      sqft: "00",
      image: project3
    },
    {
      id: 4,
      title: "shivsprash",
      sqft: "00",
      image: project4
    },
    {
      id: 5,
      title: "samarth Hill",
      sqft: "00",
      image: project5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev === projects.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? projects.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <section className="w-full max-w-8xl mx-auto sm:px-6 lg:px-16 py-8 sm:py-12 lg:py-16">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
        className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8 mb-12"
      >
        <motion.h1
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 }
          }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
        >
          Innovative real estate solutions for a future-ready lifestyle.
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 }
          }}
          className="text-gray-600 text-base sm:text-lg lg:ml-auto lg:max-w-md"
        >
          Unlocking opportunities where modern living meets visionary development.
        </motion.p>
      </motion.div>

      {/* Slider container with overflow hidden */}
      <div className="relative overflow-hidden w-full">
        <div className="py-8 sm:py-12">
          <motion.div
            className="flex gap-4 sm:gap-6 lg:gap-8"
            animate={{
              x: `-${currentIndex * 100}%`
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut"
            }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="flex-none w-[260px] sm:w-[300px] lg:w-[340px]"
              >
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </motion.div>
        </div>

         {/* Navigation Buttons with line */}
          {/* Navigation Buttons with separate lines */}
        <div className="flex justify-between w-full mt-8 p-3">
          {/* Left button with line */}
          <div className="flex items-center gap-4">
            <motion.button
              onClick={prevSlide}
              className="p-2 rounded-full bg-gray-900 text-white hover:bg-gray-800"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} />
            </motion.button>
            <div className="w-16 h-px bg-gray-900"></div>
          </div>
          
          {/* Right button with line */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-gray-900"></div>
            <motion.button
              onClick={nextSlide}
              className="p-2 rounded-full bg-gray-900 text-white hover:bg-gray-800"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;