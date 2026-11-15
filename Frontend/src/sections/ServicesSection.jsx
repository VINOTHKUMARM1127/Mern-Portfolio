import { Link } from "react-router-dom";
import { servicesData } from "../data/staticData";
import SectionHeader from "../components/ui/SectionHeader";
export default function ServicesSection() {
 return <section id="services" className="py-24"><div className="max-w-7xl mx-auto px-6">
 <SectionHeader title="How I Can Help" subtitle="Practical web development for small businesses and personal projects." />
 <div className="grid md:grid-cols-3 gap-6">{servicesData.slice(0,3).map(service => <article key={service._id} className="glass-card p-7 flex flex-col">
 <h3 className="text-xl font-bold mb-4">{service.title}</h3><p className="text-ink/60 leading-relaxed flex-1">{service.description}</p>
 <Link to={`/services#${service._id}`} className="mt-6 text-violet-300 underline underline-offset-4">Explore this service →</Link></article>)}</div>
 </div></section>;
}
