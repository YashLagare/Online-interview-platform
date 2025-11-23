
import { SignInButton } from '@clerk/clerk-react';
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Code2, Users, Video, Zap } from 'lucide-react';
import { useState } from "react";
import DevBadge from "../HeroSection/DevBadge/DevBadge";
const HeroSection = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const floatingIcons = [
        { icon: <Code2 className="w-8 h-8" />, x: "10%", y: "20%", color: "text-blue-400" },
        { icon: <Video className="w-8 h-8" />, x: "80%", y: "30%", color: "text-purple-400" },
        { icon: <Users className="w-8 h-8" />, x: "15%", y: "70%", color: "text-pink-400" },
        { icon: <Zap className="w-8 h-8" />, x: "75%", y: "65%", color: "text-yellow-400" },
        { icon: <CheckCircle2 className="w-8 h-8" />, x: "50%", y: "10%", color: "text-green-400" }
    ];

    const features = ["Live Video Chat", "Code Editor", "Multi-Language"];

    const stats = [
        { value: "10K+", label: "Active Users", color: "from-blue-500 to-cyan-500" },
        { value: "50K+", label: "Sessions", color: "from-purple-500 to-pink-500" },
        { value: "99.9%", label: "Uptime", color: "from-green-500 to-emerald-500" }
    ];

    const featureCards = [
        {
            icon: <Video className="w-10 h-10" />,
            title: "HD Video Call",
            desc: "Crystal clear communication during interviews",
            gradient: "from-blue-500/20 to-cyan-500/20"
        },
        {
            icon: <Code2 className="w-10 h-10" />,
            title: "Live Code Editor",
            desc: "Real-time syntax highlighting & multi-language",
            gradient: "from-purple-500/20 to-pink-500/20"
        },
        {
            icon: <Users className="w-10 h-10" />,
            title: "Easy Collaboration",
            desc: "Share your screen & discuss solutions seamlessly",
            gradient: "from-green-500/20 to-emerald-500/20"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
            {/* ================= HERO SECTION ================= */}
            <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
                {/* Animated Background Gradients */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [90, 0, 90],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px]"
                />

                {/* FLOATING ICONS */}
                {floatingIcons.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                            scale: [1, 1.2, 1],
                            y: [0, -20, 0]
                        }}
                        transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut"
                        }}
                        className={`absolute ${item.color}`}
                        style={{ left: item.x, top: item.y }}
                    >
                        {item.icon}
                    </motion.div>
                ))}

                {/* CONTENT CONTAINER */}
                <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {/* BADGE */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center mt-2 gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full backdrop-blur-sm"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-2 h-2 bg-blue-400 rounded-full"
                            />
                            <span className="text-blue-300 text-sm font-medium">Real-time Collaboration</span>
                        </motion.div>

                        {/* TITLE */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-6xl lg:text-7xl font-bold leading-tight"
                        >
                            Code Together,{" "}
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Learn Together
                            </span>
                        </motion.h1>

                        {/* SUBTEXT */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl text-gray-300 leading-relaxed"
                        >
                            The ultimate platform for collaborative coding interviews and pair programming.
                            Connect face-to-face, code in real-time, and ace your technical interviews.
                        </motion.p>

                        {/* FEATURE PILLS */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap gap-3"
                        >
                            {features.map((item, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer"
                                >
                                    <CheckCircle2 className="w-4 h-4 text-green-400 inline mr-2" />
                                    {item}
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* CTA BUTTONS */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 items-start"
                        >
                            <SignInButton mode="modal">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg overflow-hidden"
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                                        initial={{ x: "100%" }}
                                        whileHover={{ x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    />

                                    <span className="relative flex items-center gap-2">
                                        Start Coding Now
                                        <motion.div
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            <ArrowRight className="w-5 h-5" />
                                        </motion.div>
                                    </span>


                                </motion.button>
                            </SignInButton>

                            <DevBadge />
                        </motion.div>

                        {/* STAT CARDS */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="grid grid-cols-3 gap-4 pt-8"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="relative p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm overflow-hidden group"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                                    <div className="relative">
                                        <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                            {stat.value}
                                        </div>
                                        <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* RIGHT HERO IMAGE */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-3xl opacity-30" />
                            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                                    </div>
                                    <div className="space-y-2 font-mono text-sm">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ delay: 1, duration: 1 }}
                                            className="h-4 bg-gradient-to-r from-blue-400 to-transparent rounded"
                                        />
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "80%" }}
                                            transition={{ delay: 1.2, duration: 1 }}
                                            className="h-4 bg-gradient-to-r from-purple-400 to-transparent rounded"
                                        />
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "60%" }}
                                            transition={{ delay: 1.4, duration: 1 }}
                                            className="h-4 bg-gradient-to-r from-pink-400 to-transparent rounded"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ================= FEATURES SECTION ================= */}
            <section className="relative py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* TITLE */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl font-bold mb-4">
                            Everything You Need to{" "}
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Succeed
                            </span>
                        </h2>
                        <p className="text-xl text-gray-400">
                            Powerful features designed to make your coding interviews seamless and productive
                        </p>
                    </motion.div>

                    {/* FEATURE CARDS GRID */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {featureCards.map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                onHoverStart={() => setHoveredCard(i)}
                                onHoverEnd={() => setHoveredCard(null)}
                                className="relative group"
                            >
                                <div className="relative p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm overflow-hidden h-full">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                    <div className="relative z-10 space-y-4">
                                        <motion.div
                                            animate={hoveredCard === i ? { rotate: [0, 5, -5, 0], scale: 1.1 } : {}}
                                            transition={{ duration: 0.5 }}
                                            className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white"
                                        >
                                            {f.icon}
                                        </motion.div>

                                        <h3 className="text-2xl font-bold">{f.title}</h3>
                                        <p className="text-gray-400">{f.desc}</p>
                                    </div>

                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={hoveredCard === i ? { scale: 1, opacity: 0.1 } : { scale: 0, opacity: 0 }}
                                        className="absolute -right-10 -bottom-10 w-40 h-40 bg-white rounded-full"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HeroSection;