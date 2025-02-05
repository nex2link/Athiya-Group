import { useState, useEffect } from 'react';
import Logo from "../assets/Athiya-logo.png";
import { Link } from 'react-router-dom';
import ContactModal from './ContactModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

    const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'fixed bg-white/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }}`}>
            <div className="container mx-auto px-4 lg:px-14 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/">
                        <img src={Logo} alt="Athiya Group" className="h-10 w-auto" />
                        </Link>
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden p-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg 
                            className="w-6 h-6" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            {isOpen ? (
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        <Link 
                            to="/aboutus" 
                            className="text-black hover:text-yellow-400 transition-colors duration-300"
                        >
                            About Us
                        </Link>
                        <Link 
                            to="/project" 
                            className="text-black hover:text-yellow-400 transition-colors duration-300"
                        >
                            Projects
                        </Link>
                        <Link 
                            to="/service" 
                            className="text-black hover:text-yellow-400 transition-colors duration-300"
                        >
                            Services
                        </Link>
                        <Link 
                            to="/mahamumbai" 
                            className="text-black hover:text-yellow-400 transition-colors duration-300"
                        >
                            Why Maha Mumbai?
                        </Link>
                    </div>

                    {/* Contact Button */}
                    <div className="hidden md:block">
                        {/* <button className="bg-[#0F1F14] text-yellow-400 px-6 py-2 rounded-full hover:bg-yellow-400 hover:text-[#0F1F14] transition-colors duration-300 shadow-lg">
                            Contact Us
                        </button> */}
                        <Link to="/contactus">
                        <button className="bg-yellow-400 text-black px-6 py-2 rounded-full hover:bg-yellow-600 hover:text-[#0F1F14] transition-colors duration-300">
                            Contact Us
                        </button>
                        </Link>
                        {/* <ContactModal/> */}
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
                    <div className="flex flex-col space-y-4 bg-white p-4 rounded-lg shadow-lg">
                        <a href="aboutus" className="text-black hover:text-yellow-400 transition-colors duration-300">About Us</a>
                        <a href="/project" className="text-black hover:text-yellow-400 transition-colors duration-300">Projects</a>
                        <a href="/service" className="text-black hover:text-yellow-400 transition-colors duration-300">Services</a>
                        <a href="/mahamumbai" className="text-black hover:text-yellow-400 transition-colors duration-300">Why Maha Mumbai?</a>
                        <Link to="/contactus">
                        <button className="bg-yellow-400 text-black px-6 py-2 rounded-full hover:bg-yellow-600 hover:text-[#0F1F14] transition-colors duration-300">
                            Contact Us
                        </button>
                        </Link>

                        {/* <button>contact us</button> */}
                        {/* <ContactModal isOpen={isContactOpen} setIsOpen={setIsContactOpen}/> */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
