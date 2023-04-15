import mongoose from "mongoose";

const UserPostSchema= new mongoose.Schema({
    userId:String,
    file:String,
    date:String,
    caption:String,
    location:String,
    userId:{
        type:mongoose.Schema.Types.ObjectId,ref:"user"}

}
)

export const Post=mongoose.model("post",UserPostSchema);