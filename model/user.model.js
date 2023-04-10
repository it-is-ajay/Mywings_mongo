
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: STRING,
    },
    userName: {
        type: STRING,
    },
    email: {
        type: STRING,
    },
    password: {
        type: STRING,
    },
    contact: {
        type: STRING,
    },
    gender: {
        type: STRING,
    },
    address: {
        type: STRING,
    },
    art: {
        type: STRING,
    },
    profilePhoto: {
        type: STRING,
    },
    status: {
        type: TINYINT,
        default: false
    },
    post:[{
        postId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"post"
        }
    }]
})

export const User = mongoose.model("user", userSchema);

// post:[{
//     postId:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"post"
//     }
// }]