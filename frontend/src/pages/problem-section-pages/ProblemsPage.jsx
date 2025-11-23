

import { motion } from "framer-motion";
import { ChevronRightIcon, Code2Icon } from "lucide-react";
import { Link } from "react-router";
import Navbar from "../../components/mainPage-Components/Navbar.jsx";
import { PROBLEMS } from "../../data/problems.js";
import { getDifficultyBadgeClass } from "../../utils/FilterHelperFun.js";

const ProblemsPage = () => {

  const problems = Object.values(PROBLEMS);

  const easyProblemsCount = problems.filter((p) => p.difficulty === "Easy").length;
  const mediumProblemsCount = problems.filter((p) => p.difficulty === "Medium").length;
  const hardProblemsCount = problems.filter((p) => p.difficulty === "Hard").length;

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl font-bold mb-2"
          >
            Practice Problems
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base-content/70"
          >
            Sharpen your coding skills with these curated problems
          </motion.p>
        </motion.div>

        {/* PROBLEMS LIST */}
        <div className="space-y-4">
          {problems.map((problem, index) => (
            <Link
              key={problem.id}
              to={`/problems/${problem.id}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.01, y: -4 }}
                className="card bg-base-100 relative overflow-hidden"
              >
                {/* Hover shimmer effect */}
                <motion.div
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                />

                <div className="card-body relative z-10">
                  <div className="flex items-center justify-between gap-4">
                    {/* LEFT SIDE */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className="relative size-12 rounded-lg bg-primary/10 flex items-center justify-center"
                        >
                          <Code2Icon className="size-6 text-primary" />

                          {/* Icon glow */}
                          <motion.div
                            animate={{
                              boxShadow: [
                                "0 0 10px rgba(var(--p), 0.2)",
                                "0 0 20px rgba(var(--p), 0.4)",
                                "0 0 10px rgba(var(--p), 0.2)"
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 rounded-lg"
                          />
                        </motion.div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <motion.h2
                              whileHover={{ x: 5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                              className="text-xl font-bold"
                            >
                              {problem.title}
                            </motion.h2>
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.1 + index * 0.05, type: "spring" }}
                              whileHover={{ scale: 1.1 }}
                              className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}
                            >
                              {problem.difficulty}
                            </motion.span>
                          </div>
                          <p className="text-sm text-base-content/60">{problem.category}</p>
                        </div>
                      </div>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                        className="text-base-content/80 mb-3"
                      >
                        {problem.description.text}
                      </motion.p>
                    </div>

                    {/* RIGHT SIDE */}
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 text-primary"
                    >
                      <span className="font-medium">Solve</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ChevronRightIcon className="size-5" />
                      </motion.div>
                    </motion.div>

                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* STATS FOOTER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 card bg-base-100 shadow-lg relative overflow-hidden"
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

          <div className="card-body relative z-10">
            <div className="stats stats-vertical lg:stats-horizontal overflow-x-hidden overflow-y-hidden">

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                className="stat"
              >
                <div className="stat-title">Total Problems</div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                  className="stat-value text-primary"
                >
                  {problems.length}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                className="stat"
              >
                <div className="stat-title">Easy</div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                  className="stat-value text-success"
                >
                  {easyProblemsCount}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                className="stat"
              >
                <div className="stat-title">Medium</div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  className="stat-value text-warning"
                >
                  {mediumProblemsCount}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                className="stat"
              >
                <div className="stat-title">Hard</div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                  className="stat-value text-error"
                >
                  {hardProblemsCount}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>

    </div>
  )
}

export default ProblemsPage