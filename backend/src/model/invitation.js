import mongoose from "mongoose";

const inviteSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "member"],
        default: "member"
    },
    token: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "expired"],
        default: "pending"
    },
    invitedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    expiresAt: Date
}, { timestamps: true });

const invitationModel = new mongoose.model("invitation", inviteSchema);

export default invitationModel;