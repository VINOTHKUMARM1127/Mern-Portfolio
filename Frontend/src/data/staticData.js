// ============================================================
// SKILLS DATA
// ============================================================
export const skillsData = [
  // Frontend
  { _id: "html", title: "HTML5", category: "Frontend", icon: "logos:html-5" },
  { _id: "css", title: "CSS3", category: "Frontend", icon: "logos:css-3" },
  { _id: "js", title: "JavaScript", category: "Frontend", icon: "logos:javascript" },
  { _id: "react", title: "React.js", category: "Frontend", icon: "logos:react" },
  { _id: "nextjs", title: "Next.js", category: "Frontend", icon: "logos:nextjs-icon" },
  { _id: "tailwind", title: "Tailwind CSS", category: "Frontend", icon: "logos:tailwindcss-icon" },
  { _id: "framer", title: "Framer Motion", category: "Frontend", icon: "logos:framer" },
  // Backend
  { _id: "node", title: "Node.js", category: "Backend", icon: "logos:nodejs-icon" },
  { _id: "express", title: "Express.js", category: "Backend", icon: "simple-icons:express" },
  { _id: "mongo", title: "MongoDB", category: "Backend", icon: "logos:mongodb-icon" },
  { _id: "sql", title: "SQL", category: "Backend", icon: "logos:mysql" },
  { _id: "firebase", title: "Firebase", category: "Backend", icon: "logos:firebase" },
  { _id: "supabase", title: "Supabase", category: "Backend", icon: "logos:supabase-icon" },
  // Tools & Platforms
  { _id: "github", title: "GitHub", category: "Tools & Platforms", icon: "logos:github-icon" },
  { _id: "vercel", title: "Vercel", category: "Tools & Platforms", icon: "logos:vercel-icon" },
  { _id: "postman", title: "Postman", category: "Tools & Platforms", icon: "logos:postman-icon" },
  { _id: "npm", title: "npm", category: "Tools & Platforms", icon: "logos:npm-icon" },
  { _id: "figma", title: "Figma", category: "Tools & Platforms", icon: "logos:figma" },
  // Programming Languages
  { _id: "java", title: "Java", category: "Programming Languages", icon: "logos:java" },
  { _id: "python", title: "Python", category: "Programming Languages", icon: "logos:python" },
];

// ============================================================
// SERVICES DATA
// ============================================================
export const servicesData = [
  {
    _id: "srv-1",
    title: "Full Stack Web Development",
    description:
      "End-to-end web applications engineered for scale. From secure backend APIs to stunning, interactive frontends — I deliver complete solutions that drive real business results.",
    icon: "fluent:window-dev-tools-24-filled",
    price: "Custom Quote",
    features: [
      "Node.js & Express APIs",
      "MongoDB / SQL databases",
      "Secure Authentication & JWT",
      "Cloud Deployment & Scaling",
    ],
    isPopular: true,
  },
  {
    _id: "srv-2",
    title: "Frontend Development",
    description:
      "Pixel-perfect interfaces that users love. Built with React, Next.js, and modern CSS — every interaction is crafted for maximum engagement and conversion.",
    icon: "fluent:window-sparkle-24-filled",
    price: "Custom Quote",
    features: [
      "React & Next.js",
      "Tailwind & Vanilla CSS",
      "Framer Motion Animations",
      "Responsive Mobile-First UI",
    ],
    isPopular: false,
  },
  {
    _id: "srv-3",
    title: "MERN Stack Applications",
    description:
      "High-performance database-driven applications built on the MERN stack. From real-time dashboards to complex SaaS products — I build apps that handle millions of requests.",
    icon: "fluent:database-link-24-regular",
    price: "Custom Quote",
    features: [
      "Custom MongoDB Schema Design",
      "RESTful API Architecture",
      "State Management (Redux/Context)",
      "Seamless CRUD Operations",
    ],
    isPopular: false,
  },
  {
    _id: "srv-4",
    title: "Admin Dashboard Development",
    description:
      "Custom admin portals and analytics dashboards that put you in control. Track metrics, manage users, and make data-driven decisions with beautiful, intuitive interfaces.",
    icon: "fluent:board-24-filled",
    price: "Custom Quote",
    features: [
      "Data Visualizations & Charts",
      "User Roles & Permissions",
      "Bulk Data Operations",
      "Responsive Grid Layouts",
    ],
    isPopular: false,
  },
  {
    _id: "srv-5",
    title: "API Integration",
    description:
      "Seamless connections to payment processors, CRMs, social platforms, and any third-party service your application needs. I make your tools work together flawlessly.",
    icon: "fluent:plug-connected-24-filled",
    price: "Custom Quote",
    features: [
      "Stripe / PayPal Gateway",
      "Firebase & Auth0 Auth",
      "Third-Party REST/GraphQL APIs",
      "Webhooks & Realtime Sync",
    ],
    isPopular: false,
  },
  {
    _id: "srv-6",
    title: "Responsive Website Design",
    description:
      "Fluid, dynamic layouts engineered to look stunning on every screen — from 27-inch monitors to the smallest smartphones. Performance-optimized for instant loading.",
    icon: "fluent:phone-laptop-24-filled",
    price: "Custom Quote",
    features: [
      "Flexbox & Grid Layouts",
      "Media Query Optimization",
      "Cross-Browser Compatibility",
      "Fast Loading Assets",
    ],
    isPopular: false,
  },
  {
    _id: "srv-7",
    title: "Portfolio Websites",
    description:
      "Personal brand showcases designed to win clients and impress recruiters. High-fidelity visuals, compelling case studies, and modern interactions that set you apart.",
    icon: "fluent:person-board-24-filled",
    price: "Custom Quote",
    features: [
      "Tailored Brand Aesthetic",
      "SEO Optimization",
      "Contact Forms Integration",
      "Dynamic Project Showcases",
    ],
    isPopular: false,
  },
  {
    _id: "srv-8",
    title: "Final Year Projects",
    description:
      "Comprehensive guidance and custom-built web applications for academic projects. Complete with documentation, deployment support, and clean, well-structured codebases.",
    icon: "fluent:hat-graduation-24-filled",
    price: "Custom Quote",
    features: [
      "Well-Structured Code",
      "Database Schema Documentation",
      "Walkthrough Support",
      "Clean Coding Standards",
    ],
    isPopular: false,
  },
  {
    _id: "srv-9",
    title: "Freelance Web Solutions",
    description:
      "Full-cycle contract development with fast turnaround, premium quality, and transparent communication. From concept to launch — I've got you covered.",
    icon: "fluent:handshake-24-filled",
    price: "Custom Quote",
    features: [
      "Flexible Requirements",
      "On-Time Delivery",
      "SEO & Performance Focus",
      "Long-Term Collaboration",
    ],
    isPopular: false,
  },
];

// ============================================================
// TESTIMONIALS DATA
// ============================================================
export const testimonialsData = [
  {
    _id: "test-1",
    clientName: "Alex Morgan",
    clientRole: "Startup Founder",
    quote:
      "Exceptional MERN stack skills. Vinoth delivered the project ahead of schedule with incredibly clean code and a flawless user interface. He understood our vision perfectly and translated it into a product that exceeded expectations.",
    rating: 5,
  },
  {
    _id: "test-2",
    clientName: "Sarah Chen",
    clientRole: "Creative Director",
    quote:
      "Translated our complex Figma designs into pixel-perfect React components. The attention to detail on the hover animations and micro-interactions is exactly what we envisioned. A true frontend craftsman.",
    rating: 5,
  },
  {
    _id: "test-3",
    clientName: "David Miller",
    clientRole: "Product Manager",
    quote:
      "Incredibly reliable freelance partner. Outstanding communication throughout the entire development process, solid API integration work, and he proactively suggested improvements we hadn't even considered.",
    rating: 5,
  },
];

// ============================================================
// EDUCATION DATA
// ============================================================
export const educationData = [
  {
    _id: "edu-1",
    institution: "PPG College of Arts & Science",
    degree: "Bachelor of Science - Computer Science",
    year: "2022 - Present",
    description:
      "As a Computer Science graduate, I possess strong problem-solving and analytical skills. My academic journey has strengthened my foundation in programming, web development, databases, and software engineering. Combining technical expertise with a passion for innovation, I continuously explore modern technologies and build practical solutions that bridge creativity and technology.",
  },
  {
    _id: "edu-2",
    institution: "KVK Government Boys Higher Secondary School",
    degree: "HSC - XII Standard (Computer Science)",
    year: "2021 - 2022",
    description:
      "Completed Higher Secondary Education with a focus on Computer Science. Developed critical thinking, logical reasoning, and problem-solving abilities while gaining foundational knowledge in computing concepts and technology.",
  },
  {
    _id: "edu-3",
    institution: "KVK Government Boys Higher Secondary School",
    degree: "SSLC - X Standard",
    year: "2019 - 2020",
    description:
      "Successfully completed Secondary School Education, building a strong academic foundation across core subjects. This stage helped develop discipline, time management, and a commitment to continuous learning and personal growth.",
  },
];
// ============================================================
// CERTIFICATIONS DATA
// ============================================================
export const certificationsData = [
  {
    _id: "cert-1",
    name: "Advanced React Patterns",
    issuer: "Frontend Masters",
    date: "2023-03-15",
  },
  {
    _id: "cert-2",
    name: "MongoDB Node.js Developer",
    issuer: "MongoDB University",
    date: "2022-08-20",
  },
];

// ============================================================
// CONTACT DEFAULT DATA
// ============================================================
export const contactDefaultData = {
  email: "hello@devfolio.com",
  phone: "+1 (555) 123-4567",
  location: "Remote / Worldwide",
};

// ============================================================
// STATS DATA — for StatsSection
// ============================================================
export const statsData = [
  {
    _id: "stat-1",
    label: "Projects Delivered",
    value: 25,
    suffix: "+",
    icon: "briefcase",
  },
  {
    _id: "stat-2",
    label: "Happy Clients",
    value: 15,
    suffix: "+",
    icon: "users",
  },
  {
    _id: "stat-3",
    label: "Years Experience",
    value: 3,
    suffix: "+",
    icon: "calendar",
  },
  {
    _id: "stat-4",
    label: "Technologies",
    value: 20,
    suffix: "+",
    icon: "code",
  },
];

// ============================================================
// WHY HIRE ME DATA — for WhyHireMeSection
// ============================================================
export const whyHireMeData = [
  {
    _id: "why-1",
    title: "Clean, Scalable Code",
    description:
      "Every line of code I write is production-ready, well-documented, and built to scale. No shortcuts, no technical debt.",
    icon: "code",
  },
  {
    _id: "why-2",
    title: "On-Time Delivery",
    description:
      "I respect deadlines. Projects are delivered on schedule with clear milestones and transparent progress tracking throughout.",
    icon: "clock",
  },
  {
    _id: "why-3",
    title: "24/7 Communication",
    description:
      "Stay informed at every stage. I provide regular updates, respond quickly, and ensure you're never left guessing.",
    icon: "message",
  },
  {
    _id: "why-4",
    title: "Post-Launch Support",
    description:
      "My relationship with clients doesn't end at launch. I provide ongoing maintenance, bug fixes, and feature updates.",
    icon: "shield",
  },
];

// ============================================================
// PROCESS DATA — for ProcessSection
// ============================================================
export const processData = [
  {
    _id: "proc-1",
    step: 1,
    title: "Discovery",
    description:
      "We start with a deep-dive into your requirements, goals, target audience, and technical constraints.",
  },
  {
    _id: "proc-2",
    step: 2,
    title: "Design",
    description:
      "I create wireframes and high-fidelity mockups, iterating with your feedback until the design is perfect.",
  },
  {
    _id: "proc-3",
    step: 3,
    title: "Develop",
    description:
      "Clean, tested code is written with regular demos and progress updates so you're always in the loop.",
  },
  {
    _id: "proc-4",
    step: 4,
    title: "Deploy & Support",
    description:
      "Your application goes live with optimized performance, and I provide ongoing support post-launch.",
  },
];

// ============================================================
// FAQ DATA — for FAQSection (AEO optimized)
// ============================================================
export const faqData = [
  {
    _id: "faq-1",
    question: "Who is Vinoth Kumar M?",
    answer:
      "Vinoth Kumar M is a Full Stack Web Developer and MERN Stack specialist with 3+ years of experience building high-performance web applications. He specializes in React.js, Node.js, Express.js, MongoDB, Next.js, and Tailwind CSS. Based in India and available for remote freelance projects worldwide.",
  },
  {
    _id: "faq-2",
    question: "What services do you offer?",
    answer:
      "I offer full stack web development, MERN stack application development, frontend React development, admin dashboard creation, API integrations, responsive website design, portfolio websites, and freelance web solutions. I work with startups, businesses, and individuals to deliver custom, high-quality web products.",
  },
  {
    _id: "faq-3",
    question: "What is your tech stack?",
    answer:
      "My primary tech stack is the MERN Stack — MongoDB, Express.js, React.js, and Node.js. I also work extensively with Next.js, Tailwind CSS, Framer Motion, Firebase, Supabase, and various third-party APIs. For version control and deployment, I use Git, GitHub, Vercel, and cloud platforms.",
  },
  {
    _id: "faq-4",
    question: "How much does a website cost?",
    answer:
      "Project costs vary based on complexity, features, and timeline. A simple landing page starts from a few hundred dollars, while a full-stack web application with authentication, database, and admin panel can range higher. I provide detailed, transparent quotes after understanding your specific requirements.",
  },
  {
    _id: "faq-5",
    question: "Why should I hire Vinoth Kumar M?",
    answer:
      "I combine strong technical expertise in the MERN stack with a keen eye for design and user experience. I deliver clean, scalable code on time, maintain clear communication throughout the project, and provide post-launch support. My clients consistently rate me 5 stars for quality and professionalism.",
  },
  {
    _id: "faq-6",
    question: "How do I start a project with you?",
    answer:
      "Getting started is simple: reach out via the contact form on this website, send me an email, or message me on WhatsApp. We'll schedule a free discovery call to discuss your requirements, timeline, and budget. I'll then provide a detailed proposal and we can kick off development immediately.",
  },
  {
    _id: "faq-7",
    question: "Do you work with international clients?",
    answer:
      "Absolutely! I work with clients from around the world and am experienced with remote collaboration across different time zones. I use tools like Slack, Google Meet, and GitHub for seamless communication and project management regardless of location.",
  },
  {
    _id: "faq-8",
    question: "What is your typical project timeline?",
    answer:
      "A simple landing page typically takes 1-2 weeks, a multi-page business website takes 2-4 weeks, and a full-stack web application with backend, database, and admin panel takes 4-8 weeks depending on complexity. I always provide realistic timelines and stick to deadlines.",
  },
];
