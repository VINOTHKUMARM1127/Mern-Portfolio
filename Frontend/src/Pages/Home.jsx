import React, { useEffect, useState } from "react";
import Explore from "../Components/Explore";
import Main from "../Components/Main";
import Footer from "../Components/Footer";
import Skils from "../Components/Skils";
import Education from "../Components/Education";
import ScrollProgress from "../Components/ScrollProgress";
import Projects from "../Components/Projects";
import { Contactus } from "../Components/Contactus";
import useDataFetch from "../Components/useDataFetch";

const Home = () => {       
  const { Details, data, eduData, projectdata, loading } =  useDataFetch();

  return (
    <div>
      <ScrollProgress />
      <Explore />
      <div id="home">
        <Main Details={Details} loading={loading} />
      </div>
      <div className="wap">
        <div id="skills">
          <Skils data={data} loading={loading} />
        </div>
        <div id="education">
          <Education eduData={eduData} loading={loading} />
        </div>
      </div>
      <div className="wapp" id="projects">
        <Projects projectdata={projectdata} loading={loading} />
        <Contactus />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
