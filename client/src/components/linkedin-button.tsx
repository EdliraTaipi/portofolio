import { motion } from "framer-motion";
import { LinkedinIcon } from "lucide-react";

interface LinkedInButtonProps {
  variant?: "primary" | "secondary" | "nav";
  size?: "sm" | "md" | "lg";
}

export function LinkedInButton({ variant = "primary", size = "md" }: LinkedInButtonProps) {
  const linkedInUrl = "https://www.linkedin.com/in/edlira-taipi/";

  const variants = {
    primary: {
      bg: "bg-gradient-to-r from-blue-600 to-blue-700",
      text: "text-white",
      border: "border-blue-400/30",
      padding: size === "lg" ? "px-8 py-4" : size === "md" ? "px-6 py-3" : "px-4 py-2",
      textSize: size === "lg" ? "text-lg" : size === "md" ? "text-base" : "text-sm",
      iconSize: size === "lg" ? 24 : size === "md" ? 20 : 16
    },
    secondary: {
      bg: "bg-gradient-to-r from-white/10 to-white/5",
      text: "text-white",
      border: "border-white/20",
      padding: size === "lg" ? "px-8 py-4" : size === "md" ? "px-6 py-3" : "px-4 py-2",
      textSize: size === "lg" ? "text-lg" : size === "md" ? "text-base" : "text-sm",
      iconSize: size === "lg" ? 24 : size === "md" ? 20 : 16
    },
    nav: {
      bg: "bg-gradient-to-r from-blue-600/20 to-blue-700/20",
      text: "text-blue-300",
      border: "border-blue-400/30",
      padding: "px-4 py-2",
      textSize: "text-sm",
      iconSize: 16
    }
  };

  const currentVariant = variants[variant];

  return (
    <motion.a
      href={linkedInUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="relative inline-block"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Animated glow effect */}
      <motion.div
        className="absolute -inset-1 bg-blue-500 rounded-xl blur-md"
        animate={{
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Main button */}
      <motion.div
        className={`relative ${currentVariant.bg} ${currentVariant.text} rounded-xl font-semibold shadow-lg ${currentVariant.border} border backdrop-blur-sm overflow-hidden ${currentVariant.padding}`}
        animate={{
          boxShadow: [
            "0 4px 20px rgba(59, 130, 246, 0.3)",
            "0 8px 30px rgba(59, 130, 246, 0.5)",
            "0 4px 20px rgba(59, 130, 246, 0.3)"
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 3
          }}
        />
        
        <span className={`relative z-10 flex items-center justify-center gap-2 ${currentVariant.textSize}`}>
          <motion.div
            animate={{ 
              rotate: [0, 10, 0, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 4
            }}
          >
            <LinkedinIcon size={currentVariant.iconSize} />
          </motion.div>
          <span className="hidden sm:inline">Connect on LinkedIn</span>
          <span className="sm:hidden">LinkedIn</span>
        </span>
      </motion.div>
    </motion.a>
  );
}