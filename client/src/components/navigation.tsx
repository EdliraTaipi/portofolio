import { Link, useLocation } from "wouter";
import { Briefcase, TrendingUp, Users, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { LinkedInButton } from "@/components/linkedin-button";

interface NavigationProps {
  onSectionChange?: (section: string) => void;
  currentSection?: string;
}

const Navigation = ({ onSectionChange, currentSection }: NavigationProps) => {
  const [location] = useLocation();

  const navItems = [
    {
      path: "/project-management",
      label: "Project Management",
      icon: Briefcase,
      id: "project-management"
    },
    {
      path: "/digital-marketing",
      label: "Digital Marketing", 
      icon: TrendingUp,
      id: "digital-marketing"
    },
    {
      path: "/strategic-leadership",
      label: "Strategic Leadership",
      icon: Users,
      id: "strategic-leadership"
    }
  ];

  const getCurrentIndex = () => {
    return navItems.findIndex(item => item.id === currentSection || location === item.path);
  };

  const handlePrevious = () => {
    const currentIndex = getCurrentIndex();
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : navItems.length - 1;
    if (onSectionChange) {
      onSectionChange(navItems[prevIndex].id);
    }
  };

  const handleNext = () => {
    const currentIndex = getCurrentIndex();
    const nextIndex = currentIndex < navItems.length - 1 ? currentIndex + 1 : 0;
    if (onSectionChange) {
      onSectionChange(navItems[nextIndex].id);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-b border-gray-800 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              EDLIRA TAIPI
            </Link>
          </motion.div>
          
          {/* Navigation Controls */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Section Navigation */}
            {onSectionChange && (
              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={handlePrevious}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <ArrowLeft size={20} />
                </motion.button>
                
                <div className="flex space-x-2">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = item.id === currentSection || location === item.path;
                    
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => onSectionChange(item.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                          isActive 
                            ? 'bg-white/10 text-white shadow-lg' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon size={16} className="mr-2" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
                
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <ArrowRight size={20} />
                </motion.button>
              </div>
            )}

            {/* Regular Navigation for standalone pages */}
            {!onSectionChange && (
              <div className="flex space-x-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.path;
                  
                  return (
                    <motion.div key={item.path} whileHover={{ scale: 1.05 }}>
                      <Link
                        href={item.path}
                        className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                          isActive 
                            ? 'bg-white/10 text-white shadow-lg' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon size={16} className="mr-2" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Home Link */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/"
              className="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-xl text-white rounded-lg hover:bg-white/20 transition-all duration-200 shadow-lg text-base font-medium border border-gray-600/30"
            >
              <motion.span
                className="text-lg"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🏠
              </motion.span>
              <span className="font-medium">HOME</span>
            </Link>
          </motion.div>

          {/* LinkedIn */}
          <div className="flex items-center space-x-4">
            <LinkedInButton variant="nav" size="sm" />
          </div>
        </div>


      </div>
    </motion.nav>
  );
};

export default Navigation;