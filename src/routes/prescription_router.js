"use strict";

// Getting dependencies

// Express
const express = require("express");

// Creating an express router
const router = express.Router();

// Middleware
const middleware = require("../middlewares");

// Controller
const PrescriptionController = require('../controllers/prescription_controller.js');

router.post('/addNewPrescription', middleware.apiAuth, PrescriptionController.addNewPrescription);

module.exports = router;