'use strict'

// Getting dependencies
const express = require('express');

// Creating index router
const indexRoutes = express.Router();

// Getting common health check response message
const { healthCheckResponse } = require('../utils/common');

// Creating index level routes
indexRoutes.get('/health', (req, res, next) => res.reply(healthCheckResponse));

const fileUploadRouter = require('./file.upload.route');
const authRouter = require('./auth.route');

// Old Routes
const userRouter = require('./user_router.js');
const doctorRouter = require('./doctor_router.js');
const sessionRouter = require('./session_router.js');
const drugTypeRouter = require('./drugType_router.js');
const drugModeRouter = require('./drugMode_router.js');
const drugRouter = require('./drug_router.js');
const prescriptionRouter = require('./prescription_router.js');
const PatientAssignmentRouter = require('./patient_assignment_router.js');
const translationRouter = require('./translation_router.js');


// Exporting all routes
module.exports = {
    indexRoutes,
    fileUploadRouter,
    authRouter,

    // Old Routes
    userRouter,
    doctorRouter,
    sessionRouter,
    drugTypeRouter,
    drugModeRouter,
    drugRouter,
    prescriptionRouter,
    PatientAssignmentRouter,
    translationRouter
};