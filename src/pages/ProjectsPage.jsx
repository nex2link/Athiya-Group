import React from "react";
import { useSmootherScroll } from '../hooks/useSmootherScroll';
import { applyScrollOptimizations } from '../utils/scrollOptimizer';
import { useEffect } from 'react';
import ProjectSection from "../components/ProjectSection";

const ProjectPage = () => {
    useSmootherScroll();
    
    useEffect(() => {
      applyScrollOptimizations();
    }, []);

  return (
    <div className="  py-8 mt-14">
      <div className="scroll-content">

      {/* <ProjectPageHero/>
      <ProjectPageCarousel /> */}
      <div className="bg-gray-50">

      <ProjectSection/>
      </div>
      </div>
    </div>
  );
};

export default ProjectPage;
