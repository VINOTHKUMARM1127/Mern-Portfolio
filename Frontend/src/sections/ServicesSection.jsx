import { memo } from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Briefcase,
  Layers,
  Database,
  LayoutDashboard,
  Blocks,
  Webhook,
  MonitorSmartphone,
  GraduationCap,
  Globe,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import SectionHeader from "../components/ui/SectionHeader";

const services = [
  {
    id: 1,
    title: "Landing Page Development",
    description:
      "High-converting, modern landing pages that capture leads and drive business growth for startups and enterprises.",
    icon: Monitor,
    popular: false,
  },
  {
    id: 2,
    title: "Portfolio Website Development",
    description:
      "Premium portfolio websites that showcase your work and attract international clients and recruiters.",
    icon: Briefcase,
    popular: false,
  },
  {
    id: 3,
    title: "Full Stack Web Applications",
    description:
      "Complete frontend and backend solutions with database integration, authentication, and cloud deployment.",
    icon: Layers,
    popular: true,
  },
  {
    id: 4,
    title: "MERN Stack Development",
    description:
      "Custom MERN stack applications built with MongoDB, Express.js, React, and Node.js for maximum performance.",
    icon: Database,
    popular: true,
  },
  {
    id: 5,
    title: "Admin Panel Development",
    description:
      "Powerful dashboard systems with real-time analytics, user management, and role-based access control.",
    icon: LayoutDashboard,
    popular: false,
  },
  {
    id: 6,
    title: "CMS Integration",
    description:
      "Seamless content management with Sanity, Strapi, or custom CMS solutions for dynamic website content.",
    icon: Blocks,
    popular: false,
  },
  {
    id: 7,
    title: "API & Backend Integration",
    description:
      "REST API development, payment gateway setup, third-party integrations, and real-time data synchronization.",
    icon: Webhook,
    popular: false,
  },
  {
    id: 8,
    title: "Responsive UI Development",
    description:
      "Pixel-perfect, mobile-first interfaces optimized for every screen size with smooth micro-interactions.",
    icon: MonitorSmartphone,
    popular: false,
  },
  {
    id: 9,
    title: "Final Year Projects",
    description:
      "Complete academic project development with documentation, deployment, and source code support.",
    icon: GraduationCap,
    popular: false,
  },
  {
    id: 10,
    title: "Freelance Web Solutions",
    description:
      "End-to-end contract development with fast turnaround, transparent pricing, and post-delivery support.",
    icon: Globe,
    popular: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

function ServicesSection() {
  return (
    <section
      id="services"
      className="min-h-screen flex flex-col justify-center py-24 relative overflow-hidden bg-[#0a0a0f]"
      aria-label="Services offered"
    >
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <SectionHeader
          badge="Services"
          badgeIcon={Sparkles}
          title="What I Offer"
          subtitle="Professional web development services tailored to your business needs."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-12"
        >
          {services.map((service) => {
            const IconComp = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group relative flex flex-col h-full p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-violet-500/30 hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden backdrop-blur-sm"
              >
                {/* Popular badge */}
                {service.popular && (
                  <span className="absolute top-4 right-4 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-amber-500 to-orange-400 text-black">
                    Popular
                  </span>
                )}

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-transparent to-transparent group-hover:from-violet-500/5 transition-colors duration-500 pointer-events-none" aria-hidden="true" />

                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-violet-400 mb-5 group-hover:bg-violet-500/20 group-hover:border-violet-500/50 group-hover:text-violet-300 group-hover:scale-110 transition-all duration-300 shadow-lg relative z-10">
                  <IconComp className="w-6 h-6 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                </div>

                <div className="flex flex-col flex-grow relative z-10">
                  <h3 className="text-lg font-semibold text-white/90 mb-3 group-hover:text-violet-300 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mt-auto mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400/70 group-hover:text-violet-400 transition-colors">
                    Learn more
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default memo(ServicesSection);
