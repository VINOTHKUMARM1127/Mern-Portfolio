/**
 * Contact and messaging utilities for Vinoth Kumar's Portfolio
 */

export const DEFAULT_CONTACT = {
  name: "Vinoth Kumar M",
  email: "vinothkumarm1127@gmail.com",
  phone: "+919344842329",
  whatsappNumber: "919344842329",
  location: "Tamil Nadu, India (Open to OnSite/Remote)",
  linkedin: "https://www.linkedin.com/in/vinothkumarm27",
  github: "https://github.com/vinothkumarm1127",
  portfolio: "https://vinothkumarm27.vercel.app",
};

/**
 * Normalizes any phone / WhatsApp number into standard international format for WhatsApp wa.me links
 * e.g. "+919344842329" -> "919344842329"
 * e.g. "9344842329" -> "919344842329"
 * e.g. "93448412329" (fixes typo from legacy sanity data) -> "919344842329"
 */
export function normalizeWhatsAppNumber(raw) {
  if (!raw) return DEFAULT_CONTACT.whatsappNumber;
  let digits = String(raw).replace(/[^0-9]/g, "");

  // Correct known typo in legacy Sanity data: 93448412329 has 11 digits
  if (digits === "93448412329" || digits === "9193448412329") {
    return DEFAULT_CONTACT.whatsappNumber;
  }

  // If 10-digit Indian number without country code, prepend 91
  if (digits.length === 10) {
    return `91${digits}`;
  }

  return digits || DEFAULT_CONTACT.whatsappNumber;
}

/**
 * Returns a fully qualified https://wa.me/... link with optional pre-filled message
 */
export function getWhatsAppUrl(
  number = DEFAULT_CONTACT.whatsappNumber,
  message = "Hi Vinoth! I'm interested in your web development services."
) {
  const digits = normalizeWhatsAppNumber(number);
  const textParam = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${textParam}`;
}

/**
 * Normalizes email address to ensure vinothkumarm1127@gmail.com is prioritized over legacy emails
 */
export function normalizeEmail(email) {
  if (!email || email === "vinomaddy2711@gmail.com") {
    return DEFAULT_CONTACT.email;
  }
  return email;
}

/**
 * Returns a mailto: link with optional subject and body
 */
export function getMailtoUrl(
  email = DEFAULT_CONTACT.email,
  subject = "Hiring Inquiry - Full Stack Developer",
  body = ""
) {
  const validEmail = normalizeEmail(email);
  const params = new URLSearchParams();
  if (subject) params.append("subject", subject);
  if (body) params.append("body", body);
  const query = params.toString();
  return `mailto:${validEmail}${query ? `?${query}` : ""}`;
}
