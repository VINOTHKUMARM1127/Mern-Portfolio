const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Projects = require("../Models/Projects");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

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
    const { ProjectName, Description, Link, Github, Tech, Year } = req.body;
    const Image = req.file ? req.file.filename : null;
    const newProjects = new Projects({
      ProjectName,
      Description,
      Link,
      Image,
      Github,
      Tech,
      Year,
    });
    await newProjects.save();
    res.status(200).json("Projects Added");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/delete-projects/:id", async (req, res) => {
  try {
    await Projects.findByIdAndDelete(req.params.id);
    res.status(200).json("Projects Deleted");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/update-projects/:id", upload.single("Image"), async (req, res) => {
  try {
    const { ProjectName, Description, Link, Github, Tech, Year } = req.body;
    const Image = req.file ? req.file.filename : req.body.Image;
    await Projects.findByIdAndUpdate(req.params.id, {
      ProjectName,
      Description,
      Link,
      Image,
      Github,
      Tech,
      Year,
    });
    res.status(200).json("Projects Updated");
  } catch (err) {
    res.status(200).json(err);
  }
});

module.exports = router;
