
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    file: {
        type: String,
    },
    caption :{
        type:String
    },
    locationOfYour:{
        type:String,
        default:"INDORE"
    },
    date:{
        type:String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }, // isse ye pata chelga ki kis user ki post h 
    likeItems: [{
        friendUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    }], // kin kin user n ye post pr like kra unki id

    saveItems: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    }] // kin kin user n ye post ko save kra unki id
})

export const Post = mongoose.model("post", PostSchema);


