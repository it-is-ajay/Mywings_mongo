import express from "express";
import { banUser,getBanUser,signUp,adminPost,unBanUser,viewSpam } from "../controller/admin.controller.js";

const router =express.Router();
router.post("/banUser",banUser)
router.get("/getBanUser",getBanUser)
router.get("/unBanUser",unBanUser)    
router.get("/viewSpam",viewSpam)      //done
router.post("/signUp",signUp)         //done
router.post("/uploadPost",adminPost)  //done




export default router;