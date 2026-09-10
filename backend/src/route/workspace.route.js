import express from "express"
const router = express.Router()

import 
{ createWorkspace,  searchWorkspaceMembers, deleteWorkspace, getWorkspace } 
from "../controller/workspace.controller.js";

import authMiddleware from "../middleware/auth.js";

router.post("/create", authMiddleware, createWorkspace);
router.get("/:workspaceId/members/search", authMiddleware, searchWorkspaceMembers);
router.delete("/:workspaceId", authMiddleware, deleteWorkspace);
router.get("/:workspaceId", authMiddleware, getWorkspace );



export default router