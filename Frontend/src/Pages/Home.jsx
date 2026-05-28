import { useEffect } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import PageLayout from "../layouts/PageLayout";
import HeroSection from "../sections/HeroSection";
import SkillsSection from "../sections/SkillsSection";
import ProjectsSection from "../sections/ProjectsSection";
import ServicesSection from "../sections/ServicesSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import ContactSection from "../sections/ContactSection";
import { refreshScrollReveal } from "../animations/scrollReveal";

export default function Home() {
  const { loading, error, sanityConfigured } = usePortfolio();

  useEffect(() => {
    if (!loading) {
      const t = setTimeout(refreshScrollReveal, 100);
      return () => clearTimeout(t);
    }
  }, [loading]);

  return (
    <PageLayout>
      {!sanityConfigured && (
        <div className="fixed top-20 left-0 right-0 z-[60] bg-amber-500/90 text-black text-center py-2 text-sm px-4">
          Set VITE_SANITY_PROJECT_ID in Frontend/.env — see SANITY_SETUP.md
        </div>
      )}
      {error && (
        <div className="fixed top-20 left-0 right-0 z-[60] bg-red-500/90 text-white text-center py-2 text-sm px-4">
          {error}
        </div>
      )}

      <section id="home">
        <HeroSection />
      </section>
      <SkillsSection />
      <ProjectsSection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
    </PageLayout>
  );
}
