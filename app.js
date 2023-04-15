import mongoose from "mongoose";
import bodyParser from "body-parser";
import express from "express";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import postRoute from "./routes/post.route.js";
const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
const url = "mongodb+srv://kratishah2003:kratishah2003@cluster0.kjp92un.mongodb.net/mywings?retryWrites=true&w=majority";

mongoose.connect(url)
    .then(result => {
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
