const mongoose = require("mongoose");
const connectdb = async()=>{
    try{
        await mongoose.connect(process.env.Dburl,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
        console.log("Database Connected");
    }catch(err){
        console.log(err,"Database Not Connected");
    }
}

module.exports = connectdb;

