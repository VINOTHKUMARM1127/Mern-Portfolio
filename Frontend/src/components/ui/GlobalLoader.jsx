import { motion } from "framer-motion";

export default function GlobalLoader() {
  return (
    <div className="fixed inset-0 z-[200] bg-[#0a0a0f] flex flex-col items-center justify-center">
      {/* Animated logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6"
      >
        {/* Logo mark */}
        <motion.div
          className="relative w-20 h-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 opacity-20 blur-xl" />
          <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
            <span className="text-white text-2xl font-extrabold tracking-wider">V</span>
          </div>
        </motion.div>

        {/* Loading bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full h-full bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-500 rounded-full"
          />
        </div>

        {/* Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/40 text-sm font-medium tracking-wider uppercase"
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
}
