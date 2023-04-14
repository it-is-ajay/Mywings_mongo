import mongoose from "mongoose";
import bodyParser from "body-parser";
<<<<<<< HEAD
import express from "express";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import postRoute from "./routes/post.route.js";
=======
import mongoose from "mongoose";
import UserRouter from "./routs/user.routs.js"

>>>>>>> 8779025823f384d255e76528937ff91cec12509f
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const url = "mongodb+srv://kratishah2003:kratishah2003@cluster0.kjp92un.mongodb.net/mywings?retryWrites=true&w=majority";
mongoose.connect(url)
    .then(result => {
        app.use("/user", userRoute);
        app.use("/admin", adminRoute);
        app.use("/post", postRoute);

<<<<<<< HEAD
        app.listen(3000, () => {
            console.log("server started...");
        })
    })
    .catch(err => {
        console.log(err);
    })
=======
const url = "mongodb+srv://itsAjay:Ajey12345@cluster0.3j5dkpt.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url)
.then(result=>{
    console.log("Database connected...");
}).catch(err=>{
    console.log(err);
})

app.use("/user",UserRouter);
// app.use("/post");
// app.use("/admin");

app.listen(3000,()=>{
    console.log("Server started...");
})
>>>>>>> 8779025823f384d255e76528937ff91cec12509f
