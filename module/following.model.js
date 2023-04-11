import mongoose from "mongoose";

const followingSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    friendUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}) 

export const Following = mongoose.model("Following",followingSchema);