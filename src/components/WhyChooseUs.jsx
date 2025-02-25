import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MahaMumbaiSection = () => {

  const buttonVariant = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.98 }
  };

  return (
    <div className="w-full bg-[#F4F4F4]">
      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">
            Be a Part of Mumbai's Future Today!
          </h1>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Maha Mumbai is set to become a global business and residential hub. The Third New Town by Athiya Group offers premium investment opportunities in this high-growth corridor.
          </p>
          <h2 className="text-3xl font-bold mb-8">
            Discover the future with Maha Mumbai.
          </h2>
          <Link to="/contactus">
          <motion.button 
                  variants={buttonVariant}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full sm:w-auto bg-black text-white px-14 py-3 rounded-lg
                           transition-colors duration-200
                           hover:bg-black
                           focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 shadow-lg"
                >
                  Explore Our Projects Now
                </motion.button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default MahaMumbaiSection;