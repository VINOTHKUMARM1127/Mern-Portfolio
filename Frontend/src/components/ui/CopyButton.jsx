import { useRef, useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
export default function CopyButton({value,label}) {
 const [message,setMessage]=useState("");const timer=useRef(null);
 useEffect(()=>()=>clearTimeout(timer.current),[]);
 const copy=async()=>{try{await navigator.clipboard.writeText(value);setMessage("Copied");}catch{setMessage("Copy unavailable. Select the text manually.");}clearTimeout(timer.current);timer.current=setTimeout(()=>setMessage(""),4000);};
 const failed=message && message!=="Copied";
 return <div className="copy-control"><button type="button" onClick={copy} aria-label={`Copy ${label}`} className="copy-button">{message==="Copied"?<Check size={15} aria-hidden="true"/>:<Copy size={15} aria-hidden="true"/>}<span>{message==="Copied"?"Copied":"Copy"}</span></button><span role="status" className={failed?"copy-error":"sr-only"}>{message}</span></div>;
}
