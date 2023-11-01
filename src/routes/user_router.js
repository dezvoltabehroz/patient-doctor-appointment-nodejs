"use strict";

// Getting dependencies

// Express
const express = require("express");

// Creating an express router
const router = express.Router();

// Middleware
const middleware = require("../middlewares");

// Validator
const validator = require('../validators/user/user.auth.validations.js');

// Controller
const userController = require('../controllers/user_controller.js');

router.post('/signup', validator.sign_up, middleware.pass, userController.signUp);

module.exports = router;