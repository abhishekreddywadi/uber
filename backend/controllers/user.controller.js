const userModel = require("../models/user.models");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
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

    res.status(200).json({
        status:"success",
        data:user,
        token
    });
    
}