import workspaceModel from "../model/workspace.js";
import empwrkspModel from "../model/empWorkSpRelation.js";
import employeeModel from "../model/employee.js";


export const createWorkspace = async (req, res) => {
    try {
        const {
            title,
            visibility,
            organization
        } = req.body;

        const workspace = await workspaceModel.create({
            title: title || "Untitled",
            visibility: visibility || "private",
            organization: organization || null,
            createdBy: req.user.userId
        });

        await empwrkspModel.create({
            employee: req.user.userId,
            workspace: workspace._id,
            role: "admin"
        });

        return res.status(201).json({
            message: "Workspace created successfully",
            workspace
        });

    } catch (error) {
        console.error(
            "Failed to create workspace:",
            error.message
        );

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};



export const searchWorkspaceMembers = async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const q = req.query.q || "";

        const relations = await empwrkspModel.find({
            workspace: workspaceId
        });

        const employeeIds = relations.map(
            relation => relation.employee
        );

        const users = await employeeModel.find({
            _id: {
                $in: employeeIds
            },
            username: {
                $regex: q,
                $options: "i"
            }
        });

        return res.status(200).json({
            success: true,
            users
        });

    } catch (error) {
        console.error(
            "Failed to search workspace members:",
            error.message
        );

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


export const deleteWorkspace = async (req, res) => {
    try {
        const { workspaceId } = req.params;

        const workspace = await workspaceModel.findById(workspaceId);

        if (!workspace) {
            return res.status(404).json({
                message: "Workspace not found"
            });
        }

        workspace.isDeleted = true;

        await workspace.save();

        return res.status(200).json({
            message: "Workspace deleted successfully"
        });

    } catch (error) {
        console.error(
            "Failed to delete workspace:",
            error.message
        );

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


export const getWorkspace = async (req, res) => {
    try {
        const { workspaceId } = req.params;

        const workspace = await workspaceModel.findById(workspaceId);

        if (!workspace || workspace.isDeleted) {
            return res.status(404).json({
                message: "Workspace not found"
            });
        }

        return res.status(200).json({
            workspace
        });

    } catch (error) {
        console.error(
            "Failed to fetch workspace:",
            error.message
        );

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};