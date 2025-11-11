
const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.Dburl);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("!!!!!!!!!! MONGODB CONNECTION FAILED !!!!!!!!!!");
    console.error(err.message);
    process.exit(1); 
  }
};

module.exports = connectdb;