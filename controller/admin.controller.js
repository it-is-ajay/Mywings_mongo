import { response } from "express";
import { AdminPosts } from "../model/admin.post.model.js";
import { User } from "../model/user.model.js";
import { Admin } from "../model/admin.model.js";

export const signUp = async (request, response) => {
    try {
        return response.status(200).json({ user: await Admin.create(request.body) });
    } catch (err) {
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const adminPost = (request, response) => {
    request.body.date = new Date().toString().substring(4, 15).replaceAll(' ', '/')
    AdminPosts.create(request.body).then(result => {
        return response.status(200).json({ message: "post added" });
    }).catch(err => {
        return response.status(500).json({ error: "internal server errore" })
    })
}

export const banUser = async (request, response) => {
    try {
        let user = await User.updateOne({ _id: request.body.userId }, { $set: { status: false } })
        if (user)
            return response.status(200).json({ message: "user banned" })
        return response.status(400).json({ error: "not ban try again" })
    } catch (err) {
        console.log(err);
        return response.status(500).json({ errore: "internal server errore" ,status:false})
    }
}

export const getBanUser = async (request, response) => {
    try {
        let banUser = await User.find({ status: false })
        if (!banUser)
            return response.status(200).json({ message: "no any ban user found" })
        return response.status(200).json({ bannedUser: banUser })
    } catch (err) {
        return response.status(500).json({ errore: "internal server errore" ,status:false});
    }

}

export const unBanUser = async (request, response) => {
    try {
        let user =await User.updateOne({ _id: request.body.userId }, { $set: { status: true } })
        if (user)
            return response.status(200).json({ message: "user unbanned" })
            return response.status(400).json({ error: "not ban try again" })
    } catch (err) {
        return response.status(500).json({ errore: "internal server errore" })
    }
}

export const viewSpam = (request, response, next) => {
    SpamUser.find()
        .then(result => {
            return response.status(200).json({ allSpamUser: result, status: true });
        })
        .catch(err => {
            return response.status(500).json({ error: "Internal server error", status: false });
        })
}

