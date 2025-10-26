const express = require("express");
const router = express.Router();
const Skills = require("../Models/Skils.js");

router.get("/get-skills", async (req, res) => {
  try {
    const SkillsList = await Skills.find();
    res.status(200).json(SkillsList);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/add-skills", async (req, res) => {
  try {
    const { Skill, Icon, Category, Order } = req.body;
    const newSkills = new Skills({
      Skill,
      Icon,
      Category,
      Order
    });
    await newSkills.save();
    res.status(200).json("Skill Added");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/update-skills/:id", async (req, res) => {
  try {
    const { Skill, Icon, Category, Order } = req.body;
    await Skills.findByIdAndUpdate(req.params.id, {
      Skill,
      Icon,
      Category,
      Order
    });
    res.status(200).json("Skill Updated");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/delete-skills/:id", async (req, res) => {
  try {
    await Skills.findByIdAndDelete(req.params.id);
    res.status(200).json("Skill Deleted");
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
