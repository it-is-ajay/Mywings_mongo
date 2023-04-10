import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
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

export const Comment = mongoose.model("comment", commentSchema);
