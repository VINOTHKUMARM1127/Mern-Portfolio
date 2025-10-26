import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Login from "./Admin/Login";
import EditPage from "./Admin/EditPage";
import ProjectsEdit from "./Admin/ProjectsEdit";
import EducationEdit from "./Admin/EducationEdit";
import LoginCheck from "./Admin/LoginCheck";
import DetailsEdit from "./Admin/DetailsEdit";
import SkillsEdit from "./Admin/SkillsEdit";

const App = () => {
  const [loginVerify, setLoginVerify] = useState(false);

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/Edit-Page"
            element={
              <LoginCheck>
                <EditPage />
              </LoginCheck>
            }
          />
          <Route
            path="/Edit-Page/Projects"
            element={
              <LoginCheck>
                <ProjectsEdit />
              </LoginCheck>
            }
          />
          <Route
            path="/Edit-Page/Education"
            element={
              <LoginCheck>
                <EducationEdit />
              </LoginCheck>
            }
          />
          <Route
            path="/Edit-Page/details"
            element={
              <LoginCheck>
                <DetailsEdit />
              </LoginCheck>
            }
          />
          <Route
            path="/Edit-Page/skills"
            element={
              <LoginCheck>
                <SkillsEdit />
              </LoginCheck>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
