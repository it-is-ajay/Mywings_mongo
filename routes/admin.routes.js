import express from "express";
import { viewUsers,editProfile,selectedContestants,removeFromSelectedContestants,deletePost,viewInterestedContestants,viewSelectedContestants, interestedContestants, banUser,getBanUser,signUp,adminPost,unBanUser,viewSpam } from "../controller/admin.controller.js";

const router =express.Router();
router.post("/banUser",banUser)
router.get("/getBanUser",getBanUser)
router.get("/unBanUser",unBanUser)    
router.get("/viewSpam",viewSpam)      //done
router.post("/signUp",signUp)         //done
router.post("/uploadPost",adminPost)  //done


router.post("/editProfile",editProfile);
router.get("/viewUsers",viewUsers);
router.get("/interestedContestants/:postId/:userId",interestedContestants);
router.get("/deletePost/:adminPostId",deletePost);
router.get("/viewInterestedContestants/:postId",viewInterestedContestants);
router.get("/viewInterestedContestants/accept/:postId/:userId",selectedContestants);
router.get("/viewSelectedContestants/:postId",viewSelectedContestants);
router.get("/removeFromSelectedContestants/:userId",removeFromSelectedContestants);




export default router;