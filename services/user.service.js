const userModel = require('../models/user.model');

module.exports.createUser = async ({ fullname, email, password }) => {
    // Validate required fields
    if (!fullname || !fullname.firstname || !fullname.lastname || !email || !password) {
        throw new Error("All fields are required.");
    }

    // Create the user in the database
    const user = await userModel.create({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname,
        },
        email,
        password, // Save the hashed password
    });

    return user;
};
