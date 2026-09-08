import express from "express"
const router = express.Router()
import 
{ createInvitation, acceptInvitation, checkInvitationService} 
from "../controller/invitation.controller.js";
import authMiddleware from "../middleware/auth.js";

router.get("/health", checkInvitationService);
router.post("/create", authMiddleware, createInvitation);
router.post("/accept", authMiddleware, acceptInvitation);


export default router
