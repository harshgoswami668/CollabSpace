import express from "express"

const router = express.Router()


import 
{ getBlockContent, getPageBlocks, createBlock, updateBlock, deleteBlock, checkBlockService, appendBlockContent } 
from "../controller/block.controller.js"

import authMiddleware from "../middleware/auth.js";


router.get("/health", checkBlockService)
router.get("/blocks/:blockId/content", authMiddleware, getBlockContent);
router.get("/pages/:pageId/blocks", authMiddleware, getPageBlocks);
router.post("/pages/:pageId/blocks", authMiddleware, createBlock);
router.patch("/blocks/:blockId", authMiddleware, updateBlock);
router.delete("/blocks/:blockId", authMiddleware, deleteBlock);
router.patch("/blocks/:blockId/append", authMiddleware, appendBlockContent);


export default router

