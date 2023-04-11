import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import UserRouter from "./routs/user.routs.js"

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

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