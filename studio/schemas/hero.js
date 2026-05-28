export default {
  name: "hero",
  title: "Hero",
  type: "document",
  fields: [
    { name: "greetings", title: "Greeting", type: "string", initialValue: "Hello, I'm" },
    { name: "name", title: "Full Name", type: "string", validation: (Rule) => Rule.required() },
    { name: "designation", title: "Designation", type: "string", validation: (Rule) => Rule.required() },
    {
      name: "description",
      title: "About Me Description / Summary",
      type: "text",
      description: "A professional frontend/full stack developer summary shown directly in the Hero Section.",
      initialValue: "I am a passionate Full Stack / MERN Stack Developer specializing in crafting modern, high-performance UI/UX and fully responsive websites. With extensive experience in seamless API integrations, responsive layouts, and performance-focused development, I turn complex ideas into polished, freelance web products.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
    },
    { name: "isAvailable", title: "Available for Work", type: "boolean", initialValue: true },
    { name: "availabilityText", title: "Availability Text", type: "string", initialValue: "Open for Freelance" },
    { name: "primaryCtaText", title: "Primary CTA Text", type: "string", initialValue: "Hire Me" },
    { name: "primaryCtaLink", title: "Primary CTA Link", type: "string", initialValue: "#contact" },
    { name: "badgeOne", title: "Floating Badge 1", type: "string", initialValue: "Full Stack" },
    { name: "badgeTwo", title: "Floating Badge 2", type: "string", initialValue: "Fast Delivery" },
    
    // Resume Links
    {
      name: "resumeFile",
      title: "Resume File (PDF)",
      type: "file",
      options: { accept: ".pdf" },
    },
    {
      name: "resumeUrl",
      title: "External Resume URL",
      type: "url",
      description: "Use if resume is hosted elsewhere (e.g. Google Drive)",
    },

    // Social Links
    { name: "github", title: "GitHub URL", type: "url" },
    { name: "linkedin", title: "LinkedIn URL", type: "url" },
    { name: "twitter", title: "Twitter / X URL", type: "url" },
    { name: "instagram", title: "Instagram URL", type: "url" },
    { name: "facebook", title: "Facebook URL", type: "url" },
    { name: "whatsapp", title: "WhatsApp Number", type: "string", description: "Format: 1234567890 (with country code, no space or symbols)" },
    { name: "email", title: "Email Address", type: "string" },
  ],
  preview: {
    select: { title: "name", subtitle: "designation", media: "profileImage" },
  },
};
