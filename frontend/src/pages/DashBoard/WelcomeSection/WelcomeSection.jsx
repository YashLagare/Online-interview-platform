
import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { ArrowRightIcon, SparklesIcon, ZapIcon } from "lucide-react";

function WelcomeSection({ onCreateSession }) {
    const { user } = useUser();

    return (
        <div className="relative overflow-hidden">
            {/* Animated background gradients */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [90, 0, 90],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none"
            />

            <div className="relative max-w-7xl mx-auto px-6 py-16">
                <div className="flex items-center justify-between">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-3 mb-4"
                        >
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.2,
                                    type: "spring",
                                    stiffness: 200
                                }}
                                whileHover={{
                                    rotate: [0, -10, 10, -10, 0],
                                    scale: 1.1
                                }}
                                className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
                            >
                                <SparklesIcon className="w-6 h-6 text-white" />

                                {/* Sparkle glow effect */}
                                <motion.div
                                    animate={{
                                        boxShadow: [
                                            "0 0 20px rgba(var(--p), 0.4)",
                                            "0 0 35px rgba(var(--s), 0.6)",
                                            "0 0 20px rgba(var(--p), 0.4)"
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 rounded-2xl"
                                />
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-5xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                            >
                                Welcome back, {user?.firstName || "there"}!
                            </motion.h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="text-xl text-base-content/60 ml-16"
                        >
                            Ready to level up your coding skills?
                        </motion.p>
                    </div>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.6,
                            type: "spring",
                            stiffness: 200
                        }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 20px 40px rgba(var(--p), 0.4)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onCreateSession}
                        className="group relative px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-2xl overflow-hidden"
                    >
                        {/* Animated gradient overlay */}
                        <motion.div
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%]"
                        />

                        {/* Shimmer effect */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />

                        <div className="relative flex items-center gap-3 text-white font-bold text-lg z-10">
                            <motion.div
                                animate={{
                                    rotate: [0, 360],
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            >
                                <ZapIcon className="w-6 h-6" />
                            </motion.div>

                            <span>Create Session</span>

                            <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <ArrowRightIcon className="w-5 h-5" />
                            </motion.div>
                        </div>

                        {/* Button glow on hover */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="absolute inset-0 bg-white/10 blur-xl"
                        />
                    </motion.button>
                </div>
            </div>
        </div>
    );
}

export default WelcomeSection;