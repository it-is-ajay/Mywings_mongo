import { User } from "../model/user.model.js"
import { Follower } from "../model/follower.model.js";
import { Following } from "../model/following.model.js";
import { Help } from "../model/help.model.js";
import { Post } from "../model/user.post.model.js";
import { response } from "express";
import { transporter } from "../model/email.js";

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
            return response.status(500).json({ error: "Internal server error", status: false });
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
            return response.status(500).json({ error: "Internal server error", status: false });
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

export const forgotPassword = async (request, response) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const mailOptions = {
        from: "ajey6162@gmail.com",
        to: "patelshivani3008@gmail.com",
        subject: "OTP code",
        text: ""+otp
    }
    transporter.sendMail(mailOptions,(error,info)=>{
        if (error) {
            console.error(error);
            return response.status(500).json({ message: 'Error sending OTP code' });
          } else {
            console.log('OTP sent:', info.response);
            return response.status(200).json({ message: 'OTP code sent successfully' });
          }
    })
}















// aagdyeekdzhmkhft