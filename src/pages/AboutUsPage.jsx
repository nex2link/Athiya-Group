import React from 'react';
import AboutUsCard from "../components/AboutUsCard"
import OurMission from '../components/OurMission';
import OurExperts from '../components/OurExperts';

const AboutUsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-14">
      {/* <AboutUsCard/> */}
     
      <OurMission/>
      <OurExperts/> 
      </div>
  );
};

export default AboutUsPage;