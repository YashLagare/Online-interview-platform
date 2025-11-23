
// import { MonitorX, Smartphone } from "lucide-react";

// const ScreenTooSmall = () => {
//   return (
//     <div className="fixed inset-0 backdrop-blur-xl bg-white/10 z-[999] flex items-center justify-center p-6">
//       <div className="bg-white/20 backdrop-blur-2xl border border-white/30 shadow-xl p-8 rounded-3xl max-w-sm text-center">
//         <MonitorX size={40} className="mx-auto mb-4 text-white" />

//         <h2 className="text-2xl font-bold text-white mb-2">
//           Screen Too Small
//         </h2>

//         <p className="text-white/90 mb-4">
//           DevScreen is optimized for larger screens.  
//           Please use a laptop or desktop for the best interview experience.
//         </p>

//         <Smartphone size={26} className="mx-auto mt-2 opacity-80 text-white" />
//       </div>
//     </div>
//   );
// };

// export default ScreenTooSmall;




import { motion } from "framer-motion";
import { Check, Monitor, Smartphone, X } from "lucide-react";

const ScreenTooSmall = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 backdrop-blur-xl bg-white/10 z-[999] flex items-center justify-center p-6"
    >
      {/* Animated background gradients */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-96 h-96 bg-red-500/30 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/30 rounded-full blur-[120px] pointer-events-none"
      />

      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
        className="relative bg-white/20 backdrop-blur-2xl border border-white/30 shadow-xl p-8 rounded-3xl max-w-sm text-center overflow-hidden"
      >
        {/* Animated border glow */}
        <motion.div
          animate={{
            boxShadow: [
              "0 0 20px rgba(239, 68, 68, 0.3)",
              "0 0 40px rgba(251, 146, 60, 0.5)",
              "0 0 20px rgba(239, 68, 68, 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-3xl pointer-events-none"
        />

        {/* Monitor icon with animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            type: "spring",
            stiffness: 200
          }}
        >
          <motion.div
            animate={{
              rotate: [0, -5, 5, -5, 0],
              y: [0, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            <div className="relative w-10 h-10 mx-auto mb-4">
              <Monitor className="w-10 h-10 text-white" />
              <Check className="absolute inset-0 m-auto w-5 h-5 text-green-400" />
            </div>
            {/* <Monitor  size={40} className="mx-auto mb-4 text-white drop-shadow-lg" /> */}
            {/* <div className="relative w-12 h-12 mx-auto">
              <Monitor className="text-white w-12 h-12" />
              <Check className="absolute bottom-0 right-0 text-green-400 w-5 h-5 drop-shadow-md" />
            </div> */}
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-2xl font-bold text-white mb-2"
        >
          Screen Too Small
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-white/90 mb-4"
        >
          DevScreen is optimized for larger screens.
          Please use a laptop or desktop for the best interview experience.
        </motion.p>

        {/* Smartphone icon with animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{
            duration: 0.5,
            delay: 0.6,
            type: "spring",
            stiffness: 200
          }}
        >
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* <Smartphone size={26} className="mx-auto mt-2 text-white drop-shadow-lg" /> */}

            <div className="relative w-10 h-10 mx-auto mt-3">
              <Smartphone className="text-white w-10 h-10" />
              <X className="absolute inset-0 m-auto text-red-400 w-5 h-5 drop-shadow-lg" />
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative animated line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500"
        />
      </motion.div>
    </motion.div>
  );
};

export default ScreenTooSmall;