import { Post } from "../model/post.model.js";
import { Like } from "../model/like.model.js";
import { Save } from "../model/save.model.js";
import { Comment } from "../model/comment.model.js";

export const postPage = (request,response,next)=>{} 

export const getAllPost = (request,response,next)=>{
    try {
        let data = Post.find({userId:request.body.userId})
        .then((result)=>{return response.status(200).json({message:"data found",result:result,status:true})})
    } catch (error) {
       //console.log(error);
       return response.status(500).json({error:"internal server error",status:true});   
    }
}

export const getAllLikes = (request,response,next)=>{
    try {
        let data = Like.find({userId:request.body.userId,postId:request.body.postId})
        .then((result)=>{return response.status(200).json({message:"data found",result:result,status:true})})
    } catch (error) {
       console.log(error);
       return response.status(500).json({error:"internal server error",status:false});   
    }
}

export const getSavedPost = (request,response,next)=>{
    try {
        let data = Save.find({userId:request.body.userId,postId:request.body.postId})
        .then((result)=>{return response.status(200).json({message:"data found",result:result,status:true})})
    } catch (error) {
       console.log(error);
       return response.status(500).json({error:"internal server error",status:false});   
    }
}

export const getAllComments = (request,response,next)=>{
    try {
        let data = Comment.find({userId:request.body.userId,postId:request.body.postId})
        .then((result)=>{return response.status(200).json({message:"data found",result:result,status:true})})
    } catch (error) {
       console.log(error);
       return response.status(500).json({error:"internal server error",status:false});   
    }
}

export const save = async (request,response,next)=>{
    try {
        let errors = await validationResult(request);
        if(!errors.isEmpty())
        return response.status(400).json({ error: "bad request", status: false });
        console.log(request.body);
        let data = await Post.create(request.body);
        return response.status(200).json({message:"data saved",status:true});
    } catch (error) {
        console.log(error);
        return response.status(500).json({error:"Internal server errors",status:false});
    }
}

export const likePost = async (request,response,next)=>{
    try {
        let errors = await validationResult(request);
        if(!errors.isEmpty())
            return response.status(400).json({ error: "bad request", status: false });
        let checkExistence = await Like.findOne({where:{userId:request.body.userId,postId:request.body.postId}});
        if(checkExistence)
            return response.status(200).json({message:"you already liked the post"});
        let data = await Like.create(request.body)
        return response.status(200).json({message:"post liked",status:true});
    } catch (error) {
        console.log(error);
        return response.status(500).json({error:"internal server error",status:false});
    }
}

export const commentPost = async (request,response,next)=>{
    try {
        let errors = await validationResult(request);
        if(!errors.isEmpty())
            return response.status(400).json({ error: "bad request", status: false });
        let data = await Comment.create(request.body)
        return response.status(200).json({message:"Commented Sucessfull",status:true});
    } catch (error) {
        console.log(error);
        return response.status(500).json({error:"internal server error",status:false});
    }
}

export const savePost = async (request,response,next)=>{
    try {
        let errors = await validationResult(request);
        if(!errors.isEmpty())
            return response.status(400).json({ error: "bad request", status: false });
        let data = await Save.create(request.body)
        return response.status(200).json({message:"Post saved successful Sucessfull",status:true});
    } catch (error) {
        console.log(error);
        return response.status(500).json({error:"internal server error",status:false});
    }
}