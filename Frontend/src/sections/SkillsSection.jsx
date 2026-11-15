import { memo } from "react";
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
    <section id="skills" className="section-block relative" aria-label="Technical skills">

      <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
        <SectionHeader
          badge="Tech Stack"
          badgeIcon={TbCode}
          title="Skills & Expertise"
          subtitle="Technologies I use to build scalable products."
        />

        <motion.div
          variants={containerVariants}
          initial={false}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          {skillsData.map((skill) => (
            <motion.div
              key={skill._id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              className="skill-pill cursor-default"
            >
              <span className="skill-pill__logo"><img src={`/icons/skills/${skill._id}.svg`} alt="" width="28" height="28" loading="lazy" decoding="async" /></span>
              <span className="font-medium text-sm text-ink/80">{skill.title}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default memo(SkillsSection);
