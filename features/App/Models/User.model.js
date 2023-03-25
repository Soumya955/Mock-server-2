const mongoose = require("mongoose");

const userData = new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String
})

const UserModel = mongoose.model("user",userData);
module.exports = UserModel