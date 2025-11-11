const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const serverless = require("serverless-http");
const connectdb = require("./db.js");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ connect once
if (mongoose.connection.readyState === 0) {
  connectdb();
}

// ✅ import routes
const educationRoute = require("./Routes/educationRoute.js");
const projectsRoute = require("./Routes/ProjectsRoute.js");
const Userdataroute = require("./Routes/UserDataRoute.js");
const detailsRoute = require("./Routes/detailsRoute.js");
const SkillsRoute = require("./Routes/SkillsRoute.js");

// ✅ use routes
app.use("/api", educationRoute);
app.use("/api", projectsRoute);
app.use("/api", Userdataroute);
app.use("/api", detailsRoute);
app.use("/api", SkillsRoute);

// ✅ default route
app.get("/", (req, res) => {
  res.send("🚀 Server Running Successfully!");
});

// ❌ remove app.listen()
// ✅ export handler for Vercel
module.exports = app;
module.exports.handler = serverless(app);
