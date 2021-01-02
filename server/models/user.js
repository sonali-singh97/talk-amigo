const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;
const userSchema = new mongoose.Schema ({
    username:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true

    },
    resetToken:String,
    expireToken:Date,
    image: {
        type: String,
        default: "https://res.cloudinary.com/talk-amigo/image/upload/v1609559673/136-1366211_group-of-10-guys-login-user-icon-png_g56guw.jpg"
    },
    followers: [{type: ObjectId , ref : 'User'}],
    following: [{type: ObjectId , ref: 'User'}]


})

module.exports = mongoose.model("User" , userSchema);