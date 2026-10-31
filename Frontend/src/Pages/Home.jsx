import { lazy, Suspense, useEffect } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import PageLayout from "../layouts/PageLayout";
import HeroSection from "../sections/HeroSection";
import StatsSection from "../sections/StatsSection";
import { refreshScrollReveal } from "../animations/scrollReveal";

const SkillsSection = lazy(() => import("../sections/SkillsSection"));
const WhyHireMeSection = lazy(() => import("../sections/WhyHireMeSection"));
const ProjectsSection = lazy(() => import("../sections/ProjectsSection"));
const ServicesSection = lazy(() => import("../sections/ServicesSection"));
const ProcessSection = lazy(() => import("../sections/ProcessSection"));
const TestimonialsSection = lazy(() => import("../sections/TestimonialsSection"));
const FAQSection = lazy(() => import("../sections/FAQSection"));
const ContactSection = lazy(() => import("../sections/ContactSection"));

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
        <div
          className="fixed top-20 left-0 right-0 z-[60] bg-amber-500/90 text-black text-center py-2 text-sm px-4"
          role="alert"
        >
          Set VITE_SANITY_PROJECT_ID in Frontend/.env — see SANITY_SETUP.md
        </div>
      )}
      {error && (
        <div
          className="fixed top-20 left-0 right-0 z-[60] bg-red-500/90 text-white text-center py-2 text-sm px-4"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Conversion Funnel: Awareness → Trust → Proof → Action */}

      {/* 1. Awareness: Who am I? */}
      <section id="home">
        <HeroSection />
      </section>


      {/* 3. Trust: What I know */}
      <Suspense fallback={<div className="min-h-[50vh]" />}>
        <SkillsSection />

        {/* 4. Value: Why choose me */}
        <WhyHireMeSection />

        {/* 5. Proof: What I've built */}
        <ProjectsSection />

        {/* 6. Services: What I offer */}
        <ServicesSection />

        {/* 7. Process: How I work */}
        <ProcessSection />

        {/* 8. Social Proof: What others say */}
        <TestimonialsSection />

        {/* 9. AEO: Common questions */}
        <FAQSection />

        {/* 10. Action: Get in touch */}
        <ContactSection />
      </Suspense>
    </PageLayout>
  );
}
