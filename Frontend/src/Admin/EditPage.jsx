import React from "react";
import { useNavigate } from "react-router-dom";
import ScrollProgress from "../Components/ScrollProgress";
import Main from "../Components/Main";
import Skils from "../Components/Skils";
import Education from "../Components/Education";
import Projects from "../Components/Projects";
import { TbEdit } from "react-icons/tb";
import useDataFetch from "../Components/useDataFetch";

const EditPage = () => {
  const navigate = useNavigate();
    const { Details, data, eduData, projectdata, loading } =  useDataFetch();
  return (
    <section>
      <div className="bg-[#171721] text-[2.1em] text-center uppercase p-5 font-bold">
        Edit Page
      </div>

      <div>
        <ScrollProgress />
                  <div
            onClick={() => navigate("/Edit-Page/details")}
            className="relative "
          >
            <div className="absolute top-[15px] lg:top-[30px] right-[5%] lg:right-[18%] z-10" >
              <TbEdit className="text-[1.5em]  lg:text-[2em] mb-[2em]" />
            </div>
          </div>
        <div id="home">
          <Main Details={Details} loading={loading} />
        </div>
        <div className="wap">
                    <div
            onClick={() => navigate("/Edit-Page/skills")}
            className="relative "
          >
            <div className="absolute top-[15px] lg:top-[30px] right-[5%] lg:right-[18%]" >
              <TbEdit className="text-[1.5em]  lg:text-[2em] mb-[2em]" />
            </div>
          </div>
          <div id="skills">
            <Skils data={data} loading={loading} />
          </div>
          <div
            onClick={() => navigate("/Edit-Page/Education")}
            className="relative "
          >
            <div className="absolute top-[15px] lg:top-[30px] right-[5%] lg:right-[18%]" >
              <TbEdit className="text-[1.5em]  lg:text-[2em] mb-[2em]" />
            </div>
          </div>
          <div id="education">
            <Education eduData={eduData} loading={loading} />
          </div>
        </div>
        <div className="wapp" id="projects">
          <div
            onClick={() => navigate("/Edit-Page/Projects")}
            className="relative "
          >
            <div className="absolute top-[15px] lg:top-[30px] right-[5%] lg:right-[18%]" >
              <TbEdit className="text-[1.5em]  lg:text-[2em] mb-[2em]" />
            </div>
          </div>
          <Projects projectdata={projectdata} loading={loading} />
        </div>
      </div>
    </section>
  );
};

export default EditPage;
