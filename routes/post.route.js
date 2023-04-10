import express from "express";
import { postPage,getAllComments,getAllLikes,getSavedPost,getAllPost,commentPost,save,likePost, savePost} from "../controller/post.controller.js";

const router = express.Router();


router.get("/postPage",postPage);
router.post("/save",save);
router.post("/like",likePost);
router.get("/getPost",getAllPost);
router.get("/getLike",getAllLikes);
router.get("/getSavedPost",getSavedPost);
router.get("/getComment",getAllComments);
router.post("/comment",commentPost);
router.post("/savePost",savePost);

export default router;