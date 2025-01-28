import React from "react";

const GrowthSection = () => {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left column - Heading */}
        <div className="text-center md:text-center">
          {" "}
          {/* Center text on smaller screens */}
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4 md:mb-0">
            {" "}
            {/* Reduced initial text size and added margin bottom */}
            The Future of Growth
            <br />
            and Opportunity
          </h2>
        </div>

        {/* Right column - Description */}
        <div>
          <p className="text-base md:text-xl text-gray-800 leading-relaxed text-center md:text-left">
            Maha Mumbai, an emerging hub of connectivity, development, and
            investment, is the ideal destination for those seeking a vibrant and
            prosperous future. Strategically located and brimming with
            potential, it offers unparalleled opportunities for residents,
            businesses, and investors alike.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GrowthSection;
