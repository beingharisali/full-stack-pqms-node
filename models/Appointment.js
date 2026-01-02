const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
	{
		patient: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Patient",
			required: true,
		},
		doctor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Docter",
			required: true,
		},
		appointmentDate: {
			type: Date,
			required: true,
		},
		timeSlot: {
			type: String,
			required: true,
		},
		reason: {
			type: String,
		},
		status: {
			type: String,
			enum: ["pending", "approved", "completed", "cancelled"],
			default: "pending",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);
