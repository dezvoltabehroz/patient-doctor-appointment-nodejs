'use strict'

// Getting Dependencies
var sha1 = require('sha1');
var jwt = require('jsonwebtoken');
const moment = require('moment-timezone');

// DB Model
const UserModelHelper = require('../dbLayer/helpers/user_model_helper.js');

// Formatter
const { formatPatientObj } = require('../formatters/patient.formatter.js')

// Default Error Messages
const { MESSAGES } = require('../utils/error.message.js');

const { JWT_SECRET } = process.env;

// Patient - Sign Up
exports.patient_sign_up = async (req, res, next) => {
    try {
        const { userId, phoneNumber, userType } = req.body;

        var userData = await UserModelHelper.getUserByPhoneNumber(phoneNumber);
        if (userData) {
            // let token = jwt.sign(formatPatientObj(userData), JWT_SECRET, { expiresIn: '1h' });
            let token = jwt.sign(formatPatientObj(userData), JWT_SECRET);
            return res.reply({ statusCode: 200, data: { token: token } })
        } else {
            let newUser = await UserModelHelper.addPatient(userId, phoneNumber, userType);
            // let token = jwt.sign(formatPatientObj(newUser), JWT_SECRET, { expiresIn: '1h' });
            let token = jwt.sign(formatPatientObj(newUser), JWT_SECRET);
            return res.reply({ statusCode: 200, message: MESSAGES.USER_ADDED, data: { token: token } })
        }
    } catch (error) {
        console.error(error)
        return res.reply({
            statusCode: 400,
            message: MESSAGES.MSG_COMMON_BACKEND_ERROR,
            data: error
        });
    }
};

// Patient - Update Details
exports.patient_update_detail = async (req, res, next) => {
    try {
        const { name, gender, age } = req.body;
        const { userId } = req
        const { phoneNumber } = req.user_info

        console.log(req.user_info)

        await UserModelHelper.updatePatient(userId, name, gender, age);

        var userData = await UserModelHelper.getUserByPhoneNumber(phoneNumber);
        console.log(userData)
        let token = jwt.sign(formatPatientObj(userData), JWT_SECRET);
        return res.reply({ statusCode: 200, message: MESSAGES.PROFILE_UPDATED, data: { token: token } })
    } catch (error) {
        return res.reply({
            statusCode: 400,
            message: MESSAGES.MSG_COMMON_BACKEND_ERROR,
            data: error
        });
    }
};

// Patient - Get Details
exports.patient_detail = async (req, res, next) => {
    try {
        return res.reply({ statusCode: 200, data: { user_info: req.user_info } })
    } catch (error) {
        return res.reply({
            statusCode: 400,
            message: MESSAGES.MSG_COMMON_BACKEND_ERROR,
            data: error
        });
    }
};
