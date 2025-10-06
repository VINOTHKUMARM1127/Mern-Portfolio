import React, { useState } from "react";
import {projects} from "../Data";
import Details from "./Details";

const Projects = () => {

  const [selectedProject, setSelectedProject] = useState(null)

  const click = (projects) => {
    setSelectedProject(projects)
  }

  return (
    <div className="mt-[5%] w-[90%] lg:w-[70%] mx-auto my-0zz">
      <div className="text-center text-[2em] font-bold mt-3">Projects</div>
      <div className="text-center text-[1.2em] opacity-55 mt-5 mb-10 px-10">
        I have worked on a wide range of projects. From websites to web apps.
        Here are some of my projects.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[100%] mx-auto my-0">
      {projects.map((item,id)=>(
        <div key={id} onClick={()=> click(item)} className="border border-[#1f1f1f] bg-[#171721] rounded-xl py-4 px-2 mx-auto my-0 opacity-80 shadow-[0_0_6px_#1f1f1f] mb-8 hover:bs hover:scale-105">
        <img src={item.poster} alt="" className="rounded-lg overflow-hidden min-h-[180px] min-w-[220px] px-1 mb-2"/>
        <div className="px-2 py-1 flex gap-3 text-[0.8em] my-1 text-[#9557ff]">
            <div className=" bg-[#854ce61F] rounded-md px-2 ">{item.tech[0]}</div>
            <div className=" bg-[#854ce61F] rounded-md px-2 ">{item.tech[1]}</div>
          </div>
          <div className="px-4 text-[1.4em] mt-1 font-bold opacity-90 ">{item.title}</div>
          <div className="px-4 text-[0.8em] opacity-50 mb-1">{item.year}</div>
          <div className="px-4 text-[1em] mb-5 opacity-70 text-justify line-clamp-3">{item.Description}</div>
        </div>
      ))}
      </div>
      
      {selectedProject && <Details project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div> 
  );
};

export default Projects;
