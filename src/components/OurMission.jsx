import React, { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import bussinessimg from "../assets/bussiness.webp";
import teamimg from "../assets/team.webp";

const OurMission = () => {
  const teamImageRef = useRef(null);
  const businessImageRef = useRef(null);
  const textSectionRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 800, once: true, mirror: false, offset: 50,
      easing: 'ease-out', disable: 'mobile', throttleDelay: 99,
    });
    return () => AOS.refresh();
  }, []);

  return (
    <div className="relative bg-white overflow-hidden" style={{ minHeight: '80vh' }}>
      <div className="container mx-auto px-8 py-16 max-w-6xl">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-32">
          <div className="lg:w-1/2 flex flex-col">
            <div className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
                <div data-aos="fade-up" data-aos-delay="100" className="space-y-3">
                  <span className="block">We don't just</span>
                  <span className="block">build properties</span>
                  <span className="block text-[#facc15]">We craft experiences.</span>
                </div>
              </h2>
            </div>

            {/* Image commented as requested */}
            {/* <div 
              className="relative overflow-hidden"
              data-aos="fade-up"
              data-aos-delay="200"
              ref={teamImageRef}
            >
              <img 
                src={teamimg}
                alt="Team meeting"
                loading="lazy"
                className="w-1/2 h-44 object-cover transform transition-transform duration-500 hover:scale-105 rounded-xl"
              />
            </div> */}
          </div>
          
          {/* Text Section */}
          <div 
            className="lg:w-1/2 space-y-6"
            data-aos="fade-up"
            data-aos-delay="300"
            ref={textSectionRef}
          >
            <p className="text-gray-700 text-lg leading-relaxed font-medium">
              With over seven years of expertise in real estate, we are committed to 
              <span className="text-[#facc15] font-semibold"> transparency, quality and innovation</span>.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              From premium residential and commercial projects to sustainable farm developments, 
              we ensure every project reflects our dedication to excellence. Our team of experts 
              delivers strategic planning, seamless execution, and long-term value, making every 
              investment a step toward growth.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="relative mt-12">
          <div className="text-center max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
              Our Mission
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-10 font-medium">
              Athiya Group is driven by a mission to create growth for our customers' capital 
              and satisfaction while delivering exceptional returns on investment. We strive to 
              provide <span className="underline decoration-indigo-500 decoration-2 underline-offset-4">
              better real estate opportunities</span> and nurture long-lasting business relationships.
            </p>
          </div>
          
          {/* Business Image commented as requested */}
          <div 
            className="lg:absolute -bottom-24 right-0 w-full sm:w-72 lg:w-56"
            data-aos="fade-up"
            data-aos-delay="200"
            ref={businessImageRef} 
          >
            {/* <div className="relative overflow-hidden group">
              <img 
                src={bussinessimg}
                alt="Business meeting"
                loading="lazy"
                className="w-full h-32 object-cover transform will-change-transform transition-transform duration-500 group-hover:scale-105 rounded-lg"
              /> */}
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" /> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurMission;