import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import bussinessimg from "../assets/bussiness.webp";
import teamimg from "../assets/team.webp";

const OurMission = () => {
  useEffect(() => {
    // Optimize AOS settings for better performance
    AOS.init({
      duration: 800, // Reduced duration for smoother animation
      once: true,    // Animation happens only once to reduce CPU load
      mirror: false, // Disabled mirroring to improve performance
      offset: 50,    // Reduced offset for earlier animation trigger
      easing: 'ease-out', // Simpler easing function
      disable: 'mobile', // Disable on mobile if performance issues persist
      throttleDelay: 99, // Add throttling for scroll events
    });

    // Clean up AOS on component unmount
    return () => {
      AOS.refresh();
    };
  }, []);

  return (
    <div 
      className="relative bg-white overflow-hidden"
      style={{ minHeight: '80vh' }}
    >
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section - Simplified animations */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-8">
          <div className="lg:w-1/2 flex flex-col">
            <div className="mb-6">
              <h2 className="text-3xl lg:text-4xl font-bold">
                <div 
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="space-y-2"
                >
                  <span className="block">We don't just</span>
                  <span className="block">build properties</span>
                  <span className="block">We craft experiences.</span>
                </div>
              </h2>
            </div>

            {/* Image with simplified animation */}
            <div 
              className="relative overflow-hidden "
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <img 
                src={teamimg}
                alt="Team meeting"
                loading="lazy"
                className="w-1/2 h-44 object-cover transform transition-transform duration-500 hover:scale-105 rounded-xl"
              />
            </div>
          </div>
          
          {/* Text Section - Combined animations */}
          <div 
            className="lg:w-1/2 space-y-4"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <p className="text-gray-700 text-base leading-relaxed">
              With over seven years of expertise in real estate, we are committed to transparency, qiality and innovation.
            </p>
            <p className="text-gray-700 text-base leading-relaxed">
              From premium residential and commercial projects to sustainable farm developments, we ensure every project reflects our dedication to excellence. Our Team of experts delivers strategic  planning, seamless execution, and long-term value, making every investment a step toward growth.
            </p>
          </div>
        </div>

        {/* Mission Section - Simplified animations */}
        <div className="relative mt-6">
          <div 
            className="text-center max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 text-base leading-relaxed mb-8">
              We strive to create sustainable real estate opportunities...
            </p>
          </div>
          
          {/* Business Image - Hardware accelerated animation */}
          <div 
            className="lg:absolute -bottom-24 right-0 w-full sm:w-72 lg:w-56"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="relative overflow-hidden group">
              <img 
                src={bussinessimg}
                alt="Business meeting"
                loading="lazy"
                className="w-full h-32 object-cover transform will-change-transform transition-transform duration-500 group-hover:scale-105  rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </div>


       
      </div>
    </div>
  );
};

export default OurMission;