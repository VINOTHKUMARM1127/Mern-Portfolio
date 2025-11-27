import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { easeInOut, motion } from "framer-motion";

const Skils = ({ data, loading }) => {
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

  const Category = ["Frontend", "Backend", "Others"];

  const containerVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.18 },
    },
  };

  const listVariant = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
};



  const itemVariant = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.18, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
      className="mt-10 w-[90%] sm:w-[90%] lg:w-[80%] mx-auto pt-0 md:pt-[2em] pb-5 md:pb-[3em]"
    >
      <motion.div
        variants={itemVariant}
        className="text-center text-[2em] font-bold "
      >
        Skills
      </motion.div>
      <motion.div
        variants={itemVariant}
        className="text-center text-[1.2em] opacity-60 mt-2 mb-[4em] px-10"
      >
        Here are some of my skills on which I have learnt.
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {Category.map((sk, key) => (
          <section
            key={key}
            className="border border-[#b14fc4] bg-[#171721] rounded-2xl p-6 opacity-90 shadow-[0_0_10px_#d607ed] hover:shadow-[0_0_20px_#d607ed] transition-all duration-300"
          >
            <motion.div
              variants={itemVariant}
              className="text-center text-[1.6em] mb-4 font-bold text-white"
            >
              {sk}
            </motion.div>
            {loading ? (
              skeleton()
            ) : (
              <motion.div
                variants={listVariant}
                className="flex justify-center gap-3 flex-wrap"
              >
                {data
                  .filter((fill) => fill.Category === sk)
                  .map((sk, key) => (
                    <motion.div key={key} variants={itemVariant}>
                      <h3 className="border border-white rounded-lg px-3 py-2 flex justify-center items-center gap-2 text-white hover:bg-[#b14fc4]/50 transition-all duration-200">
                        <Icon
                          icon={sk.Icon}
                          width="30"
                          height="30"
                          className="flex-shrink-0"
                        />
                        {sk.Skill}
                      </h3>
                    </motion.div>
                  ))}
              </motion.div>
            )}
          </section>
        ))}
      </div>
    </motion.div>
  );
};

export default Skils;
