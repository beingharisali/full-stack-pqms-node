import express from "express";
const router = express.Router();

import {
  createDoctor,
  getAllDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/docter.js";

router.post("/", createDoctor);

router.get("/", getAllDoctors);

router.get("/:id", getDoctor);

router.patch("/:id", updateDoctor);

router.delete("/:id", deleteDoctor);

export default router;
