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
import { Mail, Phone, MapPin, ArrowUp, Sparkles, Send } from "lucide-react";
import { usePortfolio } from "../hooks/usePortfolio";
import { getWhatsAppUrl } from "../utils/contactUtils";

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
    { label: "CMS Websites", path: "/services" },
    { label: "API Integration", path: "/services" },
    { label: "Freelance Services", path: "/services" },
  ];

  const socialLinks = [
    { icon: TbBrandGithub, href: social?.github, label: "GitHub", hoverClass: "hover:text-ink hover:bg-ink/10 hover:border-ink/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]" },
    { icon: TbBrandLinkedin, href: social?.linkedin, label: "LinkedIn", hoverClass: "hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/30 hover:shadow-[0_0_15px_rgba(10,102,194,0.2)]" },
    { icon: TbBrandFacebook, href: social?.facebook, label: "Facebook", hoverClass: "hover:text-[#1877F2] hover:bg-[#1877F2]/10 hover:border-[#1877F2]/30 hover:shadow-[0_0_15px_rgba(24,119,242,0.2)]" },
    { icon: TbBrandInstagram, href: social?.instagram, label: "Instagram", hoverClass: "hover:text-[#E1306C] hover:bg-[#E1306C]/10 hover:border-[#E1306C]/30 hover:shadow-[0_0_15px_rgba(225,48,108,0.2)]" },
    { icon: TbBrandTwitter, href: social?.twitter, label: "Twitter", hoverClass: "hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2]/30 hover:shadow-[0_0_15px_rgba(29,161,242,0.2)]" },
    { icon: TbBrandWhatsapp, href: getWhatsAppUrl(social?.whatsapp || contact?.phone || "+919344842329", ""), label: "WhatsApp", hoverClass: "hover:text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366]/30 hover:shadow-[0_0_15px_rgba(37,211,102,0.2)]" },
  ].filter((l) => l.href);

  return (
    <footer className="portfolio-footer relative pt-10 pb-8" role="contentinfo">
      {/* Background ambient glows */}
      
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* CTA Banner (Moved to top of footer) */}
        <div className="footer-cta relative flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Subtle noise pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 pointer-events-none" />
          
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-black text-ink mb-3">Ready to start a project?</h2>
            <p className="text-ink/70 text-lg max-w-xl">Have a website or application in mind? Let's discuss the scope and timeline.</p>
          </div>
          <Link to="/contact" className="site-button site-button--primary footer-talk">Let's Talk <Send size={18} aria-hidden="true"/></Link>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-10">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 flex flex-col items-start gap-6">
            <h3 className="text-3xl font-black text-ink tracking-widest bg-gradient-to-r from-ink to-ink/70 bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-violet-400 hover:to-cyan-400 transition-all duration-300 flex items-center gap-2">
              <Sparkles className="text-violet-400" size={28} />
              {site?.logoText || "DEVFOLIO"}
            </h3>
            <p className="text-ink/70 text-sm leading-relaxed max-w-sm">
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
                  className={`w-10 h-10 rounded-xl bg-ink/[0.02] border border-ink/5 flex items-center justify-center text-ink/60 transition-all duration-300 ${s.hoverClass}`}
                  aria-label={s.label}
                >
                  <s.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6 flex flex-col gap-6">
            <h3 className="text-sm font-bold tracking-widest text-ink uppercase">
              Quick Links
            </h3>
            <div className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  title={`Navigate to ${link.label} page`}
                  className="text-ink/70 hover:text-violet-400 text-sm w-fit transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500/50 scale-0 group-hover:scale-100 transition-transform duration-300" aria-hidden="true" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h3 className="text-sm font-bold tracking-widest text-ink uppercase">
              Services
            </h3>
            <div className="flex flex-col gap-3">
              {servicesLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="text-ink/70 hover:text-cyan-400 text-sm w-fit transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 scale-0 group-hover:scale-100 transition-transform duration-300" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Contact Info */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h3 className="text-sm font-bold tracking-widest text-ink uppercase">
              Contact Info
            </h3>
            <div className="flex flex-col gap-4 text-sm text-ink/70">
              {contact?.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-start gap-3 hover:text-ink transition-colors group p-3 -ml-3 rounded-xl hover:bg-ink/[0.02] border border-transparent hover:border-ink/5"
                >
                  <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 group-hover:bg-violet-500/20 group-hover:scale-110 transition-all duration-300">
                    <Mail size={18} className="text-violet-400" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs text-ink/60 mb-1">Email Me</span>
                    <span className="font-medium text-ink/80 break-words">{contact.email}</span>
                  </div>
                </a>
              )}
              {contact?.phone && (
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                  className="flex items-start gap-3 hover:text-ink transition-colors group p-3 -ml-3 rounded-xl hover:bg-ink/[0.02] border border-transparent hover:border-ink/5"
                  title={`Call ${contact.phone}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 group-hover:scale-110 transition-all duration-300">
                    <Phone size={18} className="text-emerald-400" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs text-ink/60 mb-1">Phone / WhatsApp</span>
                    <span className="font-medium text-ink/80 break-words">{contact.phone}</span>
                  </div>
                </a>
              )}
              {contact?.location && (
                <div className="flex items-start gap-3 p-3 -ml-3 rounded-xl border border-transparent">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-cyan-400" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs text-ink/60 mb-1">Location</span>
                    <span className="font-medium text-ink/80 break-words">{contact.location}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-ink/5">
          <p className="text-ink/60 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} {site?.siteTitle || hero?.name || "Portfolio"}. All rights reserved.
            <span className="hidden sm:inline"> · Built with React & ❤️</span>
          </p>
          <motion.button
            whileHover={{ y: -3 }}
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 text-ink/60 hover:text-ink text-sm font-semibold uppercase tracking-wider bg-ink/5 hover:bg-ink/10 border border-ink/5 px-5 py-2.5 rounded-xl transition-all duration-300"
          >
            Back to Top <ArrowUp size={16} className="animate-bounce" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

export default memo(FooterSection);
