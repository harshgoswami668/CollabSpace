import mongoose from "mongoose";
import bcrypt from "bcrypt"

const emporgSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        role: {
            type: String,
            enum: ["member", "admin", "owner"],
            default: "member"
        },
        ref: "Organization"
    }
}, {
    timestamps: true
});

const empOrgModel = mongoose.model("EmployeeOrganization", emporgSchema);

export default empOrgModel;