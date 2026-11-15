import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbX, TbBrandGithub, TbExternalLink } from "react-icons/tb";

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    if (!project) return;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = () => [...(dialogRef.current?.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]') || [])];
    focusable()[0]?.focus();
    const keydown = (event) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); }
      if (event.key === "Tab") {
        const items = focusable(), first = items[0], last = items.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", keydown);
    return () => { document.body.style.overflow = overflow; document.removeEventListener("keydown", keydown); previous?.focus(); };
  }, [project, onClose]);

  if (typeof document === "undefined") return null;
  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.18 }}
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-panel rounded-3xl shadow-[0_0_50px_rgba(139,92,246,0.15)] border border-ink/10 overflow-hidden"
          >
            {/* Modal Header / Image Area */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-ink/10 text-ink transition-all shadow-lg"
                aria-label="Close"
              >
                <TbX size={20} />
              </button>
              {project.imageUrl ? (
                <div className="w-full h-56 sm:h-72 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-panel to-transparent z-10" />
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="w-full h-32 bg-gradient-to-br from-[#1a1a24] to-panel border-b border-ink/5" />
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
                    <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-ink/5 border border-ink/10 text-ink/70">
                      {project.year}
                    </span>
                  )}
                </div>
                <h3 id="project-dialog-title" className="text-3xl sm:text-4xl font-extrabold text-ink mb-2">{project.title}</h3>
              </div>

              {/* Description */}
              <div className="text-ink/60 leading-relaxed text-sm sm:text-base">
                {(project.description || '').split('\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tech Stack */}
              {project.techStack?.length > 0 && (
                <div>
                  <h4 className="text-ink/80 font-bold mb-3 text-sm tracking-wide uppercase">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-ink/5 border border-ink/5 text-ink/70">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-2 pt-6 border-t border-ink/5">
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-action project-action--primary"
                  >
                    <TbExternalLink size={20} /> Live Site
                  </a>
                )}
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-action project-action--secondary"
                  >
                    <TbBrandGithub size={20} /> GitHub
                  </a>
                )}
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>, document.body
  );
}
