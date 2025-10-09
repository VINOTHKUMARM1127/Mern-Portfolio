const mongoose = require("mongoose");

const projectsSchema = new mongoose.Schema({
  ProjectName: { type: String, required: true },
  Description: { type: String, required: true },
  Link: { type: String, required: true },
  Image: { type: String, required: true },
  DeleteUrl: { type: String },
  Github: { type: String, required: true },
  Tech: { type: String, required: true },
  Year: { type: String, required: true },
});

const Projects = new mongoose.model("Projects", projectsSchema);
module.exports = Projects;
