import { motion } from "framer-motion";

const Education = ({ eduData, loading }) => {
  
  const containerVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.07 },
    },
  };

  const listVariant = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.03 },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  const SkeletonLoading = () => {
    return Array.from({ length: 3 }).map((item, i) => (
      <motion.div
        variants={cardVariant}
        key={i}
        className="animate-pulse border border-[#b14fc4] rounded-xl w-[70%] md:w-[70%] py-4 px-2 mx-auto my-0 opacity-80 shadow-[0_0_6px_#d607ed] mb-8"
      >
        <div className=" px-2 md:px-5 rounded-md bg-gray-600 w-1/3 h-5 mb-2 font-bold opacity-90 "></div>
        <div className=" px-2 md:px-5 rounded-md bg-gray-600 w-1/4 h-3 mb-2 opacity-60"></div>
        <div className=" px-2 md:px-5 rounded-md bg-gray-600 w-1/6 h-3 mb-2 opacity-60"></div>
        <div className=" px-2 md:px-5 rounded-md bg-gray-600 w-full h-3 mb-3 opacity-60"></div>
        <div className=" px-2 md:px-5 rounded-md bg-gray-600 w-full h-3 mb-3 opacity-50 "></div>
        <div className=" px-2 md:px-5 rounded-md bg-gray-600 w-full h-3 mb-2.5 opacity-70 text-justify"></div>
      </motion.div>
    ));
  };

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
      className="mt-[5%] w-screen xl:w-[80%] mx-auto my-0"
    >
      <motion.div
        variants={listVariant}
        className="text-center text-[2em] font-bold mt-3"
      >
        Education
      </motion.div>
      <motion.div
        variants={listVariant}
        className="text-center text-[1.2em] opacity-55 mt-5 mb-10 px-10"
      >
        My education has been a journey of self-discovery and growth. My
        educational details are as follows.
      </motion.div>
      {loading
        ? SkeletonLoading()
        : eduData
            .sort((a, b) => a.Order - b.Order)
            .map((item, id) => (
              <motion.div
                variants={cardVariant}
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
              </motion.div>
            ))}
    </motion.div>
  );
};

export default Education;
