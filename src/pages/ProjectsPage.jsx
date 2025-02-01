import React from "react";
import ProjectPageCarousel from "../components/ProjectPageCarousel";
import Herosection from "../components/Herosection"
import ProjectSection from "../components/ProjectSection";

const ProjectPage = () => {
  return (
    <div className=" px-4 py-8 mt-14">

      <Herosection/>
      <ProjectPageCarousel />
      <div className="bg-gray-50">

      <ProjectSection/>
      </div>
    </div>
  );
};

export default ProjectPage;
