import pageModel from "../model/page.js";

export const checkPageService = (req, res) => {
    res.status(200).json({
        message: "Page service is running"
    });
};



export const createPage = async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const { title, parentPageId } = req.body;

        const page = await pageModel.create({
            title: title || "Untitled",
            workspaceId,
            parentPageId: parentPageId || null,
            createdBy: req.user.userId
        });

        return res.status(201).json({
            success: true,
            page
        });

    } catch (error) {
        console.error(
            "Failed to create page:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



export const getPage = async (req, res) => {
    try {
        const { pageId } = req.params;

        const page = await pageModel.findById(pageId);

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Page not found"
            });
        }

        return res.status(200).json({
            success: true,
            page
        });

    } catch (error) {
        console.error(
            "Failed to fetch page:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



export const updatePageTitle = async (req, res) => {
    try {
        const { pageId } = req.params;
        const { title } = req.body;

        const page = await pageModel.findByIdAndUpdate(
            pageId,
            {
                title: title
            },
            
        );

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Page not found"
            });
        }

        return res.status(200).json({
            success: true,
            page
        });

    } catch (error) {
        console.error(
            "Failed to update page title:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};




export const archivePage = async (req, res) => {
    try {
        const { pageId } = req.params;

        const page = await pageModel.findByIdAndUpdate(
            pageId,
            {
                isArchived: true
            }
        );

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Page not found"
            });
        }

        return res.status(200).json({
            success: true,
            page
        });

    } catch (error) {
        console.error(
            "Failed to archive page:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



export const restorePage = async (req, res) => {
    try {
        const { pageId } = req.params;

        const page = await pageModel.findByIdAndUpdate(
            pageId,
            {
                isArchived: false
            }
        );

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Page not found"
            });
        }

        return res.status(200).json({
            success: true,
            page
        });

    } catch (error) {
        console.error(
            "Failed to restore page:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};




export const getWorkspacePages = async (req, res) => {
    try {
        const { workspaceId } = req.params;

        const pages = await pageModel
            .find({
                workspaceId,
                isArchived: false
            })
            .sort({
                createdAt: 1
            });

        return res.status(200).json({
            success: true,
            pages
        });

    } catch (error) {
        console.error(
            "Failed to fetch workspace pages:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};