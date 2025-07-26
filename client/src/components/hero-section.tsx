import { User } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="animate-fadeIn">
          {/* Profile image with professional styling */}
          <div className="mb-8 relative inline-block">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-blue-500 p-1 animate-float">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <User className="text-4xl text-blue-600" size={64} />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Hi, I'm <span className="text-blue-600">Edlira</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Strategic Management & Leadership Professional specializing in <span className="text-blue-600 font-semibold">cross-border strategy</span>, 
            <span className="text-blue-600 font-semibold"> cultural intelligence</span>, and 
            <span className="text-blue-600 font-semibold"> organizational transformation</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="#projects" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              View My Work
            </a>
            <a href="#contact" className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">
              Get In Touch
            </a>
          </div>
          
          {/* Key highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm">
              <User className="text-3xl text-blue-600 mb-4 mx-auto" size={48} />
              <h3 className="font-semibold text-lg mb-2">Strategic Leadership</h3>
              <p className="text-slate-600">Level 8 Diploma Qualified</p>
            </div>
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm">
              <User className="text-3xl text-blue-600 mb-4 mx-auto" size={48} />
              <h3 className="font-semibold text-lg mb-2">Research Expert</h3>
              <p className="text-slate-600">Mixed-methods analysis</p>
            </div>
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm">
              <User className="text-3xl text-blue-600 mb-4 mx-auto" size={48} />
              <h3 className="font-semibold text-lg mb-2">Global Strategy</h3>
              <p className="text-slate-600">Cross-border operations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
