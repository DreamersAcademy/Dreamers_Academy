import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate=useNavigate()
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  const navLinks = [
    { 
      title: "Programs",
      submenu: [
        { title: "Mathematics", link: "/" },
        { title: "Science", link: "/" },
        { title: "Language Arts", link: "/" },
        { title: "Test Preparation", link: "/" }
      ]
    },
    { 
      title: "About",
      submenu: [
        { title: "Our Story", link: "/" },
        { title: "Teachers", link: "/" },
        { title: "Testimonials", link: "/" }
      ]
    },
    
    { title: "Contact", link: "/" }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-black font-bold text-xl md:text-2xl flex items-center"
            >
              <span className="text-purple-600 mr-1">Dreamers</span>
              Academy
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((item, index) => (
              <div key={index} className="relative">
                {item.submenu ? (
                  <div className="relative">
                    <button
                      className="text-gray-700 hover:text-purple-600 flex items-center transition-colors"
                      onClick={() => toggleDropdown(index)}
                    >
                      {item.title}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {activeDropdown === index && (
                      <div className="absolute mt-2 left-0 w-48 rounded-md shadow-lg bg-white z-50 py-2 transition-all">
                        {item.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.link}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.link}
                    className="text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
            <Button className="bg-black text-white hover:bg-gray-800"
             onClick={() => navigate("/signup")}
            >Enroll Now</Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-purple-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((item, index) => (
              <div key={index} className="py-1">
                {item.submenu ? (
                  <div>
                    <button
                      className="w-full text-left flex justify-between items-center px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md"
                      onClick={() => toggleDropdown(index)}
                    >
                      {item.title}
                      <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === index && (
                      <div className="pl-4 mt-1 space-y-1">
                        {item.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.link}
                            className="block px-3 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-md"
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.link}
                    className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md"
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-2">
              <Button className="w-full bg-black text-white hover:bg-gray-800"
              onClick={() => navigate("/register")}
              >Enroll Now</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;