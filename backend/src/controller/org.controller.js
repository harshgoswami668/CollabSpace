import organizationModel from "../model/organization.js";
import empOrgModel from "../model/emporgrelation.js";

export const checkOrganizationService = (req, res) => {
    res.status(200).json({
        message: "Organization service is running"
    });
};




export const createOrganization = async (req, res) => {
    try {
        const newOrg = await organizationModel.create({
            ...req.body,
            owner: req.user.userId
        });

        await empOrgModel.create({
            employeeId: req.user.userId,
            organizationId: newOrg._id,
            role: "owner"
        });

        res.status(201).json({
            message: "Organization created successfully",
            organization: newOrg
        });
    } catch (error) {
        console.error("Failed to create organization:", error.message);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};






export const getOrganizationProfile = async (req, res) => {
    try {
        const employeeId = req.user.userId;

        const employeeOrganization = await empOrgModel.findOne({
            employeeId
        });

        if (!employeeOrganization) {
            return res.status(404).json({
                message: "Organization membership not found"
            });
        }

        const organization = await organizationModel.findById(
            employeeOrganization.organizationId
        );

        if (!organization) {
            return res.status(404).json({
                message: "Organization not found"
            });
        }

        res.status(200).json({
            organization
        });

    } catch (error) {
        console.error(
            "Failed to fetch organization profile:",
            error.message
        );

        res.status(500).json({
            message: "Internal server error"
        });
    }
};