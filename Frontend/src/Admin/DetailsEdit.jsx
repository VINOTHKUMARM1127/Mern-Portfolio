import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Await } from "react-router-dom";

const DetailsEdit = () => {
  const [detailsData, setdetailsData] = useState([]);
  const [form, setForm] = useState({
    Greetings: "",
    Name: "",
    Desigination: "",
    Image: "",
    Description: "",
    ResumeLink: "",
  });
  const [editingId, seteditingId] = useState(null);

  const fetchProjectsData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-details");
      setdetailsData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProjectsData();
  }, []);

  useEffect(() => {
    if(detailsData.length > 0){
  HandleEdit(detailsData[0]);}
}, [detailsData]);


  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("Greetings", form.Greetings);
      formData.append("Name", form.Name);
      formData.append("Desigination", form.Desigination);
      formData.append("Description", form.Description);
      formData.append("ResumeLink", form.ResumeLink);
      if (form.Image instanceof File) {
        formData.append("Image", form.Image);
      } else {
        formData.append("Image", form.Image);
      }
      await axios.put(
        `http://localhost:5000/update-details/${editingId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Details Uploaded Successfully");
      seteditingId(null);
      fetchProjectsData();
      setForm({
        Greetings: "",
        Name: "",
        Desigination: "",
        Image: "",
        Description: "",
        ResumeLink: "",
      });
    } catch (err) {
      console.log(err);
      alert("Detail not Uploaded");
    }
  };

  const HandleEdit = (pro) => {
    setForm({
      Greetings: pro.Greetings,
      Name: pro.Name,
      Desigination: pro.Desigination,
      Image: pro.Image,
      Description: pro.Description,
      ResumeLink: pro.ResumeLink,
    });
    seteditingId(pro._id);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  return (
    <section className="p-6 max-w-2xl mx-auto">
      <div>Details Edit Page</div>
      <form onSubmit={HandleSubmit} className="flex flex-col gap-3 my-5">
        <input
          required
          className="text-black border p-2 w-full"
          type="text"
          onChange={handleChange}
          value={form.Greetings}
          name="Greetings"
          placeholder="Greetings"
        />
        <input
          required
          className="text-black border p-2 w-full"
          type="text"
          onChange={handleChange}
          value={form.Name}
          name="Name"
          placeholder="Name"
        />
        <input
          required
          className="text-black border p-2 w-full"
          type="text"
          onChange={handleChange}
          value={form.Desigination}
          name="Desigination"
          placeholder="Desigination"
        />
        <input
          required
          className="text-black border p-2 w-full"
          type="text"
          onChange={handleChange}
          value={form.ResumeLink}
          name="ResumeLink"
          placeholder="ResumeLink"
        />
        <input
          className=" border p-2 w-full"
          type="file"
          name="Image"
          accept="image/*"
          onChange={(e) => setForm({ ...form, Image: e.target.files[0] })}
        />
        <textarea
          required
          className="text-black border p-2 w-full"
          onChange={handleChange}
          value={form.Description}
          name="Description"
          placeholder="Description"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Update Details
        </button>
      </form>

      <ul className="space-y-2">
        {detailsData.map((pro) => (
          <li
            className="border p-2 flex justify-around md:justify-centre flex-col md:flex-row items-center"
            key={pro._id}
          >
            <div className="w-[70%]">
              {pro.Image && (
                <img
                  src={pro.Image}
                  alt={pro.Greetings}
                  className="w-32 h-20 object-cover"
                />
              )}

              <p>{pro.Greetings}</p>
              <p>{pro.Name}</p>
              <p>{pro.Desigination}</p>
              <p>{pro.ResumeLink}</p>
              <p className="break-words text-justify">{pro.Description}</p>
            </div>
            <div>

            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DetailsEdit;
