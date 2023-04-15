import express from "express";
import { uploadPost,postPage,getAllComments,getAllLikes,getSavedPost,getAllPost,commentPost,likePost, savePost} from "../controller/post.controller.js";

const router = express.Router();


router.get("/postPage",postPage);
router.post("/uploadPost",uploadPost)

router.post("/like",likePost);
router.get("/getPost",getAllPost);

router.post("/getLike",getAllLikes);
router.get("/getSavedPost",getSavedPost);
router.post("/getComment",getAllComments);
router.post("/comment",commentPost);
router.post("/savePost",savePost);

export default router;