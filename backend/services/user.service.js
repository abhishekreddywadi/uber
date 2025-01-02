const userSchema = require("../models/user.models");
module.exports.createUser = async ({firstName, lastName, email, hashPassword}) => {
    if(!firstName || !lastName || !email || !hashPassword) {
        throw new Error("All fields are required");
    }
    const user = await userSchema.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password: hashPassword
    });
    return user;
}