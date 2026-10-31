import { motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin, Calendar, Code2, Rocket } from "lucide-react";
import PageLayout from "../layouts/PageLayout";
import SkillsSection from "../sections/SkillsSection";
import SectionHeader from "../components/ui/SectionHeader";
import { usePortfolio } from "../context/PortfolioContext";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function About() {
  const { hero, settings, contact, experience = [], education = [] } = usePortfolio();

  return (
    <PageLayout>
      <div className="pt-32 pb-12 overflow-hidden bg-[#0a0a0f]">
        
        {/* =========================================
            INTRO SECTION
            ========================================= */}
        <section className="relative mb-32">
          {/* Background Ambient */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20"
            >
              {/* Left: Image */}
              <motion.div variants={itemVariants} className="w-full lg:w-5/12 relative">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 glass-card p-2">
                  <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-cyan-500/20 blur-2xl z-0" />
                  {hero?.profileImageUrl ? (
                    <img
                      src={hero.profileImageUrl}
                      alt={hero.name}
                      className="w-full h-full object-cover rounded-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  ) : (
                    <div className="w-full h-full rounded-2xl bg-white/5 relative z-10 flex items-center justify-center">
                      <span className="text-white/20">No Image</span>
                    </div>
                  )}
                  
                  {/* Decorative Elements */}
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMiIvPgo8L3N2Zz4=')] rounded-full z-20 animate-spin-slow" />
                </div>
              </motion.div>

              {/* Right: Content */}
              <div className="w-full lg:w-7/12 pt-4">
                <motion.div variants={itemVariants} className="mb-6">
                  <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                    Behind the Code
                  </h1>
                  <h2 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-violet-400 to-cyan-400 text-transparent bg-clip-text">
                    {hero?.designation || "Full Stack Developer"}
                  </h2>
                </motion.div>

                <motion.div variants={itemVariants} className="prose prose-invert prose-lg max-w-none text-white/70 leading-relaxed mb-10">
                  <p>
                    {hero?.description || "I'm a passionate web developer dedicated to building polished, high-performance web applications that solve real business problems. With a strong foundation in the MERN stack and a keen eye for UI/UX design, I bridge the gap between backend architecture and frontend aesthetics."}
                  </p>
                  <p className="mt-4">
                    My approach is simple: write clean code, prioritize performance, and never compromise on user experience. Whether it's a complex SaaS dashboard or a sleek landing page, I bring the same level of dedication and craftsmanship to every project.
                  </p>
                </motion.div>

                {/* Quick Facts Grid */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-0.5">Location</p>
                      <p className="text-sm text-white/90 font-medium">{contact?.location || "Remote"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                      <Code2 size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-0.5">Specialty</p>
                      <p className="text-sm text-white/90 font-medium">MERN Stack & Next.js</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-0.5">Experience</p>
                      <p className="text-sm text-white/90 font-medium">3+ Years</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 shrink-0">
                      <Rocket size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-0.5">Availability</p>
                      <p className="text-sm text-white/90 font-medium">
                        {settings?.isAvailable ? "Open for work" : "Currently booked"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =========================================
            EXPERIENCE TIMELINE
            ========================================= */}
        {experience && experience.length > 0 && (
          <section className="py-24 relative">
            <div className="max-w-4xl mx-auto px-6 relative z-10">
              <SectionHeader
                badge="Experience"
                badgeIcon={Briefcase}
                title="Work History"
                subtitle="My professional journey and freelance experience."
              />
              
              <div className="mt-16 relative">
                {/* Timeline Line */}
                <div className="absolute left-[28px] md:left-[36px] top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-violet-500/30 to-transparent" />

                <div className="space-y-12">
                  {experience.map((exp, index) => (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: index * 0.1 }}
                      key={exp._id}
                      className="relative pl-20 md:pl-28"
                    >
                      {/* Timeline Node */}
                      <div className="absolute left-4 md:left-[22px] top-6 w-8 h-8 rounded-full border-4 border-[#0a0a0f] bg-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.4)] flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>

                      <div className="glass-card-premium p-6 md:p-8 border border-white/[0.05] bg-gradient-to-br from-white/[0.03] to-transparent hover:border-violet-500/30 transition-all duration-500 group">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-violet-300 transition-colors">
                              {exp.role}
                            </h3>
                            <h4 className="text-white/60 font-medium text-sm md:text-base mt-1">
                              {exp.company}
                            </h4>
                          </div>
                          <div className="shrink-0">
                            <span className="inline-block px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 font-bold text-xs tracking-wider uppercase">
                              {exp.startDate ? new Date(exp.startDate).getFullYear() : ""} - {exp.isCurrent ? "Present" : (exp.endDate ? new Date(exp.endDate).getFullYear() : "")}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-white/50 text-sm md:text-base leading-relaxed mb-6">
                          {exp.description}
                        </p>
                        
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <span key={tech} className="px-3 py-1 bg-white/[0.04] border border-white/10 text-white/70 rounded-md text-xs font-medium">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================
            EDUCATION TIMELINE
            ========================================= */}
        {education && education.length > 0 && (
          <section className="py-24 relative">
            <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
            
            <div className="max-w-4xl mx-auto px-6 relative z-10">
              <SectionHeader
                badge="Education"
                badgeIcon={GraduationCap}
                title="Academic Background"
                subtitle="Where I learned the foundations of computer science."
              />
              
              <div className="mt-16 relative">
                {/* Timeline Line */}
                <div className="absolute left-[28px] md:left-[36px] top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />

                <div className="space-y-12">
                  {education.map((edu, index) => (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: index * 0.1 }}
                      key={edu._id}
                      className="relative pl-20 md:pl-28"
                    >
                      {/* Timeline Node */}
                      <div className="absolute left-4 md:left-[22px] top-6 w-8 h-8 rounded-full border-4 border-[#0a0a0f] bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>

                      <div className="glass-card-premium p-6 md:p-8 border border-white/[0.05] bg-gradient-to-br from-white/[0.03] to-transparent hover:border-cyan-500/30 transition-all duration-500 group">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                              {edu.degree}
                            </h3>
                            <h4 className="text-white/60 font-medium text-sm md:text-base mt-1">
                              {edu.institution}
                            </h4>
                          </div>
                          <div className="shrink-0">
                            <span className="inline-block px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-bold text-xs tracking-wider uppercase">
                              {edu.year}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-white/50 text-sm md:text-base leading-relaxed">
                          {edu.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================
            SKILLS
            ========================================= */}
        <SkillsSection />

      </div>
    </PageLayout>
  );
}
