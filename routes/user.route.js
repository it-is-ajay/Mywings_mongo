import express from "express"
const router = express.Router();
import {follower, following, getAllFollower, getAllFollowing, help, removeFollower,signUp, searchProfileByKeyword, spam, unFollow, getUserById, getUserByArt,uploadProfile, getCollabrationDetails, CollabrationCancel, forgotPassword, deleteAccount, uploadPost, signIn} from "../controller/user.controller.js"
import { verify } from "../middleware/tokenVarification.js";
import { body } from "express-validator";

router.post("/help",help);
router.get("/follower/:userId/:friendUserId",follower);
router.get("/following/:userId/:friendUserId",following);
router.get("/getAllFollowing/:userId",verify,getAllFollowing);
router.get("/getAllFollower/:userId",verify,getAllFollower);
router.get("/unFollow/:userId/:friendUserId",unFollow);
router.get("/removeFollower/:userId/:friendUserId",removeFollower);
router.post("/spam",spam);
router.get("/searchProfile/:keyword",searchProfileByKeyword);
router.get("/searchProfile/viewProfile/:_id",getUserById);
router.get("/searchByArt/:art",getUserByArt);
router.get("/searchById/:_id",getUserById);
router.post("/uploadProfile",uploadProfile);
router.post("/collabrationDetails",getCollabrationDetails);
router.get("/collabrationCancel/:_id",CollabrationCancel);
// router.post("/editProfile/updateDetails",updateProfileById);
router.post("/editProfile/setting/deleteAccount",deleteAccount);
router.post("/editProfile/setting/help",help);           
router.post("/signUp",
    body("name", "name is required").notEmpty().isAlpha(),
    body("userName").notEmpty(),
    body("password").notEmpty().isStrongPassword({
        maxLength:8,
        minLowercase:1,
        minUppercase:1,
        minNumbers:1,
        minLength:6
    }).withMessage("password must contain upercase,lowercase,number"),
    body("contact").isNumeric(),
    body("email").isEmail()
,signUp);                      
router.post("/uploadPost",uploadPost);
router.post("/signin",signIn)
router.get("/forgotPassword", forgotPassword);


export default router;

