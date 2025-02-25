import { motion } from "framer-motion";
import { useRef, useCallback, memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dapoliimg1 from "../assets/project-1.webp"
import farmimg1 from "../assets/project-2.webp"
import agroimg2 from "../assets/project-3.webp"
import shivimg1 from "../assets/project-4.webp"
import samimg1 from "../assets/project-5.webp"

const cards = [
  { url: farmimg1, title: "Agrow Eco, Mahad", id: 2 },
  { url: shivimg1, title: "Shivsparash", id: 3 },
  { url: samimg1, title: "Samarth Hill", id: 4 },
  { url: agroimg2, title: "Farm Dale, Pali", id: 5 },
  { url: dapoliimg1, title: "Dalopli, Ratnagiri", id: 6 },
];

const HomeProject = () => {
  const navigate = useNavigate();
  const handleKnowMore = useCallback((id) => {
    navigate(`/project?id=${id}`);
    localStorage.setItem('activeProject', id.toString());
  }, [navigate]);
  
  return <ProjectDisplay onKnowMore={handleKnowMore} />;
};

const ProjectDisplay = ({ onKnowMore }) => {
  const [translateX, setTranslateX] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isDesktopMonitor, setIsDesktopMonitor] = useState(false);

  // Check if display is desktop
  useEffect(() => {
    const checkDisplay = () => {
      const width = window.innerWidth;
      const dpr = window.devicePixelRatio;
      setIsDesktopMonitor(width >= 1920 && dpr <= 1);
    };
    
    checkDisplay();
    window.addEventListener('resize', checkDisplay);
    return () => window.removeEventListener('resize', checkDisplay);
  }, []);

  // Calculate total width for animation
  const cardWidth = 350;
  const gapWidth = 16; // 4rem = 16px
  const totalWidth = (cardWidth + gapWidth) * (cards.length * 2);

  // Smooth animation using requestAnimationFrame (like KeyHighlights)
  useEffect(() => {
    if (isDesktopMonitor) return; // Don't animate on desktop
    
    let animationId;
    const animate = () => {
      setTranslateX(prev => {
        // Reset when scrolled one complete set
        if (Math.abs(prev) >= totalWidth / 2) return 0;
        return prev - 1;
      });
      animationId = requestAnimationFrame(animate);
    };
    
    if (hoveredIndex === null) {
      animationId = requestAnimationFrame(animate);
    }
    
    return () => cancelAnimationFrame(animationId);
  }, [hoveredIndex, totalWidth, isDesktopMonitor]);

  // Create duplicated cards for infinite scroll effect
  const displayCards = [...cards, ...cards, ...cards];

  return (
    <section className="relative min-h-screen">
      <div className="flex h-screen items-center overflow-hidden">
        <div 
          className={`flex gap-4 px-4 ${isDesktopMonitor ? 'justify-center flex-wrap' : 'flex-nowrap'}`}
          style={isDesktopMonitor ? {} : { 
            transform: `translateX(${translateX}px)`,
            transition: 'transform 0.1s linear'
          }}
          onMouseEnter={() => setHoveredIndex(0)}
          onMouseLeave={() => setHoveredIndex(null)}
          onTouchStart={() => setHoveredIndex(0)}
          onTouchEnd={() => setHoveredIndex(null)}
        >
          {displayCards.map((card, index) => (
            <Card 
              key={`${card.id}-${index}`}
              card={card} 
              onKnowMore={onKnowMore}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Card = memo(({ card: { id, url, title }, onKnowMore, onMouseEnter, onMouseLeave }) => (
  <motion.div 
    className="flex flex-col w-[350px] mt-20 flex-shrink-0"
    style={{ y: id % 2 === 0 ? -40 : 0 }}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
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