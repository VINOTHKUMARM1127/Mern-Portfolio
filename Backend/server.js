const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const connectdb = require("./db.js");
const path = require('path');

const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(cors());

connectdb();

const educationRoute = require("./routes/educationRoute");
app.use("/", educationRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
