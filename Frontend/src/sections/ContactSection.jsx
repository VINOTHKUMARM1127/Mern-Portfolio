import { useRef, useState, memo } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import {
  TbMail,
  TbSend,
  TbLoader2,
  TbCheck,
  TbBrandWhatsapp,
  TbMapPin,
  TbPhone,
} from "react-icons/tb";
import { usePortfolio } from "../context/PortfolioContext";
import SectionHeader from "../components/ui/SectionHeader";
import { getWhatsAppUrl } from "../utils/contactUtils";

function ContactSection() {
  const form = useRef();
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const { contact, social } = usePortfolio();

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);
    emailjs
      .sendForm("vinothkumarm1127", "temp1127", form.current, {
        publicKey: "sPqSnFHboBAhwkjun",
      })
      .then(
        () => {
          setSuccess(true);
          setSending(false);
          form.current.reset();
          setTimeout(() => setSuccess(false), 5000);
        },
        (error) => {
          console.error("Failed to send:", error);
          setSending(false);
          alert("Failed to send message. Please try again.");
        }
      );
  };

  const whatsappUrl = getWhatsAppUrl(
    social?.whatsapp || contact?.whatsapp || "+919344842329",
    "Hi Vinoth! I'm interested in your web development services."
  );

  const emailAddress = contact?.email || "vinothkumarm1127@gmail.com";
  const phoneNumber = contact?.phone || "+919344842329";

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center py-24 relative overflow-hidden"
      aria-label="Contact form"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-violet-600/10 to-cyan-500/10 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full">
        <SectionHeader
          badge="Get in Touch"
          badgeIcon={TbMail}
          title="Let's Work Together"
          subtitle="Have a project in mind? Send a message — I typically reply within 24 hours."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Contact info cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {emailAddress && (
              <a
                href={`mailto:${emailAddress}?subject=${encodeURIComponent("Hiring Inquiry - Full Stack Developer")}`}
                className="group flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/30 hover:bg-white/[0.04] transition-all duration-300"
                title={`Send email to ${emailAddress}`}
              >
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-110 group-hover:bg-violet-500/20 transition-all duration-300">
                  <TbMail size={22} />
                </div>
                <div>
                  <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-0.5">
                    Email
                  </p>
                  <p className="text-sm text-white/80 font-semibold break-all">
                    {emailAddress}
                  </p>
                </div>
              </a>
            )}

            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#25D366]/30 hover:bg-white/[0.04] transition-all duration-300"
                title="Chat on WhatsApp: +91 93448 42329"
              >
                <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center text-[#25D366] group-hover:scale-110 group-hover:bg-[#25D366]/20 transition-all duration-300">
                  <TbBrandWhatsapp size={22} />
                </div>
                <div>
                  <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-0.5">
                    WhatsApp
                  </p>
                  <p className="text-sm text-white/80 font-semibold">
                    Quick Chat · +91 93448 42329
                  </p>
                </div>
              </a>
            )}

            {phoneNumber && (
              <a
                href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
                className="group flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all duration-300"
                title={`Call ${phoneNumber}`}
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-300">
                  <TbPhone size={22} />
                </div>
                <div>
                  <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-0.5">
                    Phone / Call
                  </p>
                  <p className="text-sm text-white/80 font-semibold">
                    {phoneNumber}
                  </p>
                </div>
              </a>
            )}

            {contact?.location && (
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                  <TbMapPin size={22} />
                </div>
                <div>
                  <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-0.5">
                    Location
                  </p>
                  <p className="text-sm text-white/80 font-semibold">
                    {contact.location}
                  </p>
                </div>
              </div>
            )}

            {/* Response time notice */}
            <div className="mt-2 p-4 rounded-xl bg-violet-500/5 border border-violet-500/10">
              <p className="text-xs text-violet-300/70 leading-relaxed">
                💡 <span className="font-semibold text-violet-300">Pro tip:</span>{" "}
                For the fastest response, reach out via WhatsApp. I'm available
                across all time zones for remote collaboration.
              </p>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 glass-card p-8 md:p-10"
          >
            <form ref={form} onSubmit={sendEmail} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-medium text-white/70"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    className="input"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium text-white/70"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    className="input"
                    placeholder="you@email.com"
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="contact-subject"
                  className="text-sm font-medium text-white/70"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  required
                  className="input"
                  placeholder="Project inquiry"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-medium text-white/70"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  className="input resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={sending || success}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                  success
                    ? "bg-green-600 shadow-lg shadow-green-600/25"
                    : "bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
                } disabled:opacity-70`}
              >
                {sending ? (
                  <>
                    <TbLoader2 size={20} className="animate-spin" /> Sending...
                  </>
                ) : success ? (
                  <>
                    <TbCheck size={20} /> Message Sent Successfully!
                  </>
                ) : (
                  <>
                    Send Message <TbSend size={20} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(ContactSection);
