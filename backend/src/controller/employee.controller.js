
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import employeeModel from "../model/employee.js"



export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    const user = await employeeModel.findOne({ username });

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid password"
        });
    }

    const token = jwt.sign(
        {
            userId: user._id,
            username: user.username
        },
        process.env.SECRET_KEY,
        {
            expiresIn: "20h"
        }
    );

    res.json({ token });
};








export const createUser = async (req, res) => {
    try {
        const data = req.body;

        const newEmployee = new employeeModel(data);
        const savedEmployee = await newEmployee.save();

        console.log("Data of Employee saved");

        res.status(200).send(savedEmployee);
        
    } catch (error) {
        console.error("Failed to create user:", error.message);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};




export const getEmployeeProfile = async (req, res) => {
    try {
        const employee = await employeeModel.findById(req.user.userId);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({
            employee
        });
    } catch (error) {
        console.error("Failed to fetch employee profile:", error.message);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};