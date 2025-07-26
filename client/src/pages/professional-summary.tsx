import { motion } from "framer-motion";
import { ArrowRight, ArrowUp } from "lucide-react";
import { Link } from "wouter";
import ContactForm from "@/components/contact-form";
import { LinkedInButton } from "@/components/linkedin-button";
import { useState, useEffect } from "react";

export default function ProfessionalSummary() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)] animate-pulse" />
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            {/* Animated Name */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              <motion.h1 
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent mb-4"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                style={{
                  backgroundSize: "200% 100%"
                }}
              >
                EDLIRA TAIPI
              </motion.h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto max-w-md"
              />
            </motion.div>

            {/* Navigation Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link href="/portfolio">
                <motion.div
                  className="relative inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Subtle blue glow */}
                  <motion.div
                    className="absolute -inset-1 bg-blue-500 rounded-xl blur-md opacity-30"
                    animate={{
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Main button */}
                  <motion.button
                    className="relative px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-base sm:text-lg font-semibold shadow-lg border border-blue-400/30 backdrop-blur-sm min-w-[200px] sm:min-w-[240px] overflow-hidden"
                    animate={{
                      boxShadow: [
                        "0 4px 20px rgba(59, 130, 246, 0.3)",
                        "0 8px 30px rgba(59, 130, 246, 0.4)",
                        "0 4px 20px rgba(59, 130, 246, 0.3)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Subtle shimmer */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    />
                    
                    <span className="relative z-10 flex items-center justify-center">
                      {/* Left arrow pointing right toward text */}
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mr-3"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                      <span>View My Portfolio</span>
                      {/* Right arrow pointing left toward text */}
                      <motion.div
                        animate={{ x: [0, -4, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="ml-3"
                      >
                        <ArrowRight className="w-5 h-5 rotate-180" />
                      </motion.div>
                    </span>
                  </motion.button>
                  

                </motion.div>
              </Link>
              
              {/* Enhanced LinkedIn Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <LinkedInButton variant="secondary" size="lg" />
              </motion.div>
            </motion.div>
          </div>
        </header>

        {/* Main Content */}
        <main className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              {/* Title */}
              <motion.h1 
                variants={itemVariants}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8"
              >
                Professional Summary
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="text-center mb-12"
              >
                <p className="text-xl text-gray-300">Strategic Management, Digital Marketing & Project Management Professional</p>
              </motion.div>

              {/* Main Summary Card */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl p-6 sm:p-8 lg:p-12 border border-gray-600/30 shadow-2xl mb-12"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.4)"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />
                <motion.div 
                  className="relative z-10 max-w-5xl mx-auto"
                  variants={itemVariants}
                >
                  <p className="text-lg sm:text-xl leading-relaxed text-gray-200 mb-8">
                    Strategic management professional holding an <span className="font-semibold text-white">MSc in Digital Marketing</span>, 
                    <span className="font-semibold text-white">Level 8 Diploma in Strategic Management and Leadership</span>, 
                    <span className="font-semibold text-white">Level 7 in Project Management</span> qualification, and a 
                    <span className="font-semibold text-white">Bachelor Degree in Accounting and Finance from University of Peloponnese</span>. 
                    Experienced in leading complex digital transformation projects using PRINCE2 methodologies, with proven expertise in 
                    cross-border strategy development, consumer behavior analysis, and stakeholder management.
                  </p>
                  
                  <p className="text-lg sm:text-xl leading-relaxed text-gray-200 mb-8">
                    Demonstrated ability to deliver data-driven marketing solutions and organizational excellence across 
                    diverse industries including healthcare, retail, and education. Combines academic rigor with practical 
                    implementation skills to drive strategic initiatives and sustainable business growth.
                  </p>

                  <p className="text-lg sm:text-xl leading-relaxed text-gray-200">
                    Specializes in bridging the gap between strategic vision and tactical execution, with particular strength in 
                    managing complex stakeholder relationships, conducting comprehensive market analysis, and leading 
                    cross-functional teams through transformational change initiatives.
                  </p>
                </motion.div>
              </motion.div>

              {/* Qualifications Grid */}
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12"
              >
                <motion.div
                  className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-xl rounded-xl p-6 sm:p-8 border border-white/20"
                  whileHover={{ scale: 1.03, y: -5 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-4">Educational Background</h3>
                  <div className="space-y-4 text-left">
                    <div>
                      <h4 className="font-semibold text-gray-100">MSc in Digital Marketing</h4>
                      <p className="text-gray-200">Ravensbourne University, London</p>
                      <p className="text-sm text-gray-300">Consumer Psychology, AI Marketing, Data Analytics</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-100">Level 8 Diploma in Strategic Management and Leadership</h4>
                      <p className="text-gray-200">Strategic Management Qualification</p>
                      <p className="text-sm text-gray-300">Cross-Border Strategy, Organizational Leadership</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-100">Level 7 in Project Management</h4>
                      <p className="text-gray-200">Advanced Project Management Qualification</p>
                      <p className="text-sm text-gray-300">PRINCE2, Agile Methodologies, Risk Management</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-100">Bachelor Degree in Accounting and Finance</h4>
                      <p className="text-gray-300">University of Peloponnese</p>
                      <p className="text-sm text-gray-400">Financial Analysis, Corporate Finance, Business Strategy</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-gray-700/50 to-gray-600/50 backdrop-blur-xl rounded-xl p-6 sm:p-8 border border-white/25"
                  whileHover={{ scale: 1.03, y: -5 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-4">Professional Certifications</h3>
                  <div className="space-y-4 text-left">
                    <div>
                      <h4 className="font-semibold text-gray-100">PRINCE2 Methodology</h4>
                      <p className="text-gray-200">Project Management Certification</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-100">Digital Analytics</h4>
                      <p className="text-gray-200">Google Analytics & Performance Optimization</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-100">Strategic Research</h4>
                      <p className="text-gray-300">Mixed-Methods Research & Data Analysis</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Core Expertise Tags */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap justify-center gap-4 mb-12"
              >
                {[
                  "Strategic Leadership",
                  "Digital Marketing",
                  "Project Management",
                  "Cross-Border Strategy",
                  "Consumer Psychology",
                  "Data Analytics",
                  "Stakeholder Management",
                  "Risk Assessment",
                  "Change Management",
                  "Brand Strategy",
                  "Market Research",
                  "Digital Transformation"
                ].map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="px-6 py-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.05 }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>



              {/* Contact Section */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-xl rounded-2xl p-8 border border-gray-600/30"
              >
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Get In Touch</h3>
                <div className="max-w-4xl mx-auto">
                  <p className="text-lg text-gray-200 mb-8 text-center">
                    Ready to collaborate on strategic initiatives, digital marketing campaigns, or project management challenges? 
                    Send me a message and I'll get back to you soon!
                  </p>
                  
                  <div className="max-w-2xl mx-auto">
                    {/* Contact Form */}
                    <ContactForm />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </main>
      </div>

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
    </div>
  );
}