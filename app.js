import mongoose from "mongoose";
import bodyParser from "body-parser";
import express from "express";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import postRoute from "./routes/post.route.js";
import cors from "cors";
import path from "path";
const app = express();
app.use(bodyParser.json());
app.use('/public',express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
const url="mongodb+srv://nivendravishvakarma:nivendra6267@cluster0.ooafvjm.mongodb.net/mywings?retryWrites=true&w=majority";
mongoose.connect(url)
    .then(result => {
        app.use(cors());
        app.use("/user", userRoute);
        app.use("/admin", adminRoute);
        app.use("/post", postRoute);

        app.listen(3000, () => {
            console.log("server started...");
        })
    })
    .catch(err => {
        console.log(err);
    })
    // FFA500
    // FF6700