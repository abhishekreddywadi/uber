const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const captainSchema = new mongoose.Schema({
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
        type: String
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    vehicle: {
        color:{
            type: String,
            required: true,
            minlength: [3,"color must be at least 3 characters"],
        },      
        plate:{
            type: String,
            required: true,
            minlength: [3,"plate must be at least 3 characters"],
            // unique: true

        },
        capacity: {
            type: Number,
            required: true,
            min: [1,"capacity must be at least 1"]
        },
        vehicleType: {
            type: String,
            enum: ["auto", "motorcycle", "car"],
            required: true
        }

    },
    lat: {
        type: Number,
       
    },
    lng: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})
captainSchema.methods.genereatetoken = async function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET);
    return token;
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};
const Captain = mongoose.model("Captain", captainSchema);

module.exports = Captain