import blockModel from "../model/block.js";
import pageModel from "../model/page.js";

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

        return res.status(200).json({
            success: true,
            content: block.content
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
                pageId
            })
            .sort({
                order: 1
            });

        return res.status(200).json({
            success: true,
            blocks
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

        if (req.body.content !== undefined) {
            updates.content = req.body.content;
        }

        if (req.body.type !== undefined) {
            updates.type = req.body.type;
        }

        const block = await blockModel.findByIdAndUpdate(
            req.params.blockId,
            updates
        );

        if (!block) {
            return res.status(404).json({
                success: false,
                message: "Block not found"
            });
        }

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