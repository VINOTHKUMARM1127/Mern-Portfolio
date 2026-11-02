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
  TbDownload,
} from "react-icons/tb";
import { usePortfolio } from "../context/PortfolioContext";
import MagneticButton from "../components/ui/MagneticButton";
import { getWhatsAppUrl } from "../utils/contactUtils";

const HeroScene = lazy(() => import("../components/hero/HeroScene"));

/* ── Animation variants ── */
const charVariant = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const parentVariant = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

/* ── Animated name component ── */
function AnimatedName({ text }) {
  const chars = text.split("");
  return (
    <span aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          custom={i}
          variants={charVariant}
          initial="hidden"
          animate="show"
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Skeleton loader ── */
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

/* ── Social link config ── */
const socialConfig = [
  {
    key: "whatsapp",
    icon: TbBrandWhatsapp,
    getHref: (v) => getWhatsAppUrl(v, "Hi Vinoth! I'm interested in your web development services."),
    label: "WhatsApp",
    color: "#25D366"
  },
  { key: "linkedin", icon: TbBrandLinkedin, getHref: (v) => v, label: "LinkedIn", color: "#0A66C2" },
  { key: "facebook", icon: TbBrandFacebook, getHref: (v) => v, label: "Facebook", color: "#1877F2" },
  { key: "github", icon: TbBrandGithub, getHref: (v) => v, label: "GitHub", color: "#ffffff" },
  { key: "instagram", icon: TbBrandInstagram, getHref: (v) => v, label: "Instagram", color: "#E1306C" },
  { key: "twitter", icon: TbBrandTwitter, getHref: (v) => v, label: "Twitter / X", color: "#1DA1F2" },
];

export default function HeroSection() {
  const { hero, settings, resume, loading, social: socialData } = usePortfolio();
  const resumeUrl = resume?.url;

  return (
    <section
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
      aria-label="Hero introduction"
    >
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px]" />
        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
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
            {/* ── Text Content ── */}
            <div className="text-center lg:text-start flex-1 max-w-2xl mx-auto lg:mx-0">
              {/* Availability badge */}
              <motion.div variants={fadeUp} className="mb-6">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                    settings?.isAvailable
                      ? "bg-green-500/10 border border-green-500/30 text-green-400"
                      : "bg-yellow-500/10 border border-yellow-500/30 text-yellow-400"
                  }`}
                  role="status"
                >
                  <span
                    className={`w-2 h-2 rounded-full animate-pulse ${
                      settings?.isAvailable ? "bg-green-400" : "bg-yellow-400"
                    }`}
                    aria-hidden="true"
                  />
                  {settings?.availabilityText}
                </div>
              </motion.div>

              {/* Greeting */}
              <motion.p variants={fadeUp} className="text-lg text-white/60 mb-2">
                {hero.greetings}
              </motion.p>

              {/* Name with character animation */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 tracking-tight">
                <AnimatedName text={hero.name || "Vinoth Kumar M"} />
              </h1>

              {/* Designation with gradient */}
              <motion.h2
                variants={fadeUp}
                className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text mb-6 animate-gradient bg-[length:200%_200%]"
              >
                {hero.designation}
              </motion.h2>

              {/* Description */}
              {hero.description && (
                <motion.p
                  variants={fadeUp}
                  className="text-base text-justify md:text-lg text-white/70 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
                >
                  {hero.description}
                </motion.p>
              )}

              {/* CTA Buttons */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
                <MagneticButton
                  as="a"
                  href={`mailto:${settings?.email || "vinothkumarm1127@gmail.com"}?subject=${encodeURIComponent("Hiring Inquiry - Full Stack Developer")}`}
                  strength={0.2}
                  className="flex items-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-shadow duration-300"
                  title="Hire via Email"
                >
                  <TbMail size={20} aria-hidden="true" />
                  {settings?.primaryCtaText || "Hire Me"}
                  <TbArrowRight size={18} aria-hidden="true" />
                </MagneticButton>

                <MagneticButton
                  as="a"
                  href={getWhatsAppUrl(socialData?.whatsapp || "919344842329", "Hi Vinoth! I'm interested in hiring you / collaborating on a web project.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  strength={0.2}
                  className="flex items-center gap-2 px-7 py-4 rounded-xl bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366] hover:text-white font-semibold border border-[#25D366]/30 transition-all duration-300 shadow-lg shadow-[#25D366]/10"
                  title="Chat on WhatsApp: +91 93448 42329"
                >
                  <TbBrandWhatsapp size={20} aria-hidden="true" />
                  WhatsApp
                </MagneticButton>

                {resumeUrl && (
                  <MagneticButton
                    as="a"
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    strength={0.2}
                    className="flex items-center gap-2 px-7 py-4 rounded-xl bg-white/5 text-white/80 font-semibold border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <TbDownload size={20} aria-hidden="true" />
                    Download CV
                  </MagneticButton>
                )}
              </motion.div>

              {/* Social Links */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center lg:justify-start items-center">
                <span className="text-white/40 text-sm font-semibold tracking-wider uppercase mr-2 hidden sm:block">
                  Connect:
                </span>
                {socialConfig.map(({ key, icon: Icon, getHref, label, color }) => {
                  const value = key === "email"
                    ? settings?.email
                    : socialData?.[key];
                  if (!value) return null;

                  return (
                    <motion.a
                      key={key}
                      href={key === "email" ? `mailto:${value}` : getHref(value)}
                      target={key === "email" ? undefined : "_blank"}
                      rel={key === "email" ? undefined : "noopener noreferrer"}
                      whileHover={{ scale: 1.15, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 transition-all duration-300"
                      style={{
                        "--hover-color": color,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = color;
                        e.currentTarget.style.borderColor = `${color}40`;
                        e.currentTarget.style.boxShadow = `0 0 20px ${color}30`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "";
                        e.currentTarget.style.borderColor = "";
                        e.currentTarget.style.boxShadow = "";
                      }}
                      aria-label={label}
                      title={label}
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
                {settings?.email && (
                  <motion.a
                    href={`mailto:${settings.email}`}
                    whileHover={{ scale: 1.15, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#8B5CF6] hover:border-[#8B5CF6]/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300"
                    aria-label="Email"
                    title="Email"
                  >
                    <TbMail size={20} />
                  </motion.a>
                )}
              </motion.div>
            </div>

            {/* ── Profile Image ── */}
            <motion.div
              variants={fadeUp}
              className="flex-shrink-0 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/30 to-cyan-500/30 rounded-full blur-2xl scale-110" aria-hidden="true" />
              {hero.profileImageUrl && (
                <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px]">
                  <img
                    src={hero.profileImageUrl}
                    alt={`${hero.name} — Full Stack Developer`}
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover rounded-full border-4 border-white/10"
                  />
                  <div
                    className="absolute inset-0 rounded-full border-2 border-dashed border-violet-500/30 animate-spin-slow"
                    style={{ animationDuration: "20s" }}
                    aria-hidden="true"
                  />
                </div>
              )}
              {hero.badgeOne && (
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 px-4 py-2 rounded-xl bg-violet-600/90 backdrop-blur-sm text-white text-sm font-medium shadow-lg shadow-violet-600/25"
                >
                  {hero.badgeOne}
                </motion.div>
              )}
              {hero.badgeTwo && (
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl bg-cyan-500/90 backdrop-blur-sm text-white text-sm font-medium shadow-lg shadow-cyan-500/25"
                >
                  {hero.badgeTwo}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        ) : (
          <p className="text-center text-white/60">
            Configure Sanity CMS to load hero content.
          </p>
        )}
      </div>
    </section>
  );
}
