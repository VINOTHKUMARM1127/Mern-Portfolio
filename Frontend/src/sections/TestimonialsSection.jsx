import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbMessageCircle, TbChevronLeft, TbChevronRight, TbStarFilled, TbQuote } from "react-icons/tb";
import SectionHeader from "../components/ui/SectionHeader";
import { usePortfolio } from "../context/PortfolioContext";

function TestimonialsSection() {
  const { testimonials = [], loading } = usePortfolio();
  const [index, setIndex] = useState(0);

  // Auto-scroll testimonials
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const t = setInterval(() => {
      setIndex((p) => (p + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(t);
  }, [testimonials]);

  if (loading) {
    return (
      <section className="min-h-screen flex flex-col justify-center py-24 relative bg-[#0a0a0f]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-[250px] glass-card animate-pulse rounded-2xl" />
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  const current = testimonials[index];

  // Helper to extract initials
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <section className="min-h-screen flex flex-col justify-center py-24 relative overflow-hidden bg-[#0a0a0f]">
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <SectionHeader
          badge="Reviews"
          badgeIcon={TbMessageCircle}
          title="Client Testimonials"
          subtitle="Feedback from clients and collaborators on delivered MERN stack and freelance solutions."
        />

        <div className="relative min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current._id || index}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full"
            >
              <div className="glass-card-premium p-8 md:p-12 relative flex flex-col md:flex-row items-center gap-8 border border-white/5 bg-gradient-to-tr from-white/[0.02] to-transparent">
                {/* Large decorative quotation mark */}
                <div className="absolute top-6 right-8 text-white/5 pointer-events-none">
                  <TbQuote size={80} />
                </div>

                {/* Client image / Initials fallback */}
                <div className="shrink-0 relative">
                  {current.imageUrl ? (
                    <img
                      src={current.imageUrl}
                      alt={current.clientName}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-violet-500/30 shadow-lg shadow-violet-500/20"
                    />
                  ) : (
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center font-bold text-white text-2xl border-2 border-violet-500/30 shadow-lg shadow-violet-500/20">
                      {getInitials(current.clientName)}
                    </div>
                  )}
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-violet-600 border border-white/10 flex items-center justify-center text-white text-[10px] font-bold">
                    ★
                  </div>
                </div>

                {/* Testimonial body */}
                <div className="flex-1 text-center md:text-left">
                  {/* Rating Stars */}
                  <div className="flex justify-center md:justify-start gap-1 text-amber-400 mb-4">
                    {Array.from({ length: current.rating || 5 }).map((_, i) => (
                      <TbStarFilled key={i} size={16} />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-base md:text-lg text-white/80 italic mb-6 leading-relaxed line-clamp-3">
                    "{current.quote || current.reviewText}"
                  </p>

                  {/* Client name and role */}
                  <div>
                    <h4 className="font-extrabold text-white text-base tracking-wide">
                      {current.clientName}
                    </h4>
                    <p className="text-xs uppercase font-bold tracking-widest text-cyan-400 mt-0.5">
                      {current.clientRole}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel controls */}
        {testimonials.length > 1 && (
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => setIndex((p) => (p - 1 + testimonials.length) % testimonials.length)}
              className="p-3.5 rounded-full bg-white/5 border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10 text-white transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <TbChevronLeft size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => setIndex((p) => (p + 1) % testimonials.length)}
              className="p-3.5 rounded-full bg-white/5 border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10 text-white transition-all duration-300"
              aria-label="Next testimonial"
            >
              <TbChevronRight size={20} />
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}

export default memo(TestimonialsSection);
