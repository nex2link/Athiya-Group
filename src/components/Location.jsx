import React from 'react';
import { Instagram, Linkedin, Youtube } from 'lucide-react';

const Location = () => {
  return (
    <div className="max-w-8xl mx-auto px-4 py-8 sm:px-6 lg:px-16 lg:py-16">
      {/* Mobile view (hidden on desktop) */}
      <div className="lg:hidden flex flex-col space-y-8">
        <div className="w-full h-[300px] rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.220358112302!2d73.03730469999999!3d19.010009199999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3ac5776a383%3A0xfc9af75afad3c237!2sAthiya%20Developers%20Pvt.Ltd.!5e0!3m2!1sen!2sin!4v1698903037299!5m2!1sen!2sin"
            className="w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        
        <div className="w-full bg-white p-6">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-black to-gray-800 bg-clip-text text-transparent">
            Address
          </h2>
          
          <div className="space-y-6">
            <p className="text-gray-800 text-lg max-w-md leading-relaxed">
              Office 506, B-wing, Mahaavir Icon, Sector-15, 
              CBD Belapur, Navi-Mumbai. 400416
            </p>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Contact Us:</h3>
              <p className="text-gray-800">
                +91 8652771155 / 9833931199
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-800">
                athiyadevelopers@gmail.com
              </p>
            </div>

            <div className="flex gap-6">
              <a 
                href="https://www.instagram.com/athiyagroup?igsh=dmNsbGh3bDBjOGt0" 
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                aria-label="Facebook"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://www.linkedin.com/company/athiyagroup/" 
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://youtube.com/@athiyadeveloperspvt.ltd.5832?si=nDk62azTePq0pHLt" 
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                aria-label="Youtube"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop view (hidden on mobile) */}
      <div className="hidden lg:block relative w-full h-[450px] rounded-2xl overflow-hidden">
        <div className="absolute left-0 top-0 w-[85%] h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.220358112302!2d73.03730469999999!3d19.010009199999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3ac5776a383%3A0xfc9af75afad3c237!2sAthiya%20Developers%20Pvt.Ltd.!5e0!3m2!1sen!2sin!4v1698903037299!5m2!1sen!2sin"
            className="w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="absolute top-0 right-0 bottom-0 w-[40%] bg-gradient-to-l from-white via-white to-transparent flex items-center">
          <div className="pl-12 pr-8 w-full">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-black to-gray-800 bg-clip-text text-transparent">
              Address
            </h2>
            
            <div className="space-y-7">
              <p className="text-gray-800 text-lg max-w-md leading-relaxed">
                Office 506, B-wing, Mahaavir Icon, Sector-15, 
                CBD Belapur, Navi-Mumbai. 400416
              </p>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Contact Us:</h3>
                <p className="text-gray-800">
                  +91 8652771155 / 9833931199
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-800">
                  athiyadevelopers@gmail.com
                </p>
              </div>

              <div className="flex gap-6 mt-8">
                <a 
                  href="https://www.instagram.com/athiyagroup?igsh=dmNsbGh3bDBjOGt0"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a 
                  href=" https://www.linkedin.com/company/athiyagroup/"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a 
                  href="https://youtube.com/@athiyadeveloperspvt.ltd.5832?si=nDk62azTePq0pHLt" 
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  aria-label="Youtube"
                >
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;