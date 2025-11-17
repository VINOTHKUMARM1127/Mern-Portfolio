const express = require("express");
const router = express.Router();
const Projects = require("../Models/projects.js");
require("dotenv").config();
const upload = require("../config/multer.js");
const cloudinary = require("../config/cloudinary.js");

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
    const { ProjectName, Description, Link, Github, Tech, Year, Order } =
      req.body;
    let imageUrl = null;
    let publicId = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "project_details",
      });

      imageUrl = result.secure_url;
      publicId = result.public_id;
    }

    const newProjects = new Projects({
      ProjectName,
      Description,
      Link,
      Image: imageUrl,
      PublicId: publicId,
      Github,
      Tech,
      Year,
      Order,
    });

    await newProjects.save();
    res.status(200).json("Projects Added");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/delete-projects/:id", async (req, res) => {
  try {
    const project = await Projects.findById(req.params.id);
    if (!project) return res.status(404).json("Project not found");
    if (project.PublicId) {
      await cloudinary.uploader.destroy(project.PublicId);
    }
    await Projects.findByIdAndDelete(req.params.id);
    res.status(200).json("Projects Deleted");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/update-projects/:id", upload.single("Image"), async (req, res) => {
  try {
    const { ProjectName, Description, Link, Github, Tech, Year, Order } =
      req.body;
    const project = await Projects.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    let imageUrl = project.Image;
    let publicId = project.PublicId;

    if (req.file) {
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "project_details",
      });

      imageUrl = result.secure_url;
      publicId = result.public_id;
    }

    await Projects.findByIdAndUpdate(
      req.params.id,
      {
        ProjectName,
        Description,
        Link,
        Image: imageUrl,
        PublicId: publicId,
        Github,
        Tech,
        Year,
        Order,
      },
      { new: true }
    );

    res.status(200).json("Projects Updated");
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
