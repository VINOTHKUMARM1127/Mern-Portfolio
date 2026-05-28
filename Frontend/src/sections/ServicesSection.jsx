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
  Sparkles
} from "lucide-react";
import SectionHeader from "../components/ui/SectionHeader";

const services = [
  {
    id: 1,
    title: "Landing Page Development",
    description: "Modern responsive landing pages for businesses, startups, and products.",
    icon: Monitor
  },
  {
    id: 2,
    title: "Portfolio Website Development",
    description: "Professional portfolio websites for developers, freelancers, and creators.",
    icon: Briefcase
  },
  {
    id: 3,
    title: "Full Stack Web Applications",
    description: "Complete frontend and backend web applications with database integration.",
    icon: Layers
  },
  {
    id: 4,
    title: "MERN Stack Development",
    description: "Custom MERN stack applications using MongoDB, Express.js, React, and Node.js.",
    icon: Database
  },
  {
    id: 5,
    title: "Admin Panel Development",
    description: "Dashboard systems with analytics, management, and authentication features.",
    icon: LayoutDashboard
  },
  {
    id: 6,
    title: "CMS Integration",
    description: "Dynamic website connectivity with CMS and content management systems.",
    icon: Blocks
  },
  {
    id: 7,
    title: "API & Backend Integration",
    description: "REST API integration, payment gateway setup, and backend connectivity.",
    icon: Webhook
  },
  {
    id: 8,
    title: "Responsive UI Development",
    description: "Mobile-friendly interfaces optimized for all devices and screen sizes.",
    icon: MonitorSmartphone
  },
  {
    id: 9,
    title: "Final Year Projects",
    description: "Custom academic projects with deployment and source code support.",
    icon: GraduationCap
  },
  {
    id: 10,
    title: "Freelance Web Solutions",
    description: "Complete freelance website development with fast delivery and support.",
    icon: Globe
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};

function ServicesSection() {
  return (
    <section id="services" className="min-h-screen flex flex-col justify-center py-24 relative overflow-hidden bg-[#0a0a0f]">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <SectionHeader
          badge="Services"
          badgeIcon={Sparkles}
          title="Services"
          subtitle="What I Provide"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-12"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group flex flex-col h-full p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-violet-500/30 hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden backdrop-blur-sm"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-transparent to-transparent group-hover:from-violet-500/5 transition-colors duration-500" />
                
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-violet-400 mb-6 group-hover:bg-violet-500/20 group-hover:border-violet-500/50 group-hover:text-violet-300 group-hover:scale-110 transition-all duration-300 shadow-lg relative z-10">
                  <Icon className="w-6 h-6 shrink-0" strokeWidth={1.5} />
                </div>
                
                <div className="flex flex-col flex-grow relative z-10">
                  <h3 className="text-lg font-semibold text-white/90 mb-3 group-hover:text-violet-300 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mt-auto">
                    {service.description}
                  </p>
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
