import express from "express"
const router = express.Router()
import 
{ createPage, getPage, updatePageTitle, archivePage, restorePage, getWorkspacePages, checkPageService } 
from "../controller/page.controller.js";
import authMiddleware from "../middleware/auth.js";

router.get("/health", checkPageService);
router.post("/create/:workspaceId", authMiddleware, createPage);
router.get("/:pageId", authMiddleware, getPage);
router.patch("/:pageId", authMiddleware, updatePageTitle);
router.delete("/:pageId", authMiddleware, archivePage);
router.patch("/:pageId/restore", authMiddleware, restorePage);
router.get("/workspaces/:workspaceId/pages", authMiddleware, getWorkspacePages);


export default router