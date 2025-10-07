import React, { useEffect, useState } from 'react'
import axios from 'axios';

const educationEdit = () => {

  const [educationData,seteducationData] = useState([]);
  const [form,setform] = useState({
    CollegeName : "", Degree :"", Year:"", Description:""
  })
  const [editingId,seteditingId] = useState(null);

  // Fetch education data from the backend
  const fetchEducationData = async () => {
    try{
      const response = await axios.get("http://localhost:5000/get-education");
      seteducationData(response.data);
      console.log(response.data);
    }catch (err){
      console.log(err);
    }}
useEffect(()=>{
  fetchEducationData()},[]
)

//handle Change

const handleChange = (e)=>{
  setform({...form, [e.target.name]: e.target.value})
}



  return (
    <section className="p-6 max-w-2xl mx-auto">
      <div>Education Edit Page</div>
      <form className='flex flex-col gap-3 my-5'>
        <input required className='border p-2 w-full' type="text" onChange={handleChange} value={form.CollegeName} name="CollegeName" placeholder='CollegeName'/>
        <input required className='border p-2 w-full' type="text" onChange={handleChange} value={form.Degree} name="Degree" placeholder='Degree'/>
        <input required className='border p-2 w-full' type="text" onChange={handleChange} value={form.Year} name="Year" placeholder='Year'/>
        <textarea required className='border p-2 w-full' onChange={handleChange} value={form.Description} name="Description" placeholder='Description'/>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {editingId ? "Update Education" : "Add Education"}
        </button>
      </form>

      
        <ul className="space-y-2">{educationData.map((edu)=>(
          <li className='border p-2 flex justify-around md:justify-centre flex-col md:flex-row items-center' key={edu._id}>
            <div className='w-[70%]'>
              <p>{edu.CollegeName}</p>
              <p>{edu.Degree}</p>
              <p>{edu.Year}</p>
              <p className='break-words text-justify'>{edu.Description}</p>
              
            </div>
            <div >
              <button className='bg-blue-500 text-white px-2 py-1 rounded-md mr-2'>Edit</button>
              <button className='bg-red-500 text-white px-2 py-1 rounded-md'>Delete</button>
            </div>
          </li>
        ))}</ul>
      
    </section>
  )
}

export default educationEdit