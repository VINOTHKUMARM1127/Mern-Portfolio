import { motion } from "framer-motion";

export default function GlobalLoader() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col pt-32 px-6 max-w-7xl mx-auto w-full">
      {/* Hero Skeleton */}
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-12 mb-24 animate-pulse">
        <div className="flex-1 space-y-6 w-full">
          <div className="h-8 w-48 bg-white/5 rounded-full" />
          <div className="h-16 w-3/4 bg-white/10 rounded-xl" />
          <div className="h-10 w-1/2 bg-white/5 rounded-xl" />
          <div className="h-24 w-full bg-white/5 rounded-xl" />
          <div className="flex gap-4 pt-4">
            <div className="h-14 w-40 bg-white/10 rounded-xl" />
            <div className="h-14 w-40 bg-white/5 rounded-xl" />
          </div>
        </div>
        <div className="w-[280px] h-[280px] md:w-[350px] md:h-[350px] bg-white/5 rounded-full flex-shrink-0" />
      </div>

      {/* Content Skeletons */}
      <div className="space-y-8 animate-pulse">
        <div className="h-10 w-64 bg-white/10 rounded-xl mb-12 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-white/5 rounded-2xl border border-white/5" />
          ))}
        </div>
      </div>
    </div>
  );
}
