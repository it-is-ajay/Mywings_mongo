import express from "express"

import {follower, following, getAllFollower, getAllFollowing, help, removeFollower,signUp, searchProfileByKeyword, spam, unFollow, getUserById, getUserByArt, updateProfileById, uploadProfile, getCollabrationDetails, CollabrationCancel, forgotPassword, deleteAccount, uploadPost} from "../controller/user.controller.js"

const router = express.Router();

router.post("/help",help);
router.get("/follower/:userId/:friendUserId",follower);
router.get("/following/:userId/:friendUserId",following);
router.get("/getAllFollowing/:userId",getAllFollowing);
router.get("/getAllFollower/:userId",getAllFollower);
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
router.post("/editProfile/updateDetails",updateProfileById);
router.post("/editProfile/setting/deleteAccount",deleteAccount);
router.post("/editProfile/setting/help",help)

router.post("/signUp",signUp);                      
router.post("/uploadPost",uploadPost);               



router.get("/forgotPassword",forgotPassword);














export default router;
 
