const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controller/authController');

const validationFields = [
    body('email').notEmpty().isEmail().withMessage('Email field should be not null or put correct value into it.'),
    body('password').notEmpty()
];

router.post('/register',validationFields ,userController.registerUser);