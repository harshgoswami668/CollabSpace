import dotenv from "dotenv";
dotenv.config();

import express from "express"
import db from "./config/db.js"


const app = express();
const port = process.env.PORT;



app.get("/", (req, res) => {
    res.status(200).json({
        message: "CollabSpace server is running"
    });
});



app.listen(port,()=>{
    console.log(`CollabSpace is running on port ${port}`);
    
})