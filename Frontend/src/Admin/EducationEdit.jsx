import React, { useEffect, useState } from "react";
import axios from "axios";

const educationEdit = () => {
  const [educationData, seteducationData] = useState([]);
  const [form, setform] = useState({
    CollegeName: "",
    Degree: "",
    Year: "",
    Description: "",
  });
  const [editingId, seteditingId] = useState(null);

  const fetchEducationData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-education");
      seteducationData(response.data);
    } catch (err) {
      console.log(err);
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
          `http://localhost:5000/update-education/${editingId}`,
          form
        );
      } else {
        await axios.post("http://localhost:5000/add-education", form);
      }
      seteditingId(null);
      fetchEducationData();
      setform({ CollegeName: "", Degree: "", Year: "", Description: "" });
    } catch (err) {
      console.log(err);
    }
  };

  const HandleDelete = async (editingId) => {
    try {
      await axios.delete(`http://localhost:5000/delete-education/${editingId}`);
      fetchEducationData();
    } catch (err) {
      console.log(err);
    }
  };

  const HandleEdit = (edu) => {
    setform({
      CollegeName: edu.CollegeName,
      Degree: edu.Degree,
      Year: edu.Year,
      Description: edu.Description,
    });
    seteditingId(edu._id);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section className="p-6 max-w-2xl mx-auto">
      <div>Education Edit Page</div>
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {editingId ? "Update Education" : "Add Education"}
        </button>
      </form>

      <ul className="space-y-2">
        {educationData.map((edu) => (
          <li
            className="border p-2 flex justify-around md:justify-centre flex-col md:flex-row items-center"
            key={edu._id}
          >
            <div className="w-[70%]">
              <p>{edu.CollegeName}</p>
              <p>{edu.Degree}</p>
              <p>{edu.Year}</p>
              <p className="break-words text-justify">{edu.Description}</p>
            </div>
            <div>
              <button
                onClick={() => {
                  HandleEdit(edu);
                }}
                className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => HandleDelete(edu._id)}
                className="bg-red-500 text-white px-2 py-1 rounded-md"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default educationEdit;
