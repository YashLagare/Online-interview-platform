
import { AnimatePresence, motion } from "framer-motion";
import { Code2Icon, LoaderIcon, PlusIcon } from "lucide-react";
import { PROBLEMS } from "../../../data/problems.js";

function CreateSessionModal({
    isOpen,
    onClose,
    roomConfig,
    setRoomConfig,
    onCreateRoom,
    isCreating,
}) {
    const problems = Object.values(PROBLEMS);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="modal modal-open">
                    {/* Backdrop with fade animation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="modal-backdrop"
                        onClick={onClose}
                    />

                    {/* Modal Box with scale and fade animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                        className="modal-box max-w-2xl relative"
                    >
                        {/* Animated gradient border effect */}
                        <motion.div
                            animate={{
                                background: [
                                    "linear-gradient(45deg, transparent, rgba(var(--p), 0.1), transparent)",
                                    "linear-gradient(225deg, transparent, rgba(var(--p), 0.1), transparent)",
                                    "linear-gradient(45deg, transparent, rgba(var(--p), 0.1), transparent)"
                                ]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute inset-0 rounded-2xl pointer-events-none"
                        />

                        {/* Title with animation */}
                        <motion.h3
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            className="font-bold text-2xl mb-6"
                        >
                            Create New Session
                        </motion.h3>

                        <div className="space-y-8">
                            {/* PROBLEM SELECTION */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                                className="space-y-2"
                            >
                                <label className="label">
                                    <span className="label-text font-semibold">Select Problem</span>
                                    <motion.span
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="label-text-alt text-error"
                                    >
                                        *
                                    </motion.span>
                                </label>

                                <motion.select
                                    whileFocus={{ scale: 1.01 }}
                                    transition={{ duration: 0.2 }}
                                    className="select w-full"
                                    value={roomConfig.problem}
                                    onChange={(e) => {
                                        const selectedProblem = problems.find((p) => p.title === e.target.value);
                                        setRoomConfig({
                                            difficulty: selectedProblem.difficulty,
                                            problem: e.target.value,
                                        });
                                    }}
                                >
                                    <option value="" disabled>
                                        Choose a coding problem...
                                    </option>

                                    {problems.map((problem) => (
                                        <option key={problem.id} value={problem.title}>
                                            {problem.title} ({problem.difficulty})
                                        </option>
                                    ))}
                                </motion.select>
                            </motion.div>

                            {/* ROOM SUMMARY */}
                            <AnimatePresence>
                                {roomConfig.problem && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, height: "auto", scale: 1 }}
                                        exit={{ opacity: 0, height: 0, scale: 0.8 }}
                                        transition={{ duration: 0.3, type: "spring" }}
                                        className="alert alert-success relative overflow-hidden"
                                    >
                                        {/* Animated shimmer effect */}
                                        <motion.div
                                            initial={{ x: "-100%" }}
                                            animate={{ x: "200%" }}
                                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                        />

                                        <motion.div
                                            animate={{ rotate: [0, 360] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        >
                                            <Code2Icon className="size-5" />
                                        </motion.div>

                                        <div className="relative z-10">
                                            <motion.p
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 }}
                                                className="font-semibold"
                                            >
                                                Room Summary:
                                            </motion.p>
                                            <motion.p
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                Problem: <span className="font-medium">{roomConfig.problem}</span>
                                            </motion.p>
                                            <motion.p
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                Max Participants: <span className="font-medium">2 (1-on-1 session)</span>
                                            </motion.p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Modal Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                            className="modal-action"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-ghost"
                                onClick={onClose}
                            >
                                Cancel
                            </motion.button>

                            <motion.button
                                whileHover={{
                                    scale: !roomConfig.problem || isCreating ? 1 : 1.05,
                                    boxShadow: !roomConfig.problem || isCreating ? "none" : "0 10px 30px rgba(var(--p), 0.4)"
                                }}
                                whileTap={{ scale: !roomConfig.problem || isCreating ? 1 : 0.95 }}
                                className="btn btn-primary gap-2 relative overflow-hidden"
                                onClick={onCreateRoom}
                                disabled={isCreating || !roomConfig.problem}
                            >
                                {/* Button shimmer effect */}
                                {!isCreating && roomConfig.problem && (
                                    <motion.div
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: "100%" }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                    />
                                )}

                                {isCreating ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    >
                                        <LoaderIcon className="size-5" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        whileHover={{ rotate: 90 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <PlusIcon className="size-5" />
                                    </motion.div>
                                )}

                                <span className="relative z-10">
                                    {isCreating ? "Creating..." : "Create"}
                                </span>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

export default CreateSessionModal;