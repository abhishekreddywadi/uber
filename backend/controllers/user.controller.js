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