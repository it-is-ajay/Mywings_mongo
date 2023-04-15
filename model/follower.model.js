import mongoose from "mongoose";

const followerSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    followers:[{
        friendUserId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    }]
},{
    versionKey : false
});

export const Follower = mongoose.model("follower",followerSchema);