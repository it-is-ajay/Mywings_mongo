import express from "express";
import { uploadPost, postPage, getAllComments, getAllLikes, getSavedPost, getAllPost, commentPost, likePost, savePost } from "../controller/post.controller.js";
import multer from "multer";
const router = express.Router();

const upload = multer({ dest: "public/images/" })

router.post("/uploadPost", upload.single("file"), uploadPost);
router.get("/postPage", postPage);
router.post("/like", likePost);
router.get("/getAllPost", getAllPost);
router.post("/getLike", getAllLikes);
router.get("/getSavedPost", getSavedPost);
router.post("/getComment", getAllComments);
router.post("/comment", commentPost);
router.post("/save", savePost);

export default router;