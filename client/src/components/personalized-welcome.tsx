import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';

interface WelcomeMessage {
  greeting: string;
  message: string;
  emoji: string;
  context?: string;
}

export function PersonalizedWelcome() {
  const [welcomeData, setWelcomeData] = useState<WelcomeMessage | null>(null);
  const [visitCount, setVisitCount] = useState(0);
  const [location] = useLocation();

  useEffect(() => {
    // Get time-based greeting
    const getTimeBasedGreeting = (): WelcomeMessage => {
      const hour = new Date().getHours();
      
      if (hour >= 5 && hour < 12) {
        return {
          greeting: "Good Morning",
          message: "Ready to explore some strategic excellence?",
          emoji: "🌅"
        };
      } else if (hour >= 12 && hour < 17) {
        return {
          greeting: "Good Afternoon",
          message: "Perfect time to discover innovative solutions!",
          emoji: "☀️"
        };
      } else if (hour >= 17 && hour < 22) {
        return {
          greeting: "Good Evening",
          message: "Let's explore some amazing project work together!",
          emoji: "🌆"
        };
      } else {
        return {
          greeting: "Working Late",
          message: "Dedication meets excellence - just like these projects!",
          emoji: "🌙"
        };
      }
    };

    // Track user visits
    const getVisitCount = (): number => {
      const stored = localStorage.getItem('portfolio-visits');
      const count = stored ? parseInt(stored) + 1 : 1;
      localStorage.setItem('portfolio-visits', count.toString());
      return count;
    };

    // Track page interactions
    const trackPageInteraction = () => {
      const interactions = JSON.parse(localStorage.getItem('page-interactions') || '{}');
      const currentPage = location === '/' ? 'home' : location.split('/')[1] || 'portfolio';
      interactions[currentPage] = (interactions[currentPage] || 0) + 1;
      localStorage.setItem('page-interactions', JSON.stringify(interactions));
      return interactions;
    };

    // Get returning user message with context
    const getVisitMessage = (count: number, interactions: any): string => {
      const totalInteractions = Object.values(interactions).reduce((sum: number, val: any) => sum + val, 0) as number;
      const currentPage = location === '/' ? 'home' : location.split('/')[1] || 'portfolio';
      
      if (count === 1) {
        return "Welcome to my professional portfolio!";
      } else if (count === 2) {
        return "Welcome back! Thanks for your continued interest!";
      } else if (totalInteractions > 10) {
        return "You've really explored my work! Thanks for the thorough review!";
      } else if (currentPage === 'portfolio' && count > 2) {
        return `Back to explore more projects? Great choice for visit #${count}!`;
      } else if (currentPage === 'home' && count > 3) {
        return "Returning to learn more about my background? I appreciate your interest!";
      } else if (count <= 5) {
        return `Welcome back for visit #${count}! Discovering new insights?`;
      } else {
        return "You're a valued repeat visitor! Thanks for your continued interest!";
      }
    };

    const timeGreeting = getTimeBasedGreeting();
    const visits = getVisitCount();
    const interactions = trackPageInteraction();
    setVisitCount(visits);

    // Combine time-based and visit-based messages
    const finalMessage = {
      ...timeGreeting,
      message: getVisitMessage(visits, interactions),
      context: visits > 5 ? "Valued Visitor" : visits > 2 ? "Return Visitor" : "New Visitor"
    };

    setWelcomeData(finalMessage);
  }, [location]);

  if (!welcomeData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mb-8 text-center"
    >
      <motion.div
        className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-4xl mb-3"
        >
          {welcomeData.emoji}
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-2xl font-bold text-white mb-2"
        >
          {welcomeData.greeting}!
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-gray-200 text-lg"
        >
          {welcomeData.message}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="mt-3 flex justify-center gap-3 flex-wrap"
        >
          <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">
            Visit #{visitCount}
          </span>
          {welcomeData.context && (
            <span className="inline-block px-3 py-1 bg-blue-500/20 rounded-full text-sm text-blue-300">
              {welcomeData.context}
            </span>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}