import { motion } from "framer-motion";
import { Link } from "wouter";
import { Briefcase, TrendingUp, Users, ArrowRight } from "lucide-react";

const PortfolioHomePage = () => {
  const portfolioSections = [
    {
      title: "Project Management",
      description: "Leading digital transformation projects with PRINCE2 & Agile methodologies",
      icon: Briefcase,
      path: "/project-management",
      color: "blue",
      bgGradient: "from-blue-500 to-blue-600",
      bgLight: "from-blue-50 to-blue-100",
      highlights: ["£150K+ Project Delivery", "PRINCE2 Certified", "Cross-functional Teams"]
    },
    {
      title: "Digital Marketing",
      description: "MSc Digital Marketing graduate specializing in data-driven strategies and AI integration",
      icon: TrendingUp,
      path: "/digital-marketing",
      color: "green",
      bgGradient: "from-green-500 to-green-600",
      bgLight: "from-green-50 to-green-100",
      highlights: ["Consumer Behavior Analysis", "Brand Strategy", "AI Integration"]
    },
    {
      title: "Strategic Leadership",
      description: "Level 8 qualified leader with expertise in cross-border strategy and cultural intelligence",
      icon: Users,
      path: "/strategic-leadership",
      color: "purple",
      bgGradient: "from-purple-500 to-purple-600",
      bgLight: "from-purple-50 to-purple-100",
      highlights: ["Level 8 Diploma", "Global Strategy", "Research Excellence"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6">
              Edlira <span className="bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 bg-clip-text text-transparent">Taipi</span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Strategic Leader • Digital Marketing Expert • Project Management Professional
            </p>
            <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
              Transforming organizations through strategic leadership, innovative marketing solutions, 
              and effective project delivery across global markets
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Sections */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Explore My Expertise</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover my comprehensive portfolio across three specialized domains, each showcasing 
              dedicated skills, projects, and achievements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {portfolioSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Link href={section.path}>
                    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${section.bgLight} p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 cursor-pointer`}>
                      {/* Background decoration */}
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${section.bgGradient} opacity-10 rounded-full transform translate-x-8 -translate-y-8`}></div>
                      
                      {/* Icon */}
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${section.bgGradient} rounded-xl mb-6 shadow-lg`}>
                        <Icon className="text-white" size={32} />
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{section.description}</p>

                      {/* Highlights */}
                      <div className="space-y-2 mb-6">
                        {section.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center text-sm">
                            <div className={`w-2 h-2 bg-gradient-to-r ${section.bgGradient} rounded-full mr-3`}></div>
                            <span className="text-gray-700">{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                        <span className="font-medium mr-2">Explore Portfolio</span>
                        <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
          >
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">8+</div>
              <div className="text-gray-600">Strategic Projects</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">£150K+</div>
              <div className="text-gray-600">Project Value Delivered</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">Level 8</div>
              <div className="text-gray-600">Strategic Leadership</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent">MSc</div>
              <div className="text-gray-600">Digital Marketing</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioHomePage;