export const skillsData = [
  // Frontend
  { _id: "html", title: "HTML", category: "Frontend", icon: "logos:html-5" },
  { _id: "css", title: "CSS", category: "Frontend", icon: "logos:css-3" },
  { _id: "js", title: "JavaScript", category: "Frontend", icon: "logos:javascript" },
  { _id: "react", title: "ReactJS", category: "Frontend", icon: "logos:react" },
  { _id: "nextjs", title: "NextJS", category: "Frontend", icon: "logos:nextjs-icon" },
  { _id: "tailwind", title: "Tailwind CSS", category: "Frontend", icon: "logos:tailwindcss-icon" },
  { _id: "framer", title: "Framer Motion", category: "Frontend", icon: "logos:framer" },
  // Backend
  { _id: "node", title: "NodeJS", category: "Backend", icon: "logos:nodejs-icon" },
  { _id: "express", title: "ExpressJS", category: "Backend", icon: "simple-icons:express" },
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

export const experienceData = [
  {
    _id: "exp-1",
    role: "Full Stack Developer",
    company: "Freelance / Self-Employed",
    startDate: "2022-01-01",
    endDate: null,
    isCurrent: true,
    description: "Developing scalable full-stack MERN web applications, seamlessly integrating complex REST APIs, and leading front-end architectural decisions using Next.js and Tailwind CSS for client projects globally.",
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
  },
  {
    _id: "exp-2",
    role: "Frontend Web Developer",
    company: "Tech Agency",
    startDate: "2020-05-01",
    endDate: "2021-12-01",
    isCurrent: false,
    description: "Spearheaded the development of visually stunning, highly responsive websites. Implemented pixel-perfect UI designs from Figma into Framer Motion animations and React components.",
    technologies: ["JavaScript", "React.js", "Figma", "CSS", "HTML"],
  }
];

export const servicesData = [
  {
    _id: "srv-1",
    title: "Full Stack Web Development",
    description: "End-to-end scalable web applications tailored to your requirements, built with modern backend systems and highly interactive frontends.",
    icon: "fluent:window-dev-tools-24-filled",
    price: "Custom Quote",
    features: ["Node.js & Express APIs", "MongoDB / SQL databases", "Secure Authentication & JWT", "Cloud Deployment & Scaling"],
    isPopular: true,
  },
  {
    _id: "srv-2",
    title: "Frontend Development",
    description: "Pixel-perfect, engaging, and highly responsive user interfaces built with React, Next.js, and modern CSS systems.",
    icon: "fluent:window-sparkle-24-filled",
    price: "Custom Quote",
    features: ["React & Next.js", "Tailwind & Vanilla CSS", "Framer Motion Animations", "Responsive Mobile-First UI"],
    isPopular: false,
  },
  {
    _id: "srv-3",
    title: "MERN Stack Applications",
    description: "Robust database-driven applications utilizing MongoDB, Express.js, React, and Node.js for modern high-performance web products.",
    icon: "fluent:database-link-24-regular",
    price: "Custom Quote",
    features: ["Custom MongoDB Schema Design", "RESTful Routing", "State Management (Redux/Context)", "Seamless CRUD Operations"],
    isPopular: false,
  },
  {
    _id: "srv-4",
    title: "Admin Dashboard Development",
    description: "Custom admin portals, analytics panels, and content management interfaces to easily control and track your business data.",
    icon: "fluent:board-24-filled",
    price: "Custom Quote",
    features: ["Data Visualizations & Charts", "User Roles & Permissions", "Bulk Data Operations", "Responsive Grid Layouts"],
    isPopular: false,
  },
  {
    _id: "srv-5",
    title: "API Integration",
    description: "Seamlessly connect payment processors, external software systems, social networks, and database services to your platform.",
    icon: "fluent:plug-connected-24-filled",
    price: "Custom Quote",
    features: ["Stripe / PayPal Gateway", "Firebase & Auth0 Auth", "Third-Party REST/GraphQL APIs", "Webhooks & Realtime Sync"],
    isPopular: false,
  },
  {
    _id: "srv-6",
    title: "Responsive Website Design",
    description: "Fluid and dynamic layouts designed to look stunning on any screen size, from larger desktop monitors down to smartphones.",
    icon: "fluent:phone-laptop-24-filled",
    price: "Custom Quote",
    features: ["Flexbox & Grid Layouts", "Media Query Optimization", "Cross-Browser Compatibility", "Fast Loading Assets"],
    isPopular: false,
  },
  {
    _id: "srv-7",
    title: "Portfolio Websites",
    description: "Personal brand showcases designed to attract clients and employers with high-fidelity visuals, case studies, and modern interactions.",
    icon: "fluent:person-board-24-filled",
    price: "Custom Quote",
    features: ["Tailored Brand Aesthetic", "Fast SEO Auditing", "Contact Forms Integration", "Dynamic Projects Showcases"],
    isPopular: false,
  },
  {
    _id: "srv-8",
    title: "Final Year Projects",
    description: "Comprehensive guidance and custom web application development for college and university student projects, including complete codebases.",
    icon: "fluent:hat-graduation-24-filled",
    price: "Custom Quote",
    features: ["Well-Structured Code", "Database Schema Documentation", "Walkthrough Support", "Clean Coding Standards"],
    isPopular: false,
  },
  {
    _id: "srv-9",
    title: "Freelance Web Solutions",
    description: "Full-cycle contract development offering fast turnaround, premium quality, continuous communication, and post-delivery assistance.",
    icon: "fluent:handshake-24-filled",
    price: "Custom Quote",
    features: ["Flexible Requirements", "On-Time Delivery", "SEO & Performance Focus", "Long-Term Collaboration"],
    isPopular: false,
  }
];

export const testimonialsData = [
  {
    _id: "test-1",
    clientName: "Alex Morgan",
    clientRole: "Startup Founder",
    quote: "Exceptional MERN stack skills. The project was delivered ahead of schedule with incredibly clean code and a flawless user interface.",
    rating: 5,
  },
  {
    _id: "test-2",
    clientName: "Sarah Chen",
    clientRole: "Creative Director",
    quote: "Translated our complex Figma designs into pixel-perfect React components. The attention to detail on the hover animations is exactly what we wanted.",
    rating: 5,
  },
  {
    _id: "test-3",
    clientName: "David Miller",
    clientRole: "Product Manager",
    quote: "Very reliable freelance partner. Excellent communication throughout the development process and solid API integration work.",
    rating: 5,
  }
];

export const educationData = [
  {
    _id: "edu-1",
    institution: "University of Technology",
    degree: "Bachelor of Science in Computer Science",
    year: "2018 - 2022",
    description: "Graduated with Honors. Specialized in Software Engineering, Web Technologies, and Database Systems.",
  }
];

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
  }
];

export const contactDefaultData = {
  email: "hello@devfolio.com",
  phone: "+1 (555) 123-4567",
  location: "Remote / Worldwide",
};
