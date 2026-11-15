import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";
import { usePortfolio } from "../hooks/usePortfolio";
import WhyHireMeSection from "../sections/WhyHireMeSection";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Services() {
  const { services = [] } = usePortfolio();

  return (
    <PageLayout>
      <div className="pt-32 pb-12 bg-surface relative overflow-hidden">
        {/* Ambient Background Glows */}

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h1 
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black text-ink mb-6 tracking-tight"
            >
              Web Development <span className="bg-gradient-to-r from-violet-400 to-cyan-400 text-transparent bg-clip-text">Services</span>
            </motion.h1>
            <motion.p 
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-ink/60 leading-relaxed"
            >
              Responsive interfaces, editable business websites and database-driven applications, with clear scope and realistic delivery timelines.
            </motion.p>
          </div>

          {/* Detailed Services Grid */}
          <motion.div
            variants={containerVariants}
            initial={false}
            animate="show"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24"
          >
            {services.map((service) => (
              <motion.div
                key={service._id}
                id={service._id}
                variants={cardVariants}
                className="group relative flex flex-col p-8 md:p-10 rounded-[2rem] border border-ink/5 bg-gradient-to-br from-ink/[0.03] to-transparent hover:border-violet-500/30 transition-all duration-500 overflow-hidden"
              >
                {/* Popular Badge */}
                {service.isPopular && (
                  <div className="absolute top-0 right-8 bg-gradient-to-b from-amber-500 to-orange-500 text-black text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-b-xl shadow-lg shadow-orange-500/20">
                    Most Popular
                  </div>
                )}

                {/* Hover Ambient Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-transparent to-transparent group-hover:from-violet-500/5 transition-colors duration-500 pointer-events-none" />

                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-ink/5 border border-ink/10 flex items-center justify-center shrink-0 group-hover:bg-violet-500/20 group-hover:border-violet-500/40 group-hover:scale-110 transition-all duration-500 shadow-lg">
                    {service.icon ? (
                      <Code2 aria-hidden="true" className="text-3xl text-violet-400" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-violet-400" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-ink mb-2 group-hover:text-violet-300 transition-colors">
                      {service.title}
                    </h2>
                    <div className="inline-block px-3 py-1 rounded-lg bg-ink/5 border border-ink/10 text-cyan-400 text-xs font-bold tracking-wider uppercase">
                      {service.price}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-ink/60 leading-relaxed mb-8 relative z-10 text-sm md:text-base">
                  {service.description}
                </p>

                {/* Divider */}
                <div className="w-full h-px bg-ink/5 mb-8 relative z-10" />

                {/* Features List */}
                <div className="flex-grow mb-8 relative z-10">
                  <h4 className="text-sm font-bold text-ink uppercase tracking-wider mb-4">
                    What's Included:
                  </h4>
                  <ul className="space-y-3">
                    {service.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-ink/70 text-sm md:text-base">
                        <CheckCircle2 size={20} className="text-violet-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Link
                  to={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="relative z-10 w-full py-4 rounded-xl border border-ink/10 bg-ink/[0.02] hover:bg-violet-600 hover:border-violet-500 text-ink font-bold tracking-wide flex items-center justify-center gap-2 transition-all duration-300 group/btn"
                >
                  Request this Service
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Trust & Process Section appended */}
        <WhyHireMeSection />
      </div>
    </PageLayout>
  );
}
