import { Link } from "react-router-dom";
import { memo, useMemo, useState, forwardRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbBriefcase, TbStar, TbExternalLink, TbBrandGithub } from "react-icons/tb";
import SectionHeader from "../components/ui/SectionHeader";
import ProjectModal from "../components/projects/ProjectModal";
import { usePortfolio } from "../hooks/usePortfolio";

const TABS = [
  { key: "all", label: "All Projects" },
  { key: "freelancing", label: "Client Work" },
  { key: "personal", label: "Personal" },
];

const ProjectCard = forwardRef(function ProjectCard({ project, onSelect }, ref) {
  return <motion.article ref={ref} layout initial={false} animate={{opacity:1,y:0}} exit={{opacity:0,scale:.97}} whileHover={{y:-5}} className="project-card relative flex flex-col overflow-hidden">
    <button type="button" className="project-card__trigger absolute inset-0 z-10" aria-haspopup="dialog" aria-label={`View ${project.title}`} onClick={() => onSelect(project)}><span className="sr-only">Open project details</span></button>
    <div className="project-card__media relative overflow-hidden">
      {project.imageUrl ? <img src={project.imageUrl} alt={project.title} loading="lazy" decoding="async" width="900" height="563" /> : <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-violet-100 via-indigo-50 to-cyan-100"><TbBriefcase size={38} className="text-violet-500"/><span className="text-sm font-semibold text-violet-800">{project.title.split(" — ")[0]}</span></div>}
      {project.featured && <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 text-violet-800 border border-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider shadow-sm"><TbStar size={12}/> Featured</span>}
      {project.year && <span className="absolute bottom-3 right-3 rounded-md bg-white/95 px-2 py-1 text-xs text-slate-700">{project.year}</span>}
    </div>
    <div className="p-6 md:p-7 flex flex-col flex-1">
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__description">{project.description}</p>
      <div className="project-card__stack">{(project.techStack || []).slice(0,4).map(tech=><span key={tech}>{tech}</span>)}{project.techStack?.length>4 && <span>+{project.techStack.length-4}</span>}</div>
      {(project.liveUrl || project.githubUrl) && <div className="relative z-20 flex gap-3 mt-auto">
        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-action project-action--primary" aria-label={`Open ${project.title} live site (new tab)`}><TbExternalLink size={17} aria-hidden="true"/>Live Site</a>}
        {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-action project-action--secondary" aria-label={`View ${project.title} on GitHub (new tab)`}><TbBrandGithub size={17} aria-hidden="true"/>GitHub</a>}
      </div>}
    </div>
  </motion.article>;
});

const MemoCard = memo(ProjectCard);

function ProjectsSection({ preview = false }) {
  const { projects = [], loading } = usePortfolio();
  const [tab, setTab] = useState("all");
  const [selected, setSelected] = useState(null);
  const closeModal = useCallback(() => setSelected(null), []);

  const filtered = useMemo(() => {
    const list = tab === "all" ? projects : projects.filter((p) => p.category === tab);
    return [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [projects, tab]);

  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center py-32 relative overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-violet-600/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <SectionHeader
          headingLevel={preview ? "h2" : "h1"}
          badge="Portfolio"
          badgeIcon={TbBriefcase}
          title="Selected Works"
          subtitle="Client websites and personal applications, with the tools and responsibilities behind each delivery."
        />

        <div className="flex flex-wrap justify-center gap-3 mb-16 scroll-reveal">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => {
                setTab(t.key);
              }}
              className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                tab === t.key
                  ? "bg-ink text-surface shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105"
                  : "bg-ink/5 text-ink/60 hover:bg-ink/10 hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          <AnimatePresence mode="popLayout">
            {loading ? (
              Array(6).fill(0).map((_, i) => (
                <motion.div
                  key={`skeleton-${i}`}
                  initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-[450px] rounded-3xl bg-ink/[0.02] border border-ink/5 animate-pulse"
                />
              ))
            ) : (
              filtered.slice(0, preview ? 3 : filtered.length).map((p) => (
                <MemoCard key={p._id} project={p} onSelect={setSelected} />
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {!loading && filtered.length === 0 && (
          <motion.div
            initial={false} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-ink/5 flex items-center justify-center mb-4">
              <TbBriefcase size={32} className="text-ink/20" />
            </div>
            <h3 className="text-xl font-bold text-ink mb-2">No projects found</h3>
            <p className="text-ink/50">Check back later for new work in this category.</p>
          </motion.div>
        )}
      </div>

      {preview && <div className="text-center mt-10"><Link className="inline-block px-7 py-3 rounded-xl bg-violet-600 font-semibold" to="/projects">Explore all projects →</Link></div>}
      <ProjectModal project={selected} onClose={closeModal} />
    </section>
  );
}

export default memo(ProjectsSection);
