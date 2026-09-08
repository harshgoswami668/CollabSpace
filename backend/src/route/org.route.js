

import express from "express"
const router = express.Router()
import 
{ createOrganization, checkOrganizationService,  getOrganizationProfile} from "../controller/org.controller.js";
import authMiddleware from "../middleware/auth.js";

router.get("/health", checkOrganizationService);
router.post("/signup", authMiddleware, createOrganization);
router.get("/profile", authMiddleware, getOrganizationProfile);


export default router
