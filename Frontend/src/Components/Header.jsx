import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";

const Header = () => {
  const navigate = useNavigate();
  const [menuopen, setMenuopen] = useState(false);

  const loginVerify = localStorage.getItem("loginVerify") === "true";

  const HandleLogout = () => {
    localStorage.removeItem("loginVerify");
    localStorage.removeItem("loginExpiry");
    window.location.href = "/";
  };

  useEffect(() => {
    if (menuopen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  },[menuopen]);
  return (
    <section
      className="bg-[#171721] z-40 lg:px-[100px] 
    py-5 sticky top-0"
    >
      <div className="w-[90%] lg:w-[85%] flex justify-between mx-auto my-0">
        <button
          onClick={() => {
            loginVerify ? navigate("/Edit-page") : navigate("/login");
          }}
          className="text-[1.5em] font-bold cursor-pointer"
        >
          Devfolio
        </button>
        <div className=" lg:block">
          <div
            className={`${
              menuopen ? "flex" : "hidden"
            } z-10 flex-col lg:flex-row lg:flex text-center cursor-pointer text-[1em] absolute top-[0] right-[0] lg:pt-0 pt-[100px] w-[80%] lg:min-h-full min-h-screen bg-[#191924] lg:static lg:w-auto lg:bg-transparent px-5 py-1 gap-7 lg:gap-3`}
          >
            <Link
              onClick={() => {
                navigate("/");
                setMenuopen(false);
              }}
              to="home"
              smooth={true}
              duration={500}
              offset={-80}
              className="md:px-[2em] px-[1em] pt-2 hover:text-violet-600"
            >
              About
            </Link>
            <Link
              onClick={() => {
                navigate("/");
                setMenuopen(false);
              }}
              to="skills"
              smooth={true}
              duration={500}
              offset={-80}
              className="md:px-[2em] px-[1em] pt-2 hover:text-violet-600"
            >
              Skills
            </Link>
            <Link
              onClick={() => {
                navigate("/");
                setMenuopen(false);
              }}
              to="education"
              smooth={true}
              duration={500}
              offset={-80}
              className="md:px-[2em] px-[1em] pt-2 hover:text-violet-600"
            >
              Education
            </Link>
            <Link
              onClick={() => {
                navigate("/");
                setMenuopen(false);
              }}
              to="projects"
              smooth={true}
              duration={500}
              offset={-80}
              className="md:px-[2em] px-[1em] pt-2 hover:text-violet-600"
            >
              Projects
            </Link>

            <div className="lg:hidden block py-1 w-2/4 mx-auto">
              {!loginVerify ? (
                <div
                  onClick={() => {
                    window.open("https://github.com/VINOTHKUMARM1127");
                    setMenuopen(false);
                  }}
                  className="mx-0 my-auto border-[2px] border-none lg:border-[#6536ff] px-6 py-2 rounded-full text-[#ffffffee] hover:bg-violet-600 hover:text-white"
                >
                  Github
                </div>
              ) : (
                <div
                  onClick={HandleLogout}
                  className="mx-0 my-auto border-[2px] cursor-pointer border-red-600 px-6 py-2 bg-red-600 rounded-full text-[#ffffff] "
                >
                  LogOut
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="hidden lg:block py-1">
          {!loginVerify ? (
            <a
              href="https://github.com/VINOTHKUMARM1127"
              className="mx-0 my-auto border-[2px] border-[#6536ff] px-6 py-2 rounded-full text-[#ffffffee] hover:bg-violet-600 hover:text-white"
            >
              Github
            </a>
          ) : (
            <div
              onClick={HandleLogout}
              className="mx-0 my-auto border-[2px] cursor-pointer border-red-600 px-6 py-2 bg-red-600 rounded-full text-[#ffffff] "
            >
              LogOut
            </div>
          )}
        </div>
        {!menuopen ? (
          <Icon
            onClick={() => {
              setMenuopen(true);
            }}
            className="lg:hidden block z-30"
            icon="mingcute:menu-fill"
            width="24"
            height="24"
          />
        ) : (
          <Icon
            onClick={() => {
              setMenuopen(false);
            }}
            className="lg:hidden block z-30"
            icon="material-symbols:close-rounded"
            width="24"
            height="24"
          />
        )}
      </div>
    </section>
  );
};

export default Header;
