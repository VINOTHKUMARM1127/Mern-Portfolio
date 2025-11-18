const express = require("express");
const router = express.Router();
const Details = require("../Models/Details.js");
require("dotenv").config();
const upload = require("../config/multer.js"); 
const cloudinary = require("../config/cloudinary.js");

router.post("/add-details", upload.single("Image"), async (req, res) => {
  try {
    const { Greetings, Name, Desigination, Description, ResumeLink } = req.body;
    let imageUrl = null;
    let publicId = null;

if (req.file) {
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "portfolio_details",
    transformation: [
      { width: 800, crop: "limit" },
      { quality: "auto" },
      { fetch_format: "auto" }
    ]
  });

  imageUrl = result.secure_url;
  publicId = result.public_id;
}


    const newDetails = new Details({
      Greetings,
      Name,
      Desigination,
      Image: imageUrl,
      PublicId: publicId,
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

router.put("/update-details/:id", upload.single("Image"), async (req, res) => {
  try {
    const { Greetings, Name, Desigination, Description, ResumeLink } = req.body;

    const detail = await Details.findById(req.params.id);

    let imageUrl = detail.Image;
    let publicId = detail.PublicId;

if (req.file) {
  if (publicId) {
    await cloudinary.uploader.destroy(publicId);
  }

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "portfolio_details",
    transformation: [
      { width: 800, crop: "limit" },
      { quality: "auto" },
      { fetch_format: "auto" }
    ]
  });

  imageUrl = result.secure_url;
  publicId = result.public_id;
}


    await Details.findByIdAndUpdate(req.params.id, {
      Greetings,
      Name,
      Desigination,
      Image: imageUrl,
      PublicId: publicId,
      Description,
      ResumeLink,
    });
    res.status(200).json("Details Updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
