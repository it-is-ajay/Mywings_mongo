import express from "express"
import {follower,deleteAccount, following, getAllFollower, getAllFollowing, help, removeFollower,signUp, searchProfileByKeyword, spam, unFollow, signIn} from "../controller/user.controller.js"
const router = express.Router();

router.post("/help",help);
router.get("/follower/:userId/:friendUserId",follower);
router.get("/following/:userId/:friendUserId",following);
router.get("/getAllFollowing/:userId",getAllFollowing);
router.get("/getAllFollower/:userId",getAllFollower);
router.get("/unFollow/:userId/:friendUserId",unFollow);
router.get("/removeFollower/:userId/:friendUserId",removeFollower);
router.get("/spam/:userId/:postId",spam);
router.get("/searchProfile/:keyword",searchProfileByKeyword);
router.post("/signUp",signUp);
router.post("/signIn",signIn);
router.post("/editProfile/setting/deleteAccount",deleteAccount);
router.post("/editProfile/setting/help",help)

export default router;
 
