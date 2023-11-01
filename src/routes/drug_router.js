"use strict";

// Getting dependencies

// Express
const express = require("express");

// Creating an express router
const router = express.Router();

// Middleware
const middleware = require("../middlewares");

// Controller
const DrugController = require('../controllers/drug_controller.js');

router.get('/getAllDrugs', middleware.apiAuth, DrugController.getAllDrugs);
router.get('/getAllDrugNames', middleware.apiAuth, DrugController.getAllDrugNames);
router.get('/getByDrugName', middleware.apiAuth, DrugController.getDrugByDrugName);
router.get('/getByDrugId', middleware.apiAuth, DrugController.getDrugByDrugId);
router.post('/addNewDrug', middleware.apiAuth, DrugController.addNewDrug);

module.exports = router;