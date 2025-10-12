import React, { useEffect, useState } from 'react'
import '../index.css'
import axios from 'axios';

const Main = () => {

    const [Details, setDetails] = useState([]);

    const FetchData = async ()=>{
        try{
            const response = await axios.get("http://localhost:5000/get-details");
            setDetails(response.data)
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{FetchData()},[])
    
    return (
        <section className='bg-[#171721] cut flex justify-center py-[5em]'>
        {Details.map((item)=>(
        <div className='w-[100%] lg:w-[90%] mx-auto my-0 flex flex-col-reverse lg:flex-row justify-evenly items-center'>
            <div className='text-center lg:text-start w-[90vw] lg:w-[40vw]'>
                <div className='text-[1.7em] md:text-[3em] font-black mt-4 md:mt-0'>
                <div className='text-[1.4em] md:text-[1em] '>{item.Greetings}</div>
                <div className='text-[1.4em] md:text-[1em]'>{item.Name}</div>
                </div>
                <div className='text-[1.8em] md:text-[2em]   '>{item.Desigination}</div>
                <div className='text-[1em] md:text-[1.3em] opacity-70 mt-3'>{item.Description}</div>
                <div onClick={() => window.open("item.ResumeLink")}
                className='text-[1.1em] bg-gradient-to-r from-purple-700 to-blue-700 w-fit px-8 py-4 rounded-lg mx-auto lg:mx-0 my-6 cursor-pointer hover:scale-105 '>Check Resume</div>
            </div>

            <div>
                <img src={item.Image} 
                className='w-[300px] md:w-[350px] rounded-full border-2 border-violet-600 mt-5 md:mt-0  shadow-[0_0_40px_purple]' />
            </div>
        </div>
        ))}
        </section>
    )
}

export default Main
