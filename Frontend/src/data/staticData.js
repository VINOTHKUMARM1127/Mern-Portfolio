// ============================================================
// SKILLS DATA  (matches resume: React.js, Tailwind CSS, Node.js,
// Express.js, HTML, CSS, JavaScript, MongoDB, Supabase, Git)
// ============================================================
export const skillsData = [
  // Frontend
  { _id: "html", title: "HTML5", category: "Frontend", icon: "logos:html-5" },
  { _id: "css", title: "CSS3", category: "Frontend", icon: "logos:css-3" },
  { _id: "js", title: "JavaScript", category: "Frontend", icon: "logos:javascript" },
  { _id: "react", title: "React.js", category: "Frontend", icon: "logos:react" },
  { _id: "tailwind", title: "Tailwind CSS", category: "Frontend", icon: "logos:tailwindcss-icon" },
  // Backend & Database
  { _id: "node", title: "Node.js", category: "Backend", icon: "logos:nodejs-icon" },
  { _id: "express", title: "Express.js", category: "Backend", icon: "simple-icons:express" },
  { _id: "mongo", title: "MongoDB", category: "Backend", icon: "logos:mongodb-icon" },
  { _id: "supabase", title: "Supabase", category: "Backend", icon: "logos:supabase-icon" },
  { _id: "postgres", title: "PostgreSQL", category: "Backend", icon: "logos:postgresql" },
  // CMS, Tools & Platforms
  { _id: "sanity", title: "Sanity CMS", category: "Tools & Platforms", icon: "simple-icons:sanity" },
  { _id: "git", title: "Git", category: "Tools & Platforms", icon: "logos:git-icon" },
  { _id: "github", title: "GitHub", category: "Tools & Platforms", icon: "logos:github-icon" },
  { _id: "vercel", title: "Vercel", category: "Tools & Platforms", icon: "logos:vercel-icon" },
];

// ============================================================
// SERVICES DATA
// ============================================================
export const servicesData = [
  {
    _id: "srv-1",
    title: "Frontend Development",
    description:
      "Clean, responsive interfaces built with React.js and Tailwind CSS. I focus on reusable components, consistent design and a smooth experience across desktop, tablet and mobile.",
    icon: "fluent:window-sparkle-24-filled",
    price: "Custom Quote",
    features: [
      "React.js Component Architecture",
      "Tailwind CSS Styling",
      "Responsive Mobile-First UI",
      "Cross-Browser Compatibility",
    ],
    isPopular: true,
  },
  {
    _id: "srv-2",
    title: "CMS-Powered Business Websites",
    description:
      "Professional websites for small businesses where you can update text, images and projects yourself. Built with React and Sanity CMS, as delivered for Habile and SNK Build Fabric Solutions.",
    icon: "fluent:board-24-filled",
    price: "Custom Quote",
    features: [
      "Sanity CMS Integration",
      "Easy Content Updates, No Code Needed",
      "Services, Projects & Testimonials Sections",
      "Deployment on Vercel",
    ],
    isPopular: false,
  },
  {
    _id: "srv-3",
    title: "Full Stack Web Applications",
    description:
      "Database-driven web apps with authentication and user data, built using Supabase and PostgreSQL or the Node.js, Express.js and MongoDB stack.",
    icon: "fluent:window-dev-tools-24-filled",
    price: "Custom Quote",
    features: [
      "Supabase Auth & PostgreSQL",
      "Node.js & Express.js REST APIs",
      "MongoDB Data Modeling",
      "CRUD Operations & Data Dashboards",
    ],
    isPopular: false,
  },
  {
    _id: "srv-4",
    title: "Responsive Website Design",
    description:
      "Layouts that look right on every screen, from large monitors to small smartphones, built with performance and clean code in mind.",
    icon: "fluent:phone-laptop-24-filled",
    price: "Custom Quote",
    features: [
      "Flexbox & Grid Layouts",
      "Media Query Optimization",
      "Fast Loading Assets",
      "Accessible, Semantic HTML",
    ],
    isPopular: false,
  },
  {
    _id: "srv-5",
    title: "Portfolio Websites",
    description:
      "Personal portfolio sites for students, freelancers and professionals that present projects, skills and contact details clearly.",
    icon: "fluent:person-board-24-filled",
    price: "Custom Quote",
    features: [
      "Tailored Design & Layout",
      "Project Showcase Sections",
      "Contact Form Integration",
      "Basic SEO Setup",
    ],
    isPopular: false,
  },
  {
    _id: "srv-6",
    title: "Freelance Web Solutions",
    description:
      "Flexible contract web development with clear communication, realistic timelines and support after launch for small fixes and updates.",
    icon: "fluent:handshake-24-filled",
    price: "Custom Quote",
    features: [
      "Flexible Requirements",
      "Regular Progress Updates",
      "Bug Fixes After Launch",
      "Long-Term Collaboration",
    ],
    isPopular: false,
  },
];

// ============================================================
// TESTIMONIALS DATA
// The earlier entries were placeholder names and are removed.
// Add real feedback from Habile / SNK Build Fabric Solutions here
// once you have it, and hide the testimonials section until then.
// ============================================================
export const testimonialsData = [];

// ============================================================
// EDUCATION DATA
// ============================================================
export const educationData = [
  {
    _id: "edu-1",
    institution: "PPG College of Arts & Science, Coimbatore",
    degree: "Bachelor of Science - Computer Science",
    year: "2022 - 2025",
    cgpa: "8.9 / 10",
    description:
      "Graduated with a CGPA of 8.9/10. Built a strong foundation in programming, web development, databases and software engineering, and applied it through client and personal projects using React, Tailwind CSS, Sanity CMS and Supabase.",
  },
  {
    _id: "edu-2",
    institution: "KVK Government Boys Higher Secondary School, P. Puliampatti",
    degree: "HSC - XII Standard (Computer Science)",
    year: "2021 - 2022",
    cgpa: "6.1 / 10",
    description:
      "Completed higher secondary education with Computer Science, gaining foundational knowledge of computing concepts and logical problem solving.",
  },
  {
    _id: "edu-3",
    institution: "KVK Government Boys Higher Secondary School, P. Puliampatti",
    degree: "SSLC - X Standard",
    year: "2019 - 2020",
    cgpa: "6.8 / 10",
    description:
      "Completed secondary school education, building a solid academic base and good habits of discipline and time management.",
  },
];

// ============================================================
// CERTIFICATIONS DATA
// Dates are left blank because the resume does not state them.
// Fill them in from your Udemy certificates (or hide the date in the UI).
// ============================================================
export const certificationsData = [
  {
    _id: "cert-1",
    name: "React - All You Need to Know with Practical Projects",
    issuer: "Udemy",
    date: "",
  },
  {
    _id: "cert-2",
    name: "JavaScript - Creating 10 Practical Projects",
    issuer: "Udemy",
    date: "",
  },
];

// ============================================================
// CONTACT DEFAULT DATA
// ============================================================
export const contactDefaultData = {
  email: "vinothkumarm1127@gmail.com",
  phone: "+919344842329",
  whatsapp: "+919344842329",
  location: "Tamil Nadu, India (Open to OnSite/Remote)",
  linkedin: "https://www.linkedin.com/in/vinothkumarm27",
  github: "https://github.com/vinothkumarm1127",
  portfolio: "https://vinothkumarm27.vercel.app",
};

// ============================================================
// STATS DATA - for StatsSection
// ============================================================
export const statsData = [
  {
    _id: "stat-1",
    label: "Projects Completed",
    value: 3,
    suffix: "",
    icon: "briefcase",
  },
  {
    _id: "stat-2",
    label: "Client Websites Delivered",
    value: 2,
    suffix: "",
    icon: "users",
  },
  {
    _id: "stat-3",
    label: "Udemy Certifications",
    value: 2,
    suffix: "",
    icon: "calendar",
  },
  {
    _id: "stat-4",
    label: "Technologies",
    value: 10,
    suffix: "+",
    icon: "code",
  },
];

// ============================================================
// WHY HIRE ME DATA - for WhyHireMeSection
// ============================================================
export const whyHireMeData = [
  {
    _id: "why-1",
    title: "Clean, Maintainable Code",
    description:
      "I write well-structured, reusable components and keep my code readable so it is easy to understand, update and extend.",
    icon: "code",
  },
  {
    _id: "why-2",
    title: "Real Project Experience",
    description:
      "I have built and deployed live client websites and a full-stack app, so I understand real requirements, feedback and deadlines.",
    icon: "clock",
  },
  {
    _id: "why-3",
    title: "Clear Communication",
    description:
      "You get regular updates and quick replies, so you always know where your project stands.",
    icon: "message",
  },
  {
    _id: "why-4",
    title: "Fast Learner",
    description:
      "I enjoy picking up new tools and technologies, and I take ownership of fixing bugs and improving my work after launch.",
    icon: "shield",
  },
];

// ============================================================
// PROCESS DATA - for ProcessSection
// ============================================================
export const processData = [
  {
    _id: "proc-1",
    step: 1,
    title: "Discovery",
    description:
      "We start by discussing your requirements, goals, target audience and any technical constraints.",
  },
  {
    _id: "proc-2",
    step: 2,
    title: "Design",
    description:
      "I plan the layout and structure of the site, sharing it with you and refining it based on your feedback.",
  },
  {
    _id: "proc-3",
    step: 3,
    title: "Develop",
    description:
      "I build the site with clean, well-structured code and share regular progress updates so you stay in the loop.",
  },
  {
    _id: "proc-4",
    step: 4,
    title: "Deploy & Support",
    description:
      "Your site goes live on a fast hosting platform, and I help with fixes and updates after launch.",
  },
];

// ============================================================
// FAQ DATA - for FAQSection (AEO optimized)
// ============================================================
export const faqData = [
  {
    _id: "faq-1",
    question: "Who is Vinoth Kumar M?",
    answer:
      "Vinoth Kumar M is a B.Sc. Computer Science graduate (2025, PPG College of Arts & Science, Coimbatore) and React.js developer based in Tamil Nadu, India. He has built and deployed responsive websites and web apps for clients and personal projects using React.js, Tailwind CSS, Sanity CMS and Supabase, and is open to full-time roles and freelance work.",
  },
  {
    _id: "faq-2",
    question: "What services do you offer?",
    answer:
      "I offer frontend development with React.js and Tailwind CSS, CMS-powered business websites using Sanity, full stack web applications with Supabase or the Node.js, Express.js and MongoDB stack, responsive website design, and portfolio websites.",
  },
  {
    _id: "faq-3",
    question: "What is your tech stack?",
    answer:
      "My main skills are React.js, JavaScript, HTML, CSS and Tailwind CSS on the frontend, and Node.js, Express.js, MongoDB, Supabase and PostgreSQL on the backend. I also work with Sanity CMS, and use Git, GitHub and Vercel for version control and deployment.",
  },
  {
    _id: "faq-4",
    question: "What projects have you worked on?",
    answer:
      "I have built client websites for Habile and SNK Build Fabric Solutions (a Bangalore-based fabrication company) using React.js, Tailwind CSS and Sanity CMS, and a workout tracking platform called RepTrack using React.js, Supabase and PostgreSQL. All three are live and linked in my portfolio.",
  },
  {
    _id: "faq-5",
    question: "Are you open to job opportunities?",
    answer:
      "Yes. I am looking for React.js and frontend or full stack developer roles where I can contribute to real-world projects and keep growing as a developer. I am also available for freelance projects.",
  },
  {
    _id: "faq-6",
    question: "How much does a website cost?",
    answer:
      "The cost depends on the number of pages, features and timeline. A simple business or portfolio site costs far less than a full-stack app with login and a database. Share your requirements and I will give you a clear, fair quote.",
  },
  {
    _id: "faq-7",
    question: "How do I start a project with you?",
    answer:
      "Reach out through the contact form on this website, by email or by phone. We will discuss your requirements, timeline and budget, and I will then send a proposal before starting development.",
  },
  {
    _id: "faq-8",
    question: "What is your typical project timeline?",
    answer:
      "A simple landing page usually takes 1-2 weeks, a multi-page business website 2-4 weeks, and a full-stack web app with a backend and database 4-8 weeks, depending on complexity. I will always confirm a realistic timeline before we begin.",
  },
];