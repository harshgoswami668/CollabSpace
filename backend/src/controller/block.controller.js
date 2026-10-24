import blockModel from "../model/block.js";
import pageModel from "../model/page.js";
import { createYjsBlock, getYjsBlockContent, updateYjsBlockContent }
    from "../realtime/documentManager.js";
import commentModel from "../model/comment.js";
import { createNotification } from "../services/notificationService.js";

export const checkBlockService = (req, res) => {
    res.status(200).json({
        message: "Block service is running"
    });
};


export const getBlockContent = async (req, res) => {
    try {
        const { blockId } = req.params;

        const block = await blockModel.findById(blockId);

        if (!block) {
            return res.status(404).json({
                success: false,
                message: "Block not found"
            });
        }

        const content = getYjsBlockContent(
            block.pageId,
            block._id
        );

        if (content === null) {
            return res.status(404).json({
                success: false,
                message: "Page is not currently active"
            });
        }

        return res.status(200).json({
            success: true,
            content
        });

    } catch (error) {
        console.error(
            "Failed to fetch block content:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};




export const getPageBlocks = async (req, res) => {
    try {
        const { pageId } = req.params;

        const blocks = await blockModel
            .find({
                pageId,
                isArchived: false
            })
            .sort({
                order: 1
            });

        const blocksWithContent = blocks.map(block => ({
            ...block.toObject(),

            content: getYjsBlockContent(
                block.pageId,
                block._id
            )
        }));

        return res.status(200).json({
            success: true,
            blocks: blocksWithContent
        });

    } catch (error) {
        console.error(
            "Failed to fetch page blocks:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


export const createBlock = async (req, res) => {
    try {
        const { pageId } = req.params;
        const {
            type,
            content,
            parentBlockId
        } = req.body;

        const page = await pageModel.findById(pageId);

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Page not found"
            });
        }

        const block = await blockModel.create({
            pageId,
            type,
            content,
            parentBlockId: parentBlockId || null,
            createdBy: req.user.userId
        });

        createYjsBlock(
            pageId,
            block._id
        );

        return res.status(201).json({
            success: true,
            block
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



export const updateBlock = async (req, res) => {
    try {
        const updates = {};

        if (req.body.type !== undefined) {
            updates.type = req.body.type;
        }

        const block = await blockModel.findByIdAndUpdate(
            req.params.blockId,
            updates,
            {
                new: true
            }
        );

        if (!block) {
            return res.status(404).json({
                success: false,
                message: "Block not found"
            });
        }

        if (req.body.content !== undefined) {
            updateYjsBlockContent(
                block.pageId,
                block._id,
                req.body.content
            );
        }

        return res.status(200).json({
            success: true,
            block
        });

    } catch (error) {
        console.error(
            "Failed to update block:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


export const deleteBlock = async (req, res) => {
    try {
        const block = await blockModel.findByIdAndDelete(
            req.params.blockId
        );

        if (!block) {
            return res.status(404).json({
                success: false,
                message: "Block not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Block deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const appendBlockContent = async (req, res) => {
    try {
        const { blockId } = req.params;
        const { content } = req.body;

        const block = await blockModel.findById(blockId);

        if (!block) {
            return res.status(404).json({
                success: false,
                message: "Block not found"
            });
        }

        if (
            typeof block.content?.text !== "string" ||
            typeof content?.text !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Content type does not match block content"
            });
        }

        block.content.text += content.text;

        await block.save();

        return res.status(200).json({
            success: true,
            block
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};





export const createComment = async (req, res) => {
    try {
        const { content } = req.body;
        const { blockId } = req.params;

        if (
            typeof content !== "string" ||
            !content.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Comment content is required"
            });
        }

        const block = await blockModel.findById(blockId);

        if (!block) {
            return res.status(404).json({
                success: false,
                message: "Block not found"
            });
        }

        const comment = await commentModel.create({
            pageId: block.pageId,
            blockId: block._id,
            authorId: req.user.userId,
            content: content.trim()
        });

        return res.status(201).json({
            success: true,
            comment
        });

    } catch (error) {
        console.error("Failed to create comment:", error.message);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}



export const getComments = async (req, res) => {
    try {
        const { blockId } = req.params;

        const block = await blockModel.findById(blockId);

        if (!block) {
            return res.status(404).json({
                success: false,
                message: "Block not found"
            });
        }

        const comments = await commentModel
            .find({
                blockId: block._id
            })
            .populate("authorId", "username")
            .sort({
                createdAt: 1
            });

        return res.status(200).json({
            success: true,
            comments
        });

    } catch (error) {
        console.error("Failed to fetch comments:", error.message);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        if (!mongoose.isValidObjectId(commentId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid comment ID"
            });
        }

        const comment = await commentModel.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        if (
            comment.authorId.toString() !==
            req.user.userId.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "You cannot delete this comment"
            });
        }

        await comment.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Comment deleted"
        });

    } catch (error) {
        console.error("Failed to delete comment:", error.message);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


export const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;

        if (!mongoose.isValidObjectId(commentId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid comment ID"
            });
        }

        if (
            typeof content !== "string" ||
            !content.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Comment content is required"
            });
        }

        const comment = await commentModel.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        if (
            comment.authorId.toString() !==
            req.user.userId.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "You cannot edit this comment"
            });
        }

        comment.content = content.trim();

        await comment.save();

        return res.status(200).json({
            success: true,
            comment
        });

    } catch (error) {
        console.error("Failed to update comment:", error.message);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}




export const mentionUser = async (req, res) => {
    try {
        const { blockId } = req.params;
        const { mentionedUserId } = req.body;

        if (!mongoose.isValidObjectId(blockId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid block ID"
            });
        }

        if (
            !mongoose.isValidObjectId(mentionedUserId)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid mentioned user ID"
            });
        }

        if (
            mentionedUserId.toString() ===
            req.user.userId.toString()
        ) {
            return res.status(400).json({
                success: false,
                message: "You cannot mention yourself"
            });
        }

        const block = await blockModel.findById(blockId);

        if (!block) {
            return res.status(404).json({
                success: false,
                message: "Block not found"
            });
        }

        const page = await pageModel.findById(
            block.pageId
        );

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Page not found"
            });
        }

        // Verify the mentioned employee exists
        const mentionedEmployee =
            await employeeModel.findById(
                mentionedUserId
            );

        if (!mentionedEmployee) {
            return res.status(404).json({
                success: false,
                message: "Mentioned employee not found"
            });
        }

        const mention = await mentionModel.create({
            blockId: block._id,
            pageId: page._id,
            workspaceId: page.workspaceId,
            mentionedUser: mentionedEmployee._id,
            mentionedBy: req.user.userId
        });

        await createNotification({
            employeeId: mentionedEmployee._id,
            actorId: req.user.userId,
            type: "mention",
            title: `${req.user.username || "Someone"} mentioned you`,
            entityType: "block",
            entityId: block._id
        });

        return res.status(201).json({
            success: true,
            mention
        });

    } catch (error) {
        console.error(
            "Failed to create mention:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}




export default router;
