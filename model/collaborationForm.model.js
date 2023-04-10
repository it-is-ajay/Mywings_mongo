import mongoose from "mongoose";

const collaborationFormSchema = new mongoose.Schema({
    BusinessFirmName :{
        type:STRING
    },
    email :{
        type:STRING,
        unique:true
    },
    address:{
        type:STRING
    },
    contactPersonName:{
        type:STRING
    },
    contact:{
        type:STRING
    }
})

export const CollaborationForm = mongoose.model("collaborationForm", collaborationFormSchema);
