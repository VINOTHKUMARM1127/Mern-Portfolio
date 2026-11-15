import { Link } from "react-router-dom";
import { memo, useMemo, useState, forwardRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbBriefcase, TbStar, TbExternalLink, TbArrowRight } from "react-icons/tb";
import SectionHeader from "../components/ui/SectionHeader";
import ProjectModal from "../components/projects/ProjectModal";
import { usePortfolio } from "../hooks/usePortfolio";

const TABS = [
  { key: "all", label: "All Projects" },
  { key: "freelancing", label: "Client Work" },
  { key: "personal", label: "Personal" },
];

const ProjectCard = forwardRef(function ProjectCard({ project, onSelect }, ref) {
  return (
    <motion.article
      ref={ref}
      layout
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8 }}
      onClick={(event) => { if (!event.target.closest("a,button")) onSelect(project); }}
      className="group relative flex flex-col rounded-3xl bg-panel border border-ink/5 overflow-hidden cursor-pointer hover:border-violet-500/30 transition-all duration-500 shadow-lg hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]"
    >
      {/* Glow effect behind card */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/0 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Image Area */}
      <div className="relative h-60 w-full overflow-hidden bg-gradient-to-br from-[#1a1a24] to-panel">
        <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-violet-500/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700 z-10" />

        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            loading="lazy"
            decoding="async"
            width="900"
            height="506"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <TbBriefcase size={48} className="text-ink/10" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-5 left-5 z-20 flex flex-col gap-2">
          {project.featured && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-400 text-black text-[10px] uppercase tracking-wider font-extrabold shadow-lg shadow-amber-500/25">
              <TbStar size={12} className="fill-black" /> Featured
            </span>
          )}
        </div>

        {project.year && (
          <span className="absolute top-5 right-5 z-20 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-[10px] uppercase tracking-wider font-bold text-ink border border-ink/10">
            {project.year}
          </span>
        )}

        {/* Hover Overlay Button */}
        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20 backdrop-blur-[2px]">
           <div className="px-6 py-2.5 rounded-full bg-ink text-surface font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
             View<TbArrowRight size={18} />
           </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 md:p-8 flex-1 flex flex-col relative z-20">
        <h3 className="text-xl md:text-2xl font-bold text-ink mb-3 group-hover:text-violet-400 transition-colors duration-300 flex items-center justify-between">
          {project.title}
          <TbExternalLink className="opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-violet-400" />
        </h3>

        <p className="text-ink/50 text-sm md:text-base leading-relaxed line-clamp-2 flex-1 mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-4 mb-5"><button type="button" aria-haspopup="dialog" aria-label={`View ${project.title}`} onClick={() => onSelect(project)} className="text-violet-300 underline underline-offset-4 font-semibold">Project details</button>{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-ink/70 underline underline-offset-4">Open live site<span className="sr-only"> for {project.title} (new tab)</span></a>}</div>
        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-ink/5">
          {(project.techStack || []).slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-xs px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-300 border border-violet-500/20 font-semibold tracking-wide"
            >
              {t}
            </span>
          ))}
          {(project.techStack || []).length > 4 && (
            <span className="text-xs px-3 py-1.5 rounded-lg bg-ink/5 text-ink/40 border border-ink/5 font-semibold">
              +{(project.techStack.length - 4)}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
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
