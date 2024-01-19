import cookieParser from "cookie-parser";
import cors from 'cors';
import "dotenv/config";
import express from 'express';
import mongoose from 'mongoose';

import path from 'path';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONN_STRING as string);

const app = express();


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "",
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(8000, () => {
  console.log(`Server running on http://localhost:8000`);
});
