import React, { Suspense, lazy } from "react";
import Hero from "../components/Herosection";
import AboutUsCard from "../components/AboutUsCard";
import Services from "../components/Service";
import WhyMahaMumbai from "../components/WhyMahaMumbai";
import HomeProject from "../components/HomeProject";

const Testimonials = lazy(() => import("../components/Testimonials"));
const FAQ = lazy(() => import("../components/FAQ"));

function HomePage() {
  return (
    <main className="relative min-h-screen pt-[72px]">
    <div >
      <Hero />
      <HomeProject />
      <AboutUsCard/>
      <Services/>
      <WhyMahaMumbai/>
      <Suspense fallback={<div>Loading...</div>}>
        <Testimonials/>
        <FAQ/>
      </Suspense>
    </div>
    </main>
  );
}

export default HomePage;