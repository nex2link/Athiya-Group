import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Logo from "../assets/Athiya-logo.png";

const Footer = () => {
  return (
    <div className="w-full bg-[#0D2013] relative mt[-5] rounded-t-2xl lg:px-24">
      <footer className="text-white py-8">
        <div className="container mx-auto px-4 md:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-2">
              <div className="mb-4">
                <img 
                  src={Logo}
                  alt="Athiya Group" 
                  className="h-8"
                />
              </div>
              <p className="text-sm text-gray-400">
                Innovative real estate solutions<br />
                for a future-ready lifestyle.
              </p>
              {/* Social Media Icons */}
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-sm font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Services</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Why Maha Mumbai?</a></li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="text-sm font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Community</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">SRA</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Terms of Services</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-4">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <p>© Athiya Developers. All Rights Reserved</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white">Terms of Services</a>
                <a href="#" className="hover:text-white">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;