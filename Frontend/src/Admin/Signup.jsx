import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  return (
    <div className='flex justify-center items-center min-h-[89vh] wapp'>
        <div className=" w-[80%] md:w-[600px] rounded-lg text-white">
        <form onSubmit="" className='flex flex-col w-[70%] md:w-[300px] mx-auto mb-10 p-5 '>
            <div className='text-center text-[1.7em] font-semibold mb-4'>SIGNUP</div>
            <div className='mt-[1%]'>Email</div>
            <input onChange={e=>{setEmail(e.target.value)}} className='text-black px-2 py-1 mb-5 rounded-sm bg-opacity-0' type="mail" value={email} placeholder='Enter Email'  />
            <div className='mt-[1%]'>Password</div>
            <input onChange={e=>{setPassword(e.target.value)}} className='text-black px-2 py-1 rounded-sm bg-none mb-7' type="text" value={password} placeholder='Enter Password'  />
            <button type="submit" className='bg-blue-500 py-2 rounded-md'>Signup</button>
            <div className='text-center text-[0.9em] my-2'>or</div>
            <button type="submit" className='bg-green-500 py-2 rounded-md' onClick={()=>{navigate("/login")}}>Login</button>
        </form>
    </div>
    </div>
  )
}

export default Signup