import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const mongoURL = process.env.MONGO_URL;

mongoose
    .connect(mongoURL)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });

export default mongoose;