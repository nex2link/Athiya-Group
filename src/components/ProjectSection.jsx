import React, { useState } from 'react';
import { Star, Share, ChevronDown, ChevronUp } from 'lucide-react';

const ProjectSection = () => {
  // Sample data for multiple projects
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
    // Add more projects here with the same structure
  ];

  // State to track which project is expanded
  const [expandedId, setExpandedId] = useState(1);

  const toggleProject = (projectId) => {
    setExpandedId(expandedId === projectId ? null : projectId);
  };

  return (
    <div className="bg-gray-50 max-w-7xl mx-auto px-4 md:px-8 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
        Our Projects
      </h1>

      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Clickable Header */}
            <button
              onClick={() => toggleProject(project.id)}
              className="w-full flex items-center justify-between p-6 hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {project.title}
                </h2>
                <span className="inline-flex items-center text-gray-600">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                  {project.rating}
                </span>
              </div>
              {expandedId === project.id ? 
                <ChevronUp className="w-6 h-6 text-gray-500" /> : 
                <ChevronDown className="w-6 h-6 text-gray-500" />
              }
            </button>

            {/* Expandable Content */}
            {expandedId === project.id && (
              <div className="p-6 border-t border-gray-100">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left side - Images */}
                  <div className="lg:w-1/2">
                    {/* Main Image */}
                    <div className="rounded-2xl overflow-hidden mb-4">
                      <img
                        src={project.mainImage}
                        alt={project.title}
                        className="w-full h-96 object-cover"
                      />
                    </div>
                    
                    {/* Sub Images */}
                    <div className="grid grid-cols-3 gap-4">
                      {project.subImages.map((img, idx) => (
                        <div key={idx} className="rounded-xl overflow-hidden">
                          <img
                            src={img}
                            alt={`View ${idx + 1}`}
                            className="w-full h-24 object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right side - Content */}
                  <div className="lg:w-1/2 space-y-6">
                    {/* Share button */}
                    <div className="flex justify-end">
                      <button className="flex items-center gap-2 text-gray-600">
                        <Share className="w-5 h-5" />
                        Share
                      </button>
                    </div>

                    {/* Key Highlights */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Key Highlights
                      </h3>
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <div className="grid grid-cols-2 gap-4">
                          {project.highlights.map((highlight, idx) => (
                            <p key={idx} className="text-gray-600">
                              {highlight}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Description
                      </h3>
                      <p className="text-gray-600">
                        {project.description}
                      </p>
                    </div>

                    {/* Project Details */}
                    <div>
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
                              <tr key={idx} className="bg-white">
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;