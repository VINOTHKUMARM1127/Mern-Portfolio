import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Await } from "react-router-dom";

const ProjectsEdit = () => {
  const [projectsData, setprojectsData] = useState([]);
  const [form, setForm] = useState({
    ProjectName: "",
    Description: "",
    Link: "",
    Image: "",
    Github: "",
    Tech: "",
    Year: "",
  });
  const [editingId, seteditingId] = useState(null);

  const fetchProjectsData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-projects");
      setprojectsData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProjectsData();
  }, []);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("ProjectName", form.ProjectName);
      formData.append("Description", form.Description);
      formData.append("Link", form.Link);
      formData.append("Github", form.Github);
      formData.append("Tech", form.Tech);
      formData.append("Year", form.Year);
      if (form.Image instanceof File) {
        formData.append("Image", form.Image);
      } else {
        formData.append("Image", form.Image);
      }

      if (editingId) {
        await axios.put(
          `http://localhost:5000/update-projects/${editingId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post("http://localhost:5000/add-projects", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      alert("Project Uploaded Successfully");
      seteditingId(null);
      fetchProjectsData();
      setForm({
        ProjectName: "",
        Description: "",
        Link: "",
        Image: "",
        Github: "",
        Tech: "",
        Year: "",
      });
    } catch (err) {
      console.log(err);
      alert("Project not Uploaded");
    }
  };

  const HandleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete-projects/${id}`);
      fetchProjectsData();
      alert("Project Deleted Successfully");
    } catch (err) {
      console.log(err);
    }
  };
  const HandleEdit = (pro) => {
    setForm({
      ProjectName: pro.ProjectName,
      Description: pro.Description,
      Link: pro.Link,
      Image: pro.Image,
      Github: pro.Github,
      Tech: pro.Tech,
      Year: pro.Year,
    });
    seteditingId(pro._id);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section className="p-6 max-w-2xl mx-auto">
      <div>Projects Edit Page</div>
      <form onSubmit={HandleSubmit} className="flex flex-col gap-3 my-5">
        <input
          required
          className="text-black border p-2 w-full"
          type="text"
          onChange={handleChange}
          value={form.ProjectName}
          name="ProjectName"
          placeholder="ProjectName"
        />
        <input
          required
          className="text-black border p-2 w-full"
          type="text"
          onChange={handleChange}
          value={form.Tech}
          name="Tech"
          placeholder="Tech"
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
        <input
          required
          className="text-black border p-2 w-full"
          type="text"
          onChange={handleChange}
          value={form.Link}
          name="Link"
          placeholder="Live Link"
        />
        <input
          required
          className="text-black border p-2 w-full"
          type="text"
          onChange={handleChange}
          value={form.Github}
          name="Github"
          placeholder="Github Link"
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
          {editingId ? "Update Projects" : "Add Projects"}
        </button>
      </form>

      <ul className="space-y-2">
        {projectsData.map((pro) => (
          <li
            className="border p-2 flex justify-around md:justify-centre flex-col md:flex-row items-center"
            key={pro._id}
          >
            <div className="w-[70%]">
              {pro.Image && (
                <img
                  src={pro.Image}
                  alt={pro.ProjectName}
                  className="w-32 h-20 object-cover"
                />
              )}

              <p>{pro.ProjectName}</p>
              <p>{pro.Year}</p>
              <p>{pro.Tech}</p>
              <p>{pro.Link}</p>
              <p>{pro.Github}</p>
              <p className="break-words text-justify">{pro.Description}</p>
            </div>
            <div>
              <button
                onClick={() => {
                  HandleEdit(pro);
                }}
                className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => HandleDelete(pro._id)}
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

export default ProjectsEdit;
