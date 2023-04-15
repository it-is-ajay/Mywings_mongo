import {User} from "../module/user.model.js"
import {Follower} from "../module/follower.model.js";
import {Following} from "../module/following.model.js";
import { Help } from "../module/help.model.js";
import { Post } from "../module/user.post.model.js";

export const help = async (request,response)=>{
    try{
        return response.status(200).json({result: await new Help(request.body).save(),status : true});
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

}

export const searchProfileByKeyword = async (request, response) => {
    try {
        return response.status(200).json({ user: await User.find({ userName: { $regex: request.params.keyword, $options: "i" } }), status: true });
    } catch (err) {
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}
export const signUp = async (request, response) => {
    try {
        return response.status(200).json({ user: await User.create(request.body) });
    } catch (err) {
        console.log(err)
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const uploadPost = (request, response) => {
    request.body.date = new Date().toString().substring(4, 15).replaceAll(' ', '/');
    Post.create(request.body).then(result => {
        return response.status(200).json({ message: "post uploaded" })
    }).catch(err => {
        return response.status(500).json({ message: "internal server errore" })
    })
}

export const getAllPost = async (request, response) => {
    try {
        let post = await Post.find({ userId: request.params.userId });
        if (post)
            return response.status(200).json({ message: "data found", result: post, status: true })
            return response.status(500).json({ message: "post not found", status: false })

        } catch (err) {
        console.log(err)
        return response.status(500).json({ message: "internal server errore", status: false })
    }

}
export const getAllLikes = async(request, response) => {
    try {
        let like = await Like.find({ postId: request.params.postId });
        if (!like)
            return response.status(500).json({ message: "like not found", status: false })
            return response.status(200).json({ message: "data found", result: like, status: true })
        } catch (err) {
        console.log(err)
        return response.status(500).json({ message: "internal server errore", status: false })
    }
}

export const getAllComment = async(request, response) => {
    try {
        let comment = await Comment.find({ postId: request.params.postId });
        if (!comment)
            return response.status(500).json({ message: "post not found", status: false })
            return response.status(200).json({ message: "data found", result: comment, status: true })
        } catch (err) {
        console.log(err)
        return response.status(500).json({ message: "internal server errore", status: false })
    }

}