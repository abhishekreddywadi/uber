const express = require("express");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();
const {body} = require("express-validator");
router.post(
    "/register", [
        body('email').isEmail().withMessage("Email is required"),
        body('password').isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
        body('fullName.firstName').isLength({min: 3}).withMessage("First name must be at least 3 characters long"),
        body('fullName.lastName').isLength({min: 3}).withMessage("Last name must be at least 3 characters long")
    ],
    userController.registerUser
);
router.post("/login",[
    body('email').isEmail().withMessage("Email is required"),
    body('password').isLength({min: 6}).withMessage("Password must be at least 6 characters long")
], userController.loginUser);
router.get("/profile", authMiddleware.authUser, userController.getUserProfile);
router.get("/logout", authMiddleware.authUser, userController.logoutUser);
module.exports = router;