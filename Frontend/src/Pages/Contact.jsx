import PageLayout from "../layouts/PageLayout";
import ContactSection from "../sections/ContactSection";

export default function Contact() {
  return (
    <PageLayout>
      <div className="contact-page">
        <ContactSection standalone />
      </div>
    </PageLayout>
  );
}
