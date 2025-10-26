import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PopUp from "../Components/PopUp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [loginCheck, setLoginCheck] = useState(false);
  const [popup, setPopup] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/get-user?key=Developer@123`
      );
      const result = await res.json();
      setData(result);
    } catch (err) {
      shoowMsg(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const HandleSubmit = (e) => {
    e.preventDefault();

    if (data.length === 0) {
      shoowMsg("User data not loaded yet, please wait a moment.");
      return;
    }
    if (email === data[0].Email && password === data[0].Password) {
      shoowMsg("Login Success");

      const expiry = new Date().getTime() + 24 * 60 * 60 * 1000;
      localStorage.setItem("loginVerify", "true");
      localStorage.setItem("loginExpiry", expiry);
      navigate("/Edit-Page");
    } else {
      shoowMsg("Login Failed");
    }
  };

  const shoowMsg = (msg) => {
    setMsg(msg);
    setPopup(true);
    setTimeout(() => {
      setPopup(false);
    }, 3000);
  };

  return (
    <section>
      {popup && <PopUp msg={msg} />}
      <div className="flex justify-center items-center min-h-[89vh] wapp">
        <div className=" w-[80%] md:w-[600px] rounded-lg text-white">
          <form
            onSubmit={HandleSubmit}
            className="flex flex-col w-[100%] md:w-[4===========================================================================00px] mx-auto mb-10 p-5 "
          >
            <div className="text-center text-[1.7em] font-semibold mb-4">
              LOGIN
            </div>
            <div className="mb-[1%]">Email</div>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="text-black px-2 py-2 mb-5 rounded-sm bg-opacity-0"
              type="email"
              value={email}
              placeholder="Enter Email"
            />
            <div className="mb-[1%]">Password</div>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="text-black px-2 py-2 rounded-sm bg-none mb-8"
              type="password"
              value={password}
              placeholder="Enter Password"
            />

            <button type="submit" className="bg-blue-500 py-2 rounded-md">
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
