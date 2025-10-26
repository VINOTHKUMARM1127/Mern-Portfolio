import React, { useEffect, useState } from "react";
import "../index.css";
import axios from "axios";

const Main = () => {
  const [Details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const FetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/get-details`
      );
      setDetails(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    } 
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <section className="bg-[#171721] cut flex justify-center py-[1em] md:py-[5em]">
      {loading ? (
        <div className="w-[100%] lg:w-[90%]  mx-auto flex flex-col-reverse lg:flex-row justify-evenly items-center animate-pulse">
          <div className="text-center lg:text-start w-[90vw] lg:w-[40vw]">
            <div className="text-[1.7em] md:text-[3em] font-black mt-4 md:mt-0">
              <div className="h-8 md:h-8 bg-gray-700 rounded w-1/2 mx-auto lg:mx-0 mb-7"></div>
              <div className="h-6 md:h-5 bg-gray-700 rounded w-3/4 mx-auto lg:mx-0 mb-7"></div>
            </div>
            <div className="h-4 md:h-5 bg-gray-700 rounded w-2/3 mx-auto lg:mx-0 mb-7"></div>
            <div className="h-3 md:h-4 bg-gray-700 rounded w-full mx-auto lg:mx-0 mb-5"></div>
            <div className="h-3 md:h-4 bg-gray-700 rounded w-full mx-auto lg:mx-0 mb-5"></div>
            <div className="h-3 md:h-4 bg-gray-700 rounded w-full mx-auto lg:mx-0 mb-5"></div>
            <div className="h-3 md:h-4 bg-gray-700 rounded w-full mx-auto lg:mx-0 mb-5"></div>
            <div className="text-[1.1em] bg-gradient-to-r from-purple-700 to-blue-700 w-fit px-8 py-4 rounded-lg mx-auto lg:mx-0 my-6 cursor-pointer hover:scale-105 ">
              Check Resume
            </div>
          </div>

          <div>
            <div className="w-[300px] md:w-[350px] h-[300px] md:h-[350px] bg-gray-700 rounded-full border-2 border-violet-600 mt-5 md:mt-0  shadow-[0_0_40px_purple]"></div>
          </div>
        </div>
      ) : (
        Details.map((item, key) => (
          <div
            key={key}
            className="w-[100%] lg:w-[90%] mx-auto my-0 flex flex-col-reverse lg:flex-row justify-evenly items-center"
          >
            <div className="text-center lg:text-start w-[90vw] lg:w-[40vw]">
              <div className="text-[1.6em] md:text-[3em] font-black mt-4 md:mt-0">
                <div className="text-[1.3em] md:text-[1em] ">
                  {item.Greetings}
                </div>
                <div className="text-[1.4em] md:text-[1em]">{item.Name}</div>
              </div>
              <div className="text-[1.8em] md:text-[2em]   ">
                {item.Desigination}
              </div>
              <div className="text-[1em] md:text-[1.3em] opacity-70 mt-3 text-justify">
                {item.Description}
              </div>
              <div
                onClick={() => window.open("item.ResumeLink")}
                className="text-[1.1em] bg-gradient-to-r from-purple-700 to-blue-700 w-fit px-8 py-4 rounded-lg mx-auto lg:mx-0 my-6 cursor-pointer hover:scale-105 "
              >
                Check Resume
              </div>
            </div>

            <div>
              <img
                src={item.Image}
                className="w-[300px] md:w-[350px] min-h-[300px] md:min-h-[350px] rounded-full border-2 border-violet-600 mt-5 md:mt-0  shadow-[0_0_40px_purple]"
              />
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default Main;
