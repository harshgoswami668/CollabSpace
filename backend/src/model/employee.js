import mongoose from "mongoose";
import bcrypt from "bcrypt"

const employeeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        match: /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$/
    }
}, {
    timestamps: true
});


employeeSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});



employeeSchema.methods.comparePassword = async function (EnteredPassword) {
    try {
        const isMatch = await bcrypt.compare(EnteredPassword, this.password)
        return isMatch;
    }
    catch (err) {
        throw err;
    }
}

const employeeModel = mongoose.model("Employee", employeeSchema);

export default employeeModel;