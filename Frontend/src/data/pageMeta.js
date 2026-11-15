export const siteOrigin = (import.meta.env.VITE_SITE_URL || "https://vinothkumarm27.vercel.app").replace(/\/$/, "");
export const routes = ["/", "/about", "/projects", "/services", "/contact", "/review"];
const titles={"/":"React & Full Stack Web Developer","/about":"About","/projects":"Projects","/services":"Web Development Services","/contact":"Contact","/review":"Leave a Review"};
export function getPageMeta(pathname){
 const label=titles[pathname] || "Page Not Found";
 return {title:`${label} | Vinoth Kumar M`,description:`${label} — Vinoth Kumar M, freelance React developer building business websites, CMS integrations and web applications.`,url:siteOrigin+pathname,robots:titles[pathname] && pathname!=="/review"?"index, follow":"noindex, nofollow"};
}
