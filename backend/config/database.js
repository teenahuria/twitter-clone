import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
    path: '../config./env'
});    
const databaseConnection=()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Database connected successfully");
    }).catch((err)=>{
        console.log("Database connection failed",err);
    });
}

export default databaseConnection;