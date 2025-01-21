const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({fullName, email, password, vehicle}) => {
    try {
        console.log('Creating captain with data:', {
            fullName,
            email,
            vehicle,
            password: '***'
        });
        
        const hashPassword = await captainModel.hashPassword(password);
        
        const captainData = {
            fullName,
            email,
            password: hashPassword,
            vehicle
        };
        
        console.log('Final captain data:', {
            ...captainData,
            password: '***'
        });
        
        const captain = await captainModel.create(captainData);
        return captain;
    } catch (error) {
        console.error('Error in createCaptain:', error);
        throw error;
    }
}
