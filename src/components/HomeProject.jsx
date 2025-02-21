import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useCallback, memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dapoliimg1 from "../assets/project-1.jpg";
import agroimg2 from "../assets/project-2.jpg";
import farmimg1 from "../assets/project-3.jpg";
import shivimg1 from "../assets/project-4.jpg";
import samimg1 from "../assets/project-5.jpg";

const cards = [
  { url: dapoliimg1, title: "Dalopli, Ratnagiri", id: 2 },
  { url: farmimg1, title: "Agrow Eco, Mahad", id: 3 },
  { url: agroimg2, title: "Farm Dale, Pali", id: 4 },
  { url: shivimg1, title: "Shivsparash", id: 5 },
  { url: samimg1, title: "Samarth Hill", id: 6 }
];

const HomeProject = () => {
  const navigate = useNavigate();
  const handleKnowMore = useCallback((id) => {
    navigate(`/project?id=${id}`);
    localStorage.setItem('activeProject', id.toString());
  }, [navigate]);
  return <HorizontalScrollCarousel onKnowMore={handleKnowMore} />;
};

const HorizontalScrollCarousel = ({ onKnowMore }) => {
  const targetRef = useRef(null);
  const containerRef = useRef(null);
  const [transformPercentage, setTransformPercentage] = useState("-25%");
  const { scrollYProgress } = useScroll({ target: targetRef });

  useEffect(() => {
    const updateTransformPercentage = () => {
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const percentage = ((containerWidth - viewportWidth) / viewportWidth) * 100;
      
      // Set different percentages based on screen size
      if (viewportWidth < 768) { // Small screens
        setTransformPercentage(`-${Math.min(percentage, 80)}%`);
      } else if (viewportWidth < 1024) { // Medium screens
        setTransformPercentage(`-${Math.min(percentage, 60)}%`);
      } else { // Large screens
        setTransformPercentage(`-${Math.min(percentage, 25)}%`);
      }
    };

    updateTransformPercentage();
    window.addEventListener('resize', updateTransformPercentage);
    
    return () => window.removeEventListener('resize', updateTransformPercentage);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], ["1%", transformPercentage]);

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div 
          ref={containerRef} 
          style={{ x }} 
          className="flex gap-4"
        >
          {cards.map(card => (
            <Card key={card.id} card={card} onKnowMore={onKnowMore} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Card = memo(({ card: { id, url, title }, onKnowMore }) => (
  <motion.div 
    className="flex flex-col w-[350px] mt-20"
    style={{ y: id % 2 === 0 ? -40 : 0 }}
  >
    <div className="group relative h-[400px] overflow-hidden bg-neutral-200 rounded-3xl">
      <div 
        style={{
          backgroundImage: `url(${url})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
        role="img"
        aria-label={title}
      />
    </div>
    <div className="p-4 rounded-b-3xl bg-white">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{title}</h3>
        <button 
          onClick={() => onKnowMore(id)}
          className="px-4 py-1 bg-[#b7beba] text-black rounded-lg hover:bg-black hover:text-white"
        >
          Know More
        </button>
      </div>
      <p className="mt-2 text-gray-600">5 to 20 sqft</p>
    </div>
  </motion.div>
));

export default HomeProject;