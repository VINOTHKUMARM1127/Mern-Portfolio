import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageMeta } from "../../data/pageMeta";
export default function PageMeta(){
 const {pathname}=useLocation();
 useEffect(()=>{
 const meta=getPageMeta(pathname);document.title=meta.title;
 const set=(selector,key,value)=>document.head.querySelector(selector)?.setAttribute(key,value);
 set('link[rel="canonical"]','href',meta.url);set('meta[name="description"]','content',meta.description);set('meta[name="robots"]','content',meta.robots);
 for(const prefix of ['og','twitter']){const attr=prefix==='og'?'property':'name';for(const field of ['title','description','url'])set(`meta[${attr}="${prefix}:${field}"]`,'content',field==='url'?meta.url:meta[field]);}
 },[pathname]);return null;
}
