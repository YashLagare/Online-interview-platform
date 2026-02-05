// import { motion } from "framer-motion";
// import { Code } from "lucide-react";

// const DevBadge = () => {
//     return (
//         <motion.button
//             // Idle floating animation (premium)
//             animate={{ y: [0, -3, 0] }}
//             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//             whileHover={{
//                 scale: 1.08,
//                 boxShadow: "0 0 40px rgba(80, 200, 255, 0.4)",
//             }}
//             className="relative overflow-hidden btn btn-outline btn-lg gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl"
//         >
//             {/* Animated Gradient Border */}
//             <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-primary via-secondary to-accent opacity-60 blur-[2px]" />

//             {/* Inner Glassmorphism Layer */}
//             <div className="absolute inset-[2px] rounded-xl bg-base-100/60 backdrop-blur-xl" />

//             {/* Content Layer */}
//             <div className="relative flex items-center gap-2 z-10">
                
//                 {/* Icon Animations */}
//                 <motion.div
//                     animate={{ rotate: [0, -8, 0], scale: [1, 1.1, 1] }}
//                     transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
//                     whileHover={{ rotate: -15, scale: 1.2 }}
//                 >
//                     <Code className="size-5 text-primary drop-shadow-[0_0_8px_rgba(80,200,255,0.7)]" />
//                 </motion.div>

//                 {/* Text Reveal Animation */}
//                 <motion.span
//                     initial={{ opacity: 0.8 }}
//                     whileHover={{ x: 4, opacity: 1 }}
//                     transition={{ type: "spring", stiffness: 200 }}
//                 >
//                     Developed by Yash
//                 </motion.span>
//             </div>

//             {/* Hover Shimmer Layer */}
//             <motion.div
//                 initial={{ x: "-100%" }}
//                 whileHover={{ x: "100%" }}
//                 transition={{ duration: 0.8, ease: "easeInOut" }}
//                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-20"
//             />
//         </motion.button>
//     );
// };

// export default DevBadge;





import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

// DevBadge Component
export const DevBadge = () => {
  const handlePortfolioClick = () => {
    window.open('https://yashlagare.github.io/portfolio/', '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.button
      onClick={handlePortfolioClick}
      initial={{ opacity: 0, x: 100 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        y: [0, -3, 0]
      }}
      transition={{ 
        opacity: { duration: 0.6, delay: 0.8 },
        x: { duration: 0.8, delay: 0.8, type: "spring", stiffness: 100 },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
      }}
      whileHover={{
        scale: 1.1,
        boxShadow: "0 0 50px rgba(139, 92, 246, 0.6), 0 0 100px rgba(59, 130, 246, 0.3)",
        rotate: [0, -2, 2, 0],
        transition: { rotate: { duration: 0.4 } }
      }}
      whileTap={{ scale: 0.95 }}
      className="relative overflow-hidden px-6 py-3 rounded-2xl cursor-pointer group"
    >
      {/* Animated Gradient Border */}
      <motion.div 
        animate={{ 
          rotate: 360,
          background: [
            "linear-gradient(0deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)",
            "linear-gradient(360deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)"
          ]
        }}
        transition={{ 
          rotate: { duration: 4, repeat: Infinity, ease: "linear" },
          background: { duration: 3, repeat: Infinity, ease: "linear" }
        }}
        className="absolute inset-0 rounded-2xl p-[2px] opacity-70" 
      />
      
      {/* Inner Glassmorphism Layer with animated glow */}
      <div className="absolute inset-[2px] rounded-2xl bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl" />
      
      {/* Pulsing background effect */}
      <motion.div
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl"
      />

      {/* Content Layer */}
      <div className="relative flex items-center gap-3 z-10">
        {/* Icon with complex animations */}
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ 
            rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          whileHover={{ 
            rotate: 360,
            scale: 1.3,
            transition: { duration: 0.6 }
          }}
          className="relative"
        >
          {/* Icon glow effect */}
          <motion.div
            animate={{
              boxShadow: [
                "0 0 10px rgba(59, 130, 246, 0.5)",
                "0 0 20px rgba(139, 92, 246, 0.7)",
                "0 0 10px rgba(59, 130, 246, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full"
          />
          <Code2 className="w-6 h-6 text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)] relative z-10" />
        </motion.div>

        {/* Text with stagger effect */}
        <div className="overflow-hidden">
          <motion.span
            initial={{ opacity: 0.7 }}
            whileHover={{ 
              opacity: 1,
              letterSpacing: "0.05em",
              transition: { duration: 0.3 }
            }}
            className="text-white font-semibold text-sm tracking-wide bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text"
          >
            {"Developed by Yash_Lagare".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 1 + (i * 0.03),
                  duration: 0.3
                }}
                whileHover={{
                  y: -2,
                  color: "#60a5fa",
                  transition: { duration: 0.2 }
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>
        </div>

        {/* Sparkle effect on hover */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ 
            scale: [0, 1.2, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 0.6 }}
          className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-full blur-sm"
        />
      </div>

      {/* Shimmer effect from right to left */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
      />
      
      {/* Hover shine effect */}
      <motion.div
        initial={{ x: "100%" }}
        whileHover={{ x: "-100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
      />
    </motion.button>
  );
};


export default DevBadge;