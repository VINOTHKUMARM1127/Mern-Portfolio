import { memo } from "react";
import { TbSearch, TbPalette, TbCode, TbRocket } from "react-icons/tb";
import SectionHeader from "../components/ui/SectionHeader";
import { processData } from "../data/staticData";
const icons=[TbSearch,TbPalette,TbCode,TbRocket];
function ProcessSection(){return <section id="process" className="section-block" aria-label="My development process"><div className="max-w-7xl mx-auto px-6"><SectionHeader badge="Process" badgeIcon={TbRocket} title="How I Work" subtitle="A clear process from the first conversation to launch and support."/><ol className="process-grid">{processData.map((step,index)=>{const Icon=icons[index]||TbCode;return <li key={step._id} className="process-step"><div className="flex items-center justify-between mb-5"><span className="process-step__icon"><Icon size={23} aria-hidden="true"/></span><span className="text-sm font-semibold text-ink/40" aria-hidden="true">0{step.step}</span></div><h3 className="text-lg font-bold mb-3">{step.title}</h3><p className="text-sm text-ink/70 leading-relaxed">{step.description}</p></li>})}</ol></div></section>}
export default memo(ProcessSection);
