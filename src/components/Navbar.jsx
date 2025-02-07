import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from "../assets/Athiya-logo.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const linkClass = (path) => `text-black transition-colors duration-300 font-normal ${
    isActive(path) ? 'text-yellow-400 font-semibold' : 'hover:text-yellow-400'
  }`;

  return (
    <nav className={`font-bold fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-screen-xl mx-auto px-4 py-4 overflow-x-hidden"> 
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img className='h-10 w-auto' src={Logo} alt="" />
          </Link>
          
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
            <Link to="/aboutus" className={linkClass('/aboutus')}>About Us</Link>
            <Link to="/project" className={linkClass('/project')}>Projects</Link>
            <Link to="/service" className={linkClass('/service')}>Services</Link>
            <Link to="/mahamumbai" className={linkClass('/mahamumbai')}>Why Maha Mumbai?</Link>
          </div>

          {/* Contact Button */}
          <div className="hidden md:block">
            <Link to="contactus">
            <button className={`px-6 py-2 rounded-full transition-colors duration-300 font-normal  ${
              isActive('/contactus') 
                ? 'bg-yellow-600 text-black'
                : 'bg-yellow-400 text-black hover:bg-yellow-600'
            }`}>
              Contact Us
            </button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
          <div className="flex flex-col space-y-4 bg-white p-4 rounded-lg shadow-lg">
          <Link to="/aboutus" className={linkClass('/aboutus')}>About Us</Link>
            <Link to="/project" className={linkClass('/project')}>Projects</Link>
            <Link to="/service" className={linkClass('/service')}>Services</Link>
            <Link to="/mahamumbai" className={linkClass('/mahamumbai')}>Why Maha Mumbai?</Link>
            <Link to="/contactus">
            <button className={`w-full px-6 py-2 rounded-full transition-colors duration-300 font-normal ${
              isActive('/contactus')
                ? 'bg-yellow-600 text-black'
                : 'bg-yellow-400 text-black hover:bg-yellow-600'
            }`}>
              Contact Us
            </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;