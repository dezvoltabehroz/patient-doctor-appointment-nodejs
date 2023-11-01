'use strict'

// Getting Dependencies
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

// DB Model
const UserModelHelper = require('../dbLayer/helpers/user_model_helper.js');

// Default Error Messages
const { MESSAGES } = require('../utils/error.message.js');

const { JWT_SECRET } = process.env;

exports.patientLogIn = async (req, res) => {
  try {
    const { userId, phoneNumber, userType } = req.body;

    if (!phoneNumber) {
      return res.reply({ statusCode: 400, message: MESSAGES.PHONE_NUMBER_MISSING })
    } else {
      var user = await UserModelHelper.getUserByPhoneNumber(phoneNumber);
      if (!user)
        user = await UserModelHelper.addNewUser(userId, null, null, phoneNumber, null, null, null, userType);

      const token = jwt.sign(user, JWT_SECRET);
      return res.reply({ statusCode: 200, data: { token: token } })
    }
  } catch (error) {
    console.error(error)
    return res.reply({
      statusCode: 400,
      message: MESSAGES.MSG_COMMON_BACKEND_ERROR,
      data: error
    });
  }
}

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.reply({ statusCode: 400, message: MESSAGES.EMPTY_CREDENTIALS })

  const user = await UserModelHelper.getUserByEmail(email);

  if (!user) {
    return res.reply({ statusCode: 404, message: MESSAGES.PROFILE_NOT_FOUND })
  } else {
    const isPasswordCorrect = bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.reply({ statusCode: 404, message: MESSAGES.INVALID_PASSWORD })
    } else if (!user.isApproved) {
      return res.reply({ statusCode: 403, message: MESSAGES.PROFILE_NOT_APPROVED })
    } else if (user.userType != 'admin') {
      return res.reply({ statusCode: 403, message: MESSAGES.INSUFFICIENT_PRIVILEGES })
    } else {
      const token = jwt.sign(user, JWT_SECRET);
      return res.reply({ statusCode: 200, data: { token: token } })
    }
  }
}

exports.pmdcLogIn = async (req, res) => {
  const { pmdcNumber, password } = req.body;

  if (!pmdcNumber || !password)
    return res.reply({ statusCode: 400, message: MESSAGES.EMPTY_CREDENTIALS })

  const doctor = await UserModelHelper.getUserByPmdcNumber(pmdcNumber);

  if (!doctor) {
    return res.reply({ statusCode: 404, message: MESSAGES.PROFILE_NOT_FOUND })
  } else {
    const isPasswordCorrect = await bcrypt.compare(password, doctor.password);
    if (!isPasswordCorrect) {
      return res.reply({ statusCode: 401, message: MESSAGES.INVALID_PASSWORD })
    } else if (!doctor.isApproved) {
      return res.reply({ statusCode: 403, message: MESSAGES.PROFILE_NOT_APPROVED })
    } else {
      const token = jwt.sign(doctor, JWT_SECRET);
      return res.reply({ statusCode: 200, data: { token: token } })
    }
  }
}