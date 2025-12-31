const mongoose = require("mongoose");
const PatientSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please provide name"],
		maxlength: 100,
	},
	age: {
		type: Number,
		required: [true, "Age is required"],
		min: [0, "Age must be positive"],
		max: [150, "Age must be realistic"],
	},
	history: {
		type: String,
		required: [true, "Enter medical history"],
	},
});
const Patient = mongoose.model("Patient", PatientSchema);
module.exports = Patient;