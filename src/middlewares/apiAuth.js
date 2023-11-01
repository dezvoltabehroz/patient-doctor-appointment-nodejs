'use strict'

//Getting dependencies
var jwt = require('jsonwebtoken');

// Commong Function
const config = require('../config/config')
// Authenticating API request
const apiAuth = async (req, res, next) => {
    if (!(req.headers && req.headers.authorization && req.headers.authorization.includes('Bearer '))) {
        return next({
            status: 401,
            message: "Auth Token Not Provided"
        });
    } else {
        const token = req.headers.authorization.replace('Bearer ', '');
        try {
            const decoded = jwt.verify(token, config.jwt_secret_key);
            req.userId = decoded.userId
            req.user_info = decoded
            return next();
        } catch (error) {
            console.error('JWT Verification Error:', error);
            return next(error)
        }
    }
};

// Pass API request
const pass = (req, res, next) => {
    next()
};

// Pass API request
const verify_password_url = (req, res, next) => {
    const { token } = req.query;
    try {
        const decoded = jwt.verify(token, config.jwt_secret_key);
        req.userId = decoded.userId
        req.user_info = decoded
        return next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return next(error)
    }
};

module.exports = {
    apiAuth,
    pass,
    verify_password_url
}