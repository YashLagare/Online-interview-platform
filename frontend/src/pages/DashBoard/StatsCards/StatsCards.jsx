
import { motion } from "framer-motion";
import { TrophyIcon, UsersIcon } from "lucide-react";

function StatsCards({ activeSessionsCount, recentSessionsCount }) {
  return (
    <div className="lg:col-span-1 grid grid-cols-1 gap-6">
      {/* Active Count */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.03, y: -5 }}
        className="card bg-base-100 border-2 border-primary/20 hover:border-primary/40 relative overflow-hidden"
      >
        {/* Animated gradient background */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 0% 0%, rgba(var(--p), 0.1), transparent 50%)",
              "radial-gradient(circle at 100% 100%, rgba(var(--p), 0.1), transparent 50%)",
              "radial-gradient(circle at 0% 0%, rgba(var(--p), 0.1), transparent 50%)"
            ]
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Hover shimmer effect */}
        <motion.div
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
        />

        <div className="card-body relative z-10">
          <div className="flex items-center justify-between mb-3">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="relative p-3 bg-primary/10 rounded-2xl"
            >
              <UsersIcon className="w-7 h-7 text-primary" />

              {/* Icon glow */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 15px rgba(var(--p), 0.3)",
                    "0 0 25px rgba(var(--p), 0.5)",
                    "0 0 15px rgba(var(--p), 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="badge badge-primary relative"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full"
              />
              <span className="ml-2">Live</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            className="text-4xl font-black mb-1"
          >
            {activeSessionsCount}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-sm opacity-60"
          >
            Active Sessions
          </motion.div>
        </div>
      </motion.div>

      {/* Recent Count */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ scale: 1.03, y: -5 }}
        className="card bg-base-100 border-2 border-secondary/20 hover:border-secondary/40 relative overflow-hidden"
      >
        {/* Animated gradient background */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 0% 0%, rgba(var(--s), 0.1), transparent 50%)",
              "radial-gradient(circle at 100% 100%, rgba(var(--s), 0.1), transparent 50%)",
              "radial-gradient(circle at 0% 0%, rgba(var(--s), 0.1), transparent 50%)"
            ]
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Hover shimmer effect */}
        <motion.div
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/10 to-transparent"
        />

        <div className="card-body relative z-10">
          <div className="flex items-center justify-between mb-3">
            <motion.div
              whileHover={{ rotate: [0, -15, 15, -15, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="relative p-3 bg-secondary/10 rounded-2xl"
            >
              <TrophyIcon className="w-7 h-7 text-secondary" />

              {/* Icon glow */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 15px rgba(var(--s), 0.3)",
                    "0 0 25px rgba(var(--s), 0.5)",
                    "0 0 15px rgba(var(--s), 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            className="text-4xl font-black mb-1"
          >
            {recentSessionsCount}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-sm opacity-60"
          >
            Total Sessions
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default StatsCards;