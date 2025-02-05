import React, { useState } from 'react';
import buildingimg from "../assets/building.jpg"

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    iWantTo: '',
    notes: ''
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
    // Add your form submission logic here
  };

  return (
    <div className="flex min-h-[400px] rounded-3xl overflow-hidden mt-28 mx-16 relative">
      {/* Left side with background image */}
      <div className="absolute left-5 w-1/2 h-full rounded-xl">
        <img 
          src={buildingimg} 
          alt="City buildings" 
          className="w-full h-full object-cover rounded-l-3xl"
        />
        <div className="absolute inset-0 bg-black/20 rounded-l-3xl" /> {/* Overlay */}
        <h1 className="absolute top-12 left-12 text-5xl font-bold text-white">
          Contact Us
        </h1>
      </div>

      {/* Right side with form */}
      <div className="w-1/2 ml-auto bg-[#1a2e1a] p-12 rounded-3xl ">
        <h2 className="text-3xl font-semibold text-white mb-8">
          Still haven't found what you are looking for?
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-white mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-3 rounded bg-[#2d432d] text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-green-500"
                placeholder="First Name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-white mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-3 rounded bg-[#2d432d] text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-green-500"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="iWantTo" className="block text-white mb-2">
              I Want To
            </label>
            <input
              type="text"
              name="iWantTo"
              id="iWantTo"
              value={formData.iWantTo}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#2d432d] text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-green-500"
              placeholder="Buy Land in..."
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-white mb-2">
              Notes
            </label>
            <input
              type="text"
              name="notes"
              id="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#2d432d] text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-green-500"
              placeholder="Buy Land in..."
            />
          </div>

          <button
            type="submit"
            className="bg-white text-[#1a2e1a] px-14 py-2 rounded-2xl font-medium hover:bg-gray-100 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;