"use strict";

// Getting dependencies

// Express
const express = require("express");

// Creating an express router
const router = express.Router();

// Middleware
const middleware = require("../middlewares");

// Controller
const controller = require("../controllers/auth.controller");

// Routes-Patient
router.post("/patient-sign-up", middleware.pass, controller.patient_sign_up);
router.put("/patient-update-detail", middleware.apiAuth, controller.patient_update_detail);
router.get("/patient-detail", middleware.apiAuth, controller.patient_detail);

module.exports = router;
