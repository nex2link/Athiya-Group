import React from "react";
import Aboutimg from "../assets/About-us.jpg";


const AboutUs = () => {
    return (
      <div className="bg-[#0A2919] rounded-3xl p-12 flex justify-between items-center m-14">
        <div className="max-w-xl">
          <h2 className="text-white text-5xl font-bold mb-4">About Us</h2>
          <h3 className="text-white text-2xl font-semibold mb-6">
            Built on Excellence, Driven by Vision
          </h3>
          <p className="text-gray-200 mb-8">
            With over seven years of expertise, Athiya Group has redefined 
            real estate excellence through innovative projects and a 
            commitment to client satisfaction. Explore our journey of growth, 
            milestones, and the people behind our success.
          </p>
          <button className="bg-white px-6 py-3 rounded-full hover:bg-gray-100 transition-colors">
            Know More About Us!
          </button>
        </div>
        <div className="w-96">
          <img 
            src={Aboutimg} 
            alt="House" 
            className="rounded-3xl w-full h-full object-cover"
          />
        </div>
      </div>
    );
  };

  export default AboutUs;