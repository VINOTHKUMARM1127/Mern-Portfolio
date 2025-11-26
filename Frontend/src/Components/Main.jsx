import React, { useEffect, useState } from "react";
import "../index.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion } from "framer-motion";

const Main = ({ Details, loading }) => {
  const textVariant = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, type: "spring", stiffness: 120 },
    },
  };

  const parentVariant = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1, 
    transition: { 
      duration: 0.2,
      staggerChildren: 0.20,
    } 
  },
};


  return (
    <section className="bg-[#171721] cut flex justify-center pt-[1em] pb-[1em] md:pt-[5em] md:pb-[7em]">
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
          <motion.div
            key={key}
            initial="hidden"
            animate="show"
            variants={parentVariant}
            className="w-[100%] lg:w-[90%] mx-auto my-0 flex flex-col-reverse lg:flex-row justify-evenly items-center"
          >
            <div className="text-center lg:text-start w-[90vw] lg:w-[40vw]">
              <motion.div variants={textVariant} className="text-[1.6em] md:text-[3em] font-black mt-4 md:mt-0">
                <div className="text-[1.3em] md:text-[1em] ">
                  {item.Greetings}
                </div>
                <div className="text-[1.4em] md:text-[1em]">{item.Name}</div>
              </motion.div>
              <motion.div variants={textVariant} className="text-[1.8em] md:text-[2em]   ">
                {item.Desigination}
              </motion.div>
              <motion.div variants={textVariant} className="text-[1em] md:text-[1.3em] opacity-70 mt-3 text-justify">
                {item.Description}
              </motion.div>
              <motion.div variants={textVariant} className="mt-8">
                <a
                  className="text-[1.1em] bg-gradient-to-r from-purple-700 to-blue-700 w-fit px-8 py-4 rounded-lg mx-auto lg:mx-0 my-6 cursor-pointer hover:scale-105 "
                  href={item.ResumeLink}
                >
                  Check Resume
                </a>
              </motion.div>
            </div>

            <motion.div variants={imageVariant}>
              <LazyLoadImage
                src={item.Image.replace(
                  "/upload/",
                  "/upload/f_auto,q_auto,w_600/"
                )}
                alt="Item"
                effect="blur"
                fetchpriority="high"
                decoding="sync"
                className="w-[300px] h-[300px] object-cover md:w-[350px] min-h-[300px] md:min-h-[350px] rounded-full border-2 border-violet-600 mt-5 md:mt-0 shadow-[0_0_40px_purple]"
              />
            </motion.div>
          </motion.div>
        ))
      )}
    </section>
  );
};

export default Main;
