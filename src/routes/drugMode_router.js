"use strict";

// Getting dependencies

// Express
const express = require("express");

// Creating an express router
const router = express.Router();

// Middleware
const middleware = require("../middlewares");

// Controller
const DrugModeController = require('../controllers/drugMode_controller.js');

router.get('/getAllDrugModes', middleware.apiAuth, DrugModeController.getAllDrugModes);
router.post('/addNewDrugMode', middleware.apiAuth, DrugModeController.addNewDrugMode);

module.exports = router;