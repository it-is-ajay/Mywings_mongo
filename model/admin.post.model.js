import mongoose from "mongoose";

const AdminPostSchema=new mongoose.Schema({
    file:String,
    date:String,
    caption:String,
    location:String,
    adminId:{
        type:mongoose.Schema.Types.ObjectId,ref:"admin"},
        intrusted:[{
            userId:{type:mongoose.Schema.Types.ObjectId,ref:"user"}}],
        selected:[{
           userId:{type:mongoose.Schema.Types.ObjectId,ref:"user"}}]

    })

export const AdminPosts=mongoose.model("adminPost",AdminPostSchema);