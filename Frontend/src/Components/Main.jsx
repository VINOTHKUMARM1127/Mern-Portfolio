import React from 'react'
import Pic from '../assets/Profile-Pic-min.jpg'
import '../index.css'

const Main = () => {
    
    return (
        <section className='bg-[#171721] cut flex justify-center py-[5em]'>
        <div className='w-[100%] lg:w-[90%] mx-auto my-0 flex flex-col-reverse lg:flex-row justify-evenly items-center'>
            <div className='text-center lg:text-start w-[90vw] lg:w-[40vw]'>
                <div className='text-[1.7em] md:text-[3em] font-black mt-4 md:mt-0'>
                <div className='text-[1.4em] md:text-[1em] '>Hi I Am</div>
                <div className='text-[1.4em] md:text-[1em]'>Vinoth Kumar M</div>
                </div>
                <div className='text-[1.8em] md:text-[2em]   '>I am a Web Developer</div>
                <div className='text-[1em] md:text-[1.3em] opacity-70 mt-3'>A skilled React developer with a strong portfolio, passionate about
                     staying updated on frontend tech. Collaborative and committed to quality,
                      you thrive in dynamic teams. Eager to contribute creativity and bring 
                      innovative ideas to life.</div>
                <div onClick={() => window.open("https://drive.google.com/file/d/1VVrBT3kvRaeX6b1yuQbKGkUn1YJXotGW/view?usp=sharing")}
                className='text-[1.1em] bg-gradient-to-r from-purple-700 to-blue-700 w-fit px-8 py-4 rounded-lg mx-auto lg:mx-0 my-6 cursor-pointer hover:scale-105 '>Check Resume</div>
            </div>

            <div>
                <img src={Pic} 
                className='w-[300px] md:w-[350px] rounded-full border-2 border-violet-600 mt-5 md:mt-0  shadow-[0_0_40px_purple]' />
            </div>
        </div>
        </section>
    )
}

export default Main
