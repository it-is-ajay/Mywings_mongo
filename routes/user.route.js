import express from "express"
import {follower, following, getAllFollower, getAllFollowing, help, removeFollower,signUp, searchProfileByKeyword, spam, unFollow} from "../controller/user.controller.js"
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
router.post("/signUp",signUp);                      //done
// router.post("/uploadPost",uploadPost);               //done
// router.get("/getAllPost/:userId",getAllPost);       //done
// router.get("/getAllLike/:postId",getAllLikes);      //done
// router.get("/getAllComment/:postId",getAllComment);    //done
// router.get("/intrusted",intrusted)






export default router;
 
