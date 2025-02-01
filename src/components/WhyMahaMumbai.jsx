import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRightCircle } from "lucide-react";
import maha1 from "../assets/maha1.jpg";
import maha2 from "../assets/maha2.jpg";
import maha3 from "../assets/maha3.jpg";
import KnowMoreButton from "./KnowMoreButton";

const WhyMahaMumbai = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const features = [
    {
      image: maha1,
      alt: "Airport runway with plane",
      title: "World-Class Infrastructure"
    },
    {
      image: maha2,
      alt: "Coastal road view",
      title: "Strategic Location"
    },
    {
      image: maha3,
      alt: "Metro infrastructure",
      title: "Modern Connectivity"
    }
  ];

  // Calculate number of duplicates needed based on screen width
  const [duplicateCount, setDuplicateCount] = React.useState(2);

  React.useEffect(() => {
    const updateDuplicateCount = () => {
      const width = window.innerWidth;
      setDuplicateCount(width < 640 ? 4 : width < 1024 ? 3 : 2);
    };

    updateDuplicateCount();
    window.addEventListener('resize', updateDuplicateCount);
    return () => window.removeEventListener('resize', updateDuplicateCount);
  }, []);

  const scrollImages = Array(duplicateCount)
    .fill(features)
    .flat()
    .map((feature, index) => ({
      ...feature,
      key: `${feature.title}-${index}`
    }));

  return (
    <section className="w-full py-8 sm:py-12 lg:py-16 overflow-hidden bg-gray-50">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.6 } }
        }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
          {/* Left section */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
            }}
            className="bg-[#E5EFE1] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 
                       lg:flex-1 transform transition-all duration-500"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 pr-8 lg:pr-14">
              Why<br />Maha Mumbai?
            </h2>
            <p className="text-gray-700 text-base sm:text-lg">
              Invest in the Future of Maha Mumbai
            </p>
          </motion.div>

          {/* Images section */}
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
            className="lg:flex-[2] relative overflow-hidden rounded-2xl sm:rounded-3xl"
          >
            <div className="relative">
              <div 
                className="flex gap-4 sm:gap-6 animate-scroll"
                style={{
                  '--scroll-duration': `${scrollImages.length * 1}s`,
                }}
              >
                {scrollImages.map((feature, index) => (
                  <motion.div 
                    key={feature.key}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: { duration: 0.5, delay: index * 0.1 }
                      }
                    }}
                    className="relative flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px] 
                             rounded-xl sm:rounded-2xl overflow-hidden group"
                  >
                    <div className="aspect-[4/3]">
                      <img 
                        src={feature.image} 
                        alt={feature.alt}
                        className="w-full h-full object-cover transform transition-transform duration-700 
                                 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 
                                    transition-colors duration-300" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t 
                                  from-black/60 to-transparent">
                      <p className="text-white text-lg font-medium">{feature.title}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Button */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.4, duration: 0.6 }
            }
          }}
          className="flex justify-end mt-6 sm:mt-8"
        >
          {/* <button 
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full
                     bg-white border border-gray-200 shadow-sm
                     hover:bg-gray-50 hover:border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                     transform transition-all duration-300 hover:scale-105"
          >
            <span className="text-gray-900 font-medium">Know More</span>
            <ArrowRightCircle className="w-5 h-5 text-gray-600 group-hover:translate-x-1 transition-transform" />
          </button> */}
          <KnowMoreButton/>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        .animate-scroll {
          animation: scroll var(--scroll-duration) linear infinite;
          will-change: transform;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50% - 0.75rem));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-scroll {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyMahaMumbai;