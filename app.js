import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import UserRouter from "./routes/user.route.js"
import AdminRouter from "./routes/admin.routes.js"

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

const url = "mongodb+srv://itsAjay:ajey123@cluster0.p5bdwqq.mongodb.net/eshop?retryWrites=true&w=majority";

mongoose.connect(url)
.then(result=>{
    console.log("Database connected...");
}).catch(err=>{
    console.log(err);
})

app.use("/user",UserRouter);
// app.use("/post");
app.use("/admin",AdminRouter);

app.listen(3000,()=>{
    console.log("Server started...");
})