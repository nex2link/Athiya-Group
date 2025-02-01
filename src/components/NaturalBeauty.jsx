import React from 'react';
import mountainview from '../assets/mountain-senic.jpg'
import fogyyland from '../assets/foggy-land.jpg'
import seaview from '../assets/sea-view.jpg'

const NaturalBeauty = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-2 gap-8">
        {/* Left Column - Text and First Image */}
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Natural Beauty Meets
              <br />
              Urban Comfort
            </h2>
            <p className="text-gray-700">
              Maha Mumbai offers a unique blend of natural beauty and urban convenience
            </p>
          </div>

          <div className="relative">
            <img
              src={mountainview}
              alt="Scenic mountain view"
              className="w-full h-[400px] object-cover rounded-3xl"
            />
            <p className="mt-4 text-gray-700">
              Lush green surroundings and scenic coastline.
            </p>
          </div>
        </div>

        {/* Right Column - Staggered Images */}
        <div className="space-y-8 pt-24">
          <div className="relative">
            <img
              src={fogyyland}
              alt="Foggy landscape"
              className="w-full h-[400px] object-cover rounded-3xl"
            />
          </div>

          <div className="relative">
            <img
              src={seaview}
              alt="Coastal view"
              className="w-full h-[300px] object-cover rounded-3xl"
            />
            <p className="mt-4 text-gray-700">
              Proximity to hill stations, beaches,and cultural landmarks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NaturalBeauty;