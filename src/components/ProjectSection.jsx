import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Star, Share, ChevronDown, ChevronUp } from 'lucide-react';
import agroimg1 from "../assets/agrow/age02.jpg"
import agroimg2 from "../assets/agrow/age04.jpg"
import agroimg3 from "../assets/agrow/age04.jpg"
import agroimg4 from "../assets/agrow/age07.jpg"
import samimg1 from "../assets/samarth/sam04.jpg"
import samimg2 from "../assets/samarth/sam05.jpg"
import samimg3 from "../assets/samarth/sam06.jpg"
import samimg4 from "../assets/samarth/sam16.jpg"
import dapoliimg1 from "../assets/dapoli/tfd07.jpg"
import dapoliimg2 from "../assets/dapoli/tfd05.jpg"
import dapoliimg3 from "../assets/dapoli/tfd04.jpg"
import dapoliimg4 from "../assets/dapoli/tfd09.jpg"
import farmimg1 from "../assets/farmDale/farmdale_1_1.jpg"
import farmimg2 from "../assets/farmDale/farmdale_2.jpg"
import farmimg3 from "../assets/farmDale/farmdale_3.jpg"
import farmimg4 from "../assets/farmDale/farmdale_1.jpg"
import shivimg1 from "../assets/shiv/sparsh_1.jpg"
import shivimg2 from "../assets/shiv/sparsh_2.jpg"
import shivimg3 from "../assets/shiv/sparsh_3.jpg"

const ProjectSection = () => {
  const [searchParams] = useSearchParams();
  const [expandedId, setExpandedId] = useState(1);
  const [contentHeights, setContentHeights] = useState({});
  const contentRefs = useRef({});
  const imageRefs = useRef({});
  const sectionRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "Maha Mumbai Project - A Prime Investment Opportunity",
      type: "Residential Plot",
      rating: "4.5",
      mainImage: dapoliimg1,
      subImages: [
        dapoliimg2,
        dapoliimg3,
        dapoliimg4
      ],
      description: "Maha Mummbai Project is a premium farmland venture catering to investors looking for high-growth opportunities near Mumbai. Located in the heart of Raigad, this project offers an excellent chance to own land in a strategically developing region while enjoying the beuty of nature.",
      WhyInvest: "Why invest in Maha Mumbai Project?",
      whyIvestPoints:[
        "• Near Key infrastructure projects and industrial zones",
        "• Rapid urbanization and demand surge",
        "• Ensuring a smooth investment process",
        "• Perfect for eco-retreats, farmhouses, and long-term gains"

      ],
      highlights: [
        "Mumbai Goa Four-Lane",
        "Mumbai Trans Harbour Link(MTHL)",
        "Navi Mumbai International Airport",
        "Dedicated Industrial & Bussiness Hubs"
      ],
      details: [
        { price: "₹X lakhs", area: "5000 Sq.ft", type: "Residential Plot" },
        { price: "₹X lakhs", area: "5000 Sq.ft", type: "Residential Plot" }
      ]
    },
    {
      id: 2,
      title: "Dapoli 712 – Coastal Living in Kelashi",
      type: "Residential Plot",
      rating: "4.5",
      mainImage: dapoliimg1,
      subImages: [
        agroimg1,
        agroimg3,
        agroimg4
      ],
      description: "Dapoli 712 is a premium seaside escape nestled in the lush greenery of Kelashi. Experience beachfront living with modern amenities, just a short drive from Mumbai & Pune.",
      WhyInvest: "Why invest in Dapoli 712",
      whyIvestPoints:[
        "• Close to key infrastructure projects",
        "• Perfect for organic farming and eco-retreats",
        "• With upcoming highways and connectivity plans",
        "• Clear LAnd Titles & Hassle-Free Documentation"

      ],
      highlights: [
        "10 mins from the Beach",
        "1 hour from Mumbai-Goa Highway",
        "2 hours from Navi Mumbai International Airport"
      ],
      details: [
        { price: "₹X lakhs", area: "20 Guntha (20,000 SQ. FT)", type: "Residential Plot" },
        { price: "₹X lakhs", area: "ACRE (40,000 SQ. FT)", type: "Residential Plot" }
      ]
    },
    {
      id: 3,
      title: "Agrow Eco",
      type: "Residential Plot",
      rating: "4.5",
      mainImage: agroimg2,
      subImages: [
        agroimg1,
        agroimg3,
        agroimg4
      ],
      description: "AGrow Eco is a prestigious farmland design for eco-conscious investors and nature lovers. Located in the lush greenery of raigad, this project offers on excellent opportunity to own land in a rapidly developing region while embracing sustainable living",
      WhyInvest: "Why invest in AGrow Eco",
      whyIvestPoints:[
        "• Close to key infrastructure projects",
        "• Perfect for organic farming and eco-retreats",
        "• With upcoming highways and connectivity plans",
        "• Clear LAnd Titles & Hassle-Free Documentation"

      ],
      highlights: [
        "Mumbai Goa Four-Lane Highway",
        "Mumabi Multimodal corridor",
        "CST-Raha Local Train Expansion",
        "Ro-Ro Ferry System"
      ],
      details: [
        { price: "₹X lakhs", area: "20 Guntha (20,000 SQ. FT)", type: "Residential Plot" },
        { price: "₹X lakhs", area: "ACRE (40,000 SQ. FT)", type: "Residential Plot" }
      ]
    },
    {
      id: 4,
      title: "The Fram dale",
      type: "Residential Plot",
      rating: "4.5",
      mainImage: farmimg1,
      subImages: [
        farmimg2,
        farmimg3,
        farmimg4
      ],
      description: "Farm Dale is an exclusive farm-living community offeriing lush green plots and farmmhouse villas nestled in a serene natural environment. Design for those who crave tranquility yet want modern comforts, this project blemds sustainable living with luxury.",
      WhyInvest: "Why invest in Farm Dale",
      whyIvestPoints:[
        "• Gated & Secure community",
        "• Plots with Plantation & Organic Farming",
        "• Modern Amenities with Rustic Charm",
        "• Excellent Investment & Weekend Gateway"

      ],
      highlights: [
        "30 mins from City Center",
        "10 mins from Nearest Railway Station",
        "Surrounded by Natural Lakes & Hills"
      ],
      details: [
        { price: "₹X lakhs", area: "5000 Sq.ft", type: "Residential Plot" },
        { price: "₹X lakhs", area: "5000 Sq.ft", type: "Residential Plot" }
      ]
    },
    {
      id: 5,
      title: "Shivsprash",
      type: "Residential Plot",
      rating: "4.5",
      mainImage: shivimg1,
      subImages: [
        shivimg2, 
        shivimg3,
        "/api/placeholder/300/200"
      ],
      description: "Shivsparsh is a Premium land investmnet prject set amidst the serene landscapes of raigad. with a vision to offer tranquil and strategically located farmland, this project presents a perfect opportunity for investors and nature enthusiasts looking for a balance modern infrasturcture and peaceful living",
      WhyInvest: "Why invest in Shivsprash",
      whyIvestPoints:[
        "• ideal for weekend homes and agricultural ventures",
        "• Nestled in the heart of developing Raigad",
        "• Ensuring high appreciation value",
        "• Surrounded by natural beauty and greenery"

      ],
      highlights: [
        "Mumbai Goa Four-Lane Highway",
        "CST-Raha Local Train Expansion",
        "Mumbai Multimodal Corridor (Virar-Alibag)",
        "Ro-ro Ferry System"
      ],
      details: [
        { price: "₹X lakhs", area: "5000 Sq.ft", type: "Residential Plot" },
        { price: "₹X lakhs", area: "5000 Sq.ft", type: "Residential Plot" }
      ]
    },
    {
      id: 6,
      title: "Smarath Hill",
      type: "Residential Plot",
      rating: "4.5",
      mainImage: samimg1,
      subImages: [
        samimg2,
        samimg3,
        samimg4
      ],
      description: "samarth Hill is a premium plotted development project designed to blend modern infrastructure with nautre's serenit. Nestled in the lush landscapes of sindhudurg, this project offers an excellent opportunity for those seeking investment, weekend homes, or sustainable farm living",
      WhyInvest: "Why invest in Smarath Hill",
      whyIvestPoints:[
        "• Growing demand for real estate in Sindhudurg",
        "• A perceft gateway from the city's hustle",
        "• Backed by government projects"

      ],
      highlights: [
        "Mumbai Goa Four-Lane Highway",
        "Mumbai Multimodal Corridor",
        "CST-Raha Local Expansion",
        "Ro-Ro Ferry System"
      ],
      details: [
        { price: "₹X lakhs", area: "5000 Sq.ft", type: "Residential Plot" },
        { price: "₹X lakhs", area: "5000 Sq.ft", type: "Residential Plot" }
      ]
    },
  ];

  useEffect(() => {
    // Initialize content heights for smooth animations
    projects.forEach(project => {
      if (contentRefs.current[project.id]) {
        setContentHeights(prev => ({
          ...prev,
          [project.id]: expandedId === project.id ? contentRefs.current[project.id].scrollHeight : 0
        }));
      }
    });
  }, [expandedId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
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

  const toggleProject = (projectId) => {
    setExpandedId(expandedId === projectId ? null : projectId);
  };

  const handleImageLoad = (projectId, idx) => {
    if (imageRefs.current[`${projectId}-${idx}`]) {
      imageRefs.current[`${projectId}-${idx}`].classList.add('loaded');
    }
  };

  useEffect(() => {
    // Check URL params first, then localStorage
    const projectId = parseInt(searchParams.get('id')) || parseInt(localStorage.getItem('activeProject'));
    if (projectId) {
      setExpandedId(projectId);
      const element = document.getElementById(`project-${projectId}`);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          localStorage.removeItem('activeProject'); // Clear after use
        }, 100);
      }
    }
  }, [searchParams]);

  return (
    <div 
      ref={sectionRef}
      className="bg-gray-50 max-w-7xl mx-auto px-4 md:px-8 py-8 opacity-0 translate-y-4 transition-all duration-1000"
    >
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
        Our Projects
      </h1>

      <div className="space-y-6">
        {projects.map((project) => (
          <div 
          id={`project-${project.id}`}
          key={project.id} 
            className="bg-white rounded-2xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-lg"
          >
            {/* Clickable Header */}
            <button
              onClick={() => toggleProject(project.id)}
              className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors duration-300"
            >
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900 transition-transform duration-300 hover:translate-x-2">
                  {project.title}
                </h2>
                  {/* <span className="inline-flex items-center text-gray-600">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                    {project.rating}
                  </span> */}
              </div>
              <div className={`transform transition-transform duration-300 ${expandedId === project.id ? 'rotate-180' : ''}`}>
                <ChevronDown className="w-6 h-6 text-gray-500" />
              </div>
            </button>

            {/* Expandable Content */}
            <div
              ref={el => contentRefs.current[project.id] = el}
              style={{ height: `${contentHeights[project.id] || 0}px` }}
              className="transition-all duration-500 ease-in-out overflow-hidden origin-top will-change-transform"
            >
              <div className="p-6 border-t border-gray-100">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left side - Images */}
                  <div className="lg:w-1/2 space-y-4">
                    {/* Main Image */}
                    <div id={`project-${project.id}`} className="rounded-2xl overflow-hidden">
                    
                      <img
                        src={project.mainImage}
                        alt={project.title}
                        className="project-image w-full h-96 object-cover transform transition-all duration-700 hover:scale-105"
                        ref={el => imageRefs.current[`${project.id}-main`] = el}
                        onLoad={() => handleImageLoad(project.id, 'main')}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    
                    {/* Sub Images */}
                    <div className="grid grid-cols-3 gap-4">
                      {project.subImages.map((img, idx) => (
                        <div key={idx} 
                          className="rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
                        >
                          <img
                            src={img}
                            alt={`View ${idx + 1} of ${project.title}`}
                            className="project-image w-full h-24 object-cover"
                            ref={el => imageRefs.current[`${project.id}-${idx}`] = el}
                            onLoad={() => handleImageLoad(project.id, idx)}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right side - Content */}
                  <div className="lg:w-1/2 space-y-6">
                    {/* Share button */}
                    <div className="flex justify-end">
                      <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-300">
                        <Share className="w-5 h-5" />
                        Share
                      </button>
                    </div>

                    {/* Key Highlights */}
                    <div className="transform transition-all duration-500 hover:translate-x-2">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Key Highlights
                      </h3>
                      <div className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-300">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {project.highlights.map((highlight, idx) => (
                            <p key={idx} className="text-gray-600">
                              {highlight}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="transform transition-all duration-500 hover:translate-x-2">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Description
                      </h3>
                      <p className="text-gray-600">
                        {project.description}
                      </p>
                    </div>

                    {/* why buy */}
                    <div>
                      <h3 className='text'>{project.WhyInvest}</h3>
                      <p>
                      {project.whyIvestPoints.map((points, idx) => (
                            <p key={idx} className="text-gray-600">
                              {points}
                            </p>
                          ))}
                      </p>
                    </div>

                    {/* Project Details */}
                    {/* <div className="transform transition-all duration-500">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Project Details
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200 rounded-lg">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-200 p-4 text-left">Price (Starting)</th>
                              <th className="border border-gray-200 p-4 text-left">Land Area</th>
                              <th className="border border-gray-200 p-4 text-left">Type</th>
                            </tr>
                          </thead>
                          <tbody>
                            {project.details.map((detail, idx) => (
                              <tr 
                                key={idx} 
                                className="bg-white hover:bg-gray-50 transition-colors duration-300"
                              >
                                <td className="border border-gray-200 p-4">{detail.price}</td>
                                <td className="border border-gray-200 p-4">{detail.area}</td>
                                <td className="border border-gray-200 p-4">{detail.type}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx='true' >{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        .project-image {
          opacity: 0;
          transition: opacity 0.7s ease-in-out;
        }
        
        .project-image.loaded {
          opacity: 1;
        }
        
        @media (prefers-reduced-motion: reduce) {
          *, ::before, ::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectSection;