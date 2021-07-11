const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const notificationSchema = new mongoose.Schema({

        recipient: { type: ObjectId, ref: 'User' },
        sender: { type: ObjectId, ref: 'User' },
        //read: true | false,
        //type: String,
        //type: ' like|comment ',
        //postId: 
        //createdAt: { type: Date, default: Date.now }
        post: ObjectId,
        like: {type: ObjectId, ref: 'Like',},
        follow: {type: ObjectId, ref: 'Follow',},
        comment: {type: ObjectId,ref: 'Comment',},
        seen: {type: Boolean, default: false,},
    },
    {
        timestamps: true,
    }
)

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true

    },
    resetToken: String,
    expireToken: Date,
    image: {
        type: String,
        default: "https://res.cloudinary.com/talk-amigo/image/upload/v1610989192/dc5dp7q6wupbfu97wkv8.png"
    },
    followers: [{ type: ObjectId, ref: 'User' }],
    following: [{ type: ObjectId, ref: 'User' }],
    notification: [ { type: ObjectId, ref: notificationSchema } ]


})

module.exports = mongoose.model("User", userSchema);