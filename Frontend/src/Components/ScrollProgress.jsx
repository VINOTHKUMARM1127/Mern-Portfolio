import React, { useState, useEffect } from "react";

const ScrollProgress = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollPercentage(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
  }, []);


  return (
    <div className={`fixed bottom-5 right-5 z-50 ${scrollPercentage < 20 ? 'hidden' : 'block'}`}>
      <div className=" text-[#393838] text-[0.8em] font-black bg-white rounded-full w-10 h-10 flex justify-center items-center">
        {Math.round(scrollPercentage)}%
      </div>
    </div>
  );
};

export default ScrollProgress;
