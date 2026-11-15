import { Link } from "react-router-dom";
import { ArrowRight, Code2, LayoutTemplate, Database } from "lucide-react";
import { servicesData } from "../data/staticData";
import SectionHeader from "../components/ui/SectionHeader";
const icons=[Code2,LayoutTemplate,Database];
export default function ServicesSection() {
 return <section id="services" className="section-block"><div className="max-w-7xl mx-auto px-6">
 <SectionHeader title="How I Can Help" subtitle="Practical web development for small businesses and personal projects." />
 <div className="grid md:grid-cols-3 gap-5">{servicesData.slice(0,3).map((service,index)=>{const Icon=icons[index];return <article key={service._id} className="service-preview flex flex-col p-6 md:p-7"><div className="service-preview__icon"><Icon size={22} aria-hidden="true"/></div>
 <h3 className="text-xl font-bold mb-3">{service.title}</h3><p className="text-ink/70 leading-relaxed flex-1">{service.description}</p>
 <Link to={`/services#${service._id}`} className="site-button site-button--secondary mt-6">View service<ArrowRight size={17} aria-hidden="true"/></Link></article>})}</div>
 </div></section>;
}
