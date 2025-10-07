const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const connectdb = require("./db.js");

const app = express();

app.use(express.json());
app.use(cors());

connectdb();

const educationRoute = require("./routes/educationRoute");
app.use("/", educationRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
