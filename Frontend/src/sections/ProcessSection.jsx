import { memo } from "react";
import { motion } from "framer-motion";
import { TbSearch, TbPalette, TbCode, TbRocket } from "react-icons/tb";
import SectionHeader from "../components/ui/SectionHeader";
import { processData } from "../data/staticData";

const stepIcons = [TbSearch, TbPalette, TbCode, TbRocket];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

function ProcessSection() {
  return (
    <section
      id="process"
      className="py-24 relative overflow-hidden bg-[#0a0a0f]"
      aria-label="My development process"
    >
      {/* Background */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-violet-600/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionHeader
          badge="Process"
          badgeIcon={TbRocket}
          title="How I Work"
          subtitle="A proven 4-step process that delivers results every time."
        />

        <div className="max-w-4xl mx-auto px-6 relative">
          {/* Vertical Line */}
          <div className="absolute left-[44px] md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-violet-500/30 to-transparent -translate-x-1/2" />

          <div className="space-y-12 md:space-y-0 relative z-10">
            {processData.map((step, index) => {
              const IconComp = stepIcons[index] || TbCode;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step._id}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="relative flex flex-col md:flex-row items-center w-full md:min-h-[200px]"
                >
                  {/* Center Icon */}
                  <div className="absolute left-5 md:left-1/2 top-0 md:top-1/2 -translate-y-0 md:-translate-y-1/2 -translate-x-1/2 w-14 h-14 rounded-full border-4 border-[#0a0a0f] bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white z-20 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                    <IconComp size={24} strokeWidth={1.5} />
                  </div>

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-1/2 pl-20 md:pl-0 ${
                      isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:ml-auto md:text-left"
                    }`}
                  >
                    <div
                      className={`group relative p-8 rounded-3xl border border-white/[0.06] bg-white/[0.02] hover:border-violet-500/30 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden ${
                        isEven ? "md:origin-right" : "md:origin-left"
                      }`}
                    >
                      {/* Hover glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-transparent to-transparent group-hover:from-violet-500/5 transition-colors duration-500 pointer-events-none" />

                      {/* Large Background Number */}
                      <span
                        className={`absolute -top-6 -bottom-6 flex items-center text-8xl font-black text-white/[0.02] group-hover:text-white/[0.04] transition-colors pointer-events-none select-none ${
                          isEven ? "right-4 md:right-auto md:left-4" : "right-4"
                        }`}
                      >
                        0{step.step}
                      </span>

                      <div className="relative z-10">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-sm md:text-base text-white/60 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(ProcessSection);
