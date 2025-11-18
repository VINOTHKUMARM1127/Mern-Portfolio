const express = require("express");
const router = express.Router();
const Projects = require("../Models/projects.js");
require("dotenv").config();
const upload = require("../config/multer.js");
const cloudinary = require("../config/cloudinary.js");

// ================= GET PROJECTS =================
router.get("/get-projects", async (req, res) => {
  try {
    const projects = await Projects.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(400).json(err);
  }
});

// ================= ADD PROJECT =================
router.post("/add-projects", upload.single("Image"), async (req, res) => {
  try {
    const { ProjectName, Description, Link, Github, Tech, Year, Order } = req.body;

    let imageUrl = null;
    let publicId = null;

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "project_details",
        eager: [
          { width: 800, crop: "limit", quality: "auto", fetch_format: "auto" },
        ],
        eager_async: false,
      });

      // Save compressed version only
      imageUrl = uploadResult.eager[0].secure_url;
      publicId = uploadResult.eager[0].public_id;

      // Delete original
      await cloudinary.uploader.destroy(uploadResult.public_id, {
        resource_type: "image",
      });
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
    res.status(200).json("Projects Added");
  } catch (err) {
    res.status(400).json(err);
  }
});

// ================= DELETE PROJECT =================
router.delete("/delete-projects/:id", async (req, res) => {
  try {
    const project = await Projects.findById(req.params.id);
    if (!project) return res.status(404).json("Project not found");

    if (project.PublicId) {
      await cloudinary.uploader.destroy(project.PublicId, {
        resource_type: "image",
        invalidate: true,
      });
    }

    await Projects.findByIdAndDelete(req.params.id);
    res.status(200).json("Projects Deleted");
  } catch (err) {
    res.status(400).json(err);
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

    if (req.file) {
      // Delete old compressed image
      if (publicId) {
        await cloudinary.uploader.destroy(publicId, {
          resource_type: "image",
        });
      }

      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "project_details",
        eager: [
          { width: 800, crop: "limit", quality: "auto", fetch_format: "auto" },
        ],
        eager_async: false,
      });

      // Use compressed version
      imageUrl = uploadResult.eager[0].secure_url;
      publicId = uploadResult.eager[0].public_id;

      // Delete original image
      await cloudinary.uploader.destroy(uploadResult.public_id, {
        resource_type: "image",
      });
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
