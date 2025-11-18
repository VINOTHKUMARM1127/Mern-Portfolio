const express = require("express");
const router = express.Router();
const Projects = require("../Models/projects.js");
require("dotenv").config();
const upload = require("../config/multer.js");
const cloudinary = require("../config/cloudinary.js");

// ------------------ GET PROJECTS ------------------
router.get("/get-projects", async (req, res) => {
  try {
    const ProjectList = await Projects.find().sort({ Order: 1 });
    return res.status(200).json(ProjectList);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch projects", details: err });
  }
});

// ------------------ ADD PROJECTS ------------------
router.post("/add-projects", upload.single("Image"), async (req, res) => {
  try {
    const { ProjectName, Description, Link, Github, Tech, Year, Order } = req.body;

    if (!ProjectName || !Description || !Tech || !Year) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    let imageUrl = null;
    let publicId = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "project_details",
        transformation: [
          { width: 800, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" }
        ],
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
    return res.status(200).json("Project Added Successfully");

  } catch (err) {
    return res.status(500).json({ error: "Failed to add project", details: err });
  }
});

// ------------------ DELETE PROJECT ------------------
router.delete("/delete-projects/:id", async (req, res) => {
  try {
    const project = await Projects.findById(req.params.id);
    if (!project) return res.status(404).json("Project not found");

    if (project.PublicId) {
      await cloudinary.uploader.destroy(project.PublicId);
    }

    await Projects.findByIdAndDelete(req.params.id);
    return res.status(200).json("Project Deleted");

  } catch (err) {
    return res.status(500).json({ error: "Failed to delete project", details: err });
  }
});

// ------------------ UPDATE PROJECT ------------------
router.put("/update-projects/:id", upload.single("Image"), async (req, res) => {
  try {
    const { ProjectName, Description, Link, Github, Tech, Year, Order } = req.body;

    const project = await Projects.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    let imageUrl = project.Image;
    let publicId = project.PublicId;

    if (req.file) {
      if (publicId) await cloudinary.uploader.destroy(publicId);

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "project_details",
        transformation: [
          { width: 800, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" }
        ],
      });

      imageUrl = result.secure_url;
      publicId = result.public_id;
    }

    await Projects.findByIdAndUpdate(
      req.params.id,
      { ProjectName, Description, Link, Image: imageUrl, PublicId: publicId, Github, Tech, Year, Order },
      { new: true }
    );

    return res.status(200).json("Project Updated Successfully");

  } catch (err) {
    return res.status(500).json({ error: "Failed to update project", details: err });
  }
});

module.exports = router;
