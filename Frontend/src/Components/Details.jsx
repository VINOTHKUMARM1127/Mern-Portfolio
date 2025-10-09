import React, { useEffect, useState } from "react";

const Details = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className={
        "fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 mt-10 py-36"
      }
    >
      <div className="relative bg-[#191924] p-4 rounded-lg w-[80vw] md:w-[50vw] max-h-[80vh] h-[70vh] text-center overflow-y-auto sb">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
        >
          ✕
        </button>
        <div className="p-4">
          <img
            src={project.Image}
            alt=""
            className="max-h-[90%] rounded-lg mx-auto my-0 mb-2"
          />

          <div className="text-[1.4em] mt-1 opacity-90 font-extrabold text-start">
            {project.ProjectName}
          </div>
          <div className="text-[0.8em] opacity-50 mb-1 text-start">
            {project.Year}
          </div>

          <div className="py-3 flex gap-5 text-[0.9em] my-1 text-[#792bff]">
            {project.Tech?.split(",").map((tech, idx) => (
              <div key={idx} className="bg-[#854ce61F] rounded-md px-2">
                {tech}
              </div>
            ))}
          </div>

          <div className="text-[1em] mb-5 opacity-70 text-justify">
            {project.Description}
          </div>

          <div className="flex justify-around">
            <button
              onClick={() => window.open(project.Link)}
              className="bg-violet-600 w-full mr-2 rounded-lg py-2 px-4 mt-2 hover:bg-slate-500 font-bold"
            >
              View Code
            </button>
            <button
              onClick={() => window.open(project.Github)}
              className="bg-violet-600 w-full ml-2 rounded-lg py-2 px-4 mt-2 hover:bg-slate-500 font-bold"
            >
              View LiveApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
