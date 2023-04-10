
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    userName:{
        type:STRING,            
    },
    email:{
        type:STRING,                 
    },
    password:{
        type:STRING,
    },
    bio:{
        type:STRING,
    },
    profilePhoto:{
        type:STRING,
    }
})

export const Admin = mongoose.model("admin", adminSchema);
