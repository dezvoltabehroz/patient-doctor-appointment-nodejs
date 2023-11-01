'use strict'

// Getting dependencies

// Response middleware
const response = require('./response');

// API Middlewares
const { apiAuth, pass, verify_password_url } = require('./apiAuth');

// Error handler middleware
const { errorHandler } = require('./errorHandler');

module.exports = {
    response,
    apiAuth,
    pass,
    verify_password_url,
    errorHandler
};
