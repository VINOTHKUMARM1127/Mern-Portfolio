import { lazy, Suspense } from "react";
import { usePortfolio } from "../hooks/usePortfolio";
import PageLayout from "../layouts/PageLayout";
import HeroSection from "../sections/HeroSection";

const SkillsSection = lazy(() => import("../sections/SkillsSection"));
const ProjectsSection = lazy(() => import("../sections/ProjectsSection"));
const ServicesSection = lazy(() => import("../sections/ServicesSection"));
const ProcessSection = lazy(() => import("../sections/ProcessSection"));
const TestimonialsSection = lazy(() => import("../sections/TestimonialsSection"));
const FAQSection = lazy(() => import("../sections/FAQSection"));
const ContactSection = lazy(() => import("../sections/ContactSection"));

export default function Home() {
  const { error } = usePortfolio();


  return (
    <PageLayout>
      {error && <p role="status" className="mx-auto max-w-5xl px-6 pt-24 text-sm text-ink/60">{error}</p>}

      {/* Conversion Funnel: Awareness → Trust → Proof → Action */}

      {/* 1. Awareness: Who am I? */}
      <section id="home">
        <HeroSection />
      </section>


      {/* 3. Trust: What I know */}
      <Suspense fallback={<div className="min-h-[50vh]" />}>


        {/* 4. Value: Why choose me */}


        {/* 5. Proof: What I've built */}
        <ProjectsSection preview />
        <SkillsSection />

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
