import mongoose from "mongoose";

const spamSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
});

export const Spam = mongoose.model("Spam",spamSchema);