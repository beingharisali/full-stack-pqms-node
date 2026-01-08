const Appointment = require("../models/Appointment");
const Patient = require("../models/patient");
const Docter = require("../models/docter");
const mongoose = require("mongoose");

exports.createAppointment = async (req, res, next) => {
  try {
    const { patient, doctor, appointmentDate, timeSlot, reason, status } =
      req.body;

    if (!patient || !doctor || !appointmentDate || !timeSlot) {
      return res.status(400).json({
        success: false,
        message:
          "Patient, doctor, appointment date, and time slot are required",
      });
    }

    // Validate if patient and doctor exist
    const patientExists = await Patient.findById(patient);
    const doctorExists = await Docter.findById(doctor);

    if (!patientExists) {
      return res.status(400).json({
        success: false,
        message: "Patient not found",
      });
    }

    if (!doctorExists) {
      return res.status(400).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const appointment = await Appointment.create({
      patient,
      doctor,
      appointmentDate,
      timeSlot,
      reason,
      status: status || "pending",
    });

    res.status(201).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getAppointments = async (req, res) => {
  try {
    const { doctor, status, search, sort } = req.query;

    const matchStage = {};

    if (doctor && mongoose.Types.ObjectId.isValid(doctor)) {
      matchStage.doctor = new mongoose.Types.ObjectId(doctor);
    }

    if (status) {
      matchStage.status = status;
    }

    let sortStage = { appointmentDate: 1 };

    if (sort === "patient") sortStage = { "patient.name": 1 };
    if (sort === "doctor") sortStage = { "doctor.name": 1 };

    const pipeline = [
      { $match: matchStage },

      {
        $lookup: {
          from: "patients",
          localField: "patient",
          foreignField: "_id",
          as: "patient",
        },
      },
      {
        $unwind: {
          path: "$patient",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $lookup: {
          from: "docters",
          localField: "doctor",
          foreignField: "_id",
          as: "doctor",
        },
      },
      {
        $unwind: {
          path: "$doctor",
          preserveNullAndEmptyArrays: true,
        },
      },

      ...(search
        ? [
            {
              $match: {
                "patient.name": { $regex: search, $options: "i" },
              },
            },
          ]
        : []),

      { $sort: sortStage },

      {
        $project: {
          appointmentDate: 1,
          timeSlot: 1,
          reason: 1,
          status: 1,
          patient: { _id: 1, name: 1 },
          doctor: { _id: 1, name: 1 },
        },
      },
    ];

    const appointments = await Appointment.aggregate(pipeline);

    res.json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAppointmentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment ID",
      });
    }

    const appointment = await Appointment.findById(id)
      .populate("patient")
      .populate("doctor");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.updateAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment ID",
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deleteAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment ID",
      });
    }

    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
