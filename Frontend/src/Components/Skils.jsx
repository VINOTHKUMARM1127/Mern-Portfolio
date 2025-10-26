import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";

const Skils = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchskilldata = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/get-skills`
      );
      setData(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchskilldata();
  }, []);

  const skeleton = () => {
    return (
      <div className="flex justify-center gap-3 flex-wrap">
        {Array.from({ length: 6 }).map((sk, ke) => (
          <div
            key={ke}
            className="rounded-lg px-6 py-3 bg-gray-600 w-28 h-10 mb-3 opacity-60 animate-pulse"
          ></div>
        ))}
      </div>
    );
  };

  const Category = ["Frontend","Backend","Others"]

  return (
    <div className="mt-10 w-[90%] sm:w-[90%] lg:w-[80%] mx-auto">
      <div className="text-center text-[2em] font-bold mt-3">Skills</div>
      <div className="text-center text-[1.2em] opacity-60 mt-5 mb-14 px-10">
        Here are some of my skills on which I have learnt.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Category.map((sk,key)=>(
        <section key={key} className="border border-[#b14fc4] bg-[#171721] rounded-2xl p-6 opacity-90 shadow-[0_0_10px_#d607ed] hover:shadow-[0_0_20px_#d607ed] transition-all duration-300">
          <div className="text-center text-[1.6em] my-4 font-bold text-white">
            {sk}
          </div>
          {loading ? (
            skeleton()
          ) : (
            <div className="flex justify-center gap-3 flex-wrap">
              {data
                .filter((fill) => fill.Category === sk)
                .map((sk, key) => (
                  <div key={key}>
                    <h3 className="border border-white rounded-lg px-3 py-2 flex justify-center items-center gap-2 text-white hover:bg-[#b14fc4]/50 transition-all duration-200">
                      <Icon
                        icon={sk.Icon}
                        width="30"
                        height="30"
                        className="flex-shrink-0"
                      />
                      {sk.Skill}
                    </h3>
                  </div>
                ))}
            </div>
          )}
        </section>
        ))}

      </div>
    </div>
  );
};

export default Skils;
