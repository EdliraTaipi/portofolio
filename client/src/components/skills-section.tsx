import { useEffect, useRef, useState } from "react";
import { Swords, Smartphone, Leaf, Settings, CheckCircle } from "lucide-react";

const skills = [
  { name: "Strategic Leadership Development", percentage: 95 },
  { name: "Project Management & Delivery", percentage: 92 },
  { name: "Cross-Border Strategy Planning", percentage: 90 },
  { name: "Cultural Intelligence & Analysis", percentage: 88 },
  { name: "Research Methods & Data Analysis", percentage: 90 },
  { name: "Stakeholder Management", percentage: 94 },
];

const competencies = [
  {
    icon: Swords,
    title: "Strategic Frameworks",
    items: ["PESTLE & SWOT Analysis", "Porter's Five Forces", "CAGE & RBV Analysis"],
    bgColor: "from-blue-50 to-white"
  },
  {
    icon: Settings,
    title: "Project Management",
    items: ["PRINCE2 & Agile Methodologies", "Stakeholder Coordination", "Risk & Budget Management"],
    bgColor: "from-green-50 to-white"
  },
  {
    icon: Smartphone,
    title: "Leadership Development",
    items: ["Transformational Leadership", "Cultural Intelligence", "Change Management"],
    bgColor: "from-emerald-50 to-white"
  },
  {
    icon: Leaf,
    title: "Research Excellence",
    items: ["Mixed-Methods Research", "Strategic Intelligence", "Cross-Border Analysis"],
    bgColor: "from-purple-50 to-white"
  },
];

const tools = [
  "Google Analytics", "Google Ads", "Facebook Business", "Instagram", "LinkedIn", 
  "Canva", "Hootsuite", "Mailchimp", "HubSpot", "Tableau", "SPSS", "Adobe Creative Suite"
];

export default function SkillsSection() {
  const [animatedSkills, setAnimatedSkills] = useState<Set<number>>(new Set());
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate all skills when the section comes into view
            setTimeout(() => {
              setAnimatedSkills(new Set(skills.map((_, index) => index)));
            }, 200);
          }
        });
      },
      { threshold: 0.5, rootMargin: '0px 0px -100px 0px' }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Skills & Expertise</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A comprehensive toolkit combining strategic thinking, analytical capabilities, 
            and cutting-edge digital marketing technologies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Technical Skills */}
          <div className="space-y-8" ref={skillsRef}>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Technical Skills</h3>
            
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 font-medium">{skill.name}</span>
                    <span className="text-gray-500">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="skill-bar h-3 rounded-full transition-all duration-1500 ease-in-out"
                      style={{ 
                        width: animatedSkills.has(index) ? `${skill.percentage}%` : '0%' 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Core Competencies */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Core Competencies</h3>
            
            <div className="grid grid-cols-1 gap-6">
              {competencies.map((competency, index) => (
                <div key={index} className={`bg-gradient-to-r ${competency.bgColor} p-6 rounded-xl shadow-sm`}>
                  <div className="flex items-center mb-4">
                    <competency.icon className="text-2xl text-blue-600 mr-4" size={32} />
                    <h4 className="text-lg font-semibold text-gray-900">{competency.title}</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    {competency.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center">
                        <CheckCircle className="text-blue-600 mr-2 text-sm" size={16} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Tools & Technologies */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Tools & Technologies</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool, index) => (
              <span key={index} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
