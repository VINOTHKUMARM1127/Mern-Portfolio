import { useEffect, useRef } from "react";
export default function ScrollProgress(){
 const ref=useRef(null);
 useEffect(()=>{
  let frame=0;
  const update=()=>{frame=0;const height=document.documentElement.scrollHeight-innerHeight;const progress=height>0?Math.min(1,Math.max(0,scrollY/height)):0;if(ref.current)ref.current.style.transform=`scaleX(${progress})`;};
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
  addEventListener("scroll",schedule,{passive:true});addEventListener("resize",schedule);schedule();
  return()=>{removeEventListener("scroll",schedule);removeEventListener("resize",schedule);cancelAnimationFrame(frame);};
 },[]);
 return <div ref={ref} aria-hidden="true" className="fixed top-0 inset-x-0 h-0.5 bg-violet-500 z-[150] origin-left pointer-events-none" style={{transform:'scaleX(0)'}}/>;
}
