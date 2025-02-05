import React, { useRef, useEffect, useState } from 'react';
import { TrendingUp, Building2, Map } from 'lucide-react';

const InvestmentOpportunities = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const titleRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const cards = [
    {
      id: 1,
      icon: TrendingUp,
      title: "High ROI Potential",
      text: "High ROI potential due to increasing demand for residential and commercial spaces.",
      style: "sm:col-start-3 lg:col-start-3 lg:col-span-2 lg:row-start-1",
      delay: "delay-100",
      color: "text-yellow-500"
    },
    {
      id: 2,
      icon: Building2,
      title: "Prime Location",
      text: "Proximity to key business districts and industrial zones makes Maha Mumbai a magnet for investors.",
      style: "sm:col-start-4 lg:col-start-4 lg:col-span-2 lg:row-start-2",
      delay: "delay-200",
      color: "text-yellow-500"
    },
    {
      id: 3,
      icon: Map,
      title: "Growing Infrastructure",
      text: "Ongoing developments in healthcare, education, and leisure increase the quality of life.",
      style: "sm:col-start-3 lg:col-start-3 lg:col-span-2 lg:row-start-3",
      delay: "delay-300",
      color: "text-yellow-500"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-8 sm:gap-12 relative">
        {/* Title Section */}
        <div 
          ref={titleRef}
          className={`
            col-span-1 sm:col-span-2 
            sm:sticky sm:top-16 h-fit
            transform transition-all duration-1000 ease-out
            ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}
          `}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6">
            <span className="block transform transition-all duration-700 hover:translate-x-2">
              Unmatched Investment
            </span>
            <span className="block transform transition-all duration-700 delay-100 hover:translate-x-2 mt-2">
              Opportunities
            </span>
          </h2>
          <p className="text-gray-600 text-lg hidden sm:block transform transition-all duration-700 delay-200">
            Discover premium investment opportunities in one of India's fastest-growing regions.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="col-span-1 sm:col-span-3 grid gap-6 sm:gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                ref={el => cardRefs.current[index] = el}
                className={`
                  bg-white rounded-3xl p-6 sm:p-8
                  transform transition-all duration-700 ${card.delay}
                  hover:shadow-xl hover:-translate-y-2
                  cursor-pointer
                  ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}
                  ${card.style}
                  relative overflow-hidden
                  group
                  border border-gray-100
                `}
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 transform transition-transform duration-700 group-hover:scale-150" />

                {/* Icon container */}
                <div className={`
                  relative z-10 mb-6
                  transform transition-all duration-500
                  group-hover:scale-110 group-hover:rotate-12
                  ${card.color}
                `}>
                  <Icon size={32} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className={`
                    text-xl font-semibold mb-3
                    transform transition-all duration-500
                    group-hover:translate-x-2
                    ${card.color}
                  `}>
                    {card.title}
                  </h3>
                  <p className="
                    text-gray-600 text-lg leading-relaxed
                    transform transition-all duration-500
                    group-hover:translate-x-2
                  ">
                    {card.text}
                  </p>
                </div>

                {/* Hover gradient effect */}
                <div className="
                  absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent
                  opacity-0 group-hover:opacity-20
                  transform -translate-x-full group-hover:translate-x-full
                  transition-all duration-1000
                "/>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *, ::before, ::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </section>
  );
};

export default InvestmentOpportunities;