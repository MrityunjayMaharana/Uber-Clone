const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Library for hashing and comparing passwords
const jwt = require('jsonwebtoken'); // Library for generating JSON Web Tokens

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    // Fullname is a required object with firstname and lastname as nested fields
    fullname: {
        type: {
            firstname: {
                type: String,
                required: true, // Ensure firstname is always provided
                minlength: [3, "First name must be at least 3 characters."] // Minimum length validation
            },
            lastname: {
                type: String,
                minlength: [3, "Last name must be at least 3 characters."] // Minimum length validation for lastname
            }
        },
        required: true // Fullname object itself is required
    },
    // Email is required, unique, and must follow a valid email format
    email: {
        type: String,
        required: true, // Ensure email is always provided
        unique: true, // Enforce uniqueness at the database level
        validate: {
            validator: function (v) {
                // Regular expression to validate email format
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: "Invalid email format." // Custom error message for invalid email
        }
    },
    // Password is required and will not be selected by default when querying users
    password: {
        type: String,
        required: true, // Ensure password is always provided
        select: false // Prevent password from being included in queries by default
    },
    // Optional field to store a user's socket ID for real-time features
    socketId: {
        type: String
    }
});

// Instance method to generate a JSON Web Token (JWT) for authentication
userSchema.methods.generateAuthToken = function () {
    // 'this' refers to the user instance calling this method
    const token = jwt.sign({ _id: this.id }, process.env.JWT_SECRET); // Use user ID as payload and secret key from environment variables
    return token; // Return the generated token
};

// Instance method to compare a plain text password with the hashed password in the database
userSchema.methods.comparePasswords = async function (password) {
    // Compare the provided password with the stored hashed password
    return await bcrypt.compare(password, this.password);
};

// Static method to hash a password before saving it to the database
userSchema.statics.hashPassword = async function (password) {
    // Use bcrypt to generate a secure hash for the password
    return await bcrypt.hash(password, 10); // 10 is the salt rounds for hashing
};

// Create the User model from the schema
const userModel = mongoose.model('user', userSchema);

// Export the User model for use in other parts of the application
module.exports = userModel;
