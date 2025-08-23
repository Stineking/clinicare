import Patient from "../models/patient.js";
import User from "../models/user.js";
import responseHandler from "../utils/responseHandler.js";
const { errorResponse, notFoundResponse } = responseHandler;

const patientService = {
  register: async (userId, patientData, next) => {
    const patientExists = await Patient.findOne({ email: patientData.email });
    if (patientExists) {
      return next(errorResponse("Patient already exists", 400));
    }
    const patient = await Patient.create({
      userId,
      ...patientData,
    });
    //update and save user patient profile
    const user = await User.findById(userId);
    user.isCompletedOnboard = true;
    user.phone = patientData.phone;
    user.dateOfBirth = patientData.dateOfBirth;
    await user.save();
    return patient;
  },

  getPatient: async (userId, next) => {
    const patient = await Patient.findOne({ userId: userId.toString() });
    if (!patient) {
      return next(notFoundResponse("No patient found"));
    }
    return patient;
  },

  updatePatient: async (patientId, patientData, next) => {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return next(notFoundResponse("No patient found"));
    }
    for (const [key, value] of Object.entries(patientData)) {
      if (value) {
        patient[key] = value;
      }
    }
    const updatedPatient = await patient.save();
    return updatedPatient;
  },
};

export default patientService;