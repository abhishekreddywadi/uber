const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3,"first name must be at least 3 characters"],


        },
        lastName: {
            type: String,   
            // required: true
            minlength: [3,"last name must be at least 3 characters"],
        }

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      
    },
    password: {
        type: String,
        required: true,
        minlength: [6,"password must be at least 6 characters"],
        select: false
    },
    socketId: {
        type: String,
       
    }
})
userSchema.methods.generateJWT = function () {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET environment variable is not set");
    }
    return jwt.sign({ id: this._id }, secret, {
        expiresIn: process.env.JWT_EXPIRES_IN || "24h",
    });
};
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
