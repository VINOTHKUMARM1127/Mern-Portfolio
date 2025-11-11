const mongoose = require("mongoose");

const Userdataschema = new mongoose.Schema({
    "Email" : {type: String, required: true, unique: true},
    "Password" : {type: String, required: true}
});

const User = new mongoose.model("Users",Userdataschema);

module.exports = User;