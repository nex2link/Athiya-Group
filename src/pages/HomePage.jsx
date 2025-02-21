import React from "react";
import { useSmootherScroll } from '../hooks/useSmootherScroll';
import { applyScrollOptimizations } from '../utils/scrollOptimizer';
import { useEffect } from 'react';
import Hero from "../components/Herosection";
import AboutUs from "../components/AboutUsCard";
import Services from "../components/Service";
import WhyMahaMumbai from "../components/WhyMahaMumbai";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import HomeProject from "../components/HomeProject";

function HomePage() {
  useSmootherScroll();
  
  useEffect(() => {
    applyScrollOptimizations();
  }, []);

  return (
    <main className="relative min-h-screen pt-[72px]">
    <div className="scroll-content">
      <Hero />
      <HomeProject />
      <AboutUs/>
      <Services/>
      <WhyMahaMumbai/>
      <Testimonials/>
      <FAQ/>
      </div>
    </main>
  );
}

export default HomePage;