import { memo, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { TbBriefcase, TbStar, TbExternalLink, TbBrandGithub, TbArrowRight } from "react-icons/tb";
import SectionHeader from "../components/ui/SectionHeader";
import ProjectModal from "../components/projects/ProjectModal";
import { usePortfolio } from "../context/PortfolioContext";

const TABS = [
  { key: "all", label: "All Projects" },
  { key: "freelancing", label: "Client Work" },
  { key: "personal", label: "Personal" },
];

function ProjectCard({ project, onSelect }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8 }}
      onClick={() => onSelect(project)}
      className="group relative flex flex-col rounded-3xl bg-[#0f0f15] border border-white/5 overflow-hidden cursor-pointer hover:border-violet-500/30 transition-all duration-500 shadow-lg hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]"
    >
      {/* Glow effect behind card */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/0 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Image Area */}
      <div className="relative h-60 w-full overflow-hidden bg-gradient-to-br from-[#1a1a24] to-[#0a0a0f]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f15] via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-violet-500/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700 z-10" />
        
        {project.imageUrl ? (
          <LazyLoadImage
            src={project.imageUrl}
            alt={project.title}
            effect="blur"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <TbBriefcase size={48} className="text-white/10" />
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
          <span className="absolute top-5 right-5 z-20 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-[10px] uppercase tracking-wider font-bold text-white border border-white/10">
            {project.year}
          </span>
        )}

        {/* Hover Overlay Button */}
        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20 backdrop-blur-[2px]">
           <div className="px-6 py-2.5 rounded-full bg-white text-black font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
             View<TbArrowRight size={18} />
           </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 md:p-8 flex-1 flex flex-col relative z-20">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors duration-300 flex items-center justify-between">
          {project.title}
          <TbExternalLink className="opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-violet-400" />
        </h3>
        
        <p className="text-white/50 text-sm md:text-base leading-relaxed line-clamp-2 flex-1 mb-6">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
          {(project.techStack || []).slice(0, 4).map((t) => (
            <span 
              key={t} 
              className="text-xs px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-300 border border-violet-500/20 font-semibold tracking-wide"
            >
              {t}
            </span>
          ))}
          {(project.techStack || []).length > 4 && (
            <span className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-white/40 border border-white/5 font-semibold">
              +{(project.techStack.length - 4)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const MemoCard = memo(ProjectCard);

function ProjectsSection() {
  const { projects = [], loading } = usePortfolio();
  const [tab, setTab] = useState("all");
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);

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
          badge="Portfolio"
          badgeIcon={TbBriefcase}
          title="Selected Works"
          subtitle="A collection of my best projects, highlighting Full Stack and MERN development."
        />

        <div className="flex flex-wrap justify-center gap-3 mb-16 scroll-reveal">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => {
                setTab(t.key);
                setShowAll(false);
              }}
              className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                tab === t.key
                  ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
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
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-[450px] rounded-3xl bg-white/[0.02] border border-white/5 animate-pulse" 
                />
              ))
            ) : (
              (showAll ? filtered : filtered.slice(0, 6)).map((p) => (
                <MemoCard key={p._id} project={p} onSelect={setSelected} />
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {!loading && filtered.length > 6 && !showAll && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-16"
          >
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white/[0.03] text-white font-bold border border-white/10 hover:bg-white hover:text-black transition-all duration-300"
            >
              View All Projects ({filtered.length})
              <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-black/10 flex items-center justify-center transition-colors">
                <TbArrowRight size={18} />
              </span>
            </button>
          </motion.div>
        )}

        {!loading && filtered.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <TbBriefcase size={32} className="text-white/20" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
            <p className="text-white/50">Check back later for new work in this category.</p>
          </motion.div>
        )}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

export default memo(ProjectsSection);
