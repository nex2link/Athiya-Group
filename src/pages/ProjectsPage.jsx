import React from "react";
import ProjectPageCarousel from "../components/ProjectPageCarousel";
import Hero from "../components/Herosection"
import ProjectSection from "../components/ProjectSection";
import ProjectPageHero from "../components/ProjectHerosection";

const ProjectPage = () => {
  return (
    <div className="  py-8 mt-14">

      <ProjectPageHero/>
      <ProjectPageCarousel />
      <div className="bg-gray-50">

      <ProjectSection/>
      </div>
    </div>
  );
};

export default ProjectPage;
