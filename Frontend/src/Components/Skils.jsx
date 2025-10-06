import React from "react";
import { Icon } from "@iconify/react";

const Skils = () => {
  return (
    <div className="mt-5 w-screen xl:w-[80%] mx-auto my-0">
      <div className="text-center text-[2em] font-bold mt-3">Skills</div>
      <div className="text-center text-[1.2em] opacity-55 mt-5 mb-14 px-10">
        Here are some of my skills on which I have learnt.
      </div>
      <div className="flex justify-center md:justify-evenly text-center flex-col lg:flex-row">
        <div className="border border-[#b14fc4] bg-[#171721] rounded-xl px-0 mx-[10%] my-5 md:px-16 pb-8 lg:mx-0 lg:my-0 opacity-80 shadow-[0_0_10px_#d607ed]">
          <div className="text-center text-[1.8em] my-4 font-bold">Frontend</div>
          <div className="flex justify-center gap-5 flex-wrap px-1">
            <h3 className="border border-white rounded-lg px-3 py-2 flex justify-center items-center gap-2">
            <Icon icon="vscode-icons:file-type-html" width="32" height="32" />
              HTML</h3>
            <h3 className="border border-white rounded-lg px-3 py-2 flex justify-center items-center gap-2">
            <Icon icon="vscode-icons:file-type-css2" width="32" height="32" />
              CSS</h3>
            <h3 className="border border-white rounded-lg px-3 py-2 flex justify-center items-center gap-2">
            <Icon icon="logos:javascript" width="32" height="32" />
              JavaScript
            </h3>
          </div>
          <div className="flex justify-center gap-5 mt-3 flex-wrap px-1">
            
            <h3 className="border border-white rounded-lg px-3 py-2 flex justify-center items-center gap-2">
            <Icon icon="skill-icons:react-dark" width="32" height="32" />
              React Js
            </h3>
            <h3 className="border border-white rounded-lg px-3 py-2 flex justify-center items-center gap-2">
            <Icon icon="skill-icons:tailwindcss-dark" width="32" height="32" />
              Tailwind CSS
            </h3>
          </div>
        </div>

        <div className="border border-[#b14fc4] bg-[#171721] rounded-xl px-0 mx-[10%] my-5 md:px-10 pb-8 lg:mx-0 lg:my-0 opacity-80 shadow-[0_0_10px_#d607ed]">
        <div className="text-center text-[1.8em] my-4 font-bold">Others</div>
          <div className="flex justify-center gap-5 flex-wrap px-1">
            <h3 className="border border-white rounded-lg px-3 py-2 flex justify-center items-center gap-2">
            <Icon icon="devicon:git" width="32" height="32" />
              Git</h3>
            <h3 className="border border-white rounded-lg px-3 py-2 flex justify-center items-center gap-2">
            <Icon icon="fa6-brands:square-github" width="32" height="32" />
              GitHub</h3>
            <h3 className="border border-white rounded-lg px-3 py-2 flex justify-center items-center gap-2">
            <Icon icon="skill-icons:photoshop" width="32" height="32" />
              PhotoShop</h3>
          </div>
          <div className="flex justify-center gap-5 mt-3 flex-wrap px-1">
            <h3 className="border border-white rounded-lg px-3 py-2 flex justify-center items-center gap-2">
            <Icon icon="vscode-icons:file-type-netlify" width="32" height="32" />
              Netlify</h3>
            <h3 className="border border-white rounded-lg px-3 py-2 flex justify-center items-center gap-2">
            <Icon icon="skill-icons:vite-light" width="32" height="32" />
              Vite</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skils;
