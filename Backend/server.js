const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const serverless = require("serverless-http");
const connectdb = require("./db.js");

const app = express();
app.use(express.json());
app.use(cors());

// --- CHANGE PANNA IDAM ---
// Intha async wrapper ah remove panniru.
// Just `connectdb()` nu call pannu. Mongoose buffering paathukkum.
connectdb();

// --- All Routes ---
const educationRoute = require("./Routes/educationRoute.js");
const projectsRoute = require("./Routes/ProjectsRoute.js");
const Userdataroute = require("./Routes/UserDataRoute.js");
const detailsRoute = require("./Routes/detailsRoute.js");
const SkillsRoute = require("./Routes/SkillsRoute.js");

app.use("/", educationRoute);
app.use("/", projectsRoute);
app.use("/", Userdataroute);
app.use("/", detailsRoute);
app.use("/", SkillsRoute);

app.get("/", (req, res) => {
  res.send("Server Running");
});

// `app.listen` local development ku mattum thaan.
// Vercel itha use pannathu. Athanaala itha ippadiye vechikalam.
app.listen(process.env.PORT || 5000, () =>
  console.log("🚀 Server running on port 5000")
);

module.exports.handler = serverless(app);