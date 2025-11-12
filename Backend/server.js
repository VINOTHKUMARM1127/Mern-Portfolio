const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const connectdb = require("./db.js");

const app = express();
app.use(express.json());
app.use(cors());

connectdb();


//const educationRoute = require("./Routes/educationRoute.js");
const projectsRoute = require("./Routes/ProjectsRoute.js");
const userRoute = require("./Routes/userRoute.js");
const detailsRoute = require("./Routes/detailsRoute.js");
const SkillsRoute = require("./Routes/SkillsRoute.js");

//app.use("/", educationRoute);
app.use("/", projectsRoute);
app.use("/", userRoute);
app.use("/", detailsRoute);
app.use("/", SkillsRoute);

app.get("/", (req, res) => {
  res.send("Server Running");
});


app.listen(process.env.PORT || 5000, () =>
  console.log("Server running on port 5000")
);

module.exports = app;