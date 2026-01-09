const express = require("express");
const router = express.Router();

const {
  createDocter,
  getAllDocters,
  getDocter,
  updateDocter,
  deleteDocter,
} = require("../controllers/docter.js");
const auth = require("../middleware/authentication.js");
const { authorizePermission } = require("../middleware/authorizePermission.js");

router.post("/", auth, authorizePermission("create"), createDocter);

router.get("/", auth, authorizePermission("read"), getAllDocters);

router.get("/:id", auth, authorizePermission("read"), getDocter);

router.patch("/:id", auth, authorizePermission("update"), updateDocter);

router.delete("/:id", auth, authorizePermission("delete"), deleteDocter);

module.exports = router;
