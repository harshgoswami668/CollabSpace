import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
    orgname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    description: String,
    logo: String,
    slug: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const organizationModel = new mongoose.model("Organization", organizationSchema)

export default organizationModel