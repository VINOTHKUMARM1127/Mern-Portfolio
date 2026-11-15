import snapshot from "../data/portfolioSnapshot.json";
import { getImageUrl } from "../sanity/image";
import {
  skillsData,
  servicesData,
  testimonialsData,
  educationData,
  certificationsData,
  contactDefaultData
} from "../data/staticData";
import {
  normalizeWhatsAppNumber,
  normalizeEmail,
} from "./contactUtils";

function formatDate(dateStr) {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).getFullYear().toString();
  } catch {
    return dateStr;
  }
}

export function mapPortfolioData(raw) {
  raw = raw || snapshot;
  raw = { ...snapshot, ...raw, hero: { ...snapshot.hero, ...raw.hero, profileImage: raw.hero?.profileImage?.asset?._ref?.includes(snapshot.hero.profileImage.split("/").pop().split("-")[0]) ? snapshot.hero.profileImage : (raw.hero?.profileImage || snapshot.hero.profileImage), description: snapshot.hero.description, designation: snapshot.hero.designation, resumeUrl: snapshot.hero.resumeUrl, primaryCtaText: snapshot.hero.primaryCtaText, primaryCtaLink: snapshot.hero.primaryCtaLink } };
  const liveProjects = raw.projects || [];
  const mergedProjects = snapshot.projects.map((p) => {
    const live = liveProjects.find((item) => item._id === p._id);
    return { ...live, ...p };
  });
  raw.projects = [...mergedProjects, ...liveProjects.filter(p => !mergedProjects.some(item => item._id === p._id))];

  const hero = raw.hero
    ? {
        ...raw.hero,
        profileImageUrl: getImageUrl(raw.hero.profileImage, { width: 500 }),
      }
    : null;

  // We are removing the dynamic About schema, using hero description directly in Hero
  const about = null;

  // Derive resumeUrl from hero's resumeUrl or resumeFile
  const resumeUrl = hero?.resumeUrl || null;

  const projects = (raw.projects || []).map((p) => ({
    _id: p._id,
    title: p.title,
    description: p.description || "Project details will be available soon.",
    imageUrl: getImageUrl(p.image, { width: 800 }),
    techStack: p.techStack || [],
    githubUrl: p.githubUrl,
    liveUrl: p.liveUrl,
    category: p.category,
    featured: p.featured,
    year: formatDate(p.completedAt),
    completedAt: p.completedAt,
    order: p.order ?? 0,
  }));

  // Normalize email - prioritize vinothkumarm1127@gmail.com over legacy email
  const resolvedEmail = normalizeEmail(hero?.email || contactDefaultData.email);

  // Normalize WhatsApp number - ensure +919344842329 with no typos and valid international digits
  const resolvedWhatsApp = normalizeWhatsAppNumber(
    hero?.whatsapp || contactDefaultData.whatsapp || contactDefaultData.phone
  );

  // Assign social and contact from hero with sanitized values
  const social = {
    github: hero?.github || contactDefaultData.github,
    linkedin: hero?.linkedin || contactDefaultData.linkedin,
    twitter: hero?.twitter,
    instagram: hero?.instagram,
    facebook: hero?.facebook,
    whatsapp: resolvedWhatsApp,
  };

  const contact = {
    email: resolvedEmail,
    phone: contactDefaultData.phone,
    location: contactDefaultData.location,
    whatsapp: resolvedWhatsApp,
  };

  const site = {
    logoText: hero?.name ? hero.name.split(" ")[0] : "Devfolio",
    siteTitle: hero?.name ? `${hero.name} | Portfolio` : "Developer Portfolio",
    siteDescription: "React websites, Sanity CMS and full-stack web applications by Vinoth Kumar M.",
  };

  const settings = {
    isAvailable: hero?.isAvailable ?? true,
    availabilityText: hero?.availabilityText || "Open for Freelance",
    primaryCtaText: hero?.primaryCtaText || "Hire Me",
    primaryCtaLink: hero?.primaryCtaLink || "#contact",
    github: social.github,
    linkedin: social.linkedin,
    twitter: social.twitter,
    instagram: social.instagram,
    facebook: social.facebook,
    whatsapp: contact.whatsapp,
    email: contact.email,
    phone: contact.phone,
    logoText: site.logoText,
    siteDescription: site.siteDescription,
    siteTitle: site.siteTitle,
  };

  const testimonials = raw.testimonials && raw.testimonials.length > 0
    ? raw.testimonials.map((t) => ({
        _id: t._id,
        clientName: t.clientName,
        clientRole: t.clientRole,
        quote: t.quote,
        rating: t.rating ?? 5,
        imageUrl: getImageUrl(t.clientImage, { width: 300 }),
      }))
    : testimonialsData;

  const experience = raw.experience && raw.experience.length > 0 
    ? raw.experience 
    : [];

  const education = raw.education && raw.education.length > 0 
    ? raw.education 
    : educationData.slice(0, 1);

  return {
    hero,
    about,
    skills: skillsData,
    projects,
    education,
    certifications: certificationsData,
    experience,
    services: servicesData,
    testimonials,
    contact,
    social,
    resume: { url: resumeUrl },
    site,
    settings,
  };
}
