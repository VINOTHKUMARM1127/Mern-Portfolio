import { motion } from "framer-motion";

function AnimatedTitle({ text, className = "" }) { return <span className={className}>{text}</span>; }

export default function SectionHeader({
  badge,
  badgeIcon: BadgeIcon,
  title,
  subtitle,
  className = "",
  headingLevel = "h2",
}) {
  const Heading = headingLevel;
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-center mb-16 scroll-reveal ${className}`}
    >
      {badge && (
        <motion.span
          initial={false}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="section-badge flex items-center gap-2 mx-auto w-fit"
        >
          {BadgeIcon && <BadgeIcon size={16} aria-hidden="true" />}
          {badge}
        </motion.span>
      )}
      <Heading className="section-title">
        <AnimatedTitle text={title} />
      </Heading>
      {subtitle && (
        <motion.p
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="section-subtitle"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
