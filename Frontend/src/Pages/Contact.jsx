import PageLayout from "../layouts/PageLayout";
import ContactSection from "../sections/ContactSection";

export default function Contact() {
  return (
    <PageLayout>
      <div className="pt-24 pb-12">
        <ContactSection />
      </div>
    </PageLayout>
  );
}
