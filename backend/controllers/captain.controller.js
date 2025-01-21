const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require('express-validator');
module.exports.registerCaptain = async (req, res) => {
    try {
        console.log('Request body:', JSON.stringify(req.body, null, 2));
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { fullName, email, password, vehicle } = req.body;
        console.log('Destructured data:', { fullName, email, password: '***', vehicle });
        
        const isCaptainExists = await captainModel.findOne({ email });
        if (isCaptainExists) {
            return res.status(400).json({ message: "Captain already exists" });
        }
    
        const captain = await captainService.createCaptain({ fullName, email, password, vehicle });
        res.status(201).json(captain);
    } catch (error) {
        console.error('Error in registerCaptain:', error);
        res.status(400).json({ message: error.message });
    }
};