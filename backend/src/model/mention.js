
import mongoose from "mongoose";

const mentionSchema = new mongoose.Schema(
    {
        blockId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Block",
            required: true,
            index: true
        },

        pageId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Page",
            required: true
        },

        workspaceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace",
            required: true
        },

        commentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            default: null
        },

        mentionedUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
            index: true
        },

        mentionedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true
        }
    },
    {
        timestamps: true
    }
);

mentionSchema.index({
    mentionedUser: 1,
    createdAt: -1
});

const mentionModel = mongoose.model(
    "Mention",
    mentionSchema
);

export default mentionModel;
