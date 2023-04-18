import express from "express";
import { body } from "express-validator";
import { follower, following, getAllFollower, getAllFollowing, help, removeFollower, signUp, searchProfileByKeyword, spam, unFollow, getUserById, getUserByArt, updateProfileById, uploadProfile, getCollabrationDetails, CollabrationCancel, forgotPassword, deleteAccount } from "../controller/user.controller.js"
import { User } from "../model/user.model.js";

const router = express.Router();

router.post("/help", help);
router.get("/follower/:userId/:friendUserId", follower);
router.get("/following/:userId/:friendUserId", following);
router.get("/getAllFollowing/:userId", getAllFollowing);
router.get("/getAllFollower/:userId", getAllFollower);
router.get("/unFollow/:userId/:friendUserId", unFollow);
router.get("/removeFollower/:userId/:friendUserId", removeFollower);
router.get("/spam", spam);
router.get("/searchProfile/:keyword", searchProfileByKeyword);
router.get("/searchProfile/viewProfile/:_id", getUserById);
router.get("/searchByArt/:art", getUserByArt);
router.get("/searchById/:_id", getUserById);
router.post("/uploadProfile", uploadProfile);
router.post("/collabrationDetails", getCollabrationDetails);
router.get("/collabrationCancel/:_id", CollabrationCancel);
router.post("/editProfile/updateDetails", updateProfileById);
router.post("/editProfile/setting/deleteAccount", deleteAccount);
router.post("/editProfile/setting/help", help)

// router.post("/signUp",signUp);
// router.post("/signIn",signIn);
router.post("/signUp",
    body("name", "name is required").notEmpty().isAlpha(),
    body("userName").notEmpty(),
    body("password").notEmpty().isStrongPassword({
        minLength:8,
        minLowercase:1,
        minUppercase:1,
        minNumbers:1,
        minLength:6
    }).withMessage("password must contain upercase,lowercase,number"),
    body("contact").isNumeric(),
    body("email").isEmail()
,signUp);                      //done
// router.post("/uploadPost",uploadPost);               //done
// router.get("/getAllPost/:userId",getAllPost);       //done
// router.get("/getAllLike/:postId",getAllLikes);      //done
// router.get("/getAllComment/:postId",getAllComment);    //done
// router.get("/intrusted",intrusted)


router.get("/forgotPassword", forgotPassword);














export default router;

