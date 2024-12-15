const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    console.log(req.body);
    try {
        const { fullname, email, password } = req.body;

        // Hash the password
        const hashedPassword = await userModel.hashPassword(password);

        // Call the createUser method from userService
        const user = await userService.createUser({
            fullname,
            email,
            password: hashedPassword, // Pass the hashed password as "password"
        });

        // Generate a token for the new user
        const token = user.generateAuthToken();

        // Respond with the token and user info (excluding sensitive data)
        return res.status(201).json({
            token,
            user,
        });
    } catch (error) {
        console.error("Error in registerUser:", error);
        next(error);
    }
};
