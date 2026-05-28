import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbX, TbBrandGithub, TbExternalLink } from "react-icons/tb";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#0f0f15] rounded-3xl shadow-[0_0_50px_rgba(139,92,246,0.15)] border border-white/10 overflow-hidden"
          >
            {/* Modal Header / Image Area */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white transition-all shadow-lg"
                aria-label="Close"
              >
                <TbX size={20} />
              </button>
              {project.imageUrl ? (
                <div className="w-full h-56 sm:h-72 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f15] to-transparent z-10" />
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="w-full h-32 bg-gradient-to-br from-[#1a1a24] to-[#0a0a0f] border-b border-white/5" />
              )}
            </div>

            {/* Scrollable Content Area */}
            <div className="p-6 sm:p-10 overflow-y-auto custom-scrollbar relative z-20 flex flex-col gap-6">
              
              {/* Header Info */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-violet-500/20 text-violet-300">
                    {project.category}
                  </span>
                  {project.year && (
                    <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-white/5 border border-white/10 text-white/70">
                      {project.year}
                    </span>
                  )}
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">{project.title}</h3>
              </div>

              {/* Description */}
              <div className="text-white/60 leading-relaxed text-sm sm:text-base">
                {project.description.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tech Stack */}
              {project.techStack?.length > 0 && (
                <div>
                  <h4 className="text-white/80 font-bold mb-3 text-sm tracking-wide uppercase">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/5 border border-white/5 text-white/70">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-2 pt-6 border-t border-white/5">
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-violet-50 transition-colors shadow-lg shadow-white/10"
                  >
                    <TbExternalLink size={20} /> Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 font-bold transition-colors"
                  >
                    <TbBrandGithub size={20} /> Source Code
                  </a>
                )}
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
