import React from 'react';
import bgimg from '../assets/mumbai-skyline.jpg';
import GrowthSection from '../components/GrowthSection';
import KeyHighlights from '../components/KeyHighlights';
import InvestmentOpportunities from '../components/InvestentOpportunities';
import NaturalBeauty from '../components/NaturalBeauty';
import WhyChooseUs from '../components/WhyChooseUs';
import SustainabilitySection from "../components/SustainabilitySection"
import Footer from "../components/Footer"

const MahaMumbai = () => {
  return (
    <div>

    <div className="relative h-[100vh] w-full overflow-hidden mt-24 py-36 ">
      <div className="absolute inset-0">
        <img 
          className="h-full w-full object-cover" 
          src={bgimg} 
          alt="Mumbai Skyline" 
          />
      </div>
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent"></div>
      {/* Bottom fade */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div> */}
    </div>
    <GrowthSection/>
    <KeyHighlights/>
    <InvestmentOpportunities/>
    <NaturalBeauty/>
    <SustainabilitySection/>
    <WhyChooseUs/>

</div>
  );
};

export default MahaMumbai;