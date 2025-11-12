import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#1e1e29] flex justify-center mt-5 mb-10'>
        <div className='w-[90vw] text-center'>
      <div className='text-[1.4em] mt-5'>Vinoth Kumar M</div>
      <div>
        <a className='block my-[1em] hover:text-violet-600' href="#home">About</a>
        <a className='block my-[1em] hover:text-violet-600' href="#skills">Skills</a>
        <a className='block my-[1em] hover:text-violet-600' href="#education">Education</a>
        <a className='block my-[1em] hover:text-violet-600' href="#projects">Projects</a>
      </div>
      </div>
    </div>
  )
}

export default Footer
