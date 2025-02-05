import React from "react";
import Hero from "../components/Herosection";
import AboutUs from "../components/AboutUsCard";
import Services from "../components/Service";
import WhyMahaMumbai from "../components/WhyMahaMumbai";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import ProjectsHomepage from "../components/ProjectsHomepage";

function HomePage() {
  return (
    <main className="relative min-h-screen pt-[72px]">
    
      <Hero />
      <ProjectsHomepage />
      <AboutUs/>
      <Services/>
      <WhyMahaMumbai/>
      <Testimonials/>
      <FAQ/>
    </main>
  );
}

export default HomePage;