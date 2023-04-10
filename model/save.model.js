
import mongoose from "mongoose";

const saveSchema = new mongoose.Schema({
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

export const Save = mongoose.model("save", saveSchema);
