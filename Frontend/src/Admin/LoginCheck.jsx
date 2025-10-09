import React from 'react'
import { Navigate } from 'react-router-dom';

const LoginCheck =  ({ children }) => {

    const loginVerify = localStorage.getItem("loginVerify") === "true";
    const loginExpiry = localStorage.getItem("loginExpiry");
    const currentTime = new Date().getTime();

  if (!loginVerify||!loginExpiry|| currentTime > loginExpiry) 
    {
        alert("Please login to access this page")
        localStorage.removeItem("loginVerify");
        localStorage.removeItem("loginExpiry");
        return <Navigate to="/login" />;
    }
    return children;
  }
  
export default LoginCheck