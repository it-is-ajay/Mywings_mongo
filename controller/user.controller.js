import {User} from "../module/user.model.js"
import {Follower} from "../module/follower.model.js";
import {Following} from "../module/following.model.js";
import { Help } from "../module/help.model.js";

export const help = async (request,response)=>{
    try{
        return response.status(200).json({result: await new Help(request.body).save(),status : true});
    }catch(err){
        return response.status(500).json({ result: "internal server error", status: false });
    }
}
export const signUp = async (request , response)=>{
    try{
        User.create(request.body)
        return response.status(200).json({followers : await Follower.find({userId:request.params.userId}),status:true});
    }catch(err){
        return response.status(500).json({ result: "internal server error", status: false });
    }
}
export const follower = async (request, response) => {
    try {
        return (await Follower.findOne({ userId: request.body.userId, friendUserId: request.body.friendUserId }))
        ?response.status(200).json({ message: "already followed", status: true })
        :response.status(200).json({result:await new Follower(request.body).save(), message: "follow successful", status: true });
    } catch (err) {
        return response.status(500).json({ result: "internal server error", status: false });
    }
}

export const following = async (request,response)=>{
    try{
        return (await Following.findOne({userId: request.body.userId, friendUserId: request.body.friendUserId }))
        ?response.status(200).json({ message: "already followed", status: true })
        :response.status(200).json({result:await new Following(request.body).save(), message: "follow successful", status: true });
        
    }catch(err){
        return response.status(500).json({ result: "internal server error", status: false });
    }
}

export const getAllFollower = async (request,response)=>{
    try{
        return response.status(200).json({followers : await Follower.find({userId:request.params.userId}),status:true});
    }catch(err){
        return response.status(500).json({ result: "internal server error", status: false });
    }
}

export const getAllFollowing = async (request,response)=>{
    try{
        const result = await Following.find({userId : request.params.userId});
        return (result.length)
        ?response.status(200).json({result,status:true})
        :response.status(404).json({message : "Resource Not found",status: false});
    }catch(err){
        console.log(err);
        return response.status(500).json({ result: "internal server error", status: false });
    }
}

export const unFollow = async (request,response)=>{
    try{
        return(await Following.findOne({userId: request.body.userId, friendUserId: request.body.friendUserId}))
        ?response.status(200).json({result : await Following.deleteOne({friendUserId : request.body.friendUserId}),status :true})
        :response.status(404).json({message : "Resource Not found",status: false});
    }catch(err){
        console.log(err);
        return response.status(500).json({ result: "internal server error", status: false });
    }
}

export const removeFollower = async (request,response)=>{
    try{
        return(await Follower.findOne({userId: request.body.userId, friendUserId: request.body.friendUserId}))
        ?response.status(200).json({result : await Follower.deleteOne({friendUserId : request.body.friendUserId}),status :true})
        :response.status(404).json({message : "Resource Not found",status: false});
    }catch(err){
        console.log(err);
        return response.status(500).json({ result: "internal server error", status: false });
    }
}

export const spam = (request,response)=>{
//push the post model first...
}

export const searchProfileByKeyword = async (request, response) => {
    try {
        return response.status(200).json({ user: await User.find({ userName: { $regex: request.params.keyword, $options: "i" } }), status: true });
    } catch (err) {
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}


export const deleteAccount = async (request,response)=>{
    //console.log(request.body.userId);
    User.deleteOne({_id: request.body.userId})
   .then(result=>{
      return response.status(200).json({message: "user deleted..", status: true});
   }).catch(err=>{
       return response.status(500).json({message: "Internal Server Error", status: false});
   });
}

// export const helpRequest = (request,response,next)=>{
//     console.log(request.body.userId);
//     console.log(request.body.help);
//     Help.create({userId:request.body.userId},{problem:request.body.help})
//     .then(result=>{
//         return response.status(200).json({message: "user help..", status: true});
//      }).catch(err=>{
//          return response.status(500).json({message: "Internal Server Error", status: false});
//      });
// }