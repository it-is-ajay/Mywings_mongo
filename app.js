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


 const url = "mongodb://nivendravishvakarma:nivendra@ac-7buhfx5-shard-00-00.ooafvjm.mongodb.net:27017,ac-7buhfx5-shard-00-01.ooafvjm.mongodb.net:27017,ac-7buhfx5-shard-00-02.ooafvjm.mongodb.net:27017/mywings?ssl=true&replicaSet=atlas-2oejy5-shard-0&authSource=admin&retryWrites=true&w=majority"

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
