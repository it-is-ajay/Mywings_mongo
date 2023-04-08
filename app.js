import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use("/user");
app.use("/post");
app.use("/admin");

app.listen(3000,()=>{
    console.log("Server started...");
})