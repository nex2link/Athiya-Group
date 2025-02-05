import React, { useState } from 'react';
import buildingimg from "../assets/building.jpg"

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    number: '',
    email: '',
    enquiry: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-14">
      <div className="flex flex-col lg:flex-row min-h-[600px] rounded-3xl overflow-hidden shadow-xl">
        {/* Left side with background image */}
        <div className="relative w-full lg:w-1/2 h-48 lg:h-auto">
          <img 
            src={buildingimg} 
            alt="City buildings" 
            className="w-full h-full object-cover rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none" />
          <div className="absolute inset-0 flex flex-col justify-center px-8 lg:px-12">
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-gray-200 max-w-md">
              Get in touch with us for any questions about our projects
            </p>
          </div>
        </div>

        {/* Right side with form */}
        <div className="w-full lg:w-1/2 bg-[#1a2e1a] p-6 lg:p-8 rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none">
          <h2 className="text-2xl lg:text-3xl font-semibold text-white mb-6 lg:mb-8">
            Still haven't found what you are looking for?
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-white text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-[#2d432d] text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-green-500 transition-shadow"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label htmlFor="number" className="block text-white text-sm font-medium mb-2">
                  Number
                </label>
                <input
                  type="tel"
                  name="number"
                  id="number"
                  value={formData.number}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-[#2d432d] text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-green-500 transition-shadow"
                  placeholder="Enter your contact number"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#2d432d] text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-green-500 transition-shadow"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div>
              <label htmlFor="enquiry" className="block text-white text-sm font-medium mb-2">
                I want to Enquire for
              </label>
              <select
                name="enquiry"
                id="enquiry"
                value={formData.enquiry}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#2d432d] text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-green-500 transition-shadow"
                required
              >
                <option value="">Select a project</option>
                <option value="Third Mumbai">Third Mumbai</option>
                <option value="dapoli 712">dapoli 712</option>
                <option value="AGRow eco">AGRow eco</option>
                <option value="Samarth Hill">Samarth Hill</option>
                <option value="Shivsparash">Shivsparash</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#2d432d] text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-green-500 transition-shadow min-h-[80px] resize-y"
                placeholder="Add your message here..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-white text-[#1a2e1a] px-8 lg:px-14 py-3 rounded-xl font-medium 
                       hover:bg-gray-100 transition-all duration-200 shadow-lg 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;