import { useCallback, useEffect, useState } from "react";
import { sanityConfigured } from "../sanity/client";
import { readPortfolio } from "../utils/portfolioResource";
import { mapPortfolioData } from "../utils/mapSanityData";
import snapshot from "../data/portfolioSnapshot.json";
const initialContent = mapPortfolioData(snapshot);
export default function usePortfolioContent() {
 const [data, setData] = useState(initialContent);
 const [error, setError] = useState(null);
 const refetch = useCallback(async () => {
   if (!sanityConfigured) return;
   try { setData(mapPortfolioData(await readPortfolio({force:true}))); setError(null); }
   catch { setError("Live content is temporarily unavailable. Saved portfolio content is shown."); }
 }, []);
 useEffect(() => {
   if (!sanityConfigured) return;
   let active = true;
   const refresh = () => {
     if (document.hidden) return;
     readPortfolio().then(raw => { if(active) { setData(previous => {
       const next = mapPortfolioData(raw);
       return JSON.stringify(previous) === JSON.stringify(next) ? previous : next;
     }); setError(null); } }).catch(() => {
       if(active) setError("Live content is temporarily unavailable. Saved portfolio content is shown.");
     });
   };
   refresh();
   window.addEventListener("focus", refresh);
   document.addEventListener("visibilitychange", refresh);
   return () => { active=false; window.removeEventListener("focus", refresh); document.removeEventListener("visibilitychange", refresh); };
 }, []);
 return {...data, loading:false, error, refetch, sanityConfigured};
}
