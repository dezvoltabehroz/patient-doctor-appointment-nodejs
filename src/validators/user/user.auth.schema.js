'use strict'

// Getting dependencies
const joi = require('joi');

// Making variables for validations
const matchString = joi.string().required();
const matchStringOptional = joi.string().optional().allow('', null);
const matchNumber = joi.number().integer().min(1).required();
const matchDecimal = joi.number().min(1).required();
const matchEmail = joi.string().required().allow('', null).email().error(errors => {
    errors.forEach(err => {
        if (err.code === "string.email") {
            err.message = `'${err.value}' must be a valid email`;
        }
    });
    return errors;
});
const phone_number = joi.string().pattern(/^\+\d+$/);
const password = joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]{8,}.+$/);

exports.sign_up = joi.object({
    userId: matchString,
    name: matchString,
    email: matchEmail,
    phoneNumber: phone_number,
    password: matchString,
    pmdcNumber: matchNumber,
    pmdcDocument: matchString,
    userType: matchString
});

exports.sign_in = joi.object({
    email: matchEmail,
    password: joi.string().optional().allow('', null)
});