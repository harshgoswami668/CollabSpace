import mongoose from "mongoose";

const empwrkspSchema = new mongoose.Schema({

    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },

    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true
    },

    role: {
        type: String,
        enum: ["member", "admin"],
        default: "member"
    }

}, {
    timestamps: true
});

const empwrkspModel = mongoose.model(
    "EmployeeWorkspace",
    empwrkspSchema
);

export default empwrkspModel;