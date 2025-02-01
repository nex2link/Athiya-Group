import React, { useState, useEffect, useCallback, memo } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProjectCard from "./ProjectCard";
import project1 from "../assets/project-1.png";
import project2 from "../assets/project-2.png";
import project3 from "../assets/project-3.png";

// Main Projects component
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
      title: "Farm Dale, Pali",
      sqft: "00",
      image: project2
    },
    {
      id: 3,
      title: "AGrow Eco, Mahad",
      sqft: "00",
      image: project3
    }
  ];

  // Calculate number of duplicates needed based on screen width
  const [duplicateCount, setDuplicateCount] = useState(2);

  useEffect(() => {
    const updateDuplicateCount = () => {
      const width = window.innerWidth;
      setDuplicateCount(width < 640 ? 3 : width < 1024 ? 2 : 2);
    };

    updateDuplicateCount();
    window.addEventListener('resize', updateDuplicateCount);
    return () => window.removeEventListener('resize', updateDuplicateCount);
  }, []);

  // Create scrolling projects array with optimal number of duplicates
  const scrollProjects = Array(duplicateCount)
    .fill(projects)
    .flat()
    .map((project, index) => ({
      ...project,
      key: `${project.id}-${index}`
    }));

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Smooth scroll animation
  const scrollDuration = useCallback(() => {
    const base = 30;
    const width = window.innerWidth;
    return width < 640 ? base * 1.5 : width < 1024 ? base * 1.25 : base;
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 overflow-hidden">
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

      <div className="relative w-full overflow-hidden py-8 sm:py-12">
        <div
          className="flex gap-4 sm:gap-6 lg:gap-8 animate-scroll"
          style={{
            '--scroll-duration': `${scrollDuration()}s`,
          }}
        >
          {scrollProjects.map((project, index) => (
            <div
              key={project.key}
              className={`flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px] transition-transform duration-500
                ${index % 2 === 1 ? 'translate-y-8 sm:translate-y-12 lg:translate-y-16' : 
                '-translate-y-8 sm:-translate-y-12 lg:-translate-y-16'}`}
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .animate-scroll {
          animation: scroll var(--scroll-duration) linear infinite;
          will-change: transform;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50% - 0.5rem));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-scroll {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;