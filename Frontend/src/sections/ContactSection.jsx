import { memo } from "react";
import { useSearchParams } from "react-router-dom";
import { Mail, Phone, ArrowUpRight, MapPin } from "lucide-react";
import { TbBrandWhatsapp } from "react-icons/tb";
import { usePortfolio } from "../hooks/usePortfolio";
import SectionHeader from "../components/ui/SectionHeader";
import CopyButton from "../components/ui/CopyButton";
import { getWhatsAppUrl } from "../utils/contactUtils";
function ContactSection({standalone=false}) {
 const ChannelHeading=standalone?"h2":"h3";
 const {contact,social}=usePortfolio();const [search]=useSearchParams();
 const email=contact?.email||"vinothkumarm1127@gmail.com";
 const phone=contact?.phone||"+919344842329";
 const service=(search.get("service")||"").slice(0,200);
 const subject=service?`Project enquiry: ${service}`:"Website project enquiry";
 const mail=`mailto:${email}?subject=${encodeURIComponent(subject)}`;
 const whatsapp=getWhatsAppUrl(social?.whatsapp||contact?.whatsapp||phone,service?`Hi Vinoth, I'd like to discuss ${service}.`:"Hi Vinoth, I'd like to discuss a website project.");
 return <section id="contact" className="section-block" aria-label="Contact options"><div className="max-w-7xl mx-auto px-6">
 <SectionHeader headingLevel={standalone?"h1":"h2"} badge="Get in Touch" badgeIcon={Mail} title="Let's Work Together" subtitle="Choose the easiest way to reach me. Share a short project brief and your preferred timeline."/>
 {service && <p className="contact-service">Interested in: <strong>{service}</strong></p>}
 <div className="grid md:grid-cols-3 gap-5">
 <article className="contact-channel"><span className="contact-channel__icon"><Mail size={23} aria-hidden="true"/></span><ChannelHeading className="contact-channel__title">Email</ChannelHeading><p className="contact-channel__description">Send your project details or collaboration enquiry.</p><div className="contact-channel__value"><a href={mail} className="contact-address">{email}</a><CopyButton value={email} label="email address"/></div><a className="site-button site-button--primary mt-auto" href={mail}>Write an email<ArrowUpRight size={17} aria-hidden="true"/></a></article>
 <article className="contact-channel"><span className="contact-channel__icon"><TbBrandWhatsapp size={25} aria-hidden="true"/></span><ChannelHeading className="contact-channel__title">WhatsApp</ChannelHeading><p className="contact-channel__description">Start a quick conversation about your requirements.</p><div className="contact-channel__value"><span className="contact-address">{phone}</span><span className="text-xs text-ink/50">Quick chat</span></div><a className="site-button site-button--primary mt-auto" href={whatsapp} target="_blank" rel="noopener noreferrer">Chat on WhatsApp<ArrowUpRight size={17} aria-hidden="true"/></a></article>
 <article className="contact-channel"><span className="contact-channel__icon"><Phone size={23} aria-hidden="true"/></span><ChannelHeading className="contact-channel__title">Phone</ChannelHeading><p className="contact-channel__description">Call to discuss your project scope and next steps.</p><div className="contact-channel__value"><a href={`tel:${phone.replace(/[^+\d]/g,"")}`} className="contact-address">{phone}</a><CopyButton value={phone} label="phone number"/></div><a className="site-button site-button--primary mt-auto" href={`tel:${phone.replace(/[^+\d]/g,"")}`}>Call me<ArrowUpRight size={17} aria-hidden="true"/></a></article>
 </div><div className="contact-note"><span><MapPin size={16} aria-hidden="true"/>{contact?.location||"Tamil Nadu, India"}</span><p>Email opens your email app; WhatsApp opens a chat. No message is sent until you send it there.</p></div>
 </div></section>;
}
export default memo(ContactSection);
