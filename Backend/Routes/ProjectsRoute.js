const express = require("express");
const router = express.Router();
const multer = require("multer");
const axios = require("axios");
const Projects = require("../Models/Projects.js");
require("dotenv").config(); 

const upload = multer({ storage: multer.memoryStorage() });

router.get("/get-projects", async (req, res) => {
  try {
    const ProjectList = await Projects.find();
    res.status(200).json(ProjectList);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/add-projects", upload.single("Image"), async (req, res) => {
  try {
    const { ProjectName, Description, Link, Github, Tech, Year, Order } = req.body;
    let imageUrl = null;
    let deleteUrl = null;

    if (req.file) {
      try {
        const imageBase64 = req.file.buffer.toString("base64");
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
          new URLSearchParams({ image: imageBase64 })
        );
        imageUrl = response.data?.data?.url || null;
        deleteUrl = response.data.data.delete_url || null;
      } catch (uploadErr) {
        console.error("IMGBB Upload Error:", uploadErr.message);
      }
    }

    const newProjects = new Projects({
      ProjectName,
      Description,
      Link,
      Image: imageUrl,
      DeleteUrl: deleteUrl,
      Github,
      Tech,
      Year,
      Order
    });

    await newProjects.save();
    res.status(200).json("Projects Added");
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.delete("/delete-projects/:id", async (req, res) => {
  try {
    const project = await Projects.findById(req.params.id);
    if (project.DeleteUrl) {
      await axios.get(project.DeleteUrl);
    }
    await Projects.findByIdAndDelete(req.params.id);
    res.status(200).json("Projects Deleted");
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.put("/update-projects/:id", upload.single("Image"), async (req, res) => {
  try {
    const { ProjectName, Description, Link, Github, Tech, Year, Order } = req.body;
    const project = await Projects.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    let imageUrl = project.Image;
    let deleteUrl = project.DeleteUrl;

    if (req.file) {
      try {
        if (project.DeleteUrl) {
          try {
            await axios.get(project.DeleteUrl);
          } catch (err) {
            console.error("Old IMGBB Delete Error:", err.message);
          }
        }
        const imageBase64 = req.file.buffer.toString("base64");
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
          new URLSearchParams({ image: imageBase64 })
        );
        imageUrl = response.data?.data?.url || imageUrl;
        deleteUrl = response.data?.data?.delete_url || deleteUrl;
      } catch (uploadErr) {
        console.error("IMGBB Upload Error:", uploadErr.message);
      }
    }

    await Projects.findByIdAndUpdate(req.params.id, {
      ProjectName,
      Description,
      Link,
      Image: imageUrl,
      DeleteUrl: deleteUrl,
      Github,
      Tech,
      Year,
      Order
    });

    res.status(200).json("Projects Updated");
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

module.exports = router;
