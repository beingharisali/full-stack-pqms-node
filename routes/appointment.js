const express = require("express");
const router = express.Router();

const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointment.controller");
const auth = require("../middleware/authentication");
const { authorizePermission } = require("../middleware/authorizePermission");

router.post("/", auth, authorizePermission("create"), createAppointment);
router.get("/", auth, authorizePermission("read"), getAppointments);
router.get("/:id", auth, authorizePermission("read"), getAppointmentById);
router.put("/:id", auth, authorizePermission("update"), updateAppointment);
router.delete("/:id", auth, authorizePermission("delete"), deleteAppointment);

module.exports = router;
