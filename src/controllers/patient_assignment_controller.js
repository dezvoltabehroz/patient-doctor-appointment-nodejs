'use strict'

// Getting Dependencies

// DB Model
const PatientRequestModelHelper = require('../dbLayer/helpers/patient_request_model_helper.js');
const DoctorRequestModelHelper = require('../dbLayer/helpers/doctor_request_model_helper.js');
const ChatModelHelper = require('../dbLayer/helpers/chat_model_helper.js');
const RequestPendingDoctorAcceptanceModelHelper = require('../dbLayer/helpers/requestPendingDoctorAcceptanceModel_helper.js');

exports.handleIncomingCancelRequestByDoctor = async (req, res) => {
  const doctorId = req.user.id;
  let requestDeleted = (await DoctorRequestModelHelper.deleteDoctorRequest(doctorId)).deletedCount;

  if (!requestDeleted) {
    const pendingRequest = await RequestPendingDoctorAcceptanceModelHelper.getRequestPendingDoctorAcceptanceForGivenDoctor(doctorId,);

    if (pendingRequest) {
      await RequestPendingDoctorAcceptanceModelHelper.deleteRequestPendingDoctorAcceptanceForGivenDoctor(doctorId,);
      const oldestDoctorRequest = await DoctorRequestModelHelper.popOldestDoctorRequest();
      if (oldestDoctorRequest) {
        await RequestPendingDoctorAcceptanceModelHelper.addRequestPendingDoctorAcceptanceForGivenDoctor(oldestDoctorRequest, pendingRequest.patientRequestObj,);
        this.sendPatientRequestToDoctor(oldestDoctorRequest, pendingRequest.patientRequestObj,);
      } else
        await PatientRequestModelHelper.addNewPatientRequest(pendingRequest.patientRequestObj, true,);
      requestDeleted = true;
    }
  }

  if (requestDeleted) return res.reply({ statusCode: 200, message: 'Request Deleted' });
  else {
    return res.reply({ statusCode: 401, message: 'Request not found.' })
  }
}

exports.sendPatientRequestToDoctor = (doctorId, patientRequest) => {
  global.SocketServer.sendToClient(doctorId, 'new_patient_request', patientRequest,);
}

exports.handleIncomingPatientRejectionByDoctor = async (req, res) => {
  const doctorId = req.user.id;
  const requestPendingDoctorAcceptance = await RequestPendingDoctorAcceptanceModelHelper.getRequestPendingDoctorAcceptanceForGivenDoctor(doctorId,);
  if (!requestPendingDoctorAcceptance) {
    return res.reply({ statusCode: 401, message: 'Request for patient must be recieved first.' })
  }
  await RequestPendingDoctorAcceptanceModelHelper.deleteRequestPendingDoctorAcceptanceForGivenDoctor(doctorId,);

  const { patientRequestObj } = requestPendingDoctorAcceptance;

  const oldestDoctorRequest = await DoctorRequestModelHelper.popOldestDoctorRequest();
  if (oldestDoctorRequest) {
    await RequestPendingDoctorAcceptanceModelHelper.addRequestPendingDoctorAcceptanceForGivenDoctor(oldestDoctorRequest, patientRequestObj);
    this.sendPatientRequestToDoctor(oldestDoctorRequest, patientRequestObj);
  } else
    await PatientRequestModelHelper.addNewPatientRequest(patientRequestObj, true,);
  await DoctorRequestModelHelper.addNewDoctorRequest(doctorId);

  return res.reply({ statusCode: 200 })
}

exports.handleIncomingPatientRequestAcceptanceByDoctor = async (req, res) => {
  const doctorId = req.user.id;

  const requestPendingDoctorAcceptanceObj =
    await RequestPendingDoctorAcceptanceModelHelper.getRequestPendingDoctorAcceptanceForGivenDoctor(doctorId,);

  if (!requestPendingDoctorAcceptanceObj) {
    return res.reply({ statusCode: 401, message: "Request for patient must be received first." })
  }
  await RequestPendingDoctorAcceptanceModelHelper.deleteRequestPendingDoctorAcceptanceForGivenDoctor(doctorId,);

  const chat = await ChatModelHelper.createNewChat([
    requestPendingDoctorAcceptanceObj.patientRequestObj.userIdForPatient,
    requestPendingDoctorAcceptanceObj.doctorId,
  ]);

  global.SocketServer.sendToClient(
    requestPendingDoctorAcceptanceObj.patientRequestObj.userIdForPatient,
    'chat_id',
    chat._id.toString(),
  );

  return res.reply({ statusCode: 200, data: { chatId: chat._id.toString() } })
}

exports.handleIncomingRequestByDoctor = async (req, res) => {
  const doctorId = req.user.id;
  if (
    (await DoctorRequestModelHelper.requestExists(doctorId)) ||
    (await RequestPendingDoctorAcceptanceModelHelper.getRequestPendingDoctorAcceptanceForGivenDoctor(doctorId,))
  ) {

    return res.reply({ statusCode: 409, message: 'Request already in progress' })
  }
  const patientRequestObj = await PatientRequestModelHelper.popOldestPatientRequest();

  if (patientRequestObj) {
    const { userIdForPatient, patientAge, patientGender, patientName } = patientRequestObj;
    let funcObj = { userIdForPatient, patientAge, patientGender, patientName }
    await RequestPendingDoctorAcceptanceModelHelper.addRequestPendingDoctorAcceptanceForGivenDoctor(doctorId, funcObj);
    this.sendPatientRequestToDoctor(doctorId, patientRequestObj);
  } else await DoctorRequestModelHelper.addNewDoctorRequest(doctorId);

  return res.reply({ statusCode: 200 })
}

exports.handleIncomingRequestByPatient = async (req, res) => {
  const userId = req.user.id;
  const patientRequestObj = req.body;
  const { patientAge, patientGender, patientName } = patientRequestObj;
  if (!patientAge || !patientGender || !patientName) {
    return res.reply({ statusCode: 400, message: 'Fill all fields.' })
  }
  patientRequestObj.userIdForPatient = userId;

  if (
    (await PatientRequestModelHelper.requestExists(userId)) ||
    (await RequestPendingDoctorAcceptanceModelHelper.getRequestPendingDoctorAcceptanceForGivenPatient(userId,))
  ) {
    return res.reply({ statusCode: 409, message: 'Request already in progress.' })
  }
  const doctorIdOfOldestRequest = await DoctorRequestModelHelper.popOldestDoctorRequest();
  if (doctorIdOfOldestRequest) {
    await RequestPendingDoctorAcceptanceModelHelper.addRequestPendingDoctorAcceptanceForGivenDoctor(doctorIdOfOldestRequest, patientRequestObj,);
    this.sendPatientRequestToDoctor(doctorIdOfOldestRequest, patientRequestObj,);
  } else
    await PatientRequestModelHelper.addNewPatientRequest(patientRequestObj);

  return res.reply({ statusCode: 200 })
}