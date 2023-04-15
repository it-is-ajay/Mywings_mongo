import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import UserRouter from "./routs/user.routs.js"
import AdminRouter from "./routs/admin.routes.js"

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

const url = "mongodb+srv://nivendravishvakarma:nivendra6267@cluster0.ooafvjm.mongodb.net/mywings?retryWrites=true&w=majority";

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