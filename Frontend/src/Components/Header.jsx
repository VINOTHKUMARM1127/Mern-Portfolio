import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-scroll'

const Header = () => {
  const navigate = useNavigate();
  return (
    <section className='bg-[#171721] z-40 md:px-[100px] 
    py-5 sticky top-0'>
    <div className='w-[90%] lg:w-[85%] flex justify-between mx-auto my-0'>
      <div onClick={()=>{navigate('/login')}} className='text-[1.5em] font-bold cursor-pointer'>Devfolio</div>
      <div className='hidden lg:block'>
      <div className='flex cursor-pointer text-[1em]'>
        <Link to="home" smooth={true} duration={500} offset={-80} className='md:px-[2em] px-[1em] pt-2 hover:text-violet-600'>About</Link>
        <Link to="skills" smooth={true} duration={500} offset={-80} className='md:px-[2em] px-[1em] pt-2 hover:text-violet-600'>Skills</Link>
        <Link to="education" smooth={true} duration={500} offset={-80} className='md:px-[2em] px-[1em] pt-2 hover:text-violet-600'>Education</Link>
        <Link to="projects" smooth={true} duration={500} offset={-80} className='md:px-[2em] px-[1em] pt-2 hover:text-violet-600'>Projects</Link>
      </div></div>
      <a href='https://github.com/VINOTHKUMARM1127' className='mx-0 my-auto border-[2px] border-[#6536ff] px-6 py-1  rounded-full text-[#6536ff] hover:bg-violet-600 hover:text-white'>Github</a>
    </div>
    </section>
  )
}

export default Header
