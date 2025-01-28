import { motion } from 'framer-motion';
import bgimg from '../assets/mumbai-skyline.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen">
      <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="relative h-[90vh] mt-6 rounded-3xl overflow-hidden">
          {/* Background Image with Parallax */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed transform scale-105"
            style={{
              backgroundImage: `url(${bgimg}`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/30 to-black/30"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center justify-center text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl px-6"
            >
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Transforming{' '}
                <span className="text-yellow-400 inline-block">
                  Maha Mumbai
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl sm:text-2xl text-gray-200 mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Your Gateway to Prosperity
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button className="bg-[#0F1F14] text-white px-8 py-3 rounded-lg hover:bg-yellow-400 hover:text-[#0F1F14] transition-all duration-300">
                  View Project
                </button>
                <button className="bg-white text-[#0F1F14] px-8 py-3 rounded-lg hover:bg-[#0F1F14] hover:text-white transition-all duration-300">
                  Get A Call!
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
