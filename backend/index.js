import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';    
import databaseConnection from './config/database.js';
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoute.js';
import tweetRoute from './routes/tweetRoute.js';
import cors from 'cors';
dotenv.config({
    path: './.env'
});      

databaseConnection();
const app = express();
//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());//
app.use(cookieParser());// to parse cookies from request headers

const corsOptions = {
    origin: 'https://twitter-frontend-oq0u.onrender.com', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions));

//api
app.use('/api/v1/user', userRoute);
app.use('/api/v1/tweet', tweetRoute);



const PORT = process.env.PORT || 8000;



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
  