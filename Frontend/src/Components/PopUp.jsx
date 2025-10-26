import React, { useEffect, useState } from "react";

const PopUp = ({ msg }) => {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (!visible) return;
      document.body.style.overflow = "hidden";
      const timer = setInterval(() => {
        setCount((p) => {
          if (p < 1) {
            setVisible(false);
            return 0;
          }
          return p - 1;
        });
      }, 1000);
      return () => {
        clearInterval(timer);
        document.body.style.overflow = "auto";
      };
    
  }, [visible]);

  return (
    <div
      className={`w-[100vw] h-full ${
        visible ? "block fixed z-50 top-0 bg-[#0000008e]" : "hidden"
      }`}
    >
      <div className="sticky text-center w-[80vw] md:w-[40vw] mx-auto my-0 py-7 top-1/4 bg-gray-800 rounded-xl hover:scale-[101%] transform transition duration-300 px-10">
        <div className="pb-2 text-[1.5em] font-extrabold text-violet-600">
          {msg}
        </div>
        <div className="absolute top-2 right-2 bg-violet-600 rounded-full py-0 px-2 hover:bg-slate-500">
          {count}
        </div>
        <div className="opacity-60">
          <div className="pb-2 "></div>
        </div>
        <button
          onClick={() => {
            setVisible(false);
          }}
          className="bg-violet-600 rounded-lg py-2 px-4 mt-2 hover:bg-slate-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PopUp;
