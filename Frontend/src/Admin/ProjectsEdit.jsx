import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Await } from "react-router-dom";
import Details from "../Components/Details";
import PopUp from "../Components/PopUp";

const ProjectsEdit = () => {
  const [projectsData, setprojectsData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [popup, setPopup] = useState(false);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    ProjectName: "",
    Description: "",
    Link: "",
    Image: "",
    Github: "",
    Tech: "",
    Year: "",
    Order: "",
  });
  const [editingId, seteditingId] = useState(null);

  const fetchProjectsData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/get-projects`
      );
      setprojectsData(response.data);
    } catch (err) {
      shoowMsg(err);
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
      formData.append("Order", form.Order);
      if (form.Image instanceof File) {
        formData.append("Image", form.Image);
      } else {
        formData.append("Image", form.Image);
      }

      if (editingId) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/update-projects/${editingId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/add-projects`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }
      shoowMsg("Project Uploaded Successfully");
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
        Order: "",
      });
    } catch (err) {
      shoowMsg("Project not Uploaded");
    }
  };

  const HandleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/delete-projects/${id}`
      );
      fetchProjectsData();
      shoowMsg("Project Deleted Successfully");
    } catch (err) {
      shoowMsg(err);
    }
  };
  const HandleEdit = (item) => {
    setForm({
      ProjectName: item.ProjectName,
      Description: item.Description,
      Link: item.Link,
      Image: item.Image,
      Github: item.Github,
      Tech: item.Tech,
      Year: item.Year,
      Order: item.Order,
    });
    seteditingId(item._id);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const click = (projects) => {
    setSelectedProject(projects);
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
          Projects Edit Page
        </div>
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
            {editingId ? "Update Projects" : "Add Projects"}
          </button>
        </form>
      </section>
      <section>
        <div className="max-w-[70%] md:max-w-[80%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[100%] mx-auto my-0">
          {projectsData
            .sort((b, a) => a.Order - b.Order)
            .map((item) => (
              <div
                key={item._id}
                className="border border-[#1f1f1f] bg-[#171721] rounded-xl py-4 px-2 mx-auto my-0 opacity-80 shadow-[0_0_6px_#1f1f1f] mb-8 hover:bs hover:scale-105"
              >
                <div onClick={() => click(item)}>
                  <img
                    src={item.Image}
                    alt=""
                    className="rounded-lg overflow-hidden min-h-[180px] min-w-[220px] px-1 mb-2"
                  />
                  <div className="px-2 py-1 flex flex-wrap gap-3 text-[0.8em] my-1 text-[#9557ff]">
                    {item.Tech?.split(",")
                      .slice(0, 2)
                      .map((tech, idx) => (
                        <div
                          key={idx}
                          className="bg-[#854ce61F] rounded-md px-2"
                        >
                          {tech}
                        </div>
                      ))}
                    {item.Tech?.split(",").length > 2 && (
                      <div className="bg-[#854ce61F] rounded-md px-2">...</div>
                    )}
                  </div>
                  <div className="px-4 text-[1.4em] mt-1 font-bold opacity-90 ">
                    {item.ProjectName}
                  </div>
                  <div className="px-4 text-[0.8em] opacity-50 mb-1">
                    {item.Year}
                  </div>
                  <div className="px-4 text-[0.8em] opacity-50 mb-1">
                    {item.Order}
                  </div>
                  <div className="px-4 text-[1em] mb-3 opacity-70 text-justify line-clamp-3">
                    {item.Description}
                  </div>
                </div>

                <div className="flex justify-center pb-1">
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

          {selectedProject && (
            <Details
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectsEdit;
