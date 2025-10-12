const mongoose = require("mongoose")

const Detailschema = new mongoose.Schema({
    Greetings: {type:String, required:true},
    Name: { type: String, required: true },
    Desigination: { type: String, required: true },
    Image: { type: String, required: true },
    DeleteUrl: { type: String, required: true },
    Description: { type: String, required: true },
    ResumeLink: { type: String, required: true },
})


const Details = new mongoose.model("Details", Detailschema)

module.exports = Details;