const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const {registerCaptain} = require("../controllers/captain.controller");


router.post("/register",[
    body('email')
        .exists().withMessage('Email is required')
        .isEmail().withMessage("Must be a valid email"),
    body('password')
        .exists().withMessage('Password is required')
        .isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
    body('fullName.firstName')
        .exists().withMessage('First name is required')
        .isLength({min: 3}).withMessage("First name must be at least 3 characters long"),
    body('fullName.lastName')
        .exists().withMessage('Last name is required')
        .isLength({min: 3}).withMessage("Last name must be at least 3 characters long"),
    body('vehicle.color')
        .exists().withMessage('Vehicle color is required')
        .isLength({min: 3}).withMessage("Color must be at least 3 characters long"),
    body('vehicle.plate')
        .exists().withMessage('Vehicle plate is required')
        .isLength({min: 3}).withMessage("Plate must be at least 3 characters long"),
    body('vehicle.capacity')
        .exists().withMessage('Vehicle capacity is required')
        .isInt({ min: 1 }).withMessage("Capacity must be a number greater than 0"),
    body('vehicle.vehicleType')
        .exists().withMessage('Vehicle type is required')
        .isIn(['auto', 'motorcycle', 'car']).withMessage("Vehicle type must be either auto, motorcycle, or car"),
],registerCaptain);


module.exports = router;