import express from "express";

import {
  createPrescription,
  getPrescriptionByAppointment,
} from "../controllers/prescriptionController.js";

const prescriptionRouter = express.Router();

prescriptionRouter.post("/create", createPrescription);

prescriptionRouter.get(
  "/appointment/:appointmentId",
  getPrescriptionByAppointment
);

export default prescriptionRouter;