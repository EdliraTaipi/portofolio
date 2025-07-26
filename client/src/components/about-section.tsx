import { University, Trophy, CheckCircle } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Me</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Passionate digital marketing professional with expertise in strategic campaign development, 
            consumer behavior analysis, and emerging technologies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="prose prose-lg text-gray-700">
              <p className="text-lg leading-relaxed mb-6">
                As an MSc Digital Marketing graduate from Ravensbourne University and Level 8 Diploma holder in Strategic 
                Management & Leadership, I bring a unique blend of academic rigor and practical strategic insight to complex 
                organizational challenges. My educational journey encompasses contemporary marketing principles, leadership 
                development, cross-border strategy, and advanced research methodologies.
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
                I specialize in strategic leadership development, cross-cultural analysis, and data-driven decision-making 
                for global organizations. My work includes comprehensive strategic planning for companies like Amazon, Tesco, 
                Unilever, and Marks & Spencer, focusing on cultural intelligence, stakeholder management, and sustainable 
                business practices across diverse international markets.
              </p>
              
              <p className="text-lg leading-relaxed">
                My approach combines rigorous analytical frameworks (PESTLE, SWOT, Porter's Five Forces) with innovative 
                leadership theories and mixed-methods research to deliver strategic solutions that drive organizational 
                transformation and sustainable competitive advantage.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-8">
              <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">Project Management</span>
              <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">Strategic Leadership</span>
              <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">Cross-Border Strategy</span>
              <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">Cultural Intelligence</span>
              <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">Stakeholder Management</span>
            </div>
          </div>
          
          <div className="space-y-8">
            {/* Education */}
            <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-xl shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <University className="text-2xl text-blue-600" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Education</h3>
                  <div className="space-y-3">
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-900">MSc Digital Marketing</p>
                        <p className="text-slate-600">Ravensbourne University</p>
                        <p className="text-sm text-gray-500">2024-2025</p>
                        <p className="text-xs text-gray-400 mt-1">Focus: Strategic Marketing, Consumer Analytics, AI Integration</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Level 8 Diploma - Strategic Management & Leadership</p>
                        <p className="text-slate-600">Professional Qualification</p>
                        <p className="text-sm text-gray-500">2024-2025</p>
                        <p className="text-xs text-gray-400 mt-1">Specializations: Cross-Border Strategy, Cultural Intelligence, Research Methods</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Project Management Certification</p>
                        <p className="text-slate-600">PRINCE2 & Agile Methodologies</p>
                        <p className="text-sm text-gray-500">2024</p>
                        <p className="text-xs text-gray-400 mt-1">Digital transformation projects, stakeholder management, risk assessment</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Key Achievements */}
            <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-xl shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Trophy className="text-2xl text-blue-600" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Achievements</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <CheckCircle className="text-blue-600 mr-2" size={16} />
                      Led digital transformation projects worth £150K+
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-blue-600 mr-2" size={16} />
                      Strategic leadership development frameworks
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-blue-600 mr-2" size={16} />
                      Cross-border organizational strategy planning
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-blue-600 mr-2" size={16} />
                      PRINCE2 & Agile project management methodologies
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
