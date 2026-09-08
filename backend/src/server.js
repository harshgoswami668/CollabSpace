import dotenv from "dotenv";
dotenv.config();

import express from "express"
import db from "./config/db.js"
import employeeRoutes from "./route/employee.route.js"
import orgRoutes from "./route/org.route.js"


const app = express();
const port = process.env.PORT;

app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).json({
        message: "CollabSpace server is running"
    });
});

app.use('/emp', employeeRoutes);
app.use('/org', orgRoutes);


app.listen(port, () => {
    console.log(`CollabSpace is running on port ${port}`);

})