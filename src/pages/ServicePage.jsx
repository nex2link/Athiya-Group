import React from 'react';
import { Building2, LineChart, HardHat, Home, TreePine, Wrench, Paintbrush } from 'lucide-react';
import WhyChooseUs from '../components/WhyChooseUs';

const ServicesSection = () => {
  const services = [
    {
      icon: <Building2 />,
      title: "Property Management",
      description: "Comprehensive property management services to ensure your assets are well-maintained and optimized for maximum value.",
    },
    {
      icon: <LineChart />,
      title: "Investment Advisory",
      description: "Strategic investment advice tailored to your goals, maximizing portfolio value through carefully researched opportunities.",
    },
    {
      icon: <HardHat />,
      title: "Project Consulting",
      description: "Expert guidance on property transactions and consulting services with insight and support at every stage.",
    },
    {
      icon: <Home />,
      title: "Real Estate Development",
      description: "End-to-end development services from planning to completion, ensuring quality delivery of your projects.",
    },
    {
      icon: <Wrench />,
      title: "Infrastructure & Construction",
      description: "Professional construction services for commercial, institutional, and industrial projects with quality certification.",
    },
    {
      icon: <Paintbrush />,
      title: "Interior Designing",
      description: "Comprehensive interior design services tailored to your vision, from concept to execution.",
    },
    {
      icon: <TreePine />,
      title: "Landscaping Works",
      description: "Professional landscaping services using sustainable techniques to enhance property aesthetics and value.",
    }
  ];

  return (
    <div className="relative bg-gradient-to-b from-gray-50 to-white py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white bg-opacity-90">
        <div className="absolute inset-0 bg-grid-gray-100 bg-grid opacity-5"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-lg text-gray-600">
            Experience excellence in real estate services with our comprehensive solutions tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white p-8 rounded-2xl transition-all duration-300 hover:shadow-xl border border-gray-100 hover:border-gray-200"
            >
              {/* Icon Container */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-gray-100 group-hover:to-gray-200 transition-colors duration-300">
                  {React.cloneElement(service.icon, {
                    className: "w-8 h-8 text-gray-700 group-hover:text-gray-900 transition-colors duration-300"
                  })}
                </div>
              </div>
              
              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-black transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 group-hover:text-gray-700 line-clamp-3">
                  {service.description}
                </p>

                {/* Subtle Decorative Element */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;