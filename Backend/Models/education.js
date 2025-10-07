const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  CollegeName: { type: String, required: true },
  Degree: { type: String, required: true },
  Year: { type: String, required: true },
  Description: { type: String, required: true },
});

const Education = new mongoose.model("Education", educationSchema);
module.exports = Education;
