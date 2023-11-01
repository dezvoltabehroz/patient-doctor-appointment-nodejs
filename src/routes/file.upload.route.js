"use strict";

// Getting dependencies

// Express
const express = require("express");

// Creating an express router
const router = express.Router();

// Middleware
const middleware = require("../middlewares");

// Controller
const controller = require("../controllers/file.upload.controller");

// Routes
router.get("/get-signed-url", middleware.pass, controller.getSignedUrl);

module.exports = router;
