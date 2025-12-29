const express = require("express");
const router = express.Router();

const {
	createDocter,
	getAllDocters,
	getDocter,
	updateDocter,
	deleteDocter,
} = require("../controllers/docter.js");

router.post("/", createDocter);

router.get("/", getAllDocters);

router.get("/:id", getDocter);

router.patch("/:id", updateDocter);

router.delete("/:id", deleteDocter);

module.exports = router;
