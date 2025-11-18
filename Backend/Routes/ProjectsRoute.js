const express = require("express");
const router = express.Router();
const Projects = require("../Models/projects.js");
require("dotenv").config();
const upload = require("../config/multer.js");
const cloudinary = require("../config/cloudinary.js");


// ================= GET PROJECTS =================
router.get("/get-projects", async (req, res) => {
  try {
    const list = await Projects.find();
    res.status(200).json(list);
  } catch (err) {
    console.log("GET PROJECTS ERROR:", err);
    res.status(400).json({ error: err.message });
  }
});


// ================= ADD PROJECT =================
router.post("/add-projects", upload.single("Image"), async (req, res) => {
  try {
    const { ProjectName, Description, Link, Github, Tech, Year, Order } = req.body;

    let imageUrl = null;
    let publicId = null;

    if (req.file && req.file.path) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "project_details",
        transformation: [
          { width: 800, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" }
        ]
      });

      imageUrl = result.secure_url;
      publicId = result.public_id;
      console.log("Uploaded:", publicId);
    }

    const newProject = new Projects({
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

    await newProject.save();
    res.status(200).json("Project Added");
  } catch (err) {
    console.log("ADD PROJECT ERROR:", err);
    res.status(400).json({ error: err.message });
  }
});


// ================= DELETE PROJECT =================
router.delete("/delete-projects/:id", async (req, res) => {
  try {
    const project = await Projects.findById(req.params.id);
    if (!project) return res.status(404).json("Project not found");

    if (project.PublicId) {
      try {
        await cloudinary.uploader.destroy(project.PublicId, {
          resource_type: "image",
          invalidate: true,
        });
        console.log("Deleted Image:", project.PublicId);
      } catch (e) {
        console.log("DELETE FAILED:", e.message);
      }
    }

    await Projects.findByIdAndDelete(req.params.id);
    res.status(200).json("Project Deleted");
  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(400).json({ error: err.message });
  }
});


// ================= UPDATE PROJECT =================
router.put("/update-projects/:id", upload.single("Image"), async (req, res) => {
  try {
    const { ProjectName, Description, Link, Github, Tech, Year, Order } = req.body;

    const project = await Projects.findById(req.params.id);
    if (!project) return res.status(404).json("Project not found");

    let imageUrl = project.Image;
    let publicId = project.PublicId;

    if (req.file && req.file.path) {

      // SAFE DELETE OLD IMAGE
      if (publicId && publicId.trim() !== "") {
        try {
          await cloudinary.uploader.destroy(publicId, {
            resource_type: "image",
            invalidate: true,
          });
          console.log("OLD IMAGE DELETED:", publicId);
        } catch (e) {
          console.log("DELETE FAILED:", e.message);
        }
      }

      // UPLOAD NEW COMPRESSED IMAGE
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "project_details",
        transformation: [
          { width: 800, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" },
        ],
      });

      imageUrl = result.secure_url;
      publicId = result.public_id;
      console.log("NEW IMAGE UPLOADED:", publicId);
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

    res.status(200).json("Project Updated");
  } catch (err) {
    console.log("UPDATE PROJECT ERROR:", err);
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;
