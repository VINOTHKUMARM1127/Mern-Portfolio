import { useRef, useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
export default function CopyButton({ value, label }) {
 const [message,setMessage]=useState("");
 const timer=useRef(null);
 useEffect(()=>()=>clearTimeout(timer.current),[]);
 const copy=async()=>{
  try { await navigator.clipboard.writeText(value); setMessage("Copied"); }
  catch { setMessage("Copy unavailable. Please select the text manually."); }
  clearTimeout(timer.current);timer.current=setTimeout(()=>setMessage(""),4000);
 };
 return <div className="flex items-center gap-2"><button onClick={copy} type="button" aria-label={`Copy ${label}`} className="p-2 rounded-lg border border-ink/10 text-ink/70 hover:bg-ink/10">{message === "Copied" ? <Check size={16}/> : <Copy size={16}/>}</button><span className="text-xs text-ink/70" role="status">{message}</span></div>;
}
