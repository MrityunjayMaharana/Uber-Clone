const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { body } = require('express-validator');

// Validation for register route
router.post('/register', [
    body('fullname.firstname').isLength({ min: 3 }).withMessage('Firstname must be at least 3 characters.'),
    body('fullname.lastname').isLength({ min: 3 }).withMessage('Lastname must be at least 3 characters.'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.')
], userController.registerUser);

module.exports = router;
