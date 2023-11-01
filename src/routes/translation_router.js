"use strict";

// Getting dependencies

// Express
const express = require("express");

// Creating an express router
const router = express.Router();

// Middleware
const middleware = require("../middlewares");

// Controller
const TranslationController = require('../controllers/translation_controller.js');

router.get('', middleware.apiAuth, TranslationController.getAllTranslations);
router.post('', middleware.apiAuth, TranslationController.addNewTranslation);
router.delete('', middleware.apiAuth, TranslationController.removeTranslaton);
router.put('', middleware.apiAuth, TranslationController.modifyTranslation);

module.exports = router;