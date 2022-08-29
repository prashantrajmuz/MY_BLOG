import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes.js";
import router from "./routes/user-routes.js";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users",router);
app.use("/api/blog",blogRouter);

mongoose.connect("mongodb+srv://Prsnt04:Prashant123@cluster0.qvzdjr2.mongodb.net/?retryWrites=true&w=majority")
.then(()=>app.listen(8000))
.then(()=>console.log("Connected"))
.catch((err)=>console.log(err));

app.listen(5000); 