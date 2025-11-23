
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  Code2Icon,
  CrownIcon,
  LoaderIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";
import { Link } from "react-router";
import { getDifficultyBadgeClass } from "../../../utils/FilterHelperFun.js";

function ActiveSessions({ sessions, isLoading, isUserInSession }) {
  // Filter out completed sessions - only show active ones
  const activeSessions = sessions.filter(session => session.status === "active");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="lg:col-span-2 card bg-base-100 border-2 border-primary/20 hover:border-primary/30 h-full"
    >
      <div className="card-body">
        {/* HEADERS SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center justify-between mb-6"
        >
          {/* TITLE AND ICON */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="relative p-2 bg-gradient-to-br from-primary to-secondary rounded-xl"
            >
              <ZapIcon className="size-5" />

              {/* Glow effect */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 15px rgba(var(--p), 0.3)",
                    "0 0 25px rgba(var(--p), 0.5)",
                    "0 0 15px rgba(var(--p), 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-xl"
              />
            </motion.div>

            <h2 className="text-2xl font-black">Live Sessions</h2>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="size-2 bg-success rounded-full"
            />
            <span className="text-sm font-medium text-success">{activeSessions.length} active</span>
          </motion.div>
        </motion.div>

        {/* SESSIONS LIST */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center py-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <LoaderIcon className="size-10 text-primary" />
              </motion.div>
            </motion.div>
          ) : activeSessions.length > 0 ? (
            activeSessions.map((session, index) => {
              const isCompleted = session.status === "completed";
              const isFull = session.participant && !isUserInSession(session);
              const canJoin = !isCompleted && !isFull;

              return (
                <motion.div
                  key={session._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="card bg-base-200 border-2 border-base-300 hover:border-primary/50 relative overflow-hidden"
                >
                  {/* Hover gradient effect */}
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                  />

                  <div className="flex items-center justify-between gap-4 p-5 relative z-10">
                    {/* LEFT SIDE */}
                    <div className="flex items-center gap-4 flex-1">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="relative size-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
                      >
                        <Code2Icon className="size-7 text-white" />
                        {!isCompleted && (
                          <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="absolute -top-1 -right-1 size-4 bg-success rounded-full border-2 border-base-100"
                          />
                        )}

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
                        <div className="flex items-center gap-2 mb-2">
                          <motion.h3
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="font-bold text-lg truncate"
                          >
                            {session.problem}
                          </motion.h3>
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                            whileHover={{ scale: 1.1 }}
                            className={`badge badge-sm ${getDifficultyBadgeClass(
                              session.difficulty
                            )}`}
                          >
                            {session.difficulty.slice(0, 1).toUpperCase() +
                              session.difficulty.slice(1)}
                          </motion.span>
                        </div>

                        <div className="flex items-center gap-4 text-sm opacity-80">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-1.5"
                          >
                            <CrownIcon className="size-4" />
                            <span className="font-medium">{session.host?.username}</span>
                          </motion.div>

                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-1.5"
                          >
                            <UsersIcon className="size-4" />
                            <span className="text-xs">{session.participant ? "2/2" : "1/2"}</span>
                          </motion.div>

                          {isCompleted ? (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="badge badge-ghost badge-sm"
                            >
                              COMPLETED
                            </motion.span>
                          ) : isFull ? (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="badge badge-error badge-sm"
                            >
                              FULL
                            </motion.span>
                          ) : (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="badge badge-success badge-sm"
                            >
                              OPEN
                            </motion.span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT SIDE - Join Button */}
                    {isCompleted ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-disabled btn-sm"
                      >
                        Completed
                      </motion.button>
                    ) : isFull ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-disabled btn-sm"
                      >
                        Full
                      </motion.button>
                    ) : (
                      <Link to={`/session/${session._id}`}>
                        <motion.button
                          whileHover={{
                            scale: 1.08,
                            boxShadow: "0 10px 25px rgba(var(--p), 0.4)"
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="btn btn-primary btn-sm gap-2 relative overflow-hidden"
                        >
                          {/* Button shimmer effect */}
                          <motion.div
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          />

                          <span className="relative z-10">
                            {isUserInSession(session) ? "Rejoin🥺" : "Join🤗"}
                          </span>
                          <motion.div
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRightIcon className="size-4" />
                          </motion.div>
                        </motion.button>
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  y: [0, -10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center relative"
              >
                <SparklesIcon className="w-10 h-10 text-primary/50" />

                {/* Sparkle glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-primary/20 rounded-3xl blur-xl"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg font-semibold opacity-70 mb-1"
              >
                No active sessions😔
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm opacity-50"
              >
                Be the first to create one!😉
              </motion.p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ActiveSessions;