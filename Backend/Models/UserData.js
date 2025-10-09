const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema({
    "Email" : {type: String, required: true, unique: true},
    "Password" : {type: String, required: true}
});

const User = new mongoose.model("Users",UserDataSchema);

module.exports = User;