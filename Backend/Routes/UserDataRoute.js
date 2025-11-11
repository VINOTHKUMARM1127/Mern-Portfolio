const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../Models/Userdata.js");

router.get("/get-user", async (req, res) => {
  try {
    const SecretKey = process.env.SecretKey;

    // Check if SecretKey exists
    if (!SecretKey) {
      console.error("⚠️ Missing SecretKey environment variable");
      return res.status(500).json({ error: "Server Misconfiguration" });
    }

    // Check if key is provided
    if (!req.query.key) {
      return res.status(400).json({ error: "Missing key parameter" });
    }

    // Unauthorized check
    if (req.query.key !== SecretKey) {
      return res.status(401).json({ error: "Unauthorized Access" });
    }

    // Wait until DB is ready
    if (mongoose.connection.readyState !== 1) {
      console.error("⚠️ MongoDB not connected yet");
      return res.status(503).json({ error: "Database not connected" });
    }

    // Fetch user list
    const UserList = await User.find().catch((err) => {
      console.error("User.find() failed:", err);
      return [];
    });

    res.status(200).json(UserList);
  } catch (err) {
    console.error("Get User Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
