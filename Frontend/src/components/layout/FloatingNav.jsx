import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "../../context/PortfolioContext";
import {
  TbMenu2,
  TbX,
  TbHome,
  TbUser,
  TbBriefcase,
  TbMail,
  TbSparkles,
  TbBrandGithub,
} from "react-icons/tb";

const navItems = [
  { path: "/", label: "Home", icon: TbHome },
  { path: "/about", label: "About", icon: TbUser },
  { path: "/projects", label: "Projects", icon: TbBriefcase },
  { path: "/services", label: "Services", icon: TbSparkles },
  { path: "/contact", label: "Contact", icon: TbMail },
];

export default function FloatingNav() {
  const location = useLocation();
  const { site, social } = usePortfolio();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [menuOpen]);

  const handleNavClick = () => setMenuOpen(false);

  const logoText = site?.logoText || "Devfolio";
  const github = social?.github;

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 right-0 z-50 hidden lg:block transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0f]/90 backdrop-blur-md py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link
            to="/"
            onClick={handleNavClick}
            className="text-xl font-extrabold text-white tracking-wider bg-gradient-to-r from-white to-white/70 bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-violet-400 hover:to-cyan-400 transition-all duration-300"
          >
            {logoText}
          </Link>
          
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 bg-gradient-to-r from-violet-600/25 to-cyan-500/25 border border-violet-500/30 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {github && (
            <motion.a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white rounded-full border border-white/10 hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300"
            >
              <TbBrandGithub size={16} />
              <span>GitHub</span>
            </motion.a>
          )}
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 lg:hidden">
        <div
          className={`flex items-center justify-between px-6 py-4 transition-colors duration-300 ${
            scrolled || menuOpen
              ? "bg-[#0a0a0f]/95 backdrop-blur-xl"
              : "bg-transparent"
          }`}
        >
          <Link
            to="/"
            onClick={handleNavClick}
            className="text-xl font-extrabold text-white tracking-wider"
          >
            {logoText}
          </Link>
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-white/80 hover:text-white rounded-xl bg-white/5 border border-white/5 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {menuOpen ? <TbX size={20} /> : <TbMenu2 size={20} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed inset-x-0 top-[61px] bottom-0 z-40 bg-[#0a0a0f]/98 backdrop-blur-2xl border-t border-white/5 flex flex-col justify-between py-10 px-6"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item, idx) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      <Link
                        to={item.path}
                        onClick={handleNavClick}
                        className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-lg font-bold transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-violet-600/20 to-cyan-500/20 border border-violet-500/30 text-violet-300"
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <item.icon size={22} className="shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile Menu Footer */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="pt-6 border-t border-white/5 flex flex-col items-center gap-6"
              >
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-violet-500/25"
                  >
                    <TbBrandGithub size={20} />
                    <span>Connect on GitHub</span>
                  </a>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
