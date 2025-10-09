const express = require("express");
const router = express.Router();
const Education = require("../Models/Education");

router.post("/add-education", async (req, res) => {
  try {
    const { CollegeName, Degree, Year, Description } = req.body;
    const newEducation = new Education({
      CollegeName,
      Degree,
      Year,
      Description,
    });
    await newEducation.save();
    res.status(200).json("Education Added");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/get-education", async (req, res) => {
  try {
    const EducationList = await Education.find();
    res.status(200).json(EducationList);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/delete-education/:id", async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.status(200).json("Education Deleted");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/update-education/:id", async (req, res) => {
  try {
    const { CollegeName, Degree, Year, Description } = req.body;
    await Education.findByIdAndUpdate(req.params.id, {
      CollegeName,
      Degree,
      Year,
      Description,
    });
    res.status(200).json("Education Updated");
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
