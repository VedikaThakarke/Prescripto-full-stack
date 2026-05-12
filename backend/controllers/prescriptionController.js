import prescriptionModel from "../models/prescriptionModel.js";

const createPrescription = async (req, res) => {
  try {
    const {
      appointmentId,
      doctorId,
      patientId,
      medicines,
      notes,
    } = req.body;

    const prescription = new prescriptionModel({
      appointmentId,
      doctorId,
      patientId,
      medicines,
      notes,
    });

    await prescription.save();

    res.json({
      success: true,
      message: "Prescription Created",
      prescription,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

const getPrescriptionByAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const prescription = await prescriptionModel.findOne({
      appointmentId,
    });

    res.json({
      success: true,
      prescription,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createPrescription,
  getPrescriptionByAppointment,
};