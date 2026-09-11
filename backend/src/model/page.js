import mongoose from "mongoose";

const PageSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "Untitled",
        trim: true,
        maxlength: 300
    },

    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true,
        index: true
    },

    parentPageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Page",
        default: null,
        index: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },

    lastEditedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },

    isArchived: {
        type: Boolean,
        default: false,
        index: true
    }
}, {
    timestamps: true
});


const pageModel = mongoose.model("Page", PageSchema);

export default pageModel;