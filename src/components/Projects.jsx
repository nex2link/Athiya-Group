import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import project1 from "../assets/project-1.png";
import project2 from "../assets/project-2.png";
import project3 from "../assets/project-3.png";

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  // Duplicate projects for continuous scroll
  const scrollProjects = [...projects, ...projects];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-16 overflow-hidden">
      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8 lg:mb-12">
        <h1 className={`text-2xl md:text-3xl lg:text-5xl font-bold leading-tight
          transition-all duration-1000 ease-in-out
          ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
          Innovative real estate solutions for a future-ready lifestyle.
        </h1>
        <p className={`text-gray-600 text-sm md:text-base lg:text-lg md:ml-auto md:max-w-md
          transition-all duration-1000 ease-in-out
          ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
          Unlocking opportunities where modern living meets visionary development.
        </p>
      </div>
      
      <div className="overflow-hidden py-8 md:py-16 relative"> 
      <div className="absolute left-0 top-0 w-1/6 h-full bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 w-1/6 h-full bg-gradient-to-l from-white to-transparent z-10" />
        <div 
          className="flex gap-3 md:gap-6"
          style={{
            animation: isVisible ? 'scroll 5s linear infinite' : 'none',
          }}
        >
          {scrollProjects.map((project, index) => (
            <div 
              key={`${project.id}-${index}`}
              className={`flex-shrink-0 w-[250px] md:w-[300px] transition-all duration-500
                ${index % 2 === 1 ? 'translate-y-8 md:translate-y-16' : '-translate-y-8 md:-translate-y-16'}`}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      <style jsx="true">{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 640px) {
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;