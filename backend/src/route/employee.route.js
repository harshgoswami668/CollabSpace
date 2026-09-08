import express from "express"

const router = express.Router()


import { loginUser, createUser, getEmployeeProfile } from "../controller/employee.controller.js"
import authMiddleware from "../middleware/auth.js";

router.post('/login', loginUser);
router.post('/signup', createUser);
router.get('/profile',authMiddleware, getEmployeeProfile);


export default router