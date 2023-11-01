const DrugModel = require('../models/drug_model.js');

exports.getAllDrugs = async () => await DrugModel.find({});

exports.getAllDrugNames = async () => await DrugModel.find({}, { name: 1, _id: 0 });

exports.getDrugByDrugName = async (name) => await DrugModel.findOne({ name });

exports.getDrugByDrugId = async (_id) => await DrugModel.findOne({ _id });

exports.addNewDrug = async (drugObj) => {
  const newDrug = await DrugModel.create(drugObj);
  return newDrug;
}