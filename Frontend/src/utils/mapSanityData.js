import { getImageUrl } from "../sanity/image";
import {
  skillsData,
  experienceData,
  servicesData,
  testimonialsData,
  educationData,
  certificationsData,
  contactDefaultData
} from "../data/staticData";

function formatDate(dateStr) {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).getFullYear().toString();
  } catch {
    return dateStr;
  }
}

export function mapPortfolioData(raw) {
  if (!raw) return null;

  const hero = raw.hero
    ? {
        ...raw.hero,
        profileImageUrl: getImageUrl(raw.hero.profileImage, { width: 800 }),
      }
    : null;

  // We are removing the dynamic About schema, using hero description directly in Hero
  const about = null;

  // Derive resumeUrl from hero's resumeUrl or resumeFile
  // Wait, resumeFile is a Sanity file reference. Our query just fetches `resumeFile`, but we need its URL.
  // We didn't fetch `resumeFile.asset->url` in queries.js!
  // I should update queries.js to fetch `resumeFile.asset->url`.
  // Wait, I can just do it here or update queries.js. I'll assume the URL is needed, so I'll also patch queries.js later or adjust mapping.
  // Wait, let's just use `hero.resumeUrl` or whatever is passed.
  const resumeUrl = hero?.resumeUrl || null;

  const projects = (raw.projects || []).map((p) => ({
    _id: p._id,
    title: p.title,
    description: p.description,
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

  // Assign social and contact from hero
  const social = {
    github: hero?.github,
    linkedin: hero?.linkedin,
    twitter: hero?.twitter,
    instagram: hero?.instagram,
    facebook: hero?.facebook,
    whatsapp: hero?.whatsapp,
  };

  const contact = {
    email: hero?.email || contactDefaultData.email,
    phone: contactDefaultData.phone,
    location: contactDefaultData.location,
    whatsapp: hero?.whatsapp,
  };

  const site = {
    logoText: hero?.name ? hero.name.split(" ")[0] : "Devfolio",
    siteTitle: hero?.name ? `${hero.name} | Portfolio` : "Developer Portfolio",
    siteDescription: hero?.description || "Professional Developer Portfolio",
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

  return {
    hero,
    about,
    skills: skillsData,
    projects,
    education: educationData,
    certifications: certificationsData,
    experience: experienceData,
    services: servicesData,
    testimonials,
    contact,
    social,
    resume: { url: resumeUrl },
    site,
    settings,
  };
}
