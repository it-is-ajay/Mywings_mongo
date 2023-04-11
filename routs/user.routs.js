import express from "express"
import {follower, following, getAllFollower, getAllFollowing, help, removeFollower, searchProfileByKeyword, signUp, spam, unFollow} from "../controller/user.controller.js"
const router = express.Router();

router.post("/help",help);
router.post("/follower",follower);
router.post("/following",following);
router.get("/getAllFollowing/:userId",getAllFollowing);
router.get("/getAllFollower/:userId",getAllFollower);
router.post("/unFollow",unFollow);
router.post("/removeFollower",removeFollower);
router.get("/spam/:userId/:postId",spam);
router.get("/searchProfile/:keyword",searchProfileByKeyword);
router.post("/signUp",signUp);

export default router;
 
