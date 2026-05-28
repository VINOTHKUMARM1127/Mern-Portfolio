import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import FloatingNav from "../components/layout/FloatingNav";
import FooterSection from "../sections/FooterSection";
import { initScrollReveal, refreshScrollReveal } from "../animations/scrollReveal";

export default function PageLayout({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    initScrollReveal();
    const t = setTimeout(refreshScrollReveal, 500);
    return () => clearTimeout(t);
  }, [pathname]); // Refresh scroll reveal animations on route change

  return (
    <div className="bg-[#0a0a0f] min-h-screen text-white overflow-x-hidden flex flex-col">
      <FloatingNav />
      <main className="flex-1">
        {children}
      </main>
      <FooterSection />
    </div>
  );
}
