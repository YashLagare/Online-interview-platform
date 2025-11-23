
import { SignInButton } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { ArrowRight, MonitorPlay, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-gray-900/80 backdrop-blur-xl border-b border-white/10 shadow-2xl"
                    : "bg-gray-900/50 backdrop-blur-md border-b border-white/5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* LOGO */}
                    <motion.a
                        href="/"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 group cursor-pointer"
                    >
                        {/* Logo Icon */}
                        <motion.div
                            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />
                            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                                <MonitorPlay className="w-6 h-6 text-white" />
                            </div>

                            {/* Sparkle effect on hover */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileHover={{
                                    scale: [0, 1, 0],
                                    opacity: [0, 1, 0],
                                    rotate: 180
                                }}
                                transition={{ duration: 0.6 }}
                                className="absolute -top-1 -right-1"
                            >
                                <Sparkles className="w-4 h-4 text-yellow-400" />
                            </motion.div>
                        </motion.div>

                        {/* Logo Text */}
                        <div className="flex flex-col">
                            <motion.span
                                className="font-black text-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-mono tracking-wider"
                                whileHover={{ letterSpacing: "0.15em" }}
                                transition={{ duration: 0.3 }}
                            >
                                DevScreen
                            </motion.span>
                            <span className="text-xs text-gray-400 font-medium -mt-1 group-hover:text-gray-300 transition-colors">
                                Code Together
                            </span>
                        </div>

                        {/* Hover glow effect */}
                        <motion.div
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                        />
                    </motion.a>

                    {/* CTA BUTTON */}
                    <SignInButton mode="modal">
                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="relative group overflow-hidden px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2"
                        >
                            {/* Animated gradient background */}
                            <motion.div
                                animate={{
                                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-[length:200%_100%]"
                            />

                            {/* Shimmer effect */}
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 1,
                                    ease: "easeInOut"
                                }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                            />

                            {/* Button content */}
                            <span className="relative z-10 text-white">Get Started</span>
                            <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="relative z-10"
                            >
                                <ArrowRight className="w-4 h-4 text-white" />
                            </motion.div>

                            {/* Glow effect on hover */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                className="absolute inset-0 bg-white/20 blur-xl"
                            />
                        </motion.button>
                    </SignInButton>
                </div>
            </div>

            {/* Bottom border glow effect */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: scrolled ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            />
        </motion.nav>
    );
};

export default Navbar;