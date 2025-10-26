import React, { useEffect, useState } from "react";

const Explore = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("exploreSeen");
    if (seen == "true") {
      setVisible(false);
    }
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [visible]);

  const handleExplore = () => {
    setVisible(false);
    sessionStorage.setItem("exploreSeen", "true");
  };
  return (
    <div
      className={`w-[100vw] h-full ${
        visible ? "block fixed z-50 top-0 bg-[#0000008e]" : "hidden"
      }`}
    >
      <div className="sticky text-center w-[80vw] md:w-[40vw] mx-auto my-0 py-7 top-1/4 bg-gray-800 rounded-xl hover:scale-[101%] transform transition duration-300 px-10">
        <div className="pb-2 text-[1.5em] font-extrabold text-violet-600">
          Welcome to My World of Creation!
        </div>
        <div className="opacity-60">
          <div className="pb-2 ">
            Hello there! I'm excited to share my work with you.
          </div>
          <div className="pb-2 ">
            Feel free to browse through my projects and learn more about my
            skills and experiences.
          </div>
          <div className="pb-2 ">
            If you have any questions or would like to collaborate, don't
            hesitate to reach out!
          </div>
          <div className="pb-2 ">Looking forward to connect!</div>
        </div>
        <button
          onClick={handleExplore}
          className="bg-violet-600 rounded-lg py-2 px-4 mt-2 hover:bg-slate-500"
        >
          Explore
        </button>
      </div>
    </div>
  );
};

export default Explore;
