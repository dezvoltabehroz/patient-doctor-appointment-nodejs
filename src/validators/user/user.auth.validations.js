'use strict'

// Getting dependencies
const {
    sign_up,
    sign_in
} = require("./user.auth.schema");

// Health validator
exports.health = (req, res, next) => {
    next()
};

exports.sign_up = (req, res, next) => {
    const response = sign_up.validate(req.body);
    if (response.error) {
        next(response.error.details[0].message)
    } else {
        next();
    }
};

exports.sign_in = (req, res, next) => {
    const response = sign_in.validate(req.body);
    if (response.error) {
        next(response.error.details[0].message)
    } else {
        next();
    }
};