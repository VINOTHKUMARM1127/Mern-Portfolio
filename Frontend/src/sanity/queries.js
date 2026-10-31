export const PORTFOLIO_QUERY = `{
  "hero": *[_type == "hero"][0]{
    _id, greetings, name, designation, description, profileImage,
    isAvailable, availabilityText,
    primaryCtaText, primaryCtaLink, secondaryCtaText, secondaryCtaLink,
    badgeOne, badgeTwo,
    "resumeUrl": coalesce(resumeUrl, resumeFile.asset->url),
    github, linkedin, twitter, instagram, whatsapp, email, facebook
  },
  "projects": *[_type == "project"] | order(order asc){
    _id, title, description, image, techStack, githubUrl, liveUrl,
    category, featured, completedAt, order
  },
  "testimonials": *[_type == "testimonial"] | order(_createdAt desc){
    _id, clientName, clientRole, quote, rating, clientImage
  },
  "experience": *[_type == "experience"] | order(order asc, startDate desc){
    _id, role, company, startDate, endDate, isCurrent, description, technologies, order
  },
  "education": *[_type == "education"] | order(order asc){
    _id, institution, degree, year, description, order
  }
}`;
