import express from "express";
//const express = require("express");
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

console.log(process.env.MONGO_URI);

const app=express();
const PORT=process.env.PORT || 5001;

connectDB().then(()=>{
    app.listen(PORT,()=>{
    console.log("Server stareted on PORT:",PORT);// In production this kind of method is used because they prefer to connect database first and then server,as there is no point of connecting the server if the database fails.this is a best practice.
   });
});

app.use(express.json()); //this middleware will parse the json bodies: req.body
app.use(rateLimiter);
//our simple custom middleware
/*app.use((req,res,next)=>{
    console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
    next();
});*/

app.use("/api/notes",notesRoutes);


