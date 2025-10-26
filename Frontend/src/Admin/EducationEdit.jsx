import React, { useEffect, useState } from "react";
import axios from "axios";
import PopUp from "../Components/PopUp";

const educationEdit = () => {
  const [educationData, seteducationData] = useState([]);
  const [popup, setPopup] = useState(false);
  const [msg, setMsg] = useState("");
  const [form, setform] = useState({
    CollegeName: "",
    Degree: "",
    Year: "",
    Description: "",
    Order: "",
  });
  const [editingId, seteditingId] = useState(null);

  const fetchEducationData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/get-education`
      );
      seteducationData(response.data);
    } catch (err) {
      shoowMsg(err);
    }
  };
  useEffect(() => {
    fetchEducationData();
  }, []);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/update-education/${editingId}`,
          form
        );
        shoowMsg("Education Updated");
      } else {
        await axios.post(
          "${import.meta.env.VITE_BACKEND_URL}/add-education",
          form
        );
        shoowMsg("Education Added");
      }
      seteditingId(null);
      fetchEducationData();
      setform({
        CollegeName: "",
        Degree: "",
        Year: "",
        Description: "",
        Order: "",
      });
    } catch (err) {
      shoowMsg(err);
    }
  };

  const HandleDelete = async (editingId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/delete-education/${editingId}`
      );
      fetchEducationData();
      shoowMsg("Education Deleted");
    } catch (err) {
      shoowMsg(err);
    }
  };

  const HandleEdit = (item) => {
    setform({
      CollegeName: item.CollegeName,
      Degree: item.Degree,
      Year: item.Year,
      Description: item.Description,
      Order: item.Order,
    });
    seteditingId(item._id);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const shoowMsg = (msg) => {
    setMsg(msg);
    setPopup(true);
    setTimeout(() => {
      setPopup(false);
    }, 3000);
  };

  return (
    <div>
      {popup && <PopUp msg={msg} />}
      <section className="p-6 max-w-2xl mx-auto">
        <div className="text-[1.2em] md:text-[1.7em] text-center uppercase my-2">
          Education Edit Page
        </div>
        <form onSubmit={HandleSubmit} className="flex flex-col gap-3 my-5">
          <input
            required
            className="text-black border p-2 w-full"
            type="text"
            onChange={handleChange}
            value={form.CollegeName}
            name="CollegeName"
            placeholder="CollegeName"
          />
          <input
            required
            className="text-black border p-2 w-full"
            type="text"
            onChange={handleChange}
            value={form.Degree}
            name="Degree"
            placeholder="Degree"
          />
          <input
            required
            className="text-black border p-2 w-full"
            type="text"
            onChange={handleChange}
            value={form.Year}
            name="Year"
            placeholder="Year"
          />
          <textarea
            required
            className="text-black border p-2 w-full"
            onChange={handleChange}
            value={form.Description}
            name="Description"
            placeholder="Description"
          />

          <input
            required
            className="text-black border p-2 w-full"
            type="number"
            onChange={handleChange}
            value={form.Order}
            name="Order"
            placeholder="Enter Order"
          />

          <button type="submit" className="bg-blue-500 text-white px-4 py-2">
            {editingId ? "Update Education" : "Add Education"}
          </button>
        </form>
      </section>

      <section className="max-w-5xl mx-auto">
        <div className="space-y-2">
          {educationData
            .sort((a, b) => a.Order - b.Order)
            .map((item, id) => (
              <div
                key={id}
                className="border border-[#b14fc4] rounded-xl w-[70%] md:w-[70%] py-4 px-2 mx-auto my-0 opacity-80 shadow-[0_0_6px_#d607ed] mb-8"
              >
                <div className=" px-2 md:px-5 text-[1.2em] font-bold opacity-90 ">
                  {item.CollegeName}
                </div>
                <div className=" px-2 md:px-5 text-[0.9em]  opacity-60">
                  {item.Degree}
                </div>
                <div className=" px-2 md:px-5 text-[0.8em] opacity-50 mb-1">
                  {item.Year}
                </div>
                <div className=" px-2 md:px-5 text-[0.8em] opacity-50 mb-1">
                  {item.Order}
                </div>
                <div className=" px-2 md:px-5 text-[0.9em] opacity-70 text-justify">
                  {item.Description}
                </div>

                <div className="flex justify-center pt-4 pb-2">
                  <button
                    onClick={() => {
                      HandleEdit(item);
                    }}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => HandleDelete(item._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default educationEdit;
