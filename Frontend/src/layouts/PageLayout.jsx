import ScrollProgress from "../components/ui/ScrollProgress";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import FloatingNav from "../components/layout/FloatingNav";
import FooterSection from "../sections/FooterSection";
import CTAFloating from "../components/ui/CTAFloating";
import PageMeta from "../components/layout/PageMeta";

export default function PageLayout({ children }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    if (hash) { requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView()); }
    else window.scrollTo(0, 0);
  }, [pathname, hash]);


  return (
    <div className="bg-surface min-h-screen text-ink overflow-x-hidden flex flex-col">
      <PageMeta />
      <ScrollProgress />
      <FloatingNav />
      <main tabIndex={-1} id="main-content" className="flex-1" role="main">
        {children}
      </main>
      <FooterSection />
      <CTAFloating />
    </div>
  );
}
