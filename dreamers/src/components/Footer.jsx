import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section with newsletter */}
        <div className="mb-12 p-8 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Stay updated with Dreamers Academy</h3>
              <p className="text-gray-600">Subscribe to our newsletter for the latest courses, events, and educational insights.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-300 flex-grow"
              />
              <Button className="bg-black hover:bg-gray-800 text-white rounded-lg flex-shrink-0">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About */}
          <div>
            <h4 className="font-bold text-lg mb-4">Dreamers Academy</h4>
            <p className="text-gray-600 mb-4">Empowering students to reach their full potential through innovative education and personalized learning experiences.</p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" aria-label="Facebook" className="text-gray-500 hover:text-black transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="text-gray-500 hover:text-black transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="text-gray-500 hover:text-black transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Programs */}
          <div>
            <h4 className="font-bold text-lg mb-4">Programs</h4>
            <ul className="space-y-2">
              {['Mathematics', 'Science', 'Language Arts', 'Test Preparation', 'Summer Camps', 'After-School Programs'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-gray-600 hover:text-black transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Resources */}
          <div>
            <h4 className="font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              {['About Us', 'Our Teachers', 'Testimonials', 'Blog', 'FAQ', 'Career'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-gray-600 hover:text-black transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-gray-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">123 Education Street, Learning City, 54321</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-gray-600 mr-2 flex-shrink-0" />
                <span className="text-gray-600">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-gray-600 mr-2 flex-shrink-0" />
                <a href="mailto:info@dreamersacademy.com" className="text-gray-600 hover:text-black transition-colors">
                  info@dreamersacademy.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section with copyright */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">© {currentYear} Dreamers Academy. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <ul className="flex flex-wrap space-x-6 text-sm">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                  <li key={item}>
                    <Link to="/" className="text-gray-500 hover:text-black transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;