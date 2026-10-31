import { motion } from "framer-motion";

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

function AnimatedTitle({ text, className = "" }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          custom={i}
          variants={wordVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function SectionHeader({
  badge,
  badgeIcon: BadgeIcon,
  title,
  subtitle,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-center mb-16 scroll-reveal ${className}`}
    >
      {badge && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="section-badge flex items-center gap-2 mx-auto w-fit"
        >
          {BadgeIcon && <BadgeIcon size={16} aria-hidden="true" />}
          {badge}
        </motion.span>
      )}
      <h2 className="section-title">
        <AnimatedTitle text={title} />
      </h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
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
