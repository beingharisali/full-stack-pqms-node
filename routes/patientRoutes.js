const express = require("express");
const router = express.Router();

const {
	createPatient,
	getAllPatients,
	getPatient,
	updatePatient,
	deletePatient,
} = require("../controllers/patient.js");

router.post("/", createPatient);

router.get("/", getAllPatients);

router.get("/:id", getPatient);

router.patch("/:id", updatePatient);

router.delete("/:id", deletePatient);

module.exports = router;
