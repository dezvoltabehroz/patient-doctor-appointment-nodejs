'use strict'

// Getting Dependencies

// DB Model
const DrugModelHelper = require('../dbLayer/helpers/drug_model_helper.js');

// Default Error Messages
const { MESSAGES } = require('../utils/error.message.js');

exports.getAllDrugs = async (req, res) => {
  const drugs = await DrugModelHelper.getAllDrugs();
  return res.reply({ statusCode: 200, data: drugs })
}

exports.getAllDrugNames = async (req, res) => {
  const drugNames = await DrugModelHelper.getAllDrugNames();
  return res.reply({ statusCode: 200, data: drugNames })
}

exports.getDrugByDrugName = async (req, res) => {
  const { drugName } = req.body;
  if (!drugName) return res.reply({ statusCode: 400, message: MESSAGES.VALUE_CANNOT_BE_EMPTY })

  const drug = await DrugModelHelper.getDrugByDrugName(drugName);
  if (!drug) return res.reply({ statusCode: 404, message: MESSAGES.DRUG_NOT_FOUND })

  return res.reply({ statusCode: 200, data: drug })
}

exports.getDrugByDrugId = async (req, res) => {
  const { drugId } = req.body
  if (!drugId) return res.reply({ statusCode: 400, message: MESSAGES.VALUE_CANNOT_BE_EMPTY })

  const drug = await DrugModelHelper.getDrugByDrugId(drugId);
  if (!drug) return res.reply({ statusCode: 404, message: MESSAGES.DRUG_NOT_FOUND })

  return res.reply({ statusCode: 200, data: drug })
}

exports.addNewDrug = async (req, res) => {
  const { name, types } = req.body;
  if (!name || !types) return res.reply({ statusCode: 400, message: MESSAGES.MISSING_FIELDS })

  const existingDrug = await DrugModelHelper.getDrugByDrugName(req.body.name);
  if (existingDrug) return res.reply({ statusCode: 409, message: MESSAGES.DRUG_ALREADY_EXISTS })

  await DrugModelHelper.addNewDrug({ name: req.body.name, types: req.body.types });
  return res.reply({ statusCode: 200, message: MESSAGES.DRUG_ADDED })
}