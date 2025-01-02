const userModel = require("../models/user.models");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blackListTokens.model");
module.exports.registerUser=async(req,res)=>{
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    
    
    const {fullName:{firstName,lastName},email,password} = req.body;
    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({firstName,lastName,email,hashPassword});
    const token = await user.generateJWT();
    res.status(201).json({
        status:"success",
        data:user,
        token
    });
   } catch (error) {
    res.status(400).json({
        status:"fail",
        message:error.message
    });
   }
}
module.exports.loginUser=async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;

    const user = await userModel.findOne({email}).select("+password");

    if(!user){
        return res.status(401).json({
            status:"fail",
            message:"Invalid email or password"
        });
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({
            status:"fail",
            message:"Invalid email or password"
        });
    }

    const token = await user.generateJWT();
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),});

    res.status(200).json({
        status:"success",
        data:user,
        token
    });
    
}
module.exports.getUserProfile=async(req,res)=>{
    res.status(200).json({
        status:"success",
        data:req.user
    });
}
module.exports.logoutUser=async(req,res)=>{
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    await blackListTokenModel.create({ token });
    res.status(200).json({ message: "Logout successful" });

    
}