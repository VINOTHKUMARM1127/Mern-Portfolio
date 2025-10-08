const express = require('express');
const router = express.Router();
const Projects = require('../Models/Projects');

router.post('/add-project', async(req,res)=>{
    try{
        const { ProjectName, Description, Link, Image, Github, Tech, Year} = req.body;
        const newProjects = new Projects({ProjectName, Description, Link, Image, Github, Tech, Year});
        await newProjects .save();
        res.status(200).json("Projects Added");
    }catch (err){
        res.status(400).json(err);
    }
});


router.get("/get-projects", async (req,res)=>{
    try{
         const ProjectList = await Projects.find();
         res.status(200).json(ProjectList)
    }catch (err) {
        res.status(400).json(err)
    }
})

router.delete("/delete-projects/:id", async (req,res)=>{
    try{
        await Projects.findByIdAndDelete(req.params.id)
        res.status(200).json("Projects Deleted")
    }catch (err){
        res.status(400).json(err)
    }
})


router.put("/update-projects/:id", async (req,res)=>{
    try{
        const { ProjectName, Description, Link, Image, Github, Tech, Year} = req.body;
        await Projects.findByIdAndUpdate(req.params.id, {ProjectName, Description, Link, Image, Github, Tech, Year});
        res.status(200).json("Projects Updated");
    }catch (err){ 
        res.status(200).json(err);
    }
})


module.exports = router;