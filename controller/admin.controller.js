import { Admin } from "../model/admin.model.js";
import { User } from "../model/user.model.js";
import { Collaboration } from "../model/collaborationWith.model.js";
import { CollaborationForm } from "../model/collaborationForm.model.js";

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
    adminPosts.destroy({id: adminPostId }).then(result => {
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
