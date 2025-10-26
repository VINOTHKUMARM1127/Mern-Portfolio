const mongoose = require("mongoose");

const SkillsSchema = new mongoose.Schema({
    Skill : {type: String , required:true},
    Icon : {type: String , required:true},
    Category : {type: String, required:true},
    Order : {type: Number, required:true},
});

const Skills = new mongoose.model("SkillsSchema",SkillsSchema);

module.exports = Skills;

