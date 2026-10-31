import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbBrandWhatsapp, TbMail, TbX } from "react-icons/tb";
import { usePortfolio } from "../../context/PortfolioContext";

function CTAFloating() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { social, contact } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  const whatsappUrl = social?.whatsapp
    ? `https://wa.me/${social.whatsapp}?text=Hi%20Vinoth!%20I'm%20interested%20in%20your%20web%20development%20services.`
    : null;

  const emailUrl = contact?.email ? `mailto:${contact.email}` : null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3"
      >
        {/* Expanded options */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="flex flex-col gap-3 mb-1"
            >
              {emailUrl && (
                <motion.a
                  href={emailUrl}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50 transition-shadow"
                  aria-label="Send email"
                  title="Send Email"
                >
                  <TbMail size={22} />
                </motion.a>
              )}
              {whatsappUrl && (
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-shadow"
                  aria-label="Chat on WhatsApp"
                  title="Chat on WhatsApp"
                >
                  <TbBrandWhatsapp size={22} />
                </motion.a>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main toggle button */}
        <motion.button
          type="button"
          onClick={() => setExpanded((p) => !p)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 text-white flex items-center justify-center shadow-xl shadow-violet-600/30 hover:shadow-violet-600/50 transition-all duration-300"
          aria-label={expanded ? "Close contact options" : "Open contact options"}
        >
          {/* Pulse ring */}
          {!expanded && (
            <span className="absolute inset-0 rounded-full bg-violet-500/30 animate-ping pointer-events-none" />
          )}

          <motion.span
            animate={{ rotate: expanded ? 0 : 0 }}
            className="relative z-10"
          >
            {expanded ? <TbX size={24} /> : <TbMail size={24} />}
          </motion.span>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}

export default memo(CTAFloating);
