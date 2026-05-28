import { motion } from "framer-motion";
import {
  TbBrandReact,
  TbBrandNodejs,
  TbBrandNextjs,
  TbBrandTypescript,
  TbBrandTailwind,
  TbBrandDocker,
  TbBrandAws,
  TbBrandGit,
} from "react-icons/tb";

const brands = [
  { Icon: TbBrandReact, name: "React" },
  { Icon: TbBrandNodejs, name: "Node.js" },
  { Icon: TbBrandNextjs, name: "Next.js" },
  { Icon: TbBrandTypescript, name: "TypeScript" },
  { Icon: TbBrandTailwind, name: "Tailwind" },
  { Icon: TbBrandDocker, name: "Docker" },
  { Icon: TbBrandAws, name: "AWS" },
  { Icon: TbBrandGit, name: "Git" },
];

export default function TrustStrip() {
  const marqueeBrands = [...brands, ...brands];

  return (
    <section className="py-10 border-y border-white/5 bg-white/[0.02] overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10" />
      <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
        <p className="text-sm font-medium text-white/40 uppercase tracking-widest">
          Powering Next-Gen Applications
        </p>
      </div>
      <div className="flex">
        <motion.div
          className="flex gap-12 md:gap-24 flex-shrink-0"
          animate={{ x: [0, "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {marqueeBrands.map((brand, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <brand.Icon size={40} className="text-white/20" />
              <span className="text-xs font-medium text-white/20">{brand.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
