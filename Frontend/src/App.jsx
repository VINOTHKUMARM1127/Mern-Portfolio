import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Pages/Home'
import Login from './Admin/Login'
import EditPage from './Admin/EditPage'
import ProjectsEdit from './Admin/ProjectsEdit'
import EducationEdit from './Admin/EducationEdit'

const App = () => {
  return (
    <BrowserRouter>
    <div>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path="/Edit-Page" element={<EditPage/>} />
      <Route path="/Edit-Page/Projects" element={<ProjectsEdit />} />
      <Route path="/Edit-Page/Education" element={<EducationEdit/>} />
    </Routes>
    </div>
    </BrowserRouter>
    
  )
}

export default App
