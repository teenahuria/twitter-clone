import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import databaseConnection from './config/database.js';
import userRoute from './routes/userRoute.js';
import tweetRoute from './routes/tweetRoute.js';

dotenv.config({ path: './.env' });

const app = express();

// DB
databaseConnection();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORRECT CORS (NO app.options('*'))
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://twitter-frontend-oq0u.onrender.com',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

// Routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/tweet', tweetRoute);

// Health check (optional but useful)
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
