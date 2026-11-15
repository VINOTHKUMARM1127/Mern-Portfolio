import { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbMessageCircle,
  TbChevronLeft,
  TbChevronRight,
  TbStarFilled,
  TbQuote,
  TbArrowRight,
} from "react-icons/tb";
import SectionHeader from "../components/ui/SectionHeader";
import { usePortfolio } from "../hooks/usePortfolio";

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
  }, [testimonials.length]);

  // Keep index within bounds if testimonials list changes
  useEffect(() => {
    if (index >= testimonials.length && testimonials.length > 0) {
      setIndex(testimonials.length - 1);
    }
  }, [testimonials.length, index]);

  // Inject Review schema for approved reviews only
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
          ratingValue: Math.max(1, Math.min(5, Math.round(Number(t.rating) || 5))),
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
      <section className="section-block relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-[250px] glass-card animate-pulse rounded-2xl" />
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  // Safe index and rating clamping
  const safeIndex = Math.min(Math.max(0, index), testimonials.length - 1);
  const current = testimonials[safeIndex];
  const safeRating = Math.max(1, Math.min(5, Math.round(Number(current?.rating) || 5)));

  // Calculate average rating
  const reviewCount = testimonials.length;
  const avgRating =
    reviewCount > 0
      ? (
          testimonials.reduce(
            (acc, t) => acc + Math.max(1, Math.min(5, Number(t.rating) || 5)),
            0
          ) / reviewCount
        ).toFixed(1)
      : "5.0";

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
      id="testimonials"
      className="section-block relative"
      aria-label="Client testimonials"
    >
      {/* Background glow */}

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <SectionHeader
          badge="Reviews"
          badgeIcon={TbMessageCircle}
          title="Client Testimonials"
          subtitle="Feedback from clients I have worked with on website projects."
        />

        {/* Average Rating + Count summary (shown when 2+ reviews exist) */}
        {reviewCount >= 2 && (
          <div className="flex items-center justify-center -mt-6 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ink/[0.03] border border-ink/10 text-xs text-ink/80 backdrop-blur-md shadow-sm">
              <div className="flex items-center gap-1 text-amber-400">
                <TbStarFilled size={13} />
                <span className="font-bold text-ink text-xs">{avgRating}</span>
                <span className="text-ink/40">/ 5.0</span>
              </div>
              <span className="text-ink/30">·</span>
              <span className="text-ink/70 font-medium">
                Based on {reviewCount} client reviews
              </span>
            </div>
          </div>
        )}

        <div className="relative min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current?._id || safeIndex}
              initial={false}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full"
            >
              <div className="glass-card-premium p-8 md:p-12 relative flex flex-col md:flex-row items-center gap-8 border border-ink/5 bg-gradient-to-tr from-ink/[0.02] to-transparent">
                {/* Large decorative quotation mark */}
                <div className="absolute top-6 right-8 text-ink/5 pointer-events-none" aria-hidden="true">
                  <TbQuote size={80} />
                </div>

                {/* Client image / Initials fallback */}
                <div className="shrink-0 relative">
                  {current?.imageUrl ? (
                    <img
                      src={current.imageUrl}
                      alt={current.clientName}
                      loading="lazy"
                      decoding="async"
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-violet-500/30 shadow-lg shadow-violet-500/20"
                    />
                  ) : (
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center font-bold text-ink text-2xl border-2 border-violet-500/30 shadow-lg shadow-violet-500/20">
                      {getInitials(current?.clientName)}
                    </div>
                  )}
                  <div
                    className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-violet-600 border border-ink/10 flex items-center justify-center text-ink text-[10px] font-bold"
                    aria-hidden="true"
                  >
                    ★
                  </div>
                </div>

                {/* Testimonial body */}
                <div className="flex-1 text-center md:text-left">
                  {/* Rating Stars (clamped 1-5 safely) */}
                  <div
                    className="flex justify-center md:justify-start gap-1 text-amber-400 mb-4"
                    aria-label={`Rating: ${safeRating} out of 5 stars`}
                  >
                    {Array.from({ length: safeRating }).map((_, i) => (
                      <TbStarFilled key={i} size={16} />
                    ))}
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-base md:text-lg text-ink/80 italic mb-6 leading-relaxed">
                    &ldquo;{current?.quote || current?.reviewText}&rdquo;
                  </blockquote>

                  {/* Client name and role */}
                  <div>
                    <h3 className="font-extrabold text-ink text-base tracking-wide">
                      {current?.clientName}
                    </h3>
                    <p className="text-xs uppercase font-bold tracking-widest text-cyan-400 mt-0.5">
                      {current?.clientRole}
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
              className="p-3 rounded-full bg-ink/5 border border-ink/10 hover:border-violet-500/50 hover:bg-violet-500/10 text-ink transition-all duration-300"
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
                    i === safeIndex
                      ? "bg-violet-500 w-6"
                      : "bg-ink/20 hover:bg-ink/40"
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
              className="p-3 rounded-full bg-ink/5 border border-ink/10 hover:border-violet-500/50 hover:bg-violet-500/10 text-ink transition-all duration-300"
              aria-label="Next testimonial"
            >
              <TbChevronRight size={18} />
            </motion.button>
          </div>
        )}

        {/* Subtle "Leave a review" link */}
        <div className="flex justify-center mt-10">
          <Link
            to="/review"
            className="group inline-flex items-center gap-2 text-xs font-medium text-ink/50 hover:text-cyan-400 transition-all duration-300 py-1.5 px-4 rounded-full border border-ink/5 hover:border-cyan-500/30 hover:bg-ink/[0.02]"
          >
            <span>Worked with me on a project?</span>
            <span className="font-semibold text-ink/70 group-hover:text-cyan-300 inline-flex items-center gap-1 underline underline-offset-4 decoration-white/20 group-hover:decoration-cyan-400/50">
              Leave a review <TbArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default memo(TestimonialsSection);

