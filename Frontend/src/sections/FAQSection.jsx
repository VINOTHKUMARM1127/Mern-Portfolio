import { memo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbChevronDown, TbHelpCircle } from "react-icons/tb";
import SectionHeader from "../components/ui/SectionHeader";
import { faqData } from "../data/staticData";

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-white/[0.06] rounded-2xl overflow-hidden bg-white/[0.02] hover:border-white/[0.1] transition-colors duration-300"
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] rounded-2xl"
        aria-expanded={isOpen}
      >
        <h3 className="text-base md:text-lg font-semibold text-white/90 pr-4">
          {faq.question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50"
        >
          <TbChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-sm md:text-base text-white/60 leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FAQSection() {
  const [openId, setOpenId] = useState(null);

  // Inject FAQ JSON-LD schema
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "faq-schema";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });

    // Remove existing if any
    const existing = document.getElementById("faq-schema");
    if (existing) existing.remove();

    document.head.appendChild(script);
    return () => {
      const el = document.getElementById("faq-schema");
      if (el) el.remove();
    };
  }, []);

  return (
    <section
      id="faq"
      className="py-24 relative overflow-hidden bg-[#0a0a0f]"
      aria-label="Frequently asked questions"
    >
      {/* Background */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <SectionHeader
          badge="FAQ"
          badgeIcon={TbHelpCircle}
          title="Frequently Asked Questions"
          subtitle="Quick answers to common questions about my services and process."
        />

        <div className="flex flex-col gap-4">
          {faqData.map((faq) => (
            <FAQItem
              key={faq._id}
              faq={faq}
              isOpen={openId === faq._id}
              onToggle={() =>
                setOpenId((prev) => (prev === faq._id ? null : faq._id))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(FAQSection);
