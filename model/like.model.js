import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    user:[{
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    }],
    adminPost:[{
        adminPostId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"adminPost"
        }
    }]
})

export const Like = mongoose.model("like", likeSchema);
