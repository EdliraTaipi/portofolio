import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Mail, Phone, Calendar, User } from "lucide-react";
import type { ContactMessage } from "@shared/schema";

export default function Messages() {
  const { data: messages = [], isLoading } = useQuery<ContactMessage[]>({
    queryKey: ['/api/messages']
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)] animate-pulse" />
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent mb-4">
                Contact Messages
              </h1>
              <p className="text-xl text-gray-300">Messages from your portfolio visitors</p>
            </motion.div>
          </div>
        </header>

        {/* Messages List */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {messages.length === 0 ? (
                <motion.div
                  variants={itemVariants}
                  className="text-center py-12"
                >
                  <Mail className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">No messages yet</h3>
                  <p className="text-gray-400">When visitors send messages through your contact form, they'll appear here.</p>
                </motion.div>
              ) : (
                messages.map((message) => (
                  <motion.div
                    key={message.id}
                    variants={itemVariants}
                    className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-600/30 shadow-xl"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.4)"
                    }}
                  >
                    {/* Message Header */}
                    <div className="flex flex-wrap items-start justify-between mb-4 gap-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-lg">
                            {message.firstName} {message.lastName}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(message.createdAt.toString())}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Mail className="w-4 h-4 text-blue-400" />
                        <a 
                          href={`mailto:${message.email}`}
                          className="hover:text-blue-300 transition-colors duration-200"
                        >
                          {message.email}
                        </a>
                      </div>
                      {message.phone && (
                        <div className="flex items-center space-x-2 text-gray-300">
                          <Phone className="w-4 h-4 text-green-400" />
                          <a 
                            href={`tel:${message.phone}`}
                            className="hover:text-green-300 transition-colors duration-200"
                          >
                            {message.phone}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Subject */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-white mb-1">Subject:</h4>
                      <p className="text-gray-300">{message.subject}</p>
                    </div>

                    {/* Message Content */}
                    <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-700/30">
                      <h4 className="font-semibold text-white mb-2">Message:</h4>
                      <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {message.message}
                      </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex space-x-3 mt-4">
                      <motion.a
                        href={`mailto:${message.email}?subject=Re: ${message.subject}`}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Reply
                      </motion.a>
                      {message.phone && (
                        <motion.a
                          href={`tel:${message.phone}`}
                          className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 text-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}