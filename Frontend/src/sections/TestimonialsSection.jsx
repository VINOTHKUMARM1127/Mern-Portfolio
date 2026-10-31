import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbMessageCircle,
  TbChevronLeft,
  TbChevronRight,
  TbStarFilled,
  TbQuote,
} from "react-icons/tb";
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

  // Inject Review schema
  useEffect(() => {
    if (testimonials.length === 0) return;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "review-schema";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Vinoth Kumar M",
      url: "https://vinothkumarm27.vercel.app/",
      review: testimonials.map((t) => ({
        "@type": "Review",
        author: {
          "@type": "Person",
          name: t.clientName,
          jobTitle: t.clientRole,
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: t.rating || 5,
          bestRating: 5,
        },
        reviewBody: t.quote || t.reviewText,
      })),
    });

    const existing = document.getElementById("review-schema");
    if (existing) existing.remove();
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById("review-schema");
      if (el) el.remove();
    };
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
    <section
      className="min-h-screen flex flex-col justify-center py-24 relative overflow-hidden bg-[#0a0a0f]"
      aria-label="Client testimonials"
    >
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <SectionHeader
          badge="Reviews"
          badgeIcon={TbMessageCircle}
          title="Client Testimonials"
          subtitle="Feedback from clients who trusted me with their MERN stack and freelance projects."
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
                <div className="absolute top-6 right-8 text-white/5 pointer-events-none" aria-hidden="true">
                  <TbQuote size={80} />
                </div>

                {/* Client image / Initials fallback */}
                <div className="shrink-0 relative">
                  {current.imageUrl ? (
                    <img
                      src={current.imageUrl}
                      alt={current.clientName}
                      loading="lazy"
                      decoding="async"
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-violet-500/30 shadow-lg shadow-violet-500/20"
                    />
                  ) : (
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center font-bold text-white text-2xl border-2 border-violet-500/30 shadow-lg shadow-violet-500/20">
                      {getInitials(current.clientName)}
                    </div>
                  )}
                  <div
                    className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-violet-600 border border-white/10 flex items-center justify-center text-white text-[10px] font-bold"
                    aria-hidden="true"
                  >
                    ★
                  </div>
                </div>

                {/* Testimonial body */}
                <div className="flex-1 text-center md:text-left">
                  {/* Rating Stars */}
                  <div
                    className="flex justify-center md:justify-start gap-1 text-amber-400 mb-4"
                    aria-label={`Rating: ${current.rating || 5} out of 5 stars`}
                  >
                    {Array.from({ length: current.rating || 5 }).map((_, i) => (
                      <TbStarFilled key={i} size={16} />
                    ))}
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-base md:text-lg text-white/80 italic mb-6 leading-relaxed">
                    &ldquo;{current.quote || current.reviewText}&rdquo;
                  </blockquote>

                  {/* Client name and role */}
                  <div>
                    <h3 className="font-extrabold text-white text-base tracking-wide">
                      {current.clientName}
                    </h3>
                    <p className="text-xs uppercase font-bold tracking-widest text-cyan-400 mt-0.5">
                      {current.clientRole}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel controls with dots */}
        {testimonials.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() =>
                setIndex(
                  (p) =>
                    (p - 1 + testimonials.length) % testimonials.length
                )
              }
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10 text-white transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <TbChevronLeft size={18} />
            </motion.button>

            {/* Dot indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === index
                      ? "bg-violet-500 w-6"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() =>
                setIndex((p) => (p + 1) % testimonials.length)
              }
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10 text-white transition-all duration-300"
              aria-label="Next testimonial"
            >
              <TbChevronRight size={18} />
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}

export default memo(TestimonialsSection);
