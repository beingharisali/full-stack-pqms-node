import express from "express";
const router = express.Router();

import {
  createPatient,
  getAllPatients,
  getPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patient.js";

router.post("/", createPatient);

router.get("/", getAllPatients);

router.get("/:id", getPatient);

router.patch("/:id", updatePatient);

router.delete("/:id", deletePatient);

export default router;
