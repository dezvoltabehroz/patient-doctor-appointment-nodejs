const TranslationModel = require('../models/translation_model.js');


exports.getAllTranslations = async () => await TranslationModel.find({});

exports.getTranslation = async (expression) => await TranslationModel.findOne({ expression });

exports.addNewTranslation = async (expression, translation, overwriteExisting,) => await TranslationModel.create({ expression, translation, });

exports.modifyExistingTranslation = async (expression, newTranslation) => await TranslationModel.findOneAndUpdate({ expression }, { translation: newTranslation },);

exports.removeTranslation = async (expression) => await TranslationModel.deleteOne({ expression });

