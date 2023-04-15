import { Post } from "../model/post.model.js";
import { Comment } from "../model/comment.model.js";

export const postPage = (request, response, next) => { }

export const getAllPost = (request, response, next) => {
    try {
        Post.find({ userId: request.body.userId })
        .then((result) => { return response.status(200).json({ message: "data found", result: result, status: true }) })
    } catch (error) {
        return response.status(500).json({ error: "internal server error", status: true });
    }
}

export const uploadPost = async (request, response) => {
    try {
        Post.create(request.body)
        return response.status(200).json({ message: "post uploaded by user ", status: true });
    } catch (err) {
        return response.status(500).json({ result: "internal server error", status: false });
    }
}

export const getAllLikes = (request, response, next) => {
    console.log(request.body.postId);
    Post.findById({ _id: request.body.postId })
        .populate("likeItems.friendUserId").then(result => {
            return response.status(200).json(result);
        }).catch(err => {
            console.log(err);
            return response.status(500).json({ message: "internal server error", status: false })
        })
}

export const getSavedPost = (request, response, next) => {
    Post.findById({ _id: request.body.postId })
        .populate("saveItems.friendUserId").then(result => {
            return response.status(200).json(result);
        }).catch(err => {
            console.log(err);
            return response.status(500).json({ message: "internal server error", status: false })
        })
}

export const getAllComments = (request, response, next) => {
    try {
        let data = Comment.find({ userId: request.body.userId, postId: request.body.postId })
        if (data)
            return response.status(200).json({ message: "data found", result: result, status: true })
        return response.status(404).json({ message: "requested data not found", status: false })
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const likePost = async (request, response, next) => {
    try {
        let postFound = await Post.findOne({ _id: request.body.postId });
        if (postFound) {
            if (postFound.likeItems.some((item) => item.friendUserId == request.body.friendUserId)) {
                let index = postFound.likeItems.findIndex((user) => { return user.friendUserId == request.body.friendUserId });
                postFound.likeItems.splice(index, 1);
                await postFound.save();
                return response.status(200).json({ message: " you unliked the post", status: true })
            } else {
                postFound.likeItems.push({ friendUserId: request.body.friendUserId });
                await postFound.save();
                return response.status(200).json({ message: "like the post", status: true })
            }
        }
        else {
            await Post.create({ postId: request.body.postId, likeItems: [{ friendUserId: request.body.friendUserId }] });
        }
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const commentPost = async (request, response, next) => {
    try {
        await Comment.create(request.body);
        return response.status(200).json({ message: "Post saved successful Sucessfull", status: true });

    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const savePost = async (request, response, next) => {
    try {
        let postFound = await Post.findOne({ postId: request.body.postId });
        if (postFound) {
            if (postFound.saveItems.some((item) => item.userId == request.body.userId)) {
                let index = postFound.saveItems.findIndex((user) => { return user.friendUserId == request.body.friendUserId });
                postFound.saveItems.splice(index, 1);
                await postFound.save();
                return response.status(200).json({ message: " you unliked the post", status: true })
            }
            else {
                postFound.saveItems.push({ userId: request.body.userId });
                let savedPost = await postFound.save();
                return response.status(200).json({ message: "save the post", status: true })
            }
        }
        else {
            await Post.create({ postId: request.body.postId, saveItems: [{ userId: request.body.userId }] });
        }
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "internal server error", status: false });
    }
}