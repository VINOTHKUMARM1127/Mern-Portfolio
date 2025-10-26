const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const connectdb = require("./db.js");

const app = express();
app.use(express.json());
app.use(cors());

connectdb();

const educationRoute = require("./Routes/educationRoute.js");
app.use("/", educationRoute);

const projectsRoute = require("./Routes/ProjectsRoute.js")
app.use("/",projectsRoute)

const UserDataRoute = require("./Routes/UserDataRoute.js")
app.use("/",UserDataRoute)

const detailsRoute = require("./Routes/detailsRoute.js")
app.use("/",detailsRoute)

const SkillsRoute = require("./Routes/SkillsRoute.js")
app.use("/",SkillsRoute)

app.listen(process.env.PORT, () => console.log("🚀 Server running on port 5000"));

