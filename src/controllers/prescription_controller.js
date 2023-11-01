'use strict'

// Getting Dependencies
const fs = require('fs');
const pdf = require('pdf-creator-node');

// DB Model
const PrescriptionModelHelper = require('../dbLayer/helpers/prescription_model_helper.js');
const UserModelHelper = require('../dbLayer/helpers/user_model_helper.js');

// Default Error Messages
const { MESSAGES } = require('../utils/error.message.js');

// Constants
const imagePath = '../backend/resources/images/opd.png';
// var html = fs.readFileSync('../backend/resources/templates/prescription_template.html', 'utf8',);
var html = ``;

exports.addNewPrescription = async (req, res) => {
  const { userIdForPatient, prescribedDrugs, patientName, patientAge, patientGender } = req.body;
  const { id, pmdcNumber, name } = req.user

  if (!userIdForPatient || !prescribedDrugs || !patientName || !patientAge || !patientGender)
    return res.reply({ statusCode: 400, message: MESSAGES.MISSING_FIELDS })

  let prescriptionObj = { ...req.body, doctorId: id, pmdcNumber: pmdcNumber, doctorName: name, };

  // Read the image file
  const opdImage = fs.readFileSync(imagePath);
  const opdLogoBase64 = opdImage.toString('base64');

  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', }).replace(/ /g, '-');

  var document = {
    html: html,
    data: { ...prescriptionObj, date: formattedDate, opdLogoBase64, },
    path: './output.pdf',
    type: '',
  };

  var options = { format: 'A4', orientation: 'portrait', };

  pdf
    .create(document, options)
    .then((res) => console.log(res))
    .catch((error) => console.error(error));

  return res.reply({ statusCode: 200 })
}