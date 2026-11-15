import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "../../hooks/usePortfolio";
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

  useEffect(() => {
    const query=window.matchMedia("(min-width: 1024px)");
    const resize=()=>{if(query.matches)setMenuOpen(false);};
    query.addEventListener("change",resize);
    return()=>query.removeEventListener("change",resize);
  },[]);
  useEffect(() => {
    if (!menuOpen) return;
    const toggle=document.querySelector('[aria-controls="mobile-menu"]');
    const items=()=>[toggle,...document.querySelectorAll('#mobile-menu a[href]')].filter(Boolean);
    items()[1]?.focus();
    const keydown = event => {
      if (event.key === "Escape") {event.preventDefault();setMenuOpen(false);}
      if (event.key === "Tab") {
        const list=items();const first=list[0],last=list.at(-1);
        if(event.shiftKey && document.activeElement===first){event.preventDefault();last?.focus();}
        else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first?.focus();}
      }
    };
    window.addEventListener("keydown",keydown);
    return()=>{window.removeEventListener("keydown",keydown);if(toggle?.isConnected)toggle.focus();};
  }, [menuOpen]);
  const handleNavClick = () => setMenuOpen(false);

  const logoText = site?.logoText || "Devfolio";
  const github = social?.github;

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        role="navigation"
        aria-label="Main navigation"
        className={`portfolio-nav fixed top-0 left-0 right-0 z-50 hidden lg:block transition-all duration-300 ${
          scrolled
            ? "bg-surface/90 backdrop-blur-md py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link
            to="/"
            onClick={handleNavClick}
            className="text-xl font-extrabold text-ink tracking-wider bg-gradient-to-r from-ink to-ink/70 bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-violet-400 hover:to-cyan-400 transition-all duration-300"
          >
            {logoText}
          </Link>
          
          <div className="flex items-center gap-1 bg-ink/5 p-1 rounded-full border border-ink/5 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                    isActive ? "text-ink" : "text-ink/60 hover:text-ink"
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
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-ink/5 hover:bg-ink/10 text-ink rounded-full border border-ink/10 hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300"
            >
              <TbBrandGithub size={16} />
              <span>GitHub</span>
            </motion.a>
          )}
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 lg:hidden" role="navigation" aria-label="Mobile navigation">
        <div
          className={`flex items-center justify-between px-6 py-4 transition-colors duration-300 ${
            scrolled || menuOpen
              ? "bg-surface/95 backdrop-blur-xl"
              : "bg-transparent"
          }`}
        >
          <Link
            to="/"
            onClick={handleNavClick}
            className="text-xl font-extrabold text-ink tracking-wider"
          >
            {logoText}
          </Link>
          <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-ink/80 hover:text-ink rounded-xl bg-ink/5 border border-ink/5 flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <TbX size={20} /> : <TbMenu2 size={20} />}
          </motion.button></div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              id="mobile-menu"
              className="fixed inset-x-0 top-[61px] bottom-0 z-40 bg-surface/98 backdrop-blur-2xl border-t border-ink/5 flex flex-col justify-between py-10 px-6"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item, idx) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.path}
                      initial={false}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      <Link
                        to={item.path}
                        onClick={handleNavClick}
                        className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-lg font-bold transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-violet-600/20 to-cyan-500/20 border border-violet-500/30 text-violet-300"
                            : "text-ink/70 hover:text-ink hover:bg-ink/5"
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
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="pt-6 border-t border-ink/5 flex flex-col items-center gap-6"
              >
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-ink font-bold text-sm tracking-wide shadow-lg shadow-violet-500/25"
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
