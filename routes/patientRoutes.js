const express = require("express");
const router = express.Router();

const {
  createPatient,
  getAllPatients,
  getPatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patient.js");
const auth = require("../middleware/authentication.js");
const { authorizePermission } = require("../middleware/authorizePermission.js");

router.post("/", auth, authorizePermission("create"), createPatient);

router.get("/", auth, authorizePermission("read"), getAllPatients);

router.get("/:id", auth, authorizePermission("read"), getPatient);

router.patch("/:id", auth, authorizePermission("update"), updatePatient);

router.delete("/:id", auth, authorizePermission("delete"), deletePatient);

module.exports = router;
