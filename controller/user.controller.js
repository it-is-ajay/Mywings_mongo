import { User } from "../model/user.model.js"
import { Follower } from "../model/follower.model.js";
import { Following } from "../model/following.model.js";
import { Help } from "../model/help.model.js";
import { Post } from "../model/post.model.js";
import bcrypt from "bcryptjs";
import { transporter } from "../model/email.js";
import { Collabration } from "../model/collaboration.model.js";
import { response } from "express";
import jwt from "jsonwebtoken";
import { Spam } from "../model/spam.model.js";
import { validationResult } from "express-validator";
import multer from "multer";
import path from "path";
import fs from 'fs';
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const help = async (request, response) => {
    try {
        let user = await User.findOne({ email: request.body.email });
        if (user)
            return response.status(200).json({ result: await new Help({ userId: user._id, problem: request.body.problem }).save(), status: true });
        return response.status(400).json({ message: "bad request" });
    } catch (err) {
        console.log(err)
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
            let save = await user.save();
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





    Spam.create(request.body)
        .then(result => {
            return response.status(200).json({ result: "user was spam", status: true });
        })
        .catch(err => {
            return response.status(500).json({ err: "Internal server error", status: false });
        })
}

export const searchProfileByKeyword = async (request, response) => {
    try {
        return response.status(200).json({ user: await User.find({ userName: { $regex: request.params.keyword, $options: "i" } }), status: true });
    } catch (err) {
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}


export const deleteAccount = async (request, response) => {
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
        let error = validationResult(request);
        if (!error.isEmpty())
            return response.status(400).json({ error: "bad request", status: false, message: error.array() });
        let email = await User.findOne({ email: request.body.email })
        if (email)
            return response.status(400).json({ message: "already exist", status: false });
        let salt = await bcrypt.genSalt(10);
        request.body.password = await bcrypt.hash(request.body.password, salt);
        let user = await User.create(request.body)
        return (user)
            ? response.status(200).json({ user: { ...user.toObject(), password: undefined }, token: jwt.sign({ subject: user.email }, 'fdfxvcvnreorevvvcrerer'), status: true })
            : response.status(401).json({ message: "Unauthorized person", status: false })
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "internal server error", status: false });
    }
}
export const signIn = async (request, response, next) => {
    try {
        const user = await User.findOne({
            $or: [
                { email: request.body.usernameOrEmail },
                { userName: request.body.usernameOrEmail }
            ]
        });
        if (!user)
            return response.status(400).json({ error: "bad request", status: false })
        else {
            return (await bcrypt.compare(request.body.password, user.password))
                ? response.status(200).json({ user: { ...user.toObject(), password: undefined }, token: jwt.sign({ subject: user.email }, 'fdfxvcvnreorevvvcrerer'), status: true })
                : response.status(401).json({ message: "Unauthorized person", status: false })
        }
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


export const forgotPassword = async (request, response) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const mailOptions = {
        from: "ajey6162@gmail.com",
        to: "patelshivani3008@gmail.com",
        subject: "OTP code",
        text: "" + otp
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return response.status(500).json({ message: 'Error sending OTP code' });
        } else {
            console.log('OTP sent:', info.response);
            return response.status(200).json({ message: 'OTP code sent successfully' });
        }
    })
}



export const getUserById = async (request, response) => {
    await User.find({ _id: request.params._id })
        .then(result => {
            if (!result.length == 0)
                return response.status(200).json({ user: result, status: true });
            return response.status(500).json({ error: "user not found", status: false });
        })
        .catch(err => {
            return response.status(500).json({ error: "Internal server error", status: false });
        });
}

export const getUserByArt = async (request, response) => {
    await User.find({ art: request.params.art })
        .then(result => {
            if (!result.length == 0)
                return response.status(200).json({ user: result, status: true });
            return response.status(500).json({ error: "user not found", status: false });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ error: "Internal server error", status: false });
        });
}

export const updateProfileById = async (request, response) => {
    let user = await User.findById(request.body._id);
    if (user.profilePhoto) {
        const imagePath = await path.join(__dirname, '../public/profilephoto', user.profilePhoto);
        console.log(imagePath)
        await fs.unlink(imagePath, (err) => {
            if (err) console.log(err);
        });
      }
    let file = await (request.file) ? request.file.filename : null;
    request.body.profilePhoto = file;
    User.updateOne({ _id: request.body._id }, request.body).then(result => {
        return response.status(200).json({ message: "user was updated", user: request.body, status: true });
    })
        .catch(err => {
            return response.status(500).json({ err: "Internal server error", status: false });
        })
}

export const getCollabrationDetails = async (request, response) => {
    await Collabration.create(request.body)
        .then(result => {
            return response.status(200).json({ message: "Collabration success", status: true });
        })
        .catch(err => {
            return response.status(500).json({ error: "Internal server error", status: false });
        })
}
export const CollabrationCancel = async (request, response) => {
    await Collabration.findOneAndRemove({ _id: request.params._id })
        .then(result => {
            return response.status(200).json({ message: "Collabration cancel", status: true });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ err: "Internal server error", status: false });
        })
}
