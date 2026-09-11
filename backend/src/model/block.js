import mongoose from "mongoose";

const blockSchema = new mongoose.Schema({
    pageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Page",
        required: true,
        index: true
    },

    type: {
        type: String,
        enum: [
            "paragraph",
            "heading",
            "todo",
            "bullet",
            "numbered",
            "image",
            "code",
            "quote",
            "divider"
        ],
        required: true
    },

    content: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },

    parentBlockId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Block",
        default: null
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    }

}, {
    timestamps: true
});

const blockModel = mongoose.model("Block", blockSchema);

export default blockModel;