import { memo } from "react";
import { motion } from "framer-motion";
import { TbCode, TbClock, TbMessage, TbShield, TbSparkles } from "react-icons/tb";
import SectionHeader from "../components/ui/SectionHeader";
import { whyHireMeData } from "../data/staticData";

const iconMap = {
  code: TbCode,
  clock: TbClock,
  message: TbMessage,
  shield: TbShield,
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

function WhyHireMeSection() {
  return (
    <section
      id="why-hire-me"
      className="py-24 relative overflow-hidden"
      aria-label="Why hire me"
    >
      {/* Background */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-600/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionHeader
          badge="Why Me"
          badgeIcon={TbSparkles}
          title="Why Hire Me?"
          subtitle="What sets me apart as your development partner."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {whyHireMeData.map((item) => {
            const IconComp = iconMap[item.icon] || TbCode;
            return (
              <motion.div
                key={item._id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group relative flex flex-col p-7 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-violet-500/30 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-transparent to-transparent group-hover:from-violet-500/5 transition-colors duration-500 pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500/15 to-cyan-500/15 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-5 group-hover:scale-110 group-hover:border-violet-500/40 transition-all duration-300">
                    <IconComp size={26} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-violet-300 transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="text-sm text-white/50 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default memo(WhyHireMeSection);
