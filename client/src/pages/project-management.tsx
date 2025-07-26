import { motion } from "framer-motion";
import { Calendar, CheckCircle, Users, Target, TrendingUp, Award } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Project } from "@shared/schema";

const ProjectManagementPage = () => {
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects']
  });

  const pmProjects = projects.filter(project => project.category === "Project Management");

  const skills = [
    { name: "PRINCE2 & Agile Methodologies", percentage: 95 },
    { name: "Stakeholder Management", percentage: 92 },
    { name: "Budget & Risk Management", percentage: 90 },
    { name: "Team Leadership & Coordination", percentage: 88 },
    { name: "Digital Transformation", percentage: 86 },
    { name: "Quality Assurance & Delivery", percentage: 90 },
  ];

  const competencies = [
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
    },
    {
      icon: TrendingUp,
      title: "Performance Tracking",
      items: ["KPI Development", "Progress Monitoring", "ROI Analysis"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-100 rounded-full">
                <Calendar className="text-blue-600" size={48} />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Project Management
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Leading digital transformation projects with <span className="text-blue-600 font-semibold">PRINCE2 & Agile methodologies</span>, 
              delivering results on time and within budget
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                <Award className="text-blue-600 mb-3 mx-auto" size={32} />
                <h3 className="font-semibold text-lg mb-2">PRINCE2 Certified</h3>
                <p className="text-slate-600">Professional project management qualification</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                <TrendingUp className="text-blue-600 mb-3 mx-auto" size={32} />
                <h3 className="font-semibold text-lg mb-2">£150K+ Projects</h3>
                <p className="text-slate-600">Successfully delivered large-scale initiatives</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                <Users className="text-blue-600 mb-3 mx-auto" size={32} />
                <h3 className="font-semibold text-lg mb-2">Cross-functional Teams</h3>
                <p className="text-slate-600">Led diverse, multi-departmental projects</p>
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
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Core Competencies</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Skills Progress */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-8">Technical Skills</h3>
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
                        <span className="text-blue-600 font-semibold">{skill.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Competencies */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-8">Key Competencies</h3>
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
                        <Icon className="text-blue-600 mb-4" size={32} />
                        <h4 className="font-semibold text-lg text-gray-900 mb-3">{comp.title}</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {comp.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-center">
                              <CheckCircle size={12} className="text-blue-500 mr-2 flex-shrink-0" />
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
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Featured Projects</h2>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2].map((i) => (
                  <div key={i} className="animate-pulse bg-gray-200 rounded-xl h-64"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {pmProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${project.categoryColor} mb-4`}>
                      {project.category}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{project.title}</h3>
                    <p className="text-gray-600 mb-6">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{project.details}</p>
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

export default ProjectManagementPage;