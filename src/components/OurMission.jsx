import React from 'react';
import bussinessimg from "../assets/bussiness.jpg";
import teamimg from "../assets/team.jpg";

const OurMission = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12">
          <div className="lg:w-1/2 flex flex-col">
            {/* Title */}
            <div className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-bold space-y-3">
                <span className="block">We don't just</span>
                <span className="block">build properties</span>
                <span className="block">We craft experiences.</span>
              </h2>
            </div>

            {/* Team image */}
            <div className="relative overflow-hidden">
              <img 
                src={teamimg}
                alt="Team meeting"
                loading="lazy"
                className="w-62 h-56 object-cover rounded-xl"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" /> */}
            </div>
          </div>
          
          {/* Text content */}
          <div className="lg:w-1/2 space-y-6">
            <p className="text-gray-700 text-lg leading-relaxed">
              With over seven years of expertise in real estate, we are committed to
              transparency, quality, and innovation.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              From premium residential and commercial projects to sustainable farm
              developments, we ensure every project reflects our dedication to excellence.
              Our team of experts delivers strategic planning, seamless execution,
              and long-term value, making every investment a step toward growth.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative mt-12">
          {/* Mission text */}
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Our Mission
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-12">
              We strive to create sustainable real estate opportunities,
              ensuring profitable investments and long-lasting relationships.
            </p>
          </div>
          
          {/* Business image */}
          <div className="lg:absolute -bottom-24 right-0 w-full sm:w-80 lg:w-64">
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src={bussinessimg}
                alt="Business meeting"
                loading="lazy"
                className="w-full h-40 object-cover"
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