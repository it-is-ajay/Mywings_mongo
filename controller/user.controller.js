import { User } from "../model/user.model.js"
import { Follower } from "../model/follower.model.js";
import { Following } from "../model/following.model.js";
import { Help } from "../model/help.model.js";
import { Post } from "../model/post.model.js";
import bcrypt from "bcryptjs";

export const help = async (request, response) => {
    try {
        return response.status(200).json({ result: await new Help(request.body).save(), status: true });
    } catch (err) {
        return response.status(500).json({ result: "internal server error", status: false });
    }
}
export const follower = async (request, response) => {
    try {
        let user = await Follower.findOne({ userId: request.params.userId });
        if (user) {
            if (user.followers.some((follower) => follower.friendUserId == request.params.friendUserId))
                return response.status(200).json({ message: "already followed...", status: true });
            user.followers.push({ friendUserId: request.params.friendUserId });
            let savedCart = await user.save();
            return response.status(200).json({ message: "successfull added...", status: true });
        }
        else {
            let saved = await Follower.create({
                userId: request.params.userId,
                followers: [{ friendUserId: request.params.friendUserId }]
            });
            return response.status(200).json({ message: "succesfull added...", status: true });
        }
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const following = async (request, response) => {
    try {
        let user = await Following.findOne({ userId: request.params.userId });
        if (user) {
            if (user.followings.some((following) => following.friendUserId == request.params.friendUserId))
                return response.status(200).json({ message: "already followed...", status: true });
            user.followings.push({ friendUserId: request.params.friendUserId });
            let savedCart = await user.save();
            return response.status(200).json({ message: "successfull added...", status: true });
        }
        else {
            let saved = await Following.create({
                userId: request.params.userId,
                followings: [{ friendUserId: request.params.friendUserId }]
            });
            return response.status(200).json({ message: "succesfull added...", status: true });
        }
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const getAllFollower = async (request, response) => {
    Follower.find({ userId: request.params.userId })
        .populate("followers.friendUserId").then(result => {
            if (result.length)
                return response.status(200).json({ result, status: true });
            return response.status(400).json({ error: "bad request", status: false });
        }).catch(err => {
            console.log(err);
            return response.status(500).json({ error: "Internal server error" });
        })
}

export const getAllFollowing = async (request, response) => {
    Following.find({ userId: request.params.userId })
        .populate("followings.friendUserId").then(result => {
            if (result.length)
                return response.status(200).json({ result, status: true });
            return response.status(400).json({ error: "bad request", status: false });
        }).catch(err => {
            console.log(err);
            return response.status(500).json({ error: "Internal server error" });
        })
}

export const unFollow = async (request, response) => {
    try {
        let user = await Following.findOne({ userId: request.params.userId });
        let index = user.followings.findIndex((user) => { return user.friendUserId == request.params.friendUserId });
        user.followings.splice(index, 1);
        user.save();
        return response.status(200).json({ message: "successfully unfollowed..", status: true });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ result: "internal server error", status: false });
    }
}

export const removeFollower = async (request, response) => {
    try {
        let user = await Follower.findOne({ userId: request.params.userId });
        let index = user.followers.findIndex((user) => { return user.friendUserId == request.params.friendUserId });
        user.followers.splice(index, 1);
        user.save();
        return response.status(200).json({ message: "successfully removed..", status: true });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ result: "internal server error", status: false });
    }
}


export const spam = (request, response) => {

}

export const searchProfileByKeyword = async (request, response) => {
    try {
        return response.status(200).json({ user: await User.find({ userName: { $regex: request.params.keyword, $options: "i" } }), status: true });
    } catch (err) {
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}


export const deleteAccount = async (request, response) => {
    //console.log(request.body.userId);
    let user = await User.findOne({ _id: request.body.userId })
    let status = await bcrypt.compare(request.body.password, user.password);
    if (status) {
        User.deleteOne({ _id: request.body.userId })
            .then(result => {
                return response.status(200).json({ message: "user deleted..", status: true });
            }).catch(err => {
                return response.status(500).json({ message: "Internal Server Error", status: false });
            });
    }
    else {
        return response.status(400).json({ message: "bad request", user: user, status: true })
    }
}


export const signUp = async (request, response, next) => {
    try {
        let email = await User.findOne({ email: request.body.email })
        if (email)
            return response.status(400).json({ message: "already exist", status: false });
        let salt = await bcrypt.genSalt(10);
        request.body.password = await bcrypt.hash(request.body.password, salt);
        let user = await User.create(request.body)
        if (user)
            return response.status(200).json({ message: "sign up success", user: user, status: true })
        return response.status(400).json({ message: "bad request", user: user, status: true })

    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const signIn = async (request, response, next) => {
    try {
        let user = await User.findOne({ email: request.body.email })
        if (!user)
            return response.status(400).json({ error: "bad request", status: false })
        await bcrypt.compare(request.body.password, user.password);
        return response.status(200).json({ message: "sign in success", status: true })

    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "internal server error", status: false });
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
