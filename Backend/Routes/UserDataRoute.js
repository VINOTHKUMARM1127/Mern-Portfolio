const express = require("express");
const router = express.Router();
const User = require("../Models/UserData");

router.get("/get-user", async (req, res) => {
    const SecretKey = process.env.SecretKey;
    if(req.query.key !== SecretKey){
        return res.status(401).json("Unauthorized Access");
    }
  try {
    const UserList = await User.find();
    res.status(200).json(UserList);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;