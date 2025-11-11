// db.js
const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.Dburl);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("!!!!!!!!!! MONGODB CONNECTION FAILED !!!!!!!!!!");
    console.error(err.message);
    // Vercel la function crash aagurathukku intha log mukkiyam
    process.exit(1); // Server ah stop panniru
  }
};

module.exports = connectdb;