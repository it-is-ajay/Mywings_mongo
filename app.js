import mongoose from "mongoose";
import bodyParser from "body-parser";
import express from "express";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import postRoute from "./routes/post.route.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
app.use(bodyParser.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));

const url = "mongodb+srv://itsAjay:f0LPeGkDzDoPCZ52@cluster0.p5bdwqq.mongodb.net/mywings?retryWrites=true&w=majority"
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
