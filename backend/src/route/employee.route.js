import express from "express"

const router = express.Router()


import { loginUser, createUser } from "../controller/employee.controller.js"
router.post('/login', loginUser);
router.post('/signup', createUser);


export default router