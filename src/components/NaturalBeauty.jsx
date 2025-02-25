import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import reac1 from "../assets/Rectangle-1.png";
import reac2 from "../assets/Rectangle-2.png";
import reac3 from "../assets/Rectangle-3.png";

// Custom hook to detect prefers-reduced-motion
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}

// Animated image component with fade, slide-in, and hover scale effects
const AnimatedImg = ({ src, alt, className, text, delay = 0 }) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 200 }}
      viewport={{ once: false, amount: 0.3 }}
      className="cursor-pointer"
    >
      {/* Using w-full and h-auto so the image scales responsively */}
      <img src={src} alt={alt} className={`${className} w-full h-auto`} loading="lazy" />
      {text && <p className="text-sm mt-2">{text}</p>}
    </motion.div>
  );
};

// Variants for staggered container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Variants for each child image in the staggered group
const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function NaturalBeauty() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="p-4 lg:ml-60 mx-auto max-w-screen-xl">
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        {/* Left Section */}
        <div className="relative flex-1">
          <div className="mb-6 md:mr-12 text-center md:text-left">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900"
              initial={
                prefersReducedMotion
                  ? {}
                  : { opacity: 0, y: 100, scale: 0.8, rotate: -5 }
              }
              whileInView={
                prefersReducedMotion
                  ? {}
                  : { opacity: 1, y: 0, scale: 1, rotate: 0 }
              }
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }}
            >
              Natural Beauty Meets <br /> Urban Comfort
            </motion.h1>
            <motion.p
              className="text-gray-700"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              Maha Mumbai offers a unique blend of natural <br />
              beauty and urban convenience
            </motion.p>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="mt-28">
              <AnimatedImg
                src={reac2}
                alt="Green landscape"
                className="max-w-xs rounded"
                text="Lush green surroundings and scenic coastline."
                delay={0.2}
              />
            </div>
          </div>
        </div>

        {/* Right Section: Staggered images */}
        <motion.div
          className="flex flex-col gap-4 flex-1"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.div variants={childVariants}>
            <AnimatedImg
              src={reac1}
              alt="Beachside villa"
              className="max-w-sm rounded"
            />
          </motion.div>
          <motion.div variants={childVariants}>
            <AnimatedImg
              src={reac3}
              alt="Beach sunset view"
              className="max-w-xs rounded"
              text="Proximity to hill stations, beaches and cultural landmarks"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default NaturalBeauty;
