import crypto from "crypto";
import organizationModel from "../model/organization.js";
import invitationModel from "../model/invitation.js";
import empOrgModel from "../model/empOrgRelation.js";

export const checkInvitationService = (req, res) => {
    res.status(200).json({
        message: "Invitation service is running"
    });
};





export const createInvitation = async (req, res) => {
    try {
        const { email, slug } = req.body;

        const org = await organizationModel.findOne({ slug });

        if (!org) {
            return res.status(404).json({
                message: "Organization not found"
            });
        }

        if (org.owner.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "Only organization owner can invite members"
            });
        }

        const token = crypto.randomBytes(32).toString("hex");

        const invitation = await invitationModel.create({
            email,
            organizationId: org._id,
            token,
            invitedBy: req.user.userId
        });

        res.status(201).json({
            message: "Invitation created successfully",
            invitation
        });

    } catch (error) {
        console.error(
            "Failed to create invitation:",
            error.message
        );

        res.status(500).json({
            message: "Internal server error"
        });
    }
};






export const acceptInvitation = async (req, res) => {
    try {
        const { token } = req.body;

        const invite = await invitationModel.findOne({ token });

        if (!invite) {
            return res.status(400).json({
                message: "Invalid invitation"
            });
        }

        if (invite.status !== "pending") {
            return res.status(400).json({
                message: "Invitation already used"
            });
        }

        await empOrgModel.create({
            employeeId: req.user.userId,
            organizationId: invite.organizationId,
            role: "member"
        });

        invite.status = "accepted";
        await invite.save();

        res.status(200).json({
            message: "Joined organization successfully"
        });

    } catch (error) {
        console.error(
            "Failed to accept invitation:",
            error.message
        );

        res.status(500).json({
            message: "Internal server error"
        });
    }
};