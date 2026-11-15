import { lazy, Suspense, useEffect, useState, useRef, useCallback } from "react";
const Insights=lazy(()=>import("@vercel/speed-insights/react").then(module=>({default:module.SpeedInsights})));
const key="portfolio-performance-consent";
export default function PerformanceConsent(){
 const enabled=import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING === "true";
 const [choice,setChoice]=useState(null);
 const allowed=useRef(false);allowed.current=choice === "accepted";
 const beforeSend=useCallback(event=>{if(!allowed.current)return null;try{const url=new URL(event.url);return {...event,url:url.origin+url.pathname};}catch{return null;}},[]);
 useEffect(()=>{try{setChoice(localStorage.getItem(key));}catch{/* Preferences are optional. */}},[]);
 if(!enabled)return null;
 const select=value=>{try{localStorage.setItem(key,value);}catch{/* Use this session only. */}setChoice(value);};
 return <>{choice === "accepted" && <Suspense fallback={null}><Insights beforeSend={beforeSend}/></Suspense>}
 {choice === null ? <aside aria-label="Optional performance monitoring" className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-[160] rounded-2xl border border-ink/20 bg-panel p-5 shadow-xl"><p className="font-semibold mb-2">Help improve loading speed?</p><p className="text-sm text-ink/70">Optional performance measurements help identify slow pages. Your form content and URL query parameters are not sent.</p><div className="flex flex-wrap gap-3 mt-4"><button className="px-4 py-2 rounded-lg bg-violet-600 text-white" onClick={()=>select("accepted")}>Allow measurements</button><button className="px-4 py-2 rounded-lg border border-ink/20" onClick={()=>select("declined")}>No thanks</button></div></aside> : <button type="button" className="fixed bottom-1 left-3 z-[95] text-xs rounded bg-surface/95 text-ink/70 px-2 py-1" onClick={()=>setChoice(null)}>Privacy settings</button>}</>;
}
