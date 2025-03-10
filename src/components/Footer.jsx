import React from 'react';
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import Logo from "../assets/athiya-logo.webp";
import nex2link from "../assets/nex2link-logo.svg";

const Footer = () => {
  return (
    <div className="w-full bg-[#0D2013] relative mt[-5] rounded-t-2xl lg:px-24">
      <footer className="text-white py-12">
        <div className="container mx-auto px-4 md:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Logo and Description */}
            <div className="col-span-1 lg:col-span-1">
              <div className="mb-6">
                <img 
                  src={Logo}
                  alt="Athiya Group" 
                  className="h-10"
                />
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Innovative real estate solutions<br />
                for a future-ready lifestyle.
              </p>
              {/* Social Media Icons */}
              <div className="flex space-x-5 mt-4">
                <a href="https://www.facebook.com/profile.php?id=100093049946700" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <Facebook size={20} />
                </a>
                <a href="https://www.instagram.com/athiyagroup?igsh=dmNsbGh3bDBjOGt0" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <Instagram size={20} />
                </a>
                <a href="https://www.linkedin.com/company/athiyagroup/" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <Linkedin size={20} />
                </a>
                <a href="https://youtube.com/@athiyadeveloperspvt.ltd.5832?si=nDk62azTePq0pHLt" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            {/* Contact Information with Icons */}
            <div className="col-span-1 lg:col-span-1">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin size={18} className="text-gray-400 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-400">
                    Office 506, B-wing, Mahaavir Icon, Sector-15, CBD Belapur, Navi-Mumbai. 400416
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone size={18} className="text-gray-400 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-400">+91 8652771155 / 9833931199</span>
                </li>
                <li className="flex items-center">
                  <Mail size={18} className="text-gray-400 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-400">athiyadevelopers@gmail.com</span>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div className="col-span-1 lg:col-span-1">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">Company</h3>
              <ul className="space-y-3">
                <li><a href="/" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Home</a></li>
                <li><a href="/aboutus" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">About Us</a></li>
                <li><a href="/service" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Services</a></li>
                <li><a href="/mahamumbai" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Why Maha Mumbai?</a></li>
              </ul>
            </div>

            {/* Resources Links */}
            <div className="col-span-1 lg:col-span-1">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">Resources</h3>
              <ul className="space-y-3">
                <li><a href="/contactus" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Contact</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Terms of Services</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
              <p>© {new Date().getFullYear()} Athiya Developers. All Rights Reserved</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300">Terms of Services</a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300">Privacy Policy</a>
              </div>
            </div>
            
            {/* Created by logo - centered */}
            <div className="flex justify-center mt-8">
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-2">Created by</p>
                <img src={nex2link} alt="Creator Logo" className="h-8" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;