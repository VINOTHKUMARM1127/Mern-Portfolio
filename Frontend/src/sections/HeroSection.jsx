import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbBrandTwitter,
  TbBrandInstagram,
  TbBrandFacebook,
  TbMail,
  TbBrandWhatsapp,
  TbArrowRight,
  TbDownload
} from "react-icons/tb";
import { usePortfolio } from "../context/PortfolioContext";

const HeroScene = lazy(() => import("../components/hero/HeroScene"));

const textVariant = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const parentVariant = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

function SkeletonHero() {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col-reverse lg:flex-row justify-between items-center gap-12 animate-pulse">
      <div className="flex-1 space-y-4">
        <div className="h-8 w-48 bg-gray-700/50 rounded-full" />
        <div className="h-12 w-3/4 bg-gray-700/50 rounded" />
        <div className="h-24 w-full bg-gray-700/50 rounded" />
        <div className="h-10 w-full bg-gray-700/50 rounded" />
      </div>
      <div className="w-[280px] h-[280px] bg-gray-700/50 rounded-full" />
    </div>
  );
}

export default function HeroSection() {
  const { hero, settings, resume, loading, social } = usePortfolio();
  const resumeUrl = resume?.url;

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6">
        {loading ? (
          <SkeletonHero />
        ) : hero ? (
          <motion.div
            initial="hidden"
            animate="show"
            variants={parentVariant}
            className="flex flex-col-reverse lg:flex-row justify-between items-center gap-12"
          >
            <div className="text-center lg:text-start flex-1 max-w-2xl scroll-reveal mx-auto lg:mx-0">
              <motion.div variants={textVariant} className="mb-6">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                    settings?.isAvailable
                      ? "bg-green-500/10 border border-green-500/30 text-green-400"
                      : "bg-yellow-500/10 border border-yellow-500/30 text-yellow-400"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full animate-pulse ${
                      settings?.isAvailable ? "bg-green-400" : "bg-yellow-400"
                    }`}
                  />
                  {settings?.availabilityText}
                </div>
              </motion.div>

              <motion.p variants={textVariant} className="text-lg text-white/60 mb-2">
                {hero.greetings}
              </motion.p>
              <motion.h1 variants={textVariant} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
                {hero.name}
              </motion.h1>
              <motion.h2
                variants={textVariant}
                className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text mb-6"
              >
                {hero.designation}
              </motion.h2>

              {hero.description && (
                <motion.p variants={textVariant} className="text-base md:text-lg text-white/70 leading-relaxed mb-8 text-justify">
                  {hero.description}
                </motion.p>
              )}

              <motion.div variants={textVariant} className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
                <motion.a
                  href={settings?.primaryCtaLink || "#contact"}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium shadow-lg shadow-violet-500/25"
                >
                  <TbMail size={20} />
                  {settings?.primaryCtaText || "Hire Me"}
                  <TbArrowRight size={18} />
                </motion.a>
                {resumeUrl && (
                  <motion.a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 text-white/80 font-medium border border-white/5 hover:bg-white/10"
                  >
                    <TbDownload size={20} />
                    Download CV
                  </motion.a>
                )}
              </motion.div>

              <motion.div variants={textVariant} className="flex flex-wrap gap-4 justify-center lg:justify-start items-center">
                <span className="text-white/40 text-sm font-semibold tracking-wider uppercase mr-2 hidden sm:block">Connect:</span>
                {social?.whatsapp && (
                  <motion.a
                    href={`https://wa.me/${social.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -4 }}
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#25D366] hover:border-[#25D366]/40 hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all duration-300 relative overflow-hidden"
                    title="WhatsApp"
                  >
                    <TbBrandWhatsapp size={22} />
                  </motion.a>
                )}
                {social?.linkedin && (
                  <motion.a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -4 }}
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:shadow-[0_0_20px_rgba(10,102,194,0.3)] transition-all duration-300 relative overflow-hidden"
                    title="LinkedIn"
                  >
                    <TbBrandLinkedin size={22} />
                  </motion.a>
                )}
                {social?.facebook && (
                  <motion.a
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -4 }}
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#1877F2] hover:border-[#1877F2]/40 hover:shadow-[0_0_20px_rgba(24,119,242,0.3)] transition-all duration-300 relative overflow-hidden"
                    title="Facebook"
                  >
                    <TbBrandFacebook size={22} />
                  </motion.a>
                )}
                {social?.github && (
                  <motion.a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -4 }}
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#ffffff] hover:border-[#ffffff]/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 relative overflow-hidden"
                    title="GitHub"
                  >
                    <TbBrandGithub size={22} />
                  </motion.a>
                )}
                {social?.instagram && (
                  <motion.a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -4 }}
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#E1306C] hover:border-[#E1306C]/40 hover:shadow-[0_0_20px_rgba(225,48,108,0.3)] transition-all duration-300 relative overflow-hidden"
                    title="Instagram"
                  >
                    <TbBrandInstagram size={22} />
                  </motion.a>
                )}
                {social?.twitter && (
                  <motion.a
                    href={social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -4 }}
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/40 hover:shadow-[0_0_20px_rgba(29,161,242,0.3)] transition-all duration-300 relative overflow-hidden"
                    title="Twitter / X"
                  >
                    <TbBrandTwitter size={22} />
                  </motion.a>
                )}
                {settings?.email && (
                  <motion.a
                    href={`mailto:${settings.email}`}
                    whileHover={{ scale: 1.15, y: -4 }}
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#8B5CF6] hover:border-[#8B5CF6]/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300 relative overflow-hidden"
                    title="Email"
                  >
                    <TbMail size={22} />
                  </motion.a>
                )}
              </motion.div>
            </div>

            <motion.div
              variants={textVariant}
              className="flex-shrink-0 relative scroll-reveal"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/30 to-cyan-500/30 rounded-full blur-2xl scale-110" />
              {hero.profileImageUrl && (
                <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px]">
                  <img
                    src={hero.profileImageUrl}
                    alt={hero.name}
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover rounded-full border-4 border-white/10"
                  />
                  <div
                    className="absolute inset-0 rounded-full border-2 border-dashed border-violet-500/30 animate-spin-slow"
                    style={{ animationDuration: "20s" }}
                  />
                </div>
              )}
              {hero.badgeOne && (
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 px-4 py-2 rounded-xl bg-violet-600/90 backdrop-blur-sm text-white text-sm font-medium"
                >
                  {hero.badgeOne}
                </motion.div>
              )}
              {hero.badgeTwo && (
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl bg-cyan-500/90 backdrop-blur-sm text-white text-sm font-medium"
                >
                  {hero.badgeTwo}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        ) : (
          <p className="text-center text-white/60">Configure Sanity CMS to load hero content.</p>
        )}
      </div>
    </section>
  );
}
