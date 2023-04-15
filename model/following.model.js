import mongoose from "mongoose";

const followingSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    followings:[{
        friendUserId :{
            type:mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    }]
},{
    versionKey : false
}) 

export const Following = mongoose.model("following",followingSchema);