import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Pages/Home'
import Login from './Admin/Login'
import Signup from './Admin/Signup'

const App = () => {
  return (
    <BrowserRouter>
    <div>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
    </div>
    </BrowserRouter>
    
  )
}

export default App
