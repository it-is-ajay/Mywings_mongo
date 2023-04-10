import mongoose from "mongoose";

const adminPostSchema = new mongoose.Schema({
    file :{
        type:STRING
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
    admin:[{
        adminId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"admin"
        }
    }],
    interestedContestants:[{
        interestedContestantsUserId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    }],
    selectedContestants:[{
        selectedContestantsUserId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    }]
})

export const AdminPost = mongoose.model("adminPost", adminPostSchema);
