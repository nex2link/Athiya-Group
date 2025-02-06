import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import bussinessimg from "../assets/bussiness.jpg";
import teamimg from "../assets/team.jpg";

const OurMission = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      mirror: true,
      offset: 120,
      easing: 'ease-in-out-cubic'
    });
  }, []);

  return (
    <div 
      className="relative bg-white overflow-hidden"
      style={{ minHeight: '80vh' }}
    >
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section with Flip Animations */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-8">
          <div className="lg:w-1/2 flex flex-col">
            <div className="mb-6">
              <h2 className="text-3xl lg:text-4xl font-bold space-y-2">
                <span 
                  className="block"
                  data-aos="flip-up"
                  data-aos-delay="100"
                >
                  We don't just
                </span>
                <span 
                  className="block"
                  data-aos="flip-up"
                  data-aos-delay="200"
                >
                  build properties
                </span>
                <span 
                  className="block"
                  data-aos="flip-up"
                  data-aos-delay="300"
                >
                  We craft experiences.
                </span>
              </h2>
            </div>

            {/* Image with Rotate Animation */}
            <div 
              className="relative overflow-hidden rounded-xl"
              data-aos="fade-rotate-up"
              data-aos-delay="400"
              data-aos-duration="1500"
            >
              <img 
                src={teamimg}
                alt="Team meeting"
                loading="lazy"
                className="w-full h-44 object-cover"
              />
            </div>
          </div>
          
          {/* Text Section with Slide Animations */}
          <div className="lg:w-1/2 space-y-4">
            <p
              className="text-gray-700 text-base leading-relaxed"
              data-aos="slide-left"
              data-aos-delay="200"
              data-aos-offset="300"
            >
              With over seven years of expertise in real estate...
            </p>
            <p
              className="text-gray-700 text-base leading-relaxed"
              data-aos="slide-left"
              data-aos-delay="300"
              data-aos-offset="300"
            >
              From premium residential and commercial projects...
            </p>
          </div>
        </div>

        {/* Mission Section with Zoom and Fade Animations */}
        <div className="relative mt-6">
          <div 
            className="text-center max-w-2xl mx-auto"
            data-aos="zoom-out-up"
            data-aos-delay="200"
          >
            <h2 
              className="text-2xl sm:text-3xl font-bold mb-4"
              data-aos="fade-up"
              data-aos-anchor-placement="center-bottom"
            >
              Our Mission
            </h2>
            <p 
              className="text-gray-700 text-base leading-relaxed mb-8"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-delay="100"
            >
              We strive to create sustainable real estate opportunities...
            </p>
          </div>
          
          {/* Business Image with 3D Flip Animation */}
          <div 
            className="lg:absolute -bottom-24 right-0 w-full sm:w-72 lg:w-56"
            data-aos="flip-left"
            data-aos-delay="400"
            data-aos-duration="1500"
          >
            <div className="relative overflow-hidden rounded-lg group">
              <img 
                src={bussinessimg}
                alt="Business meeting"
                loading="lazy"
                className="w-full h-32 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                data-aos="fade"
                data-aos-delay="800"
              />
            </div>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32">
          {/* Feature Cards with Different Animations */}
          <div 
            className="p-6 bg-gray-50 rounded-xl"
            data-aos="fade-up-right"
            data-aos-duration="1000"
          >
            <h3 className="text-xl font-semibold mb-3">Innovation</h3>
            <p className="text-gray-600">Pushing boundaries in real estate</p>
          </div>
          
          <div 
            className="p-6 bg-gray-50 rounded-xl"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
            <p className="text-gray-600">Eco-friendly development</p>
          </div>
          
          <div 
            className="p-6 bg-gray-50 rounded-xl"
            data-aos="fade-up-left"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            <h3 className="text-xl font-semibold mb-3">Community</h3>
            <p className="text-gray-600">Building lasting relationships</p>
          </div>
        </div>

        {/* Testimonial Section with Reveal Animations */}
        <div className="mt-16 text-center">
          <blockquote 
            className="text-xl italic text-gray-700"
            data-aos="zoom-in-up"
            data-aos-anchor-placement="top-center"
          >
            "Transforming visions into reality..."
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default OurMission;