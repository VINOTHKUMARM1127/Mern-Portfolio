import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbBrandWhatsapp, TbMail, TbPhone, TbX } from "react-icons/tb";
import { usePortfolio } from "../../context/PortfolioContext";
import { getWhatsAppUrl } from "../../utils/contactUtils";

function CTAFloating() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { social, contact } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 150);
    };
    // Check initial scroll
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  const whatsappUrl = getWhatsAppUrl(
    social?.whatsapp || contact?.whatsapp || "+919344842329",
    "Hi Vinoth! I'm interested in your web development services."
  );

  const email = contact?.email || "vinothkumarm1127@gmail.com";
  const emailUrl = `mailto:${email}?subject=${encodeURIComponent("Hiring Inquiry - Full Stack Developer")}`;
  const phone = contact?.phone || "+919344842329";
  const phoneUrl = `tel:${phone.replace(/\s+/g, "")}`;

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
                  className="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50 transition-all group relative"
                  aria-label="Send email to hire"
                  title={`Email: ${email}`}
                >
                  <TbMail size={22} />
                  <span className="absolute right-14 px-3 py-1 bg-[#121218] text-white text-xs rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
                    Email: {email}
                  </span>
                </motion.a>
              )}
              {phoneUrl && (
                <motion.a
                  href={phoneUrl}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-cyan-600 text-white flex items-center justify-center shadow-lg shadow-cyan-600/30 hover:shadow-cyan-600/50 transition-all group relative"
                  aria-label="Call phone number"
                  title={`Call: ${phone}`}
                >
                  <TbPhone size={22} />
                  <span className="absolute right-14 px-3 py-1 bg-[#121218] text-white text-xs rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
                    Call: {phone}
                  </span>
                </motion.a>
              )}
              {whatsappUrl && (
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-all group relative"
                  aria-label="Chat on WhatsApp"
                  title="WhatsApp: +91 93448 42329"
                >
                  <TbBrandWhatsapp size={22} />
                  <span className="absolute right-14 px-3 py-1 bg-[#121218] text-white text-xs rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
                    WhatsApp Chat
                  </span>
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
