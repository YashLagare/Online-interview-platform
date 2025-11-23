
import { UserButton } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { BookOpen, LayoutDashboard, MonitorPlay, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

const Navbar = () => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = (path) => location.pathname === path;

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
            className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-base-100/20 backdrop-blur-xl border-b border-primary/30 shadow-2xl"
                    : "bg-base-100/10 backdrop-blur-md border-b border-primary/20 shadow-lg"
                }`}
        >
            <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">

                {/* LOGO */}
                <Link to="/">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex items-center gap-3 relative cursor-pointer"
                    >
                        {/* Logo Icon Container */}
                        <motion.div
                            whileHover={{ rotate: [0, -15, 15, -15, 0] }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Icon */}
                            <div className="relative size-10 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
                                <MonitorPlay className="size-6 text-white" />
                            </div>

                            {/* Sparkle on hover */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0, rotate: 0 }}
                                whileHover={{
                                    scale: [0, 1.2, 0],
                                    opacity: [0, 1, 0],
                                    rotate: [0, 180, 360]
                                }}
                                transition={{ duration: 0.8 }}
                                className="absolute -top-1 -right-1"
                            >
                                <Sparkles className="size-4 text-yellow-400" />
                            </motion.div>
                        </motion.div>

                        {/* Logo Text */}
                        <div className="flex flex-col">
                            <motion.span
                                whileHover={{ letterSpacing: "0.12em" }}
                                transition={{ duration: 0.3 }}
                                className="font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider"
                            >
                                DevScreen
                            </motion.span>
                            <span className="text-xs text-base-content/60 font-medium -mt-1 group-hover:text-base-content/80 transition-colors">
                                Code Together
                            </span>
                        </div>

                        {/* Underline animation */}
                        <motion.div
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
                        />
                    </motion.div>
                </Link>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex items-center gap-1"
                >
                    {/* PROBLEMS PAGE LINK */}
                    <Link to="/problems">
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative px-4 py-2.5 rounded-lg transition-all duration-300 group
                                ${isActive("/problems")
                                    ? "text-primary-content"
                                    : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
                                }
                            `}
                        >
                            {/* Active background with gradient */}
                            {isActive("/problems") && (
                                <motion.div
                                    layoutId="activeBackground"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    className="absolute inset-0 bg-primary rounded-lg"
                                />
                            )}

                            {/* Pulsing glow for active state */}
                            {isActive("/problems") && (
                                <motion.div
                                    animate={{
                                        boxShadow: [
                                            "0 0 15px rgba(var(--p), 0.3)",
                                            "0 0 25px rgba(var(--p), 0.5)",
                                            "0 0 15px rgba(var(--p), 0.3)"
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 rounded-lg"
                                />
                            )}

                            {/* Hover shimmer */}
                            {!isActive("/problems") && (
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "100%" }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-base-content/5 to-transparent"
                                />
                            )}

                            <div className="relative flex items-center gap-x-2.5 z-10">
                                <motion.div
                                    animate={isActive("/problems") ? { rotate: [0, 5, -5, 0] } : {}}
                                    transition={{ duration: 0.5 }}
                                >
                                    <BookOpen className="size-4" />
                                </motion.div>
                                <span className="font-medium hidden sm:inline">Problems</span>
                            </div>
                        </motion.div>
                    </Link>

                    {/* DASHBOARD PAGE LINK */}
                    <Link to="/dashboard">
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative px-4 py-2.5 rounded-lg transition-all duration-300 group
                                ${isActive("/dashboard")
                                    ? "text-primary-content"
                                    : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
                                }
                            `}
                        >
                            {/* Active background with gradient */}
                            {isActive("/dashboard") && (
                                <motion.div
                                    layoutId="activeBackground"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    className="absolute inset-0 bg-primary rounded-lg"
                                />
                            )}

                            {/* Pulsing glow for active state */}
                            {isActive("/dashboard") && (
                                <motion.div
                                    animate={{
                                        boxShadow: [
                                            "0 0 15px rgba(var(--p), 0.3)",
                                            "0 0 25px rgba(var(--p), 0.5)",
                                            "0 0 15px rgba(var(--p), 0.3)"
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 rounded-lg"
                                />
                            )}

                            {/* Hover shimmer */}
                            {!isActive("/dashboard") && (
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "100%" }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-base-content/5 to-transparent"
                                />
                            )}

                            <div className="relative flex items-center gap-x-2.5 z-10">
                                <motion.div
                                    animate={isActive("/dashboard") ? { rotate: [0, 5, -5, 0] } : {}}
                                    transition={{ duration: 0.5 }}
                                >
                                    <LayoutDashboard className="size-4" />
                                </motion.div>
                                <span className="font-medium hidden sm:inline">Dashboard</span>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Animated Divider */}
                    <motion.div
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                        className="w-px h-8 bg-gradient-to-b from-transparent via-base-content/20 to-transparent mx-2"
                    />

                    {/* User Button with animation */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="ml-2"
                    >
                        <UserButton />
                    </motion.div>
                </motion.div>

            </div>

            {/* Bottom glow line on scroll */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: scrolled ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            />
        </motion.nav>
    );
};

export default Navbar;