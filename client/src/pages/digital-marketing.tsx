import { motion } from "framer-motion";
import { TrendingUp, CheckCircle, BarChart3, Target, Smartphone, Globe } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Project } from "@shared/schema";

const DigitalMarketingPage = () => {
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects']
  });

  const marketingProjects = projects.filter(project => 
    project.category === "Digital Marketing" || 
    project.category === "Brand Strategy" ||
    project.category === "Consumer Behavior" ||
    project.category === "Social Media"
  );

  const skills = [
    { name: "Digital Campaign Strategy", percentage: 94 },
    { name: "Consumer Behavior Analysis", percentage: 90 },
    { name: "Social Media Marketing", percentage: 88 },
    { name: "Data Analytics & Insights", percentage: 86 },
    { name: "Brand Strategy Development", percentage: 92 },
    { name: "AI Integration & Automation", percentage: 82 },
  ];

  const competencies = [
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
      icon: Smartphone,
      title: "Digital Platforms",
      items: ["Social Media Strategy", "Content Marketing", "Influencer Partnerships"]
    },
    {
      icon: Globe,
      title: "Brand Strategy",
      items: ["Brand Positioning", "Market Research", "Competitive Analysis"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-green-100 rounded-full">
                <TrendingUp className="text-green-600" size={48} />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Digital Marketing
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
              MSc Digital Marketing graduate specializing in <span className="text-green-600 font-semibold">data-driven strategies</span>, 
              consumer behavior analysis, and innovative brand experiences
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                <BarChart3 className="text-green-600 mb-3 mx-auto" size={32} />
                <h3 className="font-semibold text-lg mb-2">MSc Digital Marketing</h3>
                <p className="text-slate-600">Ravensbourne University graduate</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                <Target className="text-green-600 mb-3 mx-auto" size={32} />
                <h3 className="font-semibold text-lg mb-2">Brand Strategy Expert</h3>
                <p className="text-slate-600">Luxury & consumer goods expertise</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                <Smartphone className="text-green-600 mb-3 mx-auto" size={32} />
                <h3 className="font-semibold text-lg mb-2">AI Integration</h3>
                <p className="text-slate-600">Cutting-edge marketing automation</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Marketing Expertise</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Skills Progress */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-8">Core Skills</h3>
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">{skill.name}</span>
                        <span className="text-green-600 font-semibold">{skill.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          viewport={ { once: true }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Competencies */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-8">Specializations</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {competencies.map((comp, index) => {
                    const Icon = comp.icon;
                    return (
                      <motion.div
                        key={comp.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                      >
                        <Icon className="text-green-600 mb-4" size={32} />
                        <h4 className="font-semibold text-lg text-gray-900 mb-3">{comp.title}</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {comp.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-center">
                              <CheckCircle size={12} className="text-green-500 mr-2 flex-shrink-0" />
                              {item}
                            </li>
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
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Marketing Projects</h2>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse bg-gray-200 rounded-xl h-64"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {marketingProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${project.categoryColor} mb-4`}>
                      {project.category}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{project.details}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DigitalMarketingPage;