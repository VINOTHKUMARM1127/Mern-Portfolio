import { motion } from "framer-motion";
import { TbUser } from "react-icons/tb";
import SectionHeader from "../components/ui/SectionHeader";
import { usePortfolio } from "../context/PortfolioContext";

export default function AboutSection() {
  const { about, hero, loading } = usePortfolio();

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="About"
          badgeIcon={TbUser}
          title={about?.title || "About Me"}
          subtitle={about?.subtitle || "Freelance developer focused on fast, polished web products."}
        />

        {loading ? (
          <div className="max-w-3xl mx-auto h-32 bg-white/5 rounded-2xl animate-pulse" />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 max-w-4xl mx-auto scroll-reveal"
          >
            <p className="text-lg text-white/70 leading-relaxed whitespace-pre-line">
              {about?.description || hero?.designation
                ? `I'm ${hero?.name || "a developer"} — ${about?.description || ""}`
                : "Add your about content in Sanity Studio."}
            </p>
            {about?.yearsOfExperience != null && (
              <p className="mt-6 text-violet-400 font-semibold">
                {about.yearsOfExperience}+ years of experience
              </p>
            )}
            {about?.highlights?.length > 0 && (
              <ul className="mt-8 grid sm:grid-cols-2 gap-3">
                {about.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-white/80 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
