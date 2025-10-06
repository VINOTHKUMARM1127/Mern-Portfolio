import React from "react";
import {edu} from '../Data'


const Education = () => {
  return (
    <div className="mt-[5%] w-screen xl:w-[80%] mx-auto my-0">
      <div className="text-center text-[2em] font-bold mt-3">Education</div>
      <div className="text-center text-[1.2em] opacity-55 mt-5 mb-10 px-10">
        My education has been a journey of self-discovery and growth. My
        educational details are as follows.
      </div>
      {edu.map((item,id)=>(
        <div key={id} className="border border-[#b14fc4] rounded-xl w-[70%] md:w-[70%] py-4 px-2 mx-auto my-0 opacity-80 shadow-[0_0_6px_#d607ed] mb-8">
        <div className=" px-2 md:px-5 text-[1.2em] font-bold opacity-90 ">{item.name}</div>
        <div className=" px-2 md:px-5 text-[0.9em]  opacity-60">{item.study}</div>
        <div className=" px-2 md:px-5 text-[0.8em] opacity-50 mb-1">{item.year}</div>
        <div className=" px-2 md:px-5 text-[0.9em] opacity-70 text-justify">{item.Description}</div>
      </div>
      ))}

      

    </div>
  );
};

export default Education;
