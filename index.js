import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"
const app=express()
dotenv.config()
const connect=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("connected to db");
    } catch(error) {
        throw error;
    }
}

mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB disconnected");
})
mongoose.connection.on("connected",()=>{
    console.log("mongoDB connected");
})

// middleware
app.use(express.json())  // to send post,delete request from the route
app.use("/auth",authRoute)
app.use("/hotels",hotelsRoute)
app.use("/rooms",roomsRoute)
app.use("/users",usersRoute)
app.use((err,req,res,next)=>{
    const errorStatus=err.status || 500;
    const errorMessage=err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    });
    // return res.status(500).json("error from handler")
})

app.listen(3000,()=>{
    connect() 
    console.log("server is running");
})