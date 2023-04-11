import mongoose from "mongoose";

const followerSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    friendUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}) 

export const Follower = mongoose.model("Follower",followerSchema);