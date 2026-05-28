import PageLayout from "../layouts/PageLayout";
import AboutSection from "../sections/AboutSection";
import SkillsSection from "../sections/SkillsSection";
import { experienceData, educationData } from "../data/staticData";
import SectionHeader from "../components/ui/SectionHeader";
import { Briefcase, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <PageLayout>
      <div className="pt-24 pb-12">
        <AboutSection />
        
        {/* Experience Section */}
        <section className="py-16 relative">
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <SectionHeader
              badge="Experience"
              badgeIcon={Briefcase}
              title="Work History"
              subtitle="My professional journey and freelance experience."
            />
            
            <div className="mt-12 flex flex-col gap-6">
              {experienceData.map((exp, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  key={exp._id}
                  className="glass-card p-6 md:p-8 flex flex-col md:flex-row md:items-start gap-6 border border-white/5 bg-white/[0.02]"
                >
                  <div className="md:w-1/4 shrink-0">
                    <span className="text-violet-400 font-bold text-sm tracking-wider uppercase">
                      {new Date(exp.startDate).getFullYear()} - {exp.isCurrent ? "Present" : new Date(exp.endDate).getFullYear()}
                    </span>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                    <h4 className="text-white/60 font-medium mb-4">{exp.company}</h4>
                    <p className="text-white/50 text-sm leading-relaxed mb-4">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies?.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-violet-500/10 text-violet-300 rounded-full text-xs font-semibold">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="py-16 relative">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <SectionHeader
              badge="Education"
              badgeIcon={GraduationCap}
              title="Academic Background"
            />
            
            <div className="mt-12 flex flex-col gap-6">
              {educationData.map((edu, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  key={edu._id}
                  className="glass-card p-6 md:p-8 flex flex-col md:flex-row md:items-start gap-6 border border-white/5 bg-white/[0.02]"
                >
                  <div className="md:w-1/4 shrink-0">
                    <span className="text-cyan-400 font-bold text-sm tracking-wider uppercase">
                      {edu.year}
                    </span>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
                    <h4 className="text-white/60 font-medium mb-4">{edu.institution}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SkillsSection />
      </div>
    </PageLayout>
  );
}
