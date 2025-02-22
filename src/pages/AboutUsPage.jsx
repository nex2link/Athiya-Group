import React from 'react';
import { useSmootherScroll } from '../hooks/useSmootherScroll';
import { applyScrollOptimizations } from '../utils/scrollOptimizer';
import { useEffect } from 'react';
import OurMission from '../components/OurMission';
import OurExperts from '../components/OurExperts';

const AboutUsPage = () => {
   useSmootherScroll();
    
    useEffect(() => {
      applyScrollOptimizations();
    }, []);

  return (
    <div className="container mx-auto px-4 py-8 mt-14">
      <div className="scroll-content">
      <OurMission/>
      <OurExperts/> 
      </div>
      </div>
     
  );
};

export default AboutUsPage;