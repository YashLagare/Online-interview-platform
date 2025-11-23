
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { Clock, Code2, Loader, Trophy, Users } from "lucide-react";
import { getDifficultyBadgeClass } from "../../../utils/FilterHelperFun.js";

function RecentSessions({ sessions, isLoading }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="card bg-base-100 border-2 border-accent/20 hover:border-accent/30 mt-8"
    >
      <div className="card-body">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="relative p-2 bg-gradient-to-br from-accent to-secondary rounded-xl"
          >
            <Clock className="w-5 h-5 text-white" />

            {/* Glow effect */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 15px rgba(var(--a), 0.3)",
                  "0 0 25px rgba(var(--a), 0.5)",
                  "0 0 15px rgba(var(--a), 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-xl"
            />
          </motion.div>

          <h2 className="text-2xl font-black">Your Past Sessions</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full flex items-center justify-center py-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader className="w-10 h-10 text-primary" />
              </motion.div>
            </motion.div>
          ) : sessions.length > 0 ? (
            sessions.map((session, index) => (
              <motion.div
                key={session._id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className={`card relative ${session.status === "active"
                    ? "bg-success/10 border-success/30 hover:border-success/60"
                    : "bg-base-200 border-base-300 hover:border-primary/30"
                  } overflow-hidden`}
              >
                {/* Hover shimmer effect */}
                <motion.div
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                  className={`absolute inset-0 ${session.status === "active"
                      ? "bg-gradient-to-r from-transparent via-success/10 to-transparent"
                      : "bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                    }`}
                />

                {session.status === "active" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                    className="absolute top-3 right-3 z-10"
                  >
                    <div className="badge badge-success gap-1">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 bg-success rounded-full"
                      />
                      ACTIVE
                    </div>
                  </motion.div>
                )}

                <div className="card-body p-5 relative z-10">
                  <div className="flex items-start gap-3 mb-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`relative w-12 h-12 rounded-xl flex items-center justify-center ${session.status === "active"
                          ? "bg-gradient-to-br from-success to-success/70"
                          : "bg-gradient-to-br from-primary to-secondary"
                        }`}
                    >
                      <Code2 className="w-6 h-6 text-white" />

                      {/* Icon glow */}
                      <motion.div
                        animate={{
                          boxShadow: [
                            "0 0 10px rgba(var(--p), 0.3)",
                            "0 0 20px rgba(var(--s), 0.5)",
                            "0 0 10px rgba(var(--p), 0.3)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-xl"
                      />
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      <motion.h3
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="font-bold text-base mb-1 truncate"
                      >
                        {session.problem}
                      </motion.h3>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                        whileHover={{ scale: 1.1 }}
                        className={`badge badge-sm ${getDifficultyBadgeClass(session.difficulty)}`}
                      >
                        {session.difficulty}
                      </motion.span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm opacity-80 mb-4">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2"
                    >
                      <Clock className="w-4 h-4" />
                      <span>
                        {formatDistanceToNow(new Date(session.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2"
                    >
                      <Users className="w-4 h-4" />
                      <span>
                        {session.participant ? "2" : "1"} participant
                        {session.participant ? "s" : ""}
                      </span>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center justify-between pt-3 border-t border-base-300"
                  >
                    <span className="text-xs font-semibold opacity-80 uppercase">Completed</span>
                    <span className="text-xs opacity-40">
                      {new Date(session.updatedAt).toLocaleDateString()}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="col-span-full text-center py-16"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  y: [0, -10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-3xl flex items-center justify-center relative"
              >
                <Trophy className="w-10 h-10 text-accent/50" />

                {/* Trophy glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-accent/20 rounded-3xl blur-xl"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg font-semibold opacity-70 mb-1"
              >
                No sessions yet
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm opacity-50"
              >
                Start your coding journey today!
              </motion.p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default RecentSessions;