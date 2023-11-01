"use strict";

// Getting dependencies

// Express
const express = require("express");

// Creating an express router
const router = express.Router();

// Middleware
const middleware = require("../middlewares");

// Controller
const DrugTypeController = require('../controllers/drugType_controller.js');

router.get('/getAllDrugTypes', middleware.apiAuth, DrugTypeController.getAllDrugTypes);
router.post('/addNewDrugType', middleware.apiAuth, DrugTypeController.addNewDrugType);

module.exports = router;