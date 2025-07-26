import { Linkedin, Twitter, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Edlira Taipi</h3>
            <p className="text-gray-400 mb-4">
              Digital Marketing Specialist focused on creating strategic, 
              sustainable, and data-driven marketing solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Github size={24} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors duration-200">About</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-white transition-colors duration-200">Projects</a></li>
              <li><a href="#skills" className="text-gray-400 hover:text-white transition-colors duration-200">Skills</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors duration-200">Contact</a></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Specializations</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Digital Marketing Strategy</li>
              <li>Brand Analysis & Development</li>
              <li>Consumer Behavior Research</li>
              <li>Social Media Marketing</li>
              <li>Marketing Analytics</li>
              <li>Sustainability Consulting</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Edlira Taipi. All rights reserved. Built with passion for digital marketing excellence.
          </p>
        </div>
      </div>
    </footer>
  );
}
