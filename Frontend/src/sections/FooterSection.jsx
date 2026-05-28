import { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbBrandTwitter,
  TbBrandInstagram,
  TbBrandFacebook,
  TbBrandWhatsapp,
} from "react-icons/tb";
import { Mail, MapPin, ArrowUp, Sparkles, Send } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

function FooterSection() {
  const { site, social, contact, hero } = usePortfolio();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Work", path: "/projects" },
    { label: "Services", path: "/services" },
    { label: "Contact", path: "/contact" },
  ];

  const servicesLinks = [
    { label: "Web Development", path: "/services" },
    { label: "MERN Stack", path: "/services" },
    { label: "UI/UX Design", path: "/services" },
    { label: "API Integration", path: "/services" },
    { label: "Freelance Services", path: "/services" },
  ];

  const socialLinks = [
    { icon: TbBrandGithub, href: social?.github, label: "GitHub", hoverClass: "hover:text-white hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]" },
    { icon: TbBrandLinkedin, href: social?.linkedin, label: "LinkedIn", hoverClass: "hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/30 hover:shadow-[0_0_15px_rgba(10,102,194,0.2)]" },
    { icon: TbBrandFacebook, href: social?.facebook, label: "Facebook", hoverClass: "hover:text-[#1877F2] hover:bg-[#1877F2]/10 hover:border-[#1877F2]/30 hover:shadow-[0_0_15px_rgba(24,119,242,0.2)]" },
    { icon: TbBrandInstagram, href: social?.instagram, label: "Instagram", hoverClass: "hover:text-[#E1306C] hover:bg-[#E1306C]/10 hover:border-[#E1306C]/30 hover:shadow-[0_0_15px_rgba(225,48,108,0.2)]" },
    { icon: TbBrandTwitter, href: social?.twitter, label: "Twitter", hoverClass: "hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2]/30 hover:shadow-[0_0_15px_rgba(29,161,242,0.2)]" },
    { icon: TbBrandWhatsapp, href: social?.whatsapp ? `https://wa.me/${social.whatsapp}` : null, label: "WhatsApp", hoverClass: "hover:text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366]/30 hover:shadow-[0_0_15px_rgba(37,211,102,0.2)]" },
  ].filter((l) => l.href);

  return (
    <footer className="relative pt-32 pb-12 bg-[#0a0a0f] overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 flex flex-col items-start gap-6">
            <h3 className="text-3xl font-black text-white tracking-widest bg-gradient-to-r from-white to-white/70 bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-violet-400 hover:to-cyan-400 transition-all duration-300 flex items-center gap-2">
              <Sparkles className="text-violet-400" size={28} />
              {site?.logoText || "DEVFOLIO"}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              {site?.siteDescription || "Crafting premium Full Stack and MERN applications with custom designs, clean codebases, and seamless integrations. Let's build something amazing together."}
            </p>
            
            {/* Social Icons */}
            <div className="flex flex-wrap gap-3 mt-2">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.05 }}
                  className={`w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/40 transition-all duration-300 ${s.hoverClass}`}
                  aria-label={s.label}
                >
                  <s.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6 flex flex-col gap-6">
            <h4 className="text-sm font-bold tracking-widest text-white uppercase">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="text-white/50 hover:text-violet-400 text-sm w-fit transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500/50 scale-0 group-hover:scale-100 transition-transform duration-300" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h4 className="text-sm font-bold tracking-widest text-white uppercase">
              Services
            </h4>
            <div className="flex flex-col gap-3">
              {servicesLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="text-white/50 hover:text-cyan-400 text-sm w-fit transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 scale-0 group-hover:scale-100 transition-transform duration-300" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Contact Info */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h4 className="text-sm font-bold tracking-widest text-white uppercase">
              Contact Info
            </h4>
            <div className="flex flex-col gap-4 text-sm text-white/50">
              {contact?.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-start gap-3 hover:text-white transition-colors group p-3 -ml-3 rounded-xl hover:bg-white/[0.02] border border-transparent hover:border-white/5"
                >
                  <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 group-hover:bg-violet-500/20 group-hover:scale-110 transition-all duration-300">
                    <Mail size={18} className="text-violet-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-white/40 mb-1">Email Me</span>
                    <span className="font-medium text-white/80">{contact.email}</span>
                  </div>
                </a>
              )}
              {contact?.location && (
                <div className="flex items-start gap-3 p-3 -ml-3 rounded-xl border border-transparent">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-cyan-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-white/40 mb-1">Location</span>
                    <span className="font-medium text-white/80">{contact.location}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Call to action card */}
        <div className="relative rounded-3xl bg-gradient-to-br from-violet-600/10 to-cyan-600/10 border border-white/10 p-8 md:p-12 mb-16 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-sm">
          {/* Subtle noise pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 pointer-events-none" />
          
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Ready to start a project?</h2>
            <p className="text-white/60">Let's build something extraordinary together. Available for freelance opportunities.</p>
          </div>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-bold tracking-wide hover:bg-violet-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Let's Talk <Send size={18} />
            </motion.button>
          </Link>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-white/5">
          <p className="text-white/40 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} {site?.siteTitle || hero?.name || "Portfolio"}. All rights reserved.
          </p>
          <motion.button
            whileHover={{ y: -3 }}
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/40 hover:text-white text-sm font-semibold uppercase tracking-wider bg-white/5 hover:bg-white/10 border border-white/5 px-5 py-2.5 rounded-xl transition-all duration-300"
          >
            Back to Top <ArrowUp size={16} className="animate-bounce" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

export default memo(FooterSection);
