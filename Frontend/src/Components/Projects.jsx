import React, { useEffect, useState } from "react";
import Details from "./Details";
import Dummy from "../assets/dummypic.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion } from "framer-motion";

const Projects = ({ projectdata, loading }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const card = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const click = (projects) => {
    setSelectedProject(projects);
  };

  const Skeletonloading = () => {
    return Array.from({ length: 6 }).map((i, k) => (
      <div
        key={k}
        className="border border-[#1f1f1f] animate-pulse bg-[#171721] rounded-xl py-4 px-4 mx-auto my-0 opacity-80 shadow-[0_0_6px_#1f1f1f] mb-8"
      >
        <img
          src={Dummy}
          className="rounded-lg bg-gray-600 w-full min-h-[180px] min-w-[220px] mb-3"
        />
        <div className=" bg-gray-600 w-2/4 h-4 mb-2 rounded-md"></div>
        <div className=" bg-gray-600 w-3/4 h-4 mb-2 rounded-md"></div>
        <div className=" bg-gray-600 w-2/6 h-3 mb-2 rounded-md"></div>

        <div className=" bg-gray-600 w-full h-3 mb-2 rounded-md"></div>
        <div className=" bg-gray-600 w-full h-3 mb-2 rounded-md"></div>
        <div className=" bg-gray-600 w-full h-3 mb-1 rounded-md"></div>
      </div>
    ));
  };

  return (
    <div className="mt-[5%] w-[90%] lg:w-[70%] mx-auto my-0">
      <div className="text-center text-[2em] font-bold mt-3">Projects</div>
      <div className="text-center text-[1.2em] opacity-55 mt-5 mb-10 px-10">
        I have worked on a wide range of projects. From websites to web apps.
        Here are some of my projects.
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[100%] mx-auto my-0"
      >
        {loading
          ? Skeletonloading()
          : projectdata
              .sort((b, a) => a.Order - b.Order)
              .map((item) => (
                <motion.div
                  variants={card}
                  whileHover={{ scale: 1.05 }}
                  key={item._id}
                  onClick={() => click(item)}
                  className="border border-[#1f1f1f] bg-[#171721] rounded-xl py-4 px-2 mx-auto my-0 opacity-80 shadow-[0_0_6px_#1f1f1f] mb-8 hover:bs hover:scale-105"
                >
                  <LazyLoadImage
                    src={item.Image}
                    alt="Item"
                    effect="blur"
                    className="rounded-lg overflow-hidden min-h-[180px] min-w-[220px] px-1 mb-2"
                  />
                  <div className="px-2 py-1 flex gap-3 text-[0.8em] my-1 text-[#9557ff]">
                    {item.Tech?.split(",")
                      .slice(0, 2)
                      .map((tech, idx) => (
                        <div
                          key={idx}
                          className="bg-[#854ce61F] rounded-md px-2"
                        >
                          {tech}
                        </div>
                      ))}
                    {item.Tech?.split(",").length > 2 && (
                      <div className="bg-[#854ce61F] rounded-md px-2">...</div>
                    )}
                  </div>
                  <div className="px-4 text-[1.4em] mt-1 font-bold opacity-90 ">
                    {item.ProjectName}
                  </div>
                  <div className="px-4 text-[0.8em] opacity-50 mb-1">
                    {item.Year}
                  </div>
                  <div className="px-4 text-[1em] mb-5 opacity-70 text-justify line-clamp-3">
                    {item.Description}
                  </div>
                </motion.div>
              ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        {selectedProject && (
          <Details
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </motion.div>
    </div>
  );
};

export default Projects;
