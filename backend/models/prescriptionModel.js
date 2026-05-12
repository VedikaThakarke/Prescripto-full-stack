import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  medicineName: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
  duration: { type: String, required: true },
});

const prescriptionSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "appointment",
    required: true,
  },

  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor",
    required: true,
  },

  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  medicines: [medicineSchema],

  notes: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const prescriptionModel =
  mongoose.models.prescription ||
  mongoose.model("prescription", prescriptionSchema);

export default prescriptionModel;