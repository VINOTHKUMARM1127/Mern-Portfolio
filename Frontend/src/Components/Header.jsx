import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";

const Header = () => {
  const navigate = useNavigate();

  const loginVerify = localStorage.getItem("loginVerify") === "true";

  const HandleLogout = () => {
    localStorage.removeItem("loginVerify");
    localStorage.removeItem("loginExpiry");
    window.location.href = "/";
  };
  return (
    <section
      className="bg-[#171721] z-40 md:px-[100px] 
    py-5 sticky top-0"
    >
      <div className="w-[90%] lg:w-[85%] flex justify-between mx-auto my-0">
        <div
          onClick={() => {loginVerify? navigate("/Edit-page"): navigate("/login");
          }}
          className="text-[1.5em] font-bold cursor-pointer"
        >
          Devfolio
        </div>
        <div className="hidden lg:block">
          <div className="flex cursor-pointer text-[1em]">
            <Link onClick={() => navigate("/")}
              to="home"
              smooth={true}
              duration={500}
              offset={-80}
              className="md:px-[2em] px-[1em] pt-2 hover:text-violet-600"
            >
              About
            </Link>
            <Link onClick={() => navigate("/")}
              to="skills"
              smooth={true}
              duration={500}
              offset={-80}
              className="md:px-[2em] px-[1em] pt-2 hover:text-violet-600"
            >
              Skills
            </Link>
            <Link onClick={() => navigate("/")}
              to="education"
              smooth={true}
              duration={500}
              offset={-80}
              className="md:px-[2em] px-[1em] pt-2 hover:text-violet-600"
            >
              Education
            </Link>
            <Link onClick={() => navigate("/")}
              to="projects"
              smooth={true}
              duration={500}
              offset={-80}
              className="md:px-[2em] px-[1em] pt-2 hover:text-violet-600"
            >
              Projects
            </Link>
          </div>
        </div>{ !loginVerify ?
        <a
          href="https://github.com/VINOTHKUMARM1127"
          className="mx-0 my-auto border-[2px] border-[#6536ff] px-6 py-1  rounded-full text-[#ffffffee] hover:bg-violet-600 hover:text-white"
        >
          Github
        </a> :
        <div
          onClick={HandleLogout}
          className="mx-0 my-auto border-[2px] cursor-pointer border-red-600 px-6 py-1 bg-red-600 rounded-full text-[#ffffff] "
        >
          LogOut
        </div>}
      </div>
    </section>
  );
};

export default Header;
