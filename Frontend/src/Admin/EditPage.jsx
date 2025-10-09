import React from 'react'
import { useNavigate } from 'react-router-dom';
import ScrollProgress from '../Components/ScrollProgress';
import Explore from '../Components/Explore';
import Main from '../Components/Main';
import Skils from '../Components/Skils';
import Education from '../Components/Education';
import Projects from '../Components/Projects';

const EditPage = () => {
    const navigate = useNavigate();
  return (
    <section>

      <div className='bg-[#171721] text-[2.5em] text-center uppercase p-5'>Edit Page</div>

      <div>
      <ScrollProgress />
      <div id='home'><Main /></div>
      <div className='wap'>
        <div id='skills'><Skils /></div>
        <div onClick={()=>navigate("/Edit-Page/Education")}>Education Edit</div>
        <div id='education'><Education /></div>
      </div>
      <div className='wapp' id='projects'>
        <div onClick={()=>navigate("/Edit-Page/Projects")}>Projects Edit</div>
        <Projects />
      </div>

    </div>

        
        
    </section>
  )
}

export default EditPage