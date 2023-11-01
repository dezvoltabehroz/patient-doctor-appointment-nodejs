"use strict";

// Getting dependencies

// Express
const express = require("express");

// Creating an express router
const router = express.Router();

// Middleware
const middleware = require("../middlewares");

// Controller
const LoginController = require('../controllers/login_controller.js');

router.post('/patientLogin', middleware.apiAuth, LoginController.patientLogIn);
router.post('/pmdcLogin', middleware.apiAuth, LoginController.pmdcLogIn);
router.post('/adminLogin', middleware.apiAuth, LoginController.adminLogin);
router.post('/logout', middleware.apiAuth);
router.post('/renewToken', middleware.apiAuth);

module.exports = router;