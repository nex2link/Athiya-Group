import React from "react";
import Aboutimg from "../assets/About-us.jpg";

const AboutUs = () => {
  return (
    <div className="bg-[#0A2919] rounded-xl md:rounded-3xl p-6 md:p-12 flex flex-col md:flex-row justify-between items-center m-4 md:m-14 gap-8 md:gap-12">
      <div className="w-full md:max-w-xl">
        <h2 className="text-white text-3xl md:text-5xl font-bold mb-3 md:mb-4">
          About Us
        </h2>
        <h3 className="text-white text-xl md:text-2xl font-semibold mb-4 md:mb-6">
          Built on Excellence, Driven by Vision
        </h3>
        <p className="text-gray-200 text-sm md:text-base mb-6 md:mb-8">
          With over seven years of expertise, Athiya Group has redefined 
          real estate excellence through innovative projects and a 
          commitment to client satisfaction. Explore our journey of growth, 
          milestones, and the people behind our success.
        </p>
        <button className="w-full md:w-auto bg-white px-6 py-3 rounded-full hover:bg-gray-100 transition-colors text-sm md:text-base">
          Know More About Us!
        </button>
      </div>
      <div className="w-full md:w-96">
        <img 
          src={Aboutimg} 
          alt="House" 
          className="rounded-xl md:rounded-3xl w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AboutUs;