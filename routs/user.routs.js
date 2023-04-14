import express from "express"
import {follower, following, getAllFollower, getAllFollowing, help, removeFollower,signUp, searchProfileByKeyword, spam, unFollow} from "../controller/user.controller.js"
const router = express.Router();

router.post("/help",help);
router.get("/follower/:userId/:friendUserId",follower);
router.get("/following/:userId/:friendUserId",following);
router.get("/getAllFollowing/:userId",getAllFollowing);
router.get("/getAllFollower/:userId",getAllFollower);
router.post("/unFollow",unFollow);
router.post("/removeFollower",removeFollower);
router.get("/spam/:userId/:postId",spam);
router.get("/searchProfile/:keyword",searchProfileByKeyword);
router.post("/signUp",signUp);

export default router;
 
