'use strict'

// Getting Dependencies

// DB Model
const DrugTypeModelHelper = require('../dbLayer/helpers/drugType_model_helper.js');

// Default Error Messages
const { MESSAGES } = require('../utils/error.message.js');

exports.getAllDrugTypes = async (req, res) => {
  const types = await DrugTypeModelHelper.getAllDrugTypes();
  return res.reply({ statusCode: 200, data: types })
}

exports.addNewDrugType = async (req, res) => {
  const { drugTypeName, quantityList } = req.body;

  if (!drugTypeName) {
    return res.reply({ statusCode: 400, message: MESSAGES.VALUE_CANNOT_BE_EMPTY })
  }

  const existingDrugType = await DrugTypeModelHelper.getDrugTypeByName(drugTypeName);
  if (existingDrugType) {
    return res.reply({ statusCode: 409, message: MESSAGES.DRUG_TYPE_ALREADY_EXISTS })
  }

  await DrugTypeModelHelper.addNewDrugType(drugTypeName, quantityList);
  return res.reply({ statusCode: 201 })
}
