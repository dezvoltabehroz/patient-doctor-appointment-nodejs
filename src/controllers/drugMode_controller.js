'use strict'

// Getting Dependencies

// DB Model
const { DrugModeModelHelper } = require('../dbLayer/helpers/drugMode_model_helper.js');

// Default Error Messages
const { MESSAGES } = require('../utils/error.message.js');

exports.getAllDrugModes = async (req, res) => {
  const modes = await DrugModeModelHelper.getAllDrugModes();
  return res.reply({ statusCode: 200, data: modes })
}

exports.addNewDrugMode = async (req, res) => {
  const { drugModeName } = req.body;

  if (!drugModeName)
    return res.reply({ statusCode: 400, message: MESSAGES.VALUE_CANNOT_BE_EMPTY })

  const existingDrugMode = await DrugModeModelHelper.getDrugModeByName(drugModeName,);
  if (existingDrugMode)
    return res.reply({ statusCode: 409, message: MESSAGES.DRUG_MODE_ALREADY_EXISTS })

  await DrugModeModelHelper.addNewDrugMode(drugModeName);

  return res.reply({ statusCode: 200, message: MESSAGES.DRUG_MODE_ADDED })
}