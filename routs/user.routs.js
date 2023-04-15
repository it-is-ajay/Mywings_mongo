import express from "express";
import { intrusted } from "../controller/admin.controller.js";
import {follower, following, getAllFollower,getAllPost,getAllLikes, getAllComment,uploadPost,getAllFollowing, help,signUp, removeFollower, searchProfileByKeyword,spam, unFollow} from "../controller/user.controller.js"
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
router.post("/signUp",signUp);                      //done
router.post("/uploadPost",uploadPost);               //done
router.get("/getAllPost/:userId",getAllPost);       //done
router.get("/getAllLike/:postId",getAllLikes);      //done
router.get("/getAllComment/:postId",getAllComment);    //done
router.get("/intrusted",intrusted)






export default router;
 
