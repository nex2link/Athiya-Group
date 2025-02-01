import React, { useRef, useEffect, useState } from 'react';
import { Building2, Shield, Trophy, Users, ArrowRight } from 'lucide-react';

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    {
      icon: Building2,
      title: "Prime Locations",
      description: "Strategic properties in high-growth areas"
    },
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "Clear communication and ethical practices"
    },
    {
      icon: Trophy,
      title: "Proven Excellence",
      description: "Track record of successful projects"
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Dedicated support throughout your journey"
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
      className="bg-gradient-to-br from-[#f3fdf6] to-[#f0f0f0] py-16 sm:py-20 lg:py-24 overflow-hidden relative"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 gap-12 justify-center items-center">
          {/* Main Content */}
          <div className={`
            text-center max-w-3xl mx-auto
            transform transition-all duration-1000
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="block transform transition-all duration-700 hover:translate-y-[-2px]">
                Why Choose Maha Mumbai with
              </span>
              <span className="block transform transition-all duration-700 delay-100 hover:translate-y-[-2px]
                bg-gradient-to-r from-[#eec872] to-indigo-600 text-transparent bg-clip-text mt-2">
                Athiya Developers?
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 leading-relaxed">
              At Athiya Developers, we identify prime opportunities in Maha Mumbai to bring you projects
              that align with your dreams and investment goals. With our expertise and transparency,
              we make your journey seamless and rewarding.
            </p>
            <p className="text-xl sm:text-2xl font-medium mb-8 text-gray-800
              transform transition-all duration-700 delay-200">
              Discover the future with Maha Mumbai.
            </p>

            {/* CTA Button */}
            <div className="mb-16">
              <button className="group relative bg-black text-white py-4 px-8 rounded-lg font-medium 
                transform transition-all duration-300 hover:scale-105 hover:bg-yellow-400 hover:text-[#0F1F14]
                hover:shadow-lg hover:shadow-blue-500/20">
                <span className="flex items-center gap-2">
                  Explore Our Projects Now
                  <ArrowRight className="w-5 h-5 transform transition-transform duration-300 
                    group-hover:translate-x-1" />
                </span>
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8
              transform transition-all duration-1000 delay-300">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className={`
                    group p-6 rounded-xl bg-white shadow-sm hover:shadow-lg
                    transform transition-all duration-500 hover:-translate-y-2
                    delay-${(index + 1) * 100}
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  `}>
                    <div className="mb-4 text-[#eec872] transform transition-all duration-300 
                      group-hover:scale-110 group-hover:rotate-12">
                      <Icon size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900
                      transform transition-all duration-300 group-hover:translate-x-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 transform transition-all duration-300 
                      group-hover:translate-x-2">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
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

export default WhyChooseUs;