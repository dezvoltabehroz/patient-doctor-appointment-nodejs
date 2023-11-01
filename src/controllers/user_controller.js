'use strict'

// Getting Dependencies

// DB Model
const UserModelHelper = require('../dbLayer/helpers/user_model_helper.js');

// Default Error Messages
const { MESSAGES } = require('../utils/error.message.js');

exports.signUp = async (req, res) => {
  try {
    const { userId, name, email, phoneNumber, password, pmdcNumber, pmdcDocument, userType } = req.body;

    let existingUser = null;
    if (email) {
      existingUser = await UserModelHelper.getUserByEmail(email);
      if (existingUser)
        return res.reply({ statusCode: 409, message: MESSAGES.USER_ALREADY_EXISTS })
    }

    if (phoneNumber) {
      existingUser = await UserModelHelper.getUserByPhoneNumber(phoneNumber);
      if (existingUser)
        return res.reply({ statusCode: 409, message: MESSAGES.USER_ALREADY_EXISTS })
    }

    if (userType == "doctor") {
      existingUser = await UserModelHelper.getUserByPmdcNumber(pmdcNumber);
      if (existingUser)
        return res.reply({ statusCode: 409, message: MESSAGES.USER_ALREADY_EXISTS })
    }

    await UserModelHelper.addNewUser(userId, name, email, phoneNumber, password, pmdcNumber, pmdcDocument, userType);
    return res.reply({ statusCode: 200, message: MESSAGES.USER_ADDED })
  } catch (error) {
    console.error(error)
    return res.reply({
      statusCode: 400,
      message: MESSAGES.MSG_COMMON_BACKEND_ERROR,
      data: error
    });
  }
}

