const express = require("express");
const router = express.Router();
const User = require("../Models/Userdata.js");

router.get("/get-user", async (req, res) => {
  try {
    const SecretKey = process.env.SecretKey;
    if (req.query.key !== SecretKey) {
      return res.status(401).json({error:"Unauthorized Access"});
    }
    const UserList = await User.find();
    res.status(200).json(UserList);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
