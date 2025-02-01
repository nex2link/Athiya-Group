import React, { useState, useRef, useEffect } from 'react';
import { Star, Share, ChevronDown, ChevronUp } from 'lucide-react';

const ProjectSection = () => {
  const [expandedId, setExpandedId] = useState(1);
  const [contentHeights, setContentHeights] = useState({});
  const contentRefs = useRef({});
  const imageRefs = useRef({});
  const sectionRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "Dapoli 712 – Coastal Living in Kelashi",
      type: "Residential Plot",
      rating: "4.5",
      mainImage: "/api/placeholder/800/500",
      subImages: [
        "/api/placeholder/300/200",
        "/api/placeholder/300/200",
        "/api/placeholder/300/200"
      ],
      description: "Dapoli 712 is a premium seaside escape nestled in the lush greenery of Kelashi. Experience beachfront living with modern amenities, just a short drive from Mumbai & Pune.",
      highlights: [
        "10 mins from the Beach",
        "1 hour from Mumbai-Goa Highway",
        "2 hours from Navi Mumbai International Airport"
      ],
      details: [
        { price: "₹X lakhs", area: "5000 Sq.ft", type: "Residential Plot" },
        { price: "₹X lakhs", area: "5000 Sq.ft", type: "Residential Plot" }
      ]
    },
    {
      id: 2,
      title: "Agrow Eco",
      type: "Residential Plot",
      rating: "4.5",
      mainImage: "/api/placeholder/800/500",
      subImages: [
        "/api/placeholder/300/200",
        "/api/placeholder/300/200",
        "/api/placeholder/300/200"
      ],
      description: "Dapoli 712 is a premium seaside escape nestled in the lush greenery of Kelashi. Experience beachfront living with modern amenities, just a short drive from Mumbai & Pune.",
      highlights: [
        "10 mins from the Beach",
        "1 hour from Mumbai-Goa Highway",
        "2 hours from Navi Mumbai International Airport"
      ],
      details: [
        { price: "₹X lakhs", area: "5000 Sq.ft", type: "Residential Plot" },
        { price: "₹X lakhs", area: "5000 Sq.ft", type: "Residential Plot" }
      ]
    },
    {
      id: 3,
      title: "The Fram dale",
      type: "Residential Plot",
      rating: "4.5",
      mainImage: "/api/placeholder/800/500",
      subImages: [
        "/api/placeholder/300/200",
        "/api/placeholder/300/200",
        "/api/placeholder/300/200"
      ],
      description: "Dapoli 712 is a premium seaside escape nestled in the lush greenery of Kelashi. Experience beachfront living with modern amenities, just a short drive from Mumbai & Pune.",
      highlights: [
        "10 mins from the Beach",
        "1 hour from Mumbai-Goa Highway",
        "2 hours from Navi Mumbai International Airport"
      ],
      details: [
        { price: "₹X lakhs", area: "5000 Sq.ft", type: "Residential Plot" },
        { price: "₹X lakhs", area: "5000 Sq.ft", type: "Residential Plot" }
      ]
    },
    {
      id: 4,
      title: "Shivsprash",
      type: "Residential Plot",
      rating: "4.5",
      mainImage: "/api/placeholder/800/500",
      subImages: [
        "/api/placeholder/300/200",
        "/api/placeholder/300/200",
        "/api/placeholder/300/200"
      ],
      description: "Dapoli 712 is a premium seaside escape nestled in the lush greenery of Kelashi. Experience beachfront living with modern amenities, just a short drive from Mumbai & Pune.",
      highlights: [
        "10 mins from the Beach",
        "1 hour from Mumbai-Goa Highway",
        "2 hours from Navi Mumbai International Airport"
      ],
      details: [
        { price: "₹X lakhs", area: "5000 Sq.ft", type: "Residential Plot" },
        { price: "₹X lakhs", area: "5000 Sq.ft", type: "Residential Plot" }
      ]
    },
    {
      id: 5,
      title: "Smarath Hill",
      type: "Residential Plot",
      rating: "4.5",
      mainImage: "/api/placeholder/800/500",
      subImages: [
        "/api/placeholder/300/200",
        "/api/placeholder/300/200",
        "/api/placeholder/300/200"
      ],
      description: "Dapoli 712 is a premium seaside escape nestled in the lush greenery of Kelashi. Experience beachfront living with modern amenities, just a short drive from Mumbai & Pune.",
      highlights: [
        "10 mins from the Beach",
        "1 hour from Mumbai-Goa Highway",
        "2 hours from Navi Mumbai International Airport"
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
          <div key={project.id} 
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
                <span className="inline-flex items-center text-gray-600">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                  {project.rating}
                </span>
              </div>
              <div className={`transform transition-transform duration-300 ${expandedId === project.id ? 'rotate-180' : ''}`}>
                <ChevronDown className="w-6 h-6 text-gray-500" />
              </div>
            </button>

            {/* Expandable Content */}
            <div
              ref={el => contentRefs.current[project.id] = el}
              style={{ height: `${contentHeights[project.id] || 0}px` }}
              className="transition-all duration-500 ease-in-out overflow-hidden"
            >
              <div className="p-6 border-t border-gray-100">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left side - Images */}
                  <div className="lg:w-1/2 space-y-4">
                    {/* Main Image */}
                    <div className="rounded-2xl overflow-hidden">
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

                    {/* Project Details */}
                    <div className="transform transition-all duration-500">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
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