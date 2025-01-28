import React from 'react';

const WhyChooseUs = () => {
  return (
    <div className="bg-[#f8f8f8] py-12 flex justify-center items-center">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 justify-center items-center"> {/* Center grid & items */}
          <div className="text-center"> {/* Text aligned left on all screens */}
            <h2 className="text-3xl font-bold mb-4">
              Why Choose Maha Mumbai with <br /> Athiya Developers?
            </h2>
            <p className="text-base mb-4 max-w-84">
              <span>At Athiya Developers, we identify prime opportunities in Maha Mumbai to bring you projects</span> <br/>
              <span>that align with your dreams and investment goals. With our expertise and transparency,</span> <br/>
              we make your journey seamless and rewarding.
            </p>
            <p className="text-xl font-medium mb-8">
              Discover the future with Maha Mumbai.
            </p>
            <div>
              <button className="bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-[#003380]">
                Explore Our Projects Now
              </button>
            </div>
          </div>
          <div></div> {/* Empty div for the second column */}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;