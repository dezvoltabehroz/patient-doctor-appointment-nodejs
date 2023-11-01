'use strict'

// Getting Dependencies

// DB Model
const TranslationModelHelper = require('../dbLayer/helpers/translation_model_helper.js');

// Default Error Messages
const { MESSAGES } = require('../utils/error.message.js');

exports.getAllTranslations = async (req, res) => {
  const translations = await TranslationModelHelper.getAllTranslations();
  return res.reply({ statusCode: 200, data: translations })
}

exports.addNewTranslation = async (req, res) => {
  const { expression, translation } = req.body
  if (!expression || !translation) return res.reply({ statusCode: 400, message: MESSAGES.MISSING_FIELDS })

  const existingTranslation = await TranslationModelHelper.getTranslation(expression);

  if (existingTranslation)
    return res.reply({ statusCode: 409, message: MESSAGES.TRANSLATION_ALREADY_EXISTS })

  const newTranslation = await TranslationModelHelper.addNewTranslation(expression, translation,);
  return res.reply({ statusCode: 200, data: newTranslation })
}

exports.modifyTranslation = async (req, res) => {
  const { expression, translation } = req.body
  if (!expression || !translation) {
    return res.reply({ statusCode: 400, message: MESSAGES.MISSING_FIELDS })
  }
  const newTranslation = await TranslationModelHelper.modifyExistingTranslation(expression, translation);
  return res.reply({ statusCode: 200, data: newTranslation })
}

exports.removeTranslaton = async (req, res) => {
  if (!req.body.expression) {
    return res.reply({ statusCode: 400, message: MESSAGES.VALUE_CANNOT_BE_EMPTY })
  }
  await TranslationModelHelper.removeTranslation(req.body.expression);
  return res.reply({ statusCode: 200 })
}
