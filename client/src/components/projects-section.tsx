import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Gem, Route, Leaf, Rocket, GraduationCap, Shield } from "lucide-react";
import type { Project } from "@shared/schema";

const iconMap = {
  gem: Gem,
  route: Route,
  leaf: Leaf,
  rocket: Rocket,
  "graduation-cap": GraduationCap,
  "shield-alt": Shield,
};

export default function ProjectsSection() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Featured Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Featured Projects</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore my academic and professional work showcasing strategic thinking, 
            data analysis, and innovative marketing solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects?.map((project) => {
            const IconComponent = iconMap[project.icon as keyof typeof iconMap] || Gem;
            
            return (
              <div key={project.id} className="project-card bg-white rounded-xl shadow-sm overflow-hidden">
                <div className={`h-48 bg-gradient-to-br ${project.bgColor} flex items-center justify-center`}>
                  <IconComponent className={`text-4xl ${project.iconColor}`} size={64} />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 ${project.categoryColor} text-xs font-medium rounded-full`}>
                      {project.category}
                    </span>
                    <ExternalLink className="text-gray-400 hover:text-blue-600 cursor-pointer" size={16} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{project.subject}</span>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">View Details</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* View All Projects Button */}
        <div className="text-center">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg">
            <ExternalLink className="mr-2 inline" size={20} />
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}
