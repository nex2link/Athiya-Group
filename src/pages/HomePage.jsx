import React from "react";
import Hero from "../components/Herosection";
import Projects from "../components/Projects";
import AboutUs from "../components/AboutUsCard";
import Services from "../components/Service";
import WhyMahaMumbai from "../components/WhyMahaMumbai";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";

function HomePage() {
  return (
    <main className="relative min-h-screen pt-[72px]">
    
      <Hero />
      <Projects />
      <AboutUs/>
      <Services/>
      <WhyMahaMumbai/>
      <Testimonials/>
      <FAQ/>
    </main>
  );
}

export default HomePage;