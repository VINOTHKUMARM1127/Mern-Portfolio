import { useRef, useState, memo } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { TbMail, TbSend, TbLoader2, TbCheck } from "react-icons/tb";
import { usePortfolio } from "../context/PortfolioContext";

function ContactSection() {
  const form = useRef();
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const { contact } = usePortfolio();

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

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-violet-600/10 to-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 scroll-reveal"
        >
          <span className="section-badge flex items-center gap-2 mx-auto w-fit">
            <TbMail size={16} />
            Get in Touch
          </span>
          <h2 className="section-title">Contact Me</h2>
          <p className="section-subtitle">
            Have a freelance project in mind? Send a message — I typically reply within 24 hours.
          </p>
          {contact?.email && (
            <p className="mt-4 text-white/50 text-sm">
              Or email directly:{" "}
              <a href={`mailto:${contact.email}`} className="text-violet-400 hover:underline">
                {contact.email}
              </a>
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 scroll-reveal"
        >
          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Name</label>
                <input type="text" name="name" required className="input" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Email</label>
                <input type="email" name="email" required className="input" placeholder="you@email.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Subject</label>
              <input type="text" name="subject" required className="input" placeholder="Project inquiry" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Message</label>
              <textarea name="message" required rows={5} className="input resize-none" placeholder="Tell me about your project..." />
            </div>
            <button
              type="submit"
              disabled={sending || success}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-medium text-white ${
                success ? "bg-green-600" : "bg-gradient-to-r from-violet-600 to-purple-600"
              } disabled:opacity-70`}
            >
              {sending ? (
                <>
                  <TbLoader2 size={20} className="animate-spin" /> Sending...
                </>
              ) : success ? (
                <>
                  <TbCheck size={20} /> Message Sent!
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
    </section>
  );
}

export default memo(ContactSection);
