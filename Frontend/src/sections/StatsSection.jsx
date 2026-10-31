import { memo, useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TbBriefcase, TbUsers, TbCalendar, TbCode } from "react-icons/tb";
import { statsData } from "../data/staticData";

const iconMap = {
  briefcase: TbBriefcase,
  users: TbUsers,
  calendar: TbCalendar,
  code: TbCode,
};

function AnimatedNumber({ value, suffix = "", inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="stats"
      className="py-20 relative overflow-hidden"
      aria-label="Key statistics"
    >
      {/* Subtle gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div ref={ref} className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {statsData.map((stat, index) => {
            const IconComp = iconMap[stat.icon] || TbCode;
            return (
              <motion.div
                key={stat._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative flex flex-col items-center text-center p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/30 hover:bg-white/[0.04] transition-all duration-500"
              >
                {/* Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/0 to-cyan-500/0 group-hover:from-violet-500/5 group-hover:to-cyan-500/5 transition-all duration-500 pointer-events-none" />

                <div className="w-14 h-14 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-4 group-hover:scale-110 group-hover:bg-violet-500/20 transition-all duration-300">
                  <IconComp size={26} />
                </div>

                <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    inView={inView}
                  />
                </h3>

                <p className="text-sm text-white/50 font-medium tracking-wide uppercase">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default memo(StatsSection);
