
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    file :{
        type:STRING,
    },
    caption :{
        type:STRING
    },
    locationOfYour:{
        type:STRING,
        default:"INDORE"
    },
    date:{
        type:STRING
    },
    user:[{
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    }]
})

export const Post = mongoose.model("post", PostSchema);
