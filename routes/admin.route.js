import express from "express";
// import {uploadPostSubmit,editProfile,viewUsers,viewAllPosts,seeBooking,confirmBooking,deletePost,seeRequestForm,viewInterestedContestantsAccept,sendRequest,viewInterestedContestants,viewSelectedContestants, interestedContestants, signIn, signOut, saveAdminPost, spamUser, viewSpam} from "../controller/admin.controller.js"; 

const router = express.Router();
import { banUser,getBanUser,signUp,adminPost,unBanUser,viewSpam } from "../controller/admin.controller.js";
router.post("/banUser",banUser)
router.get("/getBanUser",getBanUser)
router.get("/unBanUser",unBanUser)    
router.get("/viewSpam",viewSpam)     
router.post("/signUp",signUp)         
router.post("/uploadPost",adminPost)  

// router.post("/uploadPost/submit",uploadPostSubmit)

// router.post("/editProfile/:adminId",editProfile);

// router.get("/viewUsers",viewUsers);

// router.get("/viewAllPosts",viewAllPosts);

// router.get("/deletePost/:adminPostId",deletePost);

// router.post("/seeRequestForm",seeRequestForm);

// router.post("/sendRequest",sendRequest);

// router.post("/confirmBooking",confirmBooking);
// router.get("/seeBooking",seeBooking);

// router.post("/interestedContestants",interestedContestants);
// router.get("/viewInterestedContestants",viewInterestedContestants);
// router.post("/viewInterestedContestants/accept",viewInterestedContestantsAccept);
// router.get("/viewSelectedContestants",viewSelectedContestants);

// router.post("/signIn",signIn);
// router.post("/signOut",signOut);
// router.post("/save",saveAdminPost);
// router.post("/spam",spamUser);
// router.post("/viewSpam",viewSpam);

export default router;