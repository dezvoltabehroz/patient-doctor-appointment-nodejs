"use strict";

// Getting dependencies

// Express
const express = require("express");

// Creating an express router
const router = express.Router();

// Middleware
const middleware = require("../middlewares");

// Controller
const PatientAssignmentController = require('../controllers/patient_assignment_controller.js');

router.post('/requestForPatient', middleware.apiAuth, PatientAssignmentController.handleIncomingRequestByDoctor);
router.delete('/requestForPatient', middleware.apiAuth, PatientAssignmentController.handleIncomingCancelRequestByDoctor);
router.post('/requestForDoctor', middleware.apiAuth, PatientAssignmentController.handleIncomingRequestByPatient);
router.post('/patientRejected', middleware.apiAuth, PatientAssignmentController.handleIncomingPatientRejectionByDoctor);
router.post('/patientAccepted', middleware.apiAuth, PatientAssignmentController.handleIncomingPatientRequestAcceptanceByDoctor,);

module.exports = router;