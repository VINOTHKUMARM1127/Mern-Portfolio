const express = require("express");
const router = express.Router();
const multer = require("multer");
const axios = require("axios");
const Details = require("../Models/Details.js");
require("dotenv").config();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/add-details", upload.single("Image"), async (req, res) => {
  try {
    const { Greetings, Name, Desigination, Description, ResumeLink } =
      req.body;
    let imageUrl = null;
    let deleteUrl = null;

    if (req.file) {
      try {
        const imageBase64 = req.file.buffer.toString("base64");
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
          new URLSearchParams({ image: imageBase64 })
        );
        imageUrl = response.data?.data?.url || null;
        deleteUrl = response.data.data.delete_url || null;
      } catch (uploadErr) {
        console.error("IMGBB Upload Error:", uploadErr.message);
      }
    }

    const newDetails = new Details({
      Greetings,
      Name,
      Desigination,
      Image : imageUrl,
      DeleteUrl: deleteUrl,
      Description,
      ResumeLink,
    });
    await newDetails.save();
    res.status(200).json("Data Added");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/get-details", async (req, res) => {
  try {
    const Detailslist = await Details.find();
    res.status(200).json(Detailslist);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/update-details/:id",upload.single("Image"),async (req,res)=>{
    try{
        const { Greetings, Name, Desigination, Description, ResumeLink } =
      req.body;

      const detail = await Details.findById(req.params.id)

          let imageUrl = detail.Image;
          let deleteUrl = detail.DeleteUrl;
      
          if (req.file) {
            try {
              if (detail.DeleteUrl) {
                try {
                  await axios.get(detail.DeleteUrl);
                } catch (err) {
                  console.error("Old IMGBB Delete Error:", err.message);
                }
              }
              const imageBase64 = req.file.buffer.toString("base64");
              const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
                new URLSearchParams({ image: imageBase64 })
              );
              imageUrl = response.data?.data?.url || imageUrl;
              deleteUrl = response.data?.data?.delete_url || deleteUrl;
            } catch (uploadErr) {
              console.error("IMGBB Upload Error:", uploadErr.message);
            }
          }

    await Details.findByIdAndUpdate(req.params.id,{
      Greetings,
      Name,
      Desigination,
      Image : imageUrl,
      DeleteUrl: deleteUrl,
      Description,
      ResumeLink,
    });
    res.status(200).json("Details Updated")
    }catch (err){
        res.status(500).json(err)
    }
})


module.exports = router