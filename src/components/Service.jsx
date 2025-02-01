import React from "react";
import ServiceCard from "./ServiceCard";
import KnowMoreButton from "./KnowMoreButton";
import Serviceimg from "../assets/services.jpg";
const Services = () => {
  const services = [
    {
      title: "Real Estate Consulting",
      description: "Expert advice to maximize property investments.",
    },
    {
      title: "Land Development",
      description: "Transform land into premium spaces.",
    },
    {
      title: "Investment Strategies",
      description: "Customized plans for optimal returns.",
    },
    {
      title: "Legal Advisory",
      description: "Simplified legal support for transactions",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">
          Tailored Services, Trusted Expertise
        </h2>
        <p className="max-w-3xl mx-auto text-gray-600">
          We offer a comprehensive range of real estate solutions designed to
          meet your unique needs, backed by our experience and unwavering
          commitment to excellence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <img
            src={Serviceimg}
            alt="Misty landscape"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
        <div className="lg:col-span-3 grid grid-cols-2 gap-8 mt-14 ml-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
      <KnowMoreButton/>
    </section>
  );
};

export default Services;
