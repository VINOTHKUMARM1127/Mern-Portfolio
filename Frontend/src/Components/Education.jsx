import React, { useEffect, useState } from "react";
import axios from "axios";

const Education = () => {
  const [eduData, setEduData] = useState([]);
  const [loading, setLoading] = useState(true);

  const FetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/get-education`
      );
      setEduData(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  const SkeletonLoading = ()=>{
    return Array.from({length:3}).map((item,i)=>(
          <div key={i} className="animate-pulse border border-[#b14fc4] rounded-xl w-[70%] md:w-[70%] py-4 px-2 mx-auto my-0 opacity-80 shadow-[0_0_6px_#d607ed] mb-8">
          <div className=" px-2 md:px-5 rounded-md bg-gray-600 w-1/3 h-5 mb-2 font-bold opacity-90 "></div>
          <div className=" px-2 md:px-5 rounded-md bg-gray-600 w-1/4 h-3 mb-2 opacity-60"></div>
          <div className=" px-2 md:px-5 rounded-md bg-gray-600 w-1/6 h-3 mb-2 opacity-60"></div>
          <div className=" px-2 md:px-5 rounded-md bg-gray-600 w-full h-3 mb-3 opacity-60"></div>
          <div className=" px-2 md:px-5 rounded-md bg-gray-600 w-full h-3 mb-3 opacity-50 "></div>
          <div className=" px-2 md:px-5 rounded-md bg-gray-600 w-full h-3 mb-2.5 opacity-70 text-justify"></div>
        </div>
  ))}

  return (
    <div className="mt-[5%] w-screen xl:w-[80%] mx-auto my-0">
      <div className="text-center text-[2em] font-bold mt-3">Education</div>
      <div className="text-center text-[1.2em] opacity-55 mt-5 mb-10 px-10">
        My education has been a journey of self-discovery and growth. My
        educational details are as follows.
      </div>
      {loading ? (
        SkeletonLoading()
      ) : (
        eduData.sort((a,b)=> a.Order - b.Order).map((item, id) => (
          <div
            key={id}
            className="border border-[#b14fc4] rounded-xl w-[70%] md:w-[70%] py-4 px-2 mx-auto my-0 opacity-80 shadow-[0_0_6px_#d607ed] mb-8"
          >
            <div className=" px-2 md:px-5 text-[1.2em] font-bold opacity-90 ">
              {item.CollegeName}
            </div>
            <div className=" px-2 md:px-5 text-[0.9em]  opacity-60">
              {item.Degree}
            </div>
            <div className=" px-2 md:px-5 text-[0.8em] opacity-50 mb-1">
              {item.Year}
            </div>
            <div className=" px-2 md:px-5 text-[0.9em] opacity-70 text-justify">
              {item.Description}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Education;
