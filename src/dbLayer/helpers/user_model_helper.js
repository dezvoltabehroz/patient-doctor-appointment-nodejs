'use strict'

// Getting Dependencies
const bcrypt = require('bcrypt');

// User DB Model
const userModel = require('../models/user_model.js');

// ==================== Patient DB Request ====================
exports.addPatient = async (userId, phoneNumber, userType, isApproved = true, isActivated = true) => {
  const user = { userId, phoneNumber, userType, isApproved, isActivated }
  return await userModel.create(user);
};

exports.updatePatient = async (userId, name, gender, age) => {
  return await userModel.updateOne(
    { userId: userId }, 
    { $set: { name, gender, age } }
    )
}


// ==================== Doctor DB Request ====================
exports.getUserByEmail = async (email) => {
  return await userModel.findOne({ email });
}

exports.getUserByPhoneNumber = async (phoneNumber) => {
  return await userModel.findOne({ phoneNumber });
}

exports.getUserById = async (userId) => {
  return await userModel.findById(userId);
}

exports.getUserByPmdcNumber = async (pmdcNumber) => {
  return await userModel.findOne({ pmdcNumber });
}

exports.addNewUser = async (userId, name, email, phoneNumber, password, pmdcNumber, pmdcDocument, userType) => {
  const permissions = [];
  const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
  const user = { userId, name, email, phoneNumber, password: hashedPassword, pmdcNumber, pmdcDocument, userType, permissions }
  return await userModel.create(user);
};
