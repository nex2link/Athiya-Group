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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 overflow-hidden">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight
          transition-all duration-1000 ease-in-out
          ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
          Innovative real estate solutions for a future-ready lifestyle.
        </h1>
        <p className={`text-gray-600 text-base sm:text-lg lg:ml-auto lg:max-w-md
          transition-all duration-1000 ease-in-out
          ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
          Unlocking opportunities where modern living meets visionary development.
        </p>
      </div>
      
      <div className="overflow-hidden py-16"> {/* Added padding to accommodate vertical offset */}
        <div 
          className="flex gap-6"
          style={{
            animation: isVisible ? 'scroll 25s linear infinite' : 'none',
          }}
        >
          {scrollProjects.map((project, index) => (
            <div 
              key={`${project.id}-${index}`}
              className={`flex-shrink-0 w-[300px] transition-all duration-500
                ${index % 2 === 1 ? 'translate-y-16' : '-translate-y-16'}`}
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
      `}</style>
    </section>
  );
};

export default Projects;