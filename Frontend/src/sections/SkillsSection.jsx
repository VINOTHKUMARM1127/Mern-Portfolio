import { memo } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { TbCode } from "react-icons/tb";
import SectionHeader from "../components/ui/SectionHeader";
import { skillsData } from "../data/staticData";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

function SkillsSection() {
  return (
    <section id="skills" className="min-h-screen flex flex-col justify-center py-24 relative overflow-hidden bg-[#0a0a0f]">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
        <SectionHeader
          badge="Tech Stack"
          badgeIcon={TbCode}
          title="Skills & Expertise"
          subtitle="Technologies I use to build scalable products."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          {skillsData.map((skill) => (
            <motion.div
              key={skill._id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-white/[0.03] border border-white/[0.06] hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300 cursor-default"
            >
              {skill.icon ? (
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <Icon icon={skill.icon} className="max-w-full max-h-full text-xl" />
                </div>
              ) : (
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <TbCode className="text-xl text-violet-400" />
                </div>
              )}
              <span className="font-medium text-sm text-white/80">{skill.title}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default memo(SkillsSection);
