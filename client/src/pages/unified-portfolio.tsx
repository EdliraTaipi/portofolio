import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Briefcase, TrendingUp, Users, CheckCircle, Calendar, Target, BarChart3, Brain, Globe, Shield } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Project } from "@shared/schema";
import Navigation from "@/components/navigation";
import { LinkedInButton } from "@/components/linkedin-button";

const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/10 rounded-full"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const UnifiedPortfolio = () => {
  const [currentSection, setCurrentSection] = useState("project-management");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  
  // Initialize search from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
      setIsSearchVisible(true);
    }
  }, []);
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects']
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        const sections = ["project-management", "digital-marketing", "strategic-leadership"];
        const current = sections.indexOf(currentSection);
        const prev = current > 0 ? current - 1 : sections.length - 1;
        setCurrentSection(sections[prev]);
      } else if (e.key === 'ArrowRight') {
        const sections = ["project-management", "digital-marketing", "strategic-leadership"];
        const current = sections.indexOf(currentSection);
        const next = current < sections.length - 1 ? current + 1 : 0;
        setCurrentSection(sections[next]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSection]);

  const sections = {
    "project-management": {
      title: "Project Management",
      subtitle: "Leading digital transformation with PRINCE2 & Agile methodologies",
      icon: Briefcase,
      skills: [
        { name: "PRINCE2 & Agile Methodologies", percentage: 95 },
        { name: "Stakeholder Management", percentage: 92 },
        { name: "Budget & Risk Management", percentage: 90 },
        { name: "Team Leadership & Coordination", percentage: 88 },
        { name: "Digital Transformation", percentage: 86 },
        { name: "Quality Assurance & Delivery", percentage: 90 },
      ],
      competencies: [
        {
          icon: Calendar,
          title: "Project Planning",
          items: ["Gantt Charts & Timeline Management", "Resource Allocation", "Milestone Tracking"]
        },
        {
          icon: Users,
          title: "Team Leadership",
          items: ["Cross-functional Team Management", "Communication Strategies", "Conflict Resolution"]
        },
        {
          icon: Target,
          title: "Risk Management",
          items: ["Risk Assessment & Mitigation", "Contingency Planning", "Quality Control"]
        }
      ],
      projects: projects.filter(p => p.category === "Project Management"),
      highlights: ["PRINCE2 Methodology", "Risk Assessment Expert", "Stakeholder Management"]
    },
    "digital-marketing": {
      title: "Digital Marketing",
      subtitle: "MSc graduate specializing in data-driven strategies and AI integration",
      icon: TrendingUp,
      skills: [
        { name: "Digital Campaign Strategy", percentage: 94 },
        { name: "Consumer Behavior Analysis", percentage: 90 },
        { name: "Social Media Marketing", percentage: 88 },
        { name: "Data Analytics & Insights", percentage: 86 },
        { name: "Brand Strategy Development", percentage: 92 },
        { name: "AI Integration & Automation", percentage: 82 },
      ],
      competencies: [
        {
          icon: BarChart3,
          title: "Analytics & Insights",
          items: ["Google Analytics & GA4", "Consumer Journey Mapping", "Performance Optimization"]
        },
        {
          icon: Target,
          title: "Campaign Management",
          items: ["Multi-channel Campaigns", "A/B Testing", "ROI Measurement"]
        },
        {
          icon: Globe,
          title: "Brand Strategy",
          items: ["Brand Positioning", "Market Research", "Competitive Analysis"]
        }
      ],
      projects: projects.filter(p => 
        p.category === "Digital Marketing" || 
        p.category === "Brand Strategy" ||
        p.category === "Consumer Behavior" ||
        p.category === "Social Media"
      ),
      highlights: ["Digital Transformation Expert", "Brand Strategy Specialist", "Data-Driven Marketing Leader"]
    },
    "strategic-leadership": {
      title: "Strategic Management and Leadership",
      subtitle: "Holding Level 8 Diploma in Strategic Management and Leadership with cross-border strategy expertise",
      icon: Users,
      skills: [
        { name: "Strategic Leadership Development", percentage: 96 },
        { name: "Cross-Border Strategy Planning", percentage: 94 },
        { name: "Cultural Intelligence & Analysis", percentage: 92 },
        { name: "Research Methods & Data Analysis", percentage: 90 },
        { name: "Stakeholder Management", percentage: 95 },
        { name: "Organizational Transformation", percentage: 88 },
      ],
      competencies: [
        {
          icon: Brain,
          title: "Strategic Frameworks",
          items: ["PESTLE & SWOT Analysis", "Porter's Five Forces", "CAGE & RBV Analysis"]
        },
        {
          icon: Users,
          title: "Leadership Development",
          items: ["Transformational Leadership", "Cultural Intelligence", "Change Management"]
        },
        {
          icon: Shield,
          title: "Research Excellence",
          items: ["Mixed-Methods Research", "Strategic Intelligence", "Stakeholder Analysis"]
        }
      ],
      projects: projects.filter(p => 
        p.category === "Strategic Leadership" || 
        p.category === "Leadership Research" ||
        p.category === "Strategic Communication" ||
        p.category === "Global Strategy" ||
        p.category === "Cultural Strategy" ||
        p.category === "Strategic Planning"
      ),
      highlights: ["Global Strategy Expert", "Cross-Border Excellence", "Organizational Transformation"]
    }
  };

  const currentData = sections[currentSection as keyof typeof sections];

  // Filter projects based on search query - show all projects when searching
  const filteredProjects = searchQuery 
    ? projects.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : currentData.projects;

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      x: 100,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      x: -100,
      scale: 0.95,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      <ParticleBackground />
      <Navigation 
        onSectionChange={setCurrentSection} 
        currentSection={currentSection}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="pt-20"
        >
          {/* Hero Section */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div variants={itemVariants}>
                <div className="flex justify-center mb-8">
                  <motion.div 
                    className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <currentData.icon className="text-white" size={48} />
                  </motion.div>
                </div>
                <motion.h1 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent mb-6"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {searchQuery ? `Search Results: "${searchQuery}"` : currentData.title}
                </motion.h1>
                <motion.p 
                  className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto px-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {searchQuery ? `Found ${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''} matching your search` : currentData.subtitle}
                </motion.p>
                
                {/* Clear Search Button */}
                {searchQuery && (
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setIsSearchVisible(false);
                        // Clear URL parameters
                        window.history.replaceState({}, document.title, window.location.pathname);
                      }}
                      className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg border border-white/20 transition-all duration-200 font-medium"
                    >
                      Clear Search
                    </button>
                  </motion.div>
                )}
                
                {/* Highlights */}
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {currentData.highlights.map((highlight, index) => (
                    <motion.div
                      key={highlight}
                      className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-gray-600/30 shadow-2xl"
                      whileHover={{ 
                        scale: 1.05, 
                        y: -10,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                      }}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl" />
                      <h3 className="font-semibold text-base sm:text-lg mb-2 text-white relative z-10">{highlight}</h3>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </section>



          {/* Skills Section */}
          <section className="py-20 bg-black/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-white mb-12 sm:mb-16">Core Competencies</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                  {/* Skills Progress */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6 sm:mb-8">Technical Skills</h3>
                    <div className="space-y-6">
                      {currentData.skills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="space-y-2"
                        >
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-300">{skill.name}</span>
                            <span className="text-white font-semibold">{skill.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                            <motion.div
                              className="bg-gradient-to-r from-white via-gray-200 to-gray-300 h-3 rounded-full relative"
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.percentage}%` }}
                              transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                            >
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ 
                                  duration: 2, 
                                  delay: index * 0.1 + 1.2,
                                  ease: "easeInOut"
                                }}
                              />
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Competencies */}
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-8">Key Competencies</h3>
                    <div className="space-y-6">
                      {currentData.competencies.map((comp, index) => {
                        const Icon = comp.icon;
                        return (
                          <motion.div
                            key={comp.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl rounded-xl p-6 border border-gray-600/30 shadow-xl relative overflow-hidden"
                            whileHover={{ 
                              scale: 1.02, 
                              y: -5,
                              boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.4)"
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl" />
                            <motion.div
                              whileHover={{ rotate: 5, scale: 1.1 }}
                              transition={{ duration: 0.3 }}
                              className="relative z-10"
                            >
                              <Icon className="text-white mb-4" size={32} />
                            </motion.div>
                            <h4 className="font-semibold text-lg text-white mb-3 relative z-10">{comp.title}</h4>
                            <ul className="space-y-2 text-sm text-gray-300 relative z-10">
                              {comp.items.map((item, itemIndex) => (
                                <motion.li 
                                  key={itemIndex} 
                                  className="flex items-center"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.4, delay: itemIndex * 0.1 }}
                                >
                                  <CheckCircle size={12} className="text-gray-400 mr-2 flex-shrink-0" />
                                  {item}
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Projects Section */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-4xl font-bold text-center text-white mb-16">Projects</h2>
                
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="animate-pulse bg-gray-800 rounded-xl h-64"></div>
                    ))}
                  </div>
                ) : (
                  <>
                    {searchQuery && (
                      <div className="mb-8 text-center">
                        <p className="text-gray-300">
                          {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found for "{searchQuery}"
                        </p>
                        {filteredProjects.length === 0 && (
                          <p className="text-gray-400 mt-2">Try searching for different keywords or clear your search.</p>
                        )}
                        <motion.button
                          onClick={() => setSearchQuery("")}
                          className="mt-3 text-sm text-gray-400 hover:text-white transition-colors duration-200"
                          whileHover={{ scale: 1.05 }}
                        >
                          Clear search
                        </motion.button>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredProjects.map((project, index) => (
                        <motion.div
                        key={project.id}
                        data-project-title={project.title}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl rounded-xl p-6 border border-gray-600/30 shadow-xl relative overflow-hidden group cursor-pointer"
                        whileHover={{ 
                          scale: 1.03, 
                          y: -8,
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                        }}
                        onClick={() => setSelectedProject(project)}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <motion.div 
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-700/80 backdrop-blur-sm text-gray-200 mb-4 relative z-10"
                          whileHover={{ scale: 1.05 }}
                        >
                          {project.category}
                        </motion.div>
                        <h3 className="text-xl font-bold text-white mb-3 relative z-10">{project.title}</h3>
                        <p className="text-gray-300 mb-4 text-sm relative z-10">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                          {project.tags.slice(0, 3).map((tag, tagIndex) => (
                            <motion.span
                              key={tagIndex}
                              className="px-2 py-1 bg-gray-700/50 backdrop-blur-sm text-gray-300 rounded-full text-xs"
                              whileHover={{ scale: 1.05, y: -1 }}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: tagIndex * 0.1 }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 relative z-10">{project.details}</p>
                        <motion.button
                          className="mt-4 text-sm text-white hover:text-gray-300 font-medium relative z-10"
                          whileHover={{ scale: 1.05 }}
                        >
                          Click to view full details →
                        </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          </section>
        </motion.div>
      </AnimatePresence>

      {/* Back to Top Button */}
      <motion.button
        className="fixed bottom-8 right-8 bg-white/10 backdrop-blur-xl text-white p-3 rounded-full border border-gray-600/30 shadow-xl z-40"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl p-8 max-w-4xl max-h-[80vh] overflow-y-auto border border-gray-600/30 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-700/80 backdrop-blur-sm text-gray-200 mb-4">
                    {selectedProject.category}
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                  <p className="text-gray-300 text-lg">{selectedProject.description}</p>
                </div>
                <motion.button
                  className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedProject(null)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-semibold text-white mb-4">Project Details</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">{selectedProject.details}</p>
                  
                  <h4 className="text-lg font-semibold text-white mb-3">Subject Area</h4>
                  <p className="text-gray-300 mb-6">{selectedProject.subject}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Key Skills & Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, index) => (
                      <motion.span
                        key={index}
                        className="px-3 py-1 bg-gray-700/50 backdrop-blur-sm text-gray-300 rounded-full text-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UnifiedPortfolio;