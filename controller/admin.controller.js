import { Admin } from "../model/admin.model.js";
import { User } from "../model/user.model.js";
import { Collaboration } from "../model/collaborationWith.model.js";
import { CollaborationForm } from "../model/collaborationForm.model.js";
import { AdminPost } from "../model/adminPosts.model.js";

export const editProfile = async (request, response, next) => {
    try {
        let admin = await Admin.updateOne({ id: request.params.adminId },{$set : {bio: request.body.bio,
            profilePhoto: request.body.profilePhoto },
        })
            .then(result => { return result.dataValues });
        return response.status(200).json({ message: " Profile updated ... ", status: true })
    } catch (err) {
        console.log(err);
    }
}

export const uploadPostSubmit = async (request,response,next)=>{
    
}
export const viewUsers = async (request, response, next) => {
    try {
        let user = await User.find();
        return response.status(200).json({ allUsers: user, status: true });
    }
    catch (err) {
        return response.status(500).json({ error: "Internal server error", status: false });
    }
}

export const deletePost = (request, response, next) => {
    let adminPostId = request.params.adminPostId;
    AdminPost.destroy({id: adminPostId }).then(result => {
        return response.status(200).json({ message: "Post removed", status: true });
    }).catch(err => {
        return response.status(500).json({ error: "Internal Server Error", status: false });
    })
}

export const seeRequestForm = async (request, response, next) => {
    try {
        let form = await CollaborationForm.find();
        return response.status(200).json({ collaborationForm: form, status: true });
    }
    catch (err) {
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const viewSelectedContestants = async (request, response, next) => {
    try {
        let viewSelectedContestants = await viewSelectedContestant.findAll();
        return response.status(200).json({ viewSelectedContestants: viewSelectedContestants, status: true });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error", status: false });
    }
}

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
        return response.status(500).json({ errore: "internal server errore" })
    }
}

export const getBanUser = async (request, response) => {
    try {
        let banUser = await User.find({ status: false })
        if (!banUser)
            return response.status(200).json({ message: "no any ban user found" })
        return response.status(200).json({ bannedUser: banUser })
    } catch (err) {
        return response.status(500).json({ errore: "internal server errore" });
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

