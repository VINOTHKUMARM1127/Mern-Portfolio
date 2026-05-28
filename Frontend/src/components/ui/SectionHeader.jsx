import { motion } from "framer-motion";

export default function SectionHeader({ badge, badgeIcon: BadgeIcon, title, subtitle, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-center mb-16 scroll-reveal ${className}`}
    >
      {badge && (
        <span className="section-badge flex items-center gap-2 mx-auto w-fit">
          {BadgeIcon && <BadgeIcon size={16} />}
          {badge}
        </span>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </motion.div>
  );
}
