import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "Untitled",
        trim: true,
        maxlength: 200
    },

    visibility: {
        type: String,
        enum: ["public", "private"],
        default: "private",
        index: true
    },

    isArchived: {
        type: Boolean,
        default: false,
        index: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
        index: true
    },

    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        index: true
    },

    isDeleted: {
        type: Boolean,
        default: false,
        index: true
    }

}, {
    timestamps: true
});


const workspaceModel = mongoose.model("Workspace", workspaceSchema);

export default workspaceModel;