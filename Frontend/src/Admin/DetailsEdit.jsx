import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Await } from "react-router-dom";
import PopUp from "../Components/PopUp";

const DetailsEdit = () => {
  const [detailsData, setdetailsData] = useState([]);
  const [popup, setPopup] = useState(false);
  const [msg, setMsg] = useState("");
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
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/get-details`
      );
      setdetailsData(response.data);
    } catch (err) {
      shoowMsg(err);
    }
  };

  useEffect(() => {
    fetchProjectsData();
  }, []);

  useEffect(() => {
    if (detailsData.length > 0) {
      HandleEdit(detailsData[0]);
    }
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
        `${import.meta.env.VITE_BACKEND_URL}/update-details/${editingId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      shoowMsg("Details Uploaded Successfully");
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
      shoowMsg("Detail not Uploaded");
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

  const shoowMsg = (msg) => {
    setMsg(msg);
    setPopup(true);
    setTimeout(() => {
      setPopup(false);
    }, 3000);
  };

  return (
    <div className="wapp">
      {popup && <PopUp msg={msg} />}
      <section className="p-6 max-w-2xl mx-auto">
        <div className="text-[1.2em] md:text-[1.7em] text-center uppercase my-2">
          Details Edit Page
        </div>
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
      </section>

      <section className=" cut flex justify-center py-[1em] md:py-[5em] ">
        {detailsData.map((item, key) => (
          <div
            key={key}
            className="w-[100%] lg:w-[90%] mx-auto my-0 flex flex-col-reverse lg:flex-row justify-evenly items-center"
          >
            <div className="text-center lg:text-start w-[90vw] lg:w-[40vw]">
              <div className="text-[1.7em] md:text-[3em] font-black mt-4 md:mt-0">
                <div className="text-[1.4em] md:text-[1em] ">
                  {item.Greetings}
                </div>
                <div className="text-[1.4em] md:text-[1em]">{item.Name}</div>
              </div>
              <div className="text-[1.8em] md:text-[2em]   ">
                {item.Desigination}
              </div>
              <div className="text-[1em] md:text-[1.3em] opacity-70 mt-3">
                {item.Description}
              </div>
              <div
                onClick={() => window.open("item.ResumeLink")}
                className="text-[1.1em] bg-gradient-to-r from-purple-700 to-blue-700 w-fit px-8 py-4 rounded-lg mx-auto lg:mx-0 my-6 cursor-pointer hover:scale-105 "
              >
                Check Resume
              </div>
            </div>

            <div className="mx-4">
              <img
                src={item.Image}
                className="w-[300px] md:w-[350px] min-h-[300px] md:min-h-[350px] rounded-full border-2 border-violet-600 mt-5 md:mt-0  shadow-[0_0_40px_purple]"
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DetailsEdit;
