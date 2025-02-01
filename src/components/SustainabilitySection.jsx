import React, { useRef, useEffect, useState } from 'react';
import { 
  Leaf, 
  Sun, 
  Recycle, 
  Building, 
  Wind, 
  Droplets,
  BatteryCharging,
  Trees
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <div className={`
    group p-6 rounded-2xl bg-white
    transform transition-all duration-700 ${delay}
    hover:shadow-lg hover:-translate-y-2
    border border-gray-100
    relative overflow-hidden
  `}>
    {/* Background decoration */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 
      transform transition-transform duration-700 group-hover:scale-150" />
    
    {/* Icon */}
    <div className="relative z-10 mb-4">
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-50 
        text-green-600 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
        <Icon size={24} strokeWidth={1.5} />
      </div>
    </div>

    {/* Content */}
    <h3 className="text-xl font-semibold mb-2 relative z-10 
      transform transition-all duration-500 group-hover:translate-x-2">
      {title}
    </h3>
    <p className="text-gray-600 relative z-10 
      transform transition-all duration-500 group-hover:translate-x-2">
      {description}
    </p>

    {/* Hover gradient */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-50 to-transparent
      opacity-0 group-hover:opacity-20
      transform -translate-x-full group-hover:translate-x-full transition-all duration-1000" />
  </div>
);

const SustainabilitySection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    {
      icon: Leaf,
      title: "Eco-Friendly Design",
      description: "Buildings designed with sustainable materials and green spaces integration",
      delay: "delay-100"
    },
    {
      icon: Sun,
      title: "Solar Power",
      description: "Renewable energy solutions for reduced carbon footprint",
      delay: "delay-200"
    },
    {
      icon: Recycle,
      title: "Waste Management",
      description: "Advanced recycling and waste treatment systems",
      delay: "delay-300"
    },
    {
      icon: Wind,
      title: "Natural Ventilation",
      description: "Smart design for optimal air circulation and energy efficiency",
      delay: "delay-400"
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="bg-gradient-to-b from-white to-green-50 py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className={`
          text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20
          transform transition-all duration-1000
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="block transform transition-all duration-700 hover:translate-y-[-2px]">
              Sustainability and
            </span>
            <span className="block transform transition-all duration-700 delay-100 hover:translate-y-[-2px] 
              bg-gradient-to-r from-green-600 to-emerald-600 text-transparent bg-clip-text">
              Smart Living
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            With an emphasis on eco-friendly initiatives and smart city planning,
            Maha Mumbai is designed to create a harmonious balance between nature and urbanization.
          </p>
        </div>

        {/* Decorative Elements */}
        {/* <div className="absolute top-0 left-0 -translate-x-1/2 text-green-100">
          <Trees size={400} strokeWidth={0.5} />
        </div> */}

        {/* Feature Grid */}
        <div className={`
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8
          transform transition-all duration-1000 delay-200
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}>
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Bottom Stats */}
        <div className={`
          mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center
          transform transition-all duration-1000 delay-400
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}>
          {[
            { value: "40%", label: "Green Space", icon: Trees },
            { value: "30%", label: "Energy Savings", icon: BatteryCharging },
            { value: "50%", label: "Water Recycled", icon: Droplets },
            { value: "60%", label: "Waste Recycled", icon: Recycle }
          ].map((stat, index) => (
            <div key={index} className="group">
              <div className="flex justify-center mb-2">
                <stat.icon className="w-6 h-6 text-green-600 transform transition-transform 
                  duration-300 group-hover:scale-125" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 
                transform transition-all duration-300 group-hover:translate-y-[-2px]">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
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

export default SustainabilitySection;